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

        if (diffDays <= 3) {
          let yyyy = penalty_date.getFullYear();
          let mm = penalty_date.getMonth() + 1;
          let dd = penalty_date.getDate();

          if (dd < 10) dd = '0' + dd;
          if (mm < 10) mm = '0' + mm;

          const formattedToday = dd + '/' + mm + '/' + yyyy;

          return res.json({
            status: 0,
            message: `You have penalty at ${formattedToday}! can borrow again after ${3 - diffDays} days.`,
          });
        }
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

exports.returnBook = async (req, res) => {
  const { error } = await transaction_function.validateBorrow(req.body);
  if (error) {
    return res.json({
      status: 0,
      message: error.details[0].message,
    });
  }

  const sql = 'SELECT * FROM transaction WHERE member_code=? AND book_code=? AND returned=0';

  const req_body = [
    req.body.member_code,
    req.body.book_code,
  ];

  db.query(sql, req_body, async (err, result) => {
    if (err) {
      return res.json({
        status: 0,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: 0,
        message: 'This book not borrow with this member!',
      });
    }

    const now = new Date();
    const transaction_date = new Date(result[0].created_at);
    const diffTime = Math.abs(now - transaction_date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
      const sql_penalty = 'INSERT INTO penalty (member_code) VALUE (?)';

      const req_body_penalty = [
        req.body.member_code,
      ];

      db.query(sql_penalty, req_body_penalty, async (err) => {
        if (err) {
          return res.json({
            status: 0,
            message: err.message,
          });
        }
      });
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

      const new_stock = book[0].stock + 1;

      const sql_update_stock = 'UPDATE book SET stock=? WHERE book_code=?';

      const body_update_stock = [
        new_stock,
        req.body.book_code,
      ];

      db.query(sql_update_stock, body_update_stock, (err) => {
        if (err) {
          return res.json({
            status: 0,
            message: err.message,
          });
        }

        const update_transaction = 'UPDATE transaction SET returned=?, return_at=? WHERE member_code=? AND book_code=?';

        const body_update_transaction = [
          1,
          now,
          req.body.member_code,
          req.body.book_code,
        ];

        db.query(update_transaction, body_update_transaction, async (err) => {
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
};

exports.checkBook = async (req, res) => {
  const sql = 'SELECT * FROM book WHERE stock != 0 ORDER BY created_at DESC';

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

exports.checkMember = async (req, res) => {

  const rows = 'm.member_code, m.name, SUM(1) as borrow_book';
  const tables = 'member m, transaction t';
  const condition = 'm.member_code=t.member_code AND t.returned=0';
  const group = 't.member_code';
  const order = 'm.member_code ASC';

  const sql = `SELECT ${rows} FROM ${tables} WHERE ${condition} GROUP BY ${group} ORDER BY ${order}`;

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