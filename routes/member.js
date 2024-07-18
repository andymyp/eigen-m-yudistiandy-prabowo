const router = require('express').Router();
const controller = require('../controllers/member');

router.post('/create-member', controller.createMember);
router.post('/list-member', controller.listMember);
router.post('/update-member', controller.updateMember);
router.post('/delete-member', controller.deleteMember);

module.exports = router;