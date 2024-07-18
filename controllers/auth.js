const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const auth_function = require('../functions/auth');

// ENV
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '@AccessTokenSecretKey2024!';

exports.register = async (req, res) => {
  const { error } = await auth_function.validateCreate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'INSERT INTO admin (name, username, password) VALUES (?, ?, ?)';

  const salt = bcrypt.genSaltSync();
  const password = bcrypt.hashSync(req.body.password, salt);

  const req_body = [
    req.body.name,
    req.body.username,
    password,
  ];

  db.query(sql, req_body, (error) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    return res.json({
      status: 1,
      message: 'Success',
    });
  });
};

exports.login = async (req, res) => {
  const { error } = await auth_function.validateLogin(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'SELECT name, username, password, access_token FROM admin WHERE username=?';

  const req_body = [
    req.body.username,
  ];

  db.query(sql, req_body, async (error, result) => {
    if (error) {
      return res.json({
        status: 0,
        message: error.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: 0,
        message: 'Username not registered!',
      });
    }

    const matchPassword = await bcrypt.compare(req.body.password, result[0].password);

    if (!matchPassword) {
      return res.json({
        status: 0,
        message: 'Password wrong!',
      });
    }

    const accessToken = jwt.sign({ username: req.body.username }, ACCESS_TOKEN_SECRET, { expiresIn: '1d' });

    const sql_update = 'UPDATE admin SET access_token=? WHERE username=?';

    const req_body_update = [
      accessToken,
      req.body.username,
    ];

    db.query(sql_update, req_body_update, (error) => {
      if (error) {
        return res.json({
          status: 0,
          message: error.message,
        });
      }

      db.query(sql, req_body, (error, result) => {
        if (error) {
          return res.json({
            status: 0,
            message: error.message,
          });
        }

        return res.json({
          status: 1,
          message: 'Success',
          data: {
            name: result[0].name,
            username: result[0].username,
            access_token: result[0].access_token,
          },
        });
      });
    });
  });
}