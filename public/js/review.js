/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const review = async(review, rating, tour, user) => {


    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/v1/reviews',
            data: {
                review,
                rating,
                tour,
                user
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Review created Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const deleteReview = async(reviewId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/v1/reviews/${reviewId}`,
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Review Deleted Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/my-reviews')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const updateReview = async(review, rating, reviewId, user) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8000/api/v1/reviews/${reviewId}`,
            data: {
                review,
                rating,
                user
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Review updated Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/my-reviews')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};