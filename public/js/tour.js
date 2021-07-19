/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alerts';

export const tourCreate = async(startDates, name, duration, maxGroupSize, difficulty, price, summary, description, imageCover, image1, image2, image3) => {

    var data = {

        name,
        duration,
        maxGroupSize,
        difficulty,
        price,
        summary,
        description,
    }

    function transformInToFormObject(data) {
        let formData = new FormData();
        for (let key in data) {
            if (Array.isArray(data[key])) {
                data[key].forEach((obj, index) => {
                    let keyList = Object.keys(obj);
                    keyList.forEach((keyItem) => {
                        let keyName = [key, "[", index, "]", ".", keyItem].join("");
                        formData.append(keyName, obj[keyItem]);
                    });
                });
            } else if (typeof data[key] === "object") {
                for (let innerKey in data[key]) {
                    formData.append(`${key}.${innerKey}`, data[key][innerKey]);
                }
            } else {
                formData.append(key, data[key]);
            }
        }
        return formData;
    }
    var value = transformInToFormObject(data);
    value.append('imageCover', imageCover)
    value.append('images', image1)
    value.append('images', image2)
    value.append('images', image3)

    var appL = (arr, formData) => {
        for (var i = 0; i < arr.length; i++) {
            formData.append('startLocation[]', arr[i]);
        }
    };
    var appG = (arr, formData) => {
        for (var i = 0; i < arr.length; i++) {
            formData.append('guides[]', arr[i]);
        }
    };
    var appl = (arr, formData) => {
        for (var i = 0; i < arr.length; i++) {
            formData.append('startDates[]', arr[i]);
        }
    };
    // appL(startLocation, value);
    // appG(guides, value);
    appl(startDates, value);
    // console.log(value);
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/api/v1/tours/i',
            data: value
                // data: {
                //     startLocation,
                //     startDates,
                //     name,
                //     duration,
                //     maxGroupSize,
                //     difficulty,
                //     guides,
                //     price,
                //     summary,
                //     description,
                //     locations
                // }
        });

        if (res.data.status === 'success') {
            // tour = ;
            showAlert('success', 'Tour created Successfully');
            // console.log("New Tour  ", res.data.data.data)

            // console.log("tour id", tour);
            // // instead, do this:
            // const getI = async() => {
            //     tou = await res.data.data.data.id;
            //     return tou
            // };

            // getI().then(function(tour) {
            //     return tour;
            // });
            // Promise.resolve(tour)
            //     .then(function(v) {
            //         console.log(v);

            //     });
            // return tour;
            window.setTimeout(() => {
                location.assign('/manage-tours')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const tourUpdate = async(tourId, value) => {


    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:8000/api/v1/tours/i/${tourId}`,
            data: value
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Update Done Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/manage-tours')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const tourDelete = async(tourId) => {


    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://127.0.0.1:8000/api/v1/tours/${tourId}`
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Tour Deleted Successfully');
            // console.log(email, password)
            window.setTimeout(() => {
                location.assign('/manage-tours')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};
export const getId = async(name) => {


    try {
        const res = await axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/guide/${name}`
        });

        if (res.data.status === 'success') {
            // showAlert('success', 'Review created Successfully');
            // // console.log(email, password)
            // window.setTimeout(() => {
            //     location.assign('/')
            // }, 1500)
            console.log("Response ", res.data);
            return res.data.data;
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};