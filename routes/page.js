const express = require('express');
const csrf = require('csurf');

const router = express.Router();
// const csrfProtection = csrf({ cookie: true });

router.use((req, res, next) => {
    res.locals.user = null;
    next();
});

router.get('/join', (req, res) => {
    res.render('join', {
        title: '회원가입 - AWS CBT',
        // csrfToken: req.csrfToken()
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: '로그인 - AWS CBT'
    });
});

router.get('/', (req, res, next) => {
    const recent = [];
    res.render('main', {
        title: 'AWS CBT',
        recent
    });
});

module.exports = router;