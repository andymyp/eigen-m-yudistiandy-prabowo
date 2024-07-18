const jwt = require('jsonwebtoken');
const db = require('../config/database');

// ENV
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '@AccessTokenSecretKey2024!';

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    if (!token || token === 'null' || token === 'undefined' || token === '') {
      return res.json({
        statusCode: 0,
        message: 'Not Authorized!',
      })
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        return res.json({
          statusCode: 0,
          message: 'Not Authorized!',
        })
      }

      const sql = 'SELECT admin_id, name, username FROM admin WHERE username=? AND access_token=?';

      const req_body = [
        data.username,
        token
      ];

      db.query(sql, req_body, (error, result) => {
        if (error) {
          return res.json({
            status: 0,
            message: error.message,
          });
        }

        if (result.length === 0) {
          req.user = {};
          return res.json({
            statusCode: 0,
            message: 'Not Authorized!',
          })
        }

        req.user = result[0];
        return next();
      });
    });
  } else {
    return res.json({
      statusCode: 0,
      message: 'Not Authorized!',
    })
  }
}

module.exports = authentication;