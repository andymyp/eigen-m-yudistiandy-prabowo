const router = require('express').Router();
const controller = require('../controllers/transaction');

router.post('/borrow-book', controller.borrowBook);
router.post('/return-book', controller.returnBook);
router.post('/check-book', controller.checkBook);
router.post('/check-member', controller.checkMember);

module.exports = router;