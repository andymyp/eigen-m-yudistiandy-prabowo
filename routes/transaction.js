const router = require('express').Router();
const controller = require('../controllers/transaction');

router.post('/borrow-book', controller.borrowBook);

module.exports = router;