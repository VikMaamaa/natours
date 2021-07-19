/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const userCreate = async(review, rating, tour, user, userId) => {


    try {
        const res = await axios({
            method: 'POST',
            url: `http://127.0.0.1:8000/api/v1/users/${userId}`,
            data: {
                review,
                rating,
                tour,
                user
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'User created Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/manage-users')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const userUpdate = async(name, email, role, userId) => {


    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8000/api/v1/users/${userId}`,
            data: {
                name,
                email,
                role
            }
        });

        if (res.data.status === 'success') {
            showAlert('success', 'User updated Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/manage-users')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const userDelete = async(userId) => {


    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/v1/users/${userId}`
        });

        if (res.data.status === 'success') {
            showAlert('success', 'User Deleted Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/manage-users')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};