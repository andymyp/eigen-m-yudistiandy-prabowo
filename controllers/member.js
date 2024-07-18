const db = require('../config/database');
const member_function = require('../functions/member');

exports.createMember = async (req, res) => {
  const { error } = await member_function.validateCreate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'INSERT INTO member (member_code, name) VALUES (?, ?)';

  const req_body = [
    req.body.member_code,
    req.body.name,
  ];

  db.query(sql, req_body, async (err) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    return res.json({
      status: 1,
      message: 'Success',
    });
  });
};

exports.listMember = async (req, res) => {
  const sql = 'SELECT * FROM member ORDER BY created_at DESC';

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    return res.json({
      status: 1,
      message: 'Success',
      data: result,
    });
  });
};

exports.updateMember = async (req, res) => {
  const { error } = await member_function.validateUpdate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'UPDATE member SET name=? WHERE member_code=?';

  const req_body = [
    req.body.name,
    req.body.member_code,
  ];

  db.query(sql, req_body, (err, result) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.json({
        status: 0,
        message: 'Failed! Member not found.',
      });
    }

    return res.json({
      status: 1,
      message: 'Member updated',
    });
  });
};

exports.deleteMember = async (req, res) => {
  const { error } = await member_function.validateDelete(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'DELETE FROM member WHERE member_code=?';

  const req_body = [
    req.body.member_code,
  ];

  db.query(sql, req_body, (err, result) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.json({
        status: 0,
        message: 'Failed! Member not found.',
      });
    }

    return res.json({
      status: 1,
      message: 'Member deleted',
    });
  });
};