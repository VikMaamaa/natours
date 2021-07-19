/* eslint-disable */
const express = require('express');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');


const catchAsync = require('../utils/catchAsync');
const app = express();
exports.getOverview = catchAsync(async(req, res, next) => {
    //1)Get Tour data from collection
    const tours = await Tour.find();
    //2)Build Template
    //3)Render the template using data from step1
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    })
})

exports.getTour = async(req, res, next) => {
    //1) Get the data requested tour (including reviews and guides)
    const tour = await Tour.findOne({
        slug: req.params.slug
    }).populate({
        path: 'reviews',
        fields: 'review rating user'
    })

    if (!tour) {
        return next(new AppError('There is no tour with that name', 404))
    }
    //2) Build template



    //A) Find all bookings
    // console.log("Try here")
    // console.log(typeof res.locals.user);
    // console.log(tour.slug)
    let soldOut = false;
    const bookingSold = await Booking.find({ tour: tour.id });
    // console.log(bookingSold.length);
    if (bookingSold.length >= tour.maxGroupSize) {
        soldOut = true
    }
    // console.log(bookingSold);
    let tourC = false;
    if (typeof res.locals.user === 'undefined') {
        tourC = false;
    } else {
        const bookings = await Booking.find({ user: res.locals.user._id })
            //B) Find tours with the return  IDs
        let tourIDs = bookings.map(el => el.tour._id);
        tourC = tourIDs.filter(n => n == tour.id)
        if (tourC.length > 0) {
            tourC = true
        } else {
            tourC = false;
        }
    }


    //3)Render template using data from step1
    res.status(200).render('tour', {
        title: `${tour.name} Tour`,
        tour,
        tourC,
        soldOut
    })
}

exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: 'Log into your Account'
    })
}

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account '
    });
}

exports.updateUserData = catchAsync(async(req, res, next) => {
    console.log(req.User)
    const updatedUser = await User.findByIdAndUpdate(req.User._id, {
        name: req.body.name,
        email: req.body.email
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).render('account', {
        title: 'Your account',
        user: updatedUser
    });
})

exports.getMyTours = catchAsync(async(req, res, next) => {
    //1) Find all bookings
    const bookings = await Booking.find({ user: req.User.id })
        //2) Find tours with the return  IDs
    const tourIDs = bookings.map(el => el.tour);
    const tours = await Tour.find({ _id: { $in: tourIDs } });

    // const tourCheck = tourIDs.map(el => el.id);
    // // console.log(tourCheck);
    // app.locals.tourC = tourCheck;
    res.status(200).render('overview', {
        title: 'My tours',
        tours,
    });


})

exports.getReviewForm = catchAsync(async(req, res, next) => {
    const tour = await Tour.findOne({
        slug: req.params.slug
    })
    const id = tour.id;
    const cover = tour.imageCover;

    let tourC = false;
    if (typeof res.locals.user === 'undefined') {
        tourC = false;
    } else {
        const bookings = await Booking.find({ user: res.locals.user._id })
            //B) Find tours with the return  IDs
        let tourIDs = bookings.map(el => el.tour._id);
        tourC = tourIDs.filter(n => n == tour.id)
        if (tourC.length > 0) {
            tourC = true
        } else {
            tourC = false;
        }
    }
    // console.log(res.locals.user._id);
    res.status(200).render('review', {
        title: 'Tour Review',
        id,
        cover,
        name: tour.slug,
        tourC
    });
    next()

})

exports.getSignUpForm = (req, res, next) => {

    res.status(200).render('signup', {
        title: 'Register'
    })
    next();
}

exports.getMyReviews = async(req, res, next) => {
    const reviews = await Review.find({ user: res.locals.user._id });
    console.log(reviews);
    // const tourIDs = reviews.map(el => el.tour);
    // const tours = await Tour.find({ _id: { $in: tourIDs } });

    res.status(200).render('myreviews', {
        title: 'My Reviews',
        reviews
    })
    next();
}

exports.getUpdateReviewForm = async(req, res, next) => {
    let name = req.params.slug
    let reviewId = req.params.id;
    const reviews = await Review.findOne({ _id: reviewId });
    let tourC = true,
        update = true;
    let review = reviews.review || "";

    res.status(200).render('review', {
        title: 'Tour Review',
        tourC,
        review,
        name,
        update,
        reviewId
    })
    next();
}

exports.getAllReviews = catchAsync(async(req, res, next) => {

    const reviews = await Review.find();
    // const users = reviews.map(el => el.user)
    // console.log("at this point ");
    res.status(200).render('managereviews', {
        title: 'Manage Reviews',
        reviews
    });
    next();
})

exports.getAllTours = async(req, res, next) => {
    const tours = await Tour.find()
    console.log("This point ");
    res.status(200).render('managetours', {
        title: 'Manage Tours',
        tours
    });
    next();
}

exports.getAllBookings = async(req, res, next) => {
    const bookings = await Booking.find();
    // console.log("This point ", bookings)
    res.status(200).render('managebookings', {
        title: 'Manage Bookings',
        bookings
    })
    next();
}
exports.getAllUsers = async(req, res, next) => {
    const users = await User.find();
    // console.log("This is the point ", users);
    res.status(200).render('manageusers', {
        title: 'Manage Users',
        users
    });
    next()
}
exports.getUserUpdateForm = async(req, res, next) => {
    let userId = req.params.id
    const userG = await User.findOne({ _id: userId });
    console.log('This point ', userG.photo)
    res.status(200).render('updateusers', {
        title: 'Update User',
        userG
    });
    next();
}
exports.getUserCreateForm = async(req, res, next) => {
    res.status(200).render('createusers', {
        title: 'Create User'
    })
    next()
}
exports.getTourCreateForm = async(req, res, next) => {
    res.status(200).render('newtour', {
        title: 'Create Tour'
    })
    next()
};

exports.getGuide = async(req, res, next) => {
    console.log(`${req.body.guides}`);
    var guides = new Array();
    var newUsers;
    var usersId;
    guides = req.body.guides;
    const users = await User.find();
    guides.forEach(namep => {
        namep = (req.params.name).toLowerCase();
        newUsers = users.filter(el => el.name.toLowerCase() == namep);
        usersId.push(newUsers.map(el => el._id));
    });
    console.log("This place ", users)
        // let namep = (req.params.name).toLowerCase();
        // console.log(namep.toLowerCase());
        // newUsers = users.filter(el => el.name.toLowerCase() == namep);
        // var usersId = newUsers.map(el => el._id);
    console.log(usersId);
    req.body.guides = usersId;
    // res.status(200).json({
    //     status: 'success',
    //     data: usersId[0]
    // });

    next();
}
exports.getUpdateTourForm = async(req, res, next) => {
    let tourId = req.params.id
    const tourG = await Tour.findOne({ _id: tourId });
    // console.log('This point ', G.photo)
    res.status(200).render('updatetour', {
        title: 'Update Tour',
        tourG
    });
    next();
}