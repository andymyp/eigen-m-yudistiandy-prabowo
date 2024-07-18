const db = require('../config/database');
const transaction_function = require('../functions/transaction');

exports.borrowBook = async (req, res) => {
  const { error } = await transaction_function.validateBorrow(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'SELECT * FROM transaction WHERE member_code=? AND returned=0';

  const req_body = [
    req.body.member_code,
  ];

  db.query(sql, req_body, async (err, result) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    if (result.length === 2) {
      return res.json({
        status: 0,
        message: 'Member can borrow only 2 book!',
      });
    }

    const sql_penalty = 'SELECT * FROM penalty WHERE member_code=? ORDER BY created_at DESC LIMIT 1';

    const req_body_penalty = [
      req.body.member_code,
    ];

    db.query(sql_penalty, req_body_penalty, async (err, penalty) => {
      if (err) {
        return res.json({
          status: 0,
          message: err.message,
        });
      }

      if (penalty.length > 0) {
        const now = new Date();
        const penalty_date = new Date(penalty[0].created_at);
        const diffTime = Math.abs(now - penalty_date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        console.log('now', now);
        console.log('penalty_date', penalty_date);
        console.log('diffTime', diffTime);
        console.log('diffDays', diffDays);
      }

      const sql_get_stock = 'SELECT stock FROM book WHERE book_code=?';

      const body_get_stock = [
        req.body.book_code,
      ];

      db.query(sql_get_stock, body_get_stock, (err, book) => {
        if (err) {
          return res.json({
            status: 0,
            message: err.message,
          });
        }

        if (book.length === 0) {
          return res.json({
            status: 0,
            message: 'Book not found!',
          });
        }

        if (book[0].stock === 0) {
          return res.json({
            status: 0,
            message: 'Book out of stock!',
          });
        }

        const new_stock = book[0].stock - 1;

        const sql_update = 'UPDATE book SET stock=? WHERE book_code=?';

        const body_update = [
          new_stock,
          req.body.book_code,
        ];

        db.query(sql_update, body_update, (err) => {
          if (err) {
            return res.json({
              status: 0,
              message: err.message,
            });
          }

          const sql_insert = 'INSERT INTO transaction (member_code, book_code, admin_id) VALUES (?, ?, ?)';

          const req_body_insert = [
            req.body.member_code,
            req.body.book_code,
            req.user.admin_id,
          ];

          db.query(sql_insert, req_body_insert, async (err) => {
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
        });
      });
    });
  });
};