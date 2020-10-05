const express = require('express');
const csrf = require('csurf');

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

router.use((req, res, next) => {
    res.locals.user = null;
    next();
});

router.get('/join', csrfProtection, (req, res) => {
    res.render('join', {
        title: '회원가입 - AWS CBT',
        csrfToken: req.csrfToken()
    });
});

router.get('/', (Req, res, next) => {
    const recent = [];
    res.render('main', {
        title: 'AWS CBT',
        recent
    });
});

module.exports = router;