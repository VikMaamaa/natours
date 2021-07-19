/* eslint-disable */
const express = require('express');
const viewController = require('../controllers/viewsController')
const authController = require('../controllers/authController')
const bookingsController = require('../controllers/bookingsController');
const tourController = require('../controllers/tourController');
const userController = require('../controllers/userController');

const router = express.Router();

// router.use()
router.get('/', bookingsController.createBookingCheckout, authController.isLoggedIn, viewController.getOverview);
router.get('/tour', authController.isLoggedIn, viewController.getTour);
router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour)
router.get('/login', authController.isLoggedIn, viewController.getLoginForm)
router.get('/me', authController.protect, viewController.getAccount)
router.get('/my-tours', authController.protect, viewController.getMyTours)
router.get('/review/:slug', authController.isLoggedIn, authController.protect, authController.restrictTo('user'), viewController.getReviewForm);
router.get('/signup', authController.isLoggedIn, viewController.getSignUpForm)
router.post('/submit-user-data', authController.protect, viewController.updateUserData)
router.get('/my-reviews', authController.protect, viewController.getMyReviews)
router.get('/update-review/:slug/:id', authController.isLoggedIn, authController.protect, authController.restrictTo('user'), viewController.getUpdateReviewForm)
router.get('/manage-reviews', authController.isLoggedIn, authController.protect, authController.restrictTo('admin'), viewController.getAllReviews)
router.get('/manage-tours', authController.isLoggedIn, authController.protect, authController.restrictTo('admin', 'lead-guide'), viewController.getAllTours)
router.get('/manage-bookings', authController.isLoggedIn, authController.protect, authController.restrictTo('admin'), viewController.getAllBookings)
router.get('/manage-users', authController.isLoggedIn, authController.protect, authController.restrictTo('admin'), viewController.getAllUsers)
router.get('/update-user/:id', authController.isLoggedIn, authController.protect, authController.restrictTo('admin'), viewController.getUserUpdateForm)
router.get('/create-tour', authController.isLoggedIn, authController.protect, authController.restrictTo('admin', 'lead-guide'), viewController.getTourCreateForm)
router.get('/guide/:name', authController.isLoggedIn, authController.protect, authController.restrictTo('admin', 'lead-guide'), userController.getGuide);
router.get('/update-tour/:slug/:id', authController.isLoggedIn, authController.protect, authController.restrictTo('admin', 'lead-guide'), viewController.getUpdateTourForm);
module.exports = router;