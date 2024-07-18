const db = require('../config/database');
const book_function = require('../functions/book');

exports.createBook = async (req, res) => {
  const { error } = await book_function.validateCreate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'INSERT INTO book (book_code, title, author, stock) VALUES (?, ?, ?, ?)';

  const req_body = [
    req.body.book_code,
    req.body.title,
    req.body.author,
    req.body.stock,
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

exports.listBook = async (req, res) => {
  const sql = 'SELECT * FROM book ORDER BY created_at DESC';

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

exports.updateBook = async (req, res) => {
  const { error } = await book_function.validateUpdate(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'UPDATE book SET title=?, author=?, stock=? WHERE book_code=?';

  const req_body = [
    req.body.title,
    req.body.author,
    req.body.stock,
    req.body.book_code,
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
        message: 'Failed! Book not found.',
      });
    }

    return res.json({
      status: 1,
      message: 'Book updated',
    });
  });
};

exports.deleteBook = async (req, res) => {
  const { error } = await book_function.validateDelete(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'DELETE FROM book WHERE book_code=?';

  const req_body = [
    req.body.book_code,
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
        message: 'Failed! Book not found.',
      });
    }

    return res.json({
      status: 1,
      message: 'Book deleted',
    });
  });
};