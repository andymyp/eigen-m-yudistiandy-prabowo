const router = require('express').Router();
const controller = require('../controllers/book');

router.post('/create-book', controller.createBook);
router.post('/list-book', controller.listBook);
router.post('/update-book', controller.updateBook);
router.post('/delete-book', controller.deleteBook);

module.exports = router;