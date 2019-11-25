const express = require('express');
const router = new express.Router();
const passport = require('../config/passport');
const auth = require('../config/auth');
const access = require('../controllers/access');


router.post('/signin', access.signIn);
router.post('/login', passport.authenticate('local'), access.login);
router.post('/editUser', auth, access.editUser);
router.get('/logout', access.logout);

module.exports = router;