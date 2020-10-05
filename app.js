const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
// const passport = require('passport');
// const sanitizeHtml = require('sanitize-html');
const helmet = require('helmet');
const hpp = require('hpp');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const pageRouter = require('./routes/page');

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || "6379"}`,
    password : process.env.REDIS_PASSWORD || "foobared"
});
const sessionOption = {
    resave: false,
    secret: process.env.COOKIE_SECRET || "cookiesecret",
    cookie: {
        httpOnly: true,
        secure: false
    },
    store: new RedisStore({ client: redisClient })
}

const app = express();
app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true
});

if(process.env.NODE_ENV === "production") {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
    sessionOption.proxy = true;
    // sessionOption.cookie.secure = true;  https 적용시
} else {
    app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || "cookiesecret"));
app.use(session(sessionOption));

app.use('/', pageRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    req.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});