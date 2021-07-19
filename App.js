/* eslint-disable */
const path = require('path')
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');
const reviewRouter = require('./Routes/reviewRoutes');
const bookingsRouter = require('./Routes/bookingsRoutes');
const viewRouter = require('./Routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/// 1)Middlewares
//Serving static files
app.use(express.static(path.join(__dirname, 'public')));
//Set Security HTTP HEADERS
app.use((req, res, next) => {
    // res.setHeader(
    //     'Report-To',
    //     '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"http://127.0.0.1:5500/__cspreport__"}],"include_subdomains":true}'
    // );
    // res.setHeader(
    //     'Content-Security-Policy',
    //     "script-src-attr 'self' https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js ;"
    // );
    next()
});
// app.use(helmet())
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "script-src": ['http://127.0.0.1:8000/', 'https://checkout.stripe.com/checkout.js', 'https://js.stripe.com/v3/', "'unsafe-inline'", "'unsafe-eval'", 'https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js', 'http://127.0.0.1:8000/js/login.js', 'http://127.0.0.1:8000/js/mapbox.js', 'https://api.mapbox.com/mapbox-gl-js/v2.1.1/', ],
            "script-src-attr": ["'unsafe-inline'"],
            "default-src": ['ws://127.0.0.1:35591/', 'http://127.0.0.1:8000/api/v1/bookings/checkout-session/', "'unsafe-inline'", 'https://js.stripe.com/']
        },
        reportOnly: true,
    }));
// app.use(
//     helmet.contentSecurityPolicy({
//         useDefaults: true,
//         directives: {
//             "default-src": ["'none'"],
//             "script-src": ["'unsafe-inline'", "'unsafe-eval'"],
//             "script-src-attr": ["'self'"],

//         },
//     }));
//Development Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//LIMIT requests from one particular api
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);


//Body Parser, reading data from body into req.body 
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '10kb'
}));
app.use(cookieParser())

//Data Sanitization against NoSQL query injection
app.use(mongoSanitize())

//Data Sanitization against XSS 
app.use(xss());

//prevent parameter pollution 
app.use(hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}))


//Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.cookies)
    next();
})




///2)ROUTE HANDLERS




// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.get('/api/v1/tours/:id', getTour);

/// 3)ROUTES



app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingsRouter)

// app.all('*', (req, res, next) => {
//     // res.status(404).json({
//     //     status: "fail",
//     //     message: `Can't find ${req.originalUrl} on this server`
//     // })

//     // const err = new Error(`Can't find ${req.originalUrl} on this server`);
//     // err.status = "fail";
//     // err.statusCode = 404;

//     next(new AppError(`Can't find ${req.originalUrl} on this server`));
// })

app.use(globalErrorHandler);
///4) START SERVER


module.exports = app;