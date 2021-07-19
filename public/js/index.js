/*eslint-disable*/
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { review, deleteReview, updateReview } from './review';
import { register } from './register';
import { tourDelete, tourCreate, tourUpdate, getId } from './tour';
import { userDelete, userCreate, userUpdate } from './users';


//DOM Elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login')
const loginForm2 = document.querySelector('.f1');
const logOutBtn = document.querySelector('.nav__el--logout');
const logOutBtn2 = document.querySelector('.log2');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookButton = document.getElementById('book-tour');
const bookButton2 = document.getElementById('book-tour2');
const reviewForm = document.querySelector('.review-form');
const reviewForm2 = document.querySelector('.form--review');
const registerForm = document.querySelector('.form--register');
const registerForm2 = document.querySelector('.sregister');
const reviewDeleteBtn = document.querySelectorAll('.review-delete');
const reviewDeleteBtn2 = document.getElementById('sreview-delete');
const reviewUpdate = document.getElementById('up');
const tourDeleteBtn = document.querySelectorAll('.tour-delete');
const tourDeleteBtn2 = document.getElementById('stour-delete');
const userDeleteBtn = document.querySelectorAll('.user-delete');
const userDeleteBtn2 = document.getElementById('suser-delete');
const userUpdateForm = document.querySelector('.update-user-form');
const userCreateForm = document.querySelector('.create-user-form');
const tourCreateForm = document.querySelector('.create-tour-form');
const tourUpdateForm = document.querySelector('.update-tour-form');

//VALUES



//DELEGATION
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password)
    })
}
if (loginForm2) {
    loginForm2.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('semail').value;
        const password = document.getElementById('spassword').value;
        login(email, password)
    })
}
if (logOutBtn) {
    logOutBtn.addEventListener('click', logout)
}
if (logOutBtn2) {
    logOutBtn2.addEventListener('click', logout)
}

if (userDataForm) {
    userDataForm.addEventListener('submit', e => {
        e.preventDefault();
        let form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        // console.log(form);

        updateSettings(form,
            'data');
    })
}

if (userPasswordForm) {
    userPasswordForm.addEventListener('submit', e => {
        e.preventDefault();
        (document.getElementById('btn--save-password').innerText = ' Updating...');
        // console.log(document.querySelector('#btn--save-password'))
        const passwordCurrent = document.getElementById('password-current').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('password-confirm').value;
        updateSettings({
            passwordCurrent,
            password,
            passwordConfirm
        }, 'password');


        document.getElementById('password-current').value = '';
        document.getElementById('password').value = '';
        document.getElementById('password-confirm').value = '';
        setTimeout(() => {
            document.getElementById('btn--save-password').innerText = 'Save Password'
        }, 1000);

    })
}
// console.log("at this point");
// console.log(typeof bookTour);
if (bookButton) {

    bookButton.addEventListener('click', e => {
        e.target.innerText = ' Processing...';
        const tourId = e.target.dataset.tourId;
        bookTour(tourId);
        setTimeout(() => {
            e.target.innerText = 'Book Tour'
        }, 1000);
    })
}

if (bookButton2) {
    bookButton2.addEventListener('click', e => {
        e.target.innerText = ' Processing...';
        // console.log("trying")
        const tourId = e.target.dataset.tourId;
        bookTour(tourId);
        setTimeout(() => {
            e.target.innerText = 'Book Tour'
        }, 1000);
    })
}

if (reviewUpdate) {
    if (reviewForm) {
        reviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const reviewI = document.getElementById('review').value;
            const rating = document.getElementById('rating').value;
            const reviewId = document.getElementById('reviewId').value;
            const user = document.getElementById('user').value;
            updateReview(reviewI, rating, reviewId, user);
        })
    }

    if (reviewForm2) {
        reviewForm2.addEventListener('submit', e => {
            e.preventDefault();
            const reviewI = document.getElementById('sreview').value;
            const rating = document.getElementById('srating').value;
            const reviewId = document.getElementById('reviewId').value;
            const user = document.getElementById('suser').value;
            updateReview(reviewI, rating, reviewId, user, );
        })
    }
} else {
    if (reviewForm) {
        reviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const reviewI = document.getElementById('review').value;
            const rating = document.getElementById('rating').value;
            const tour = document.getElementById('tour').value;
            const user = document.getElementById('user').value;
            review(reviewI, rating, tour, user);
        })
    }

    if (reviewForm2) {
        reviewForm2.addEventListener('submit', e => {
            e.preventDefault();
            const reviewI = document.getElementById('sreview').value;
            const rating = document.getElementById('srating').value;
            const tour = document.getElementById('stour').value;
            const user = document.getElementById('suser').value;
            review(reviewI, rating, tour, user);
        })
    }
}
if (registerForm) {
    registerForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        register(name, email, password, passwordConfirm);
    })
}

if (registerForm2) {
    registerForm2.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('sname').value;
        const email = document.getElementById('semail').value;
        const password = document.getElementById('spassword').value;
        const passwordConfirm = document.getElementById('spasswordConfirm').value;
        register(name, email, password, passwordConfirm);
    })
}

if (reviewDeleteBtn) {
    reviewDeleteBtn.forEach(element => {
        element.addEventListener('click', e => {
            e.target.innerText = ' Deleting...';
            const reviewId = e.target.dataset.reviewId;
            deleteReview(reviewId);
            // setTimeout(() => {
            //     e.target.innerText = 'Deleted'
            // }, 1000);
        })
    });
}

if (reviewDeleteBtn2) {
    reviewDeleteBtn2.forEach(element => {
        element.addEventListener('click', e => {
            e.target.innerText = ' Deleting...';
            const reviewId = e.target.dataset.reviewId;
            deleteReview(reviewId);
            // setTimeout(() => {
            //     e.target.innerText = 'Deleted'
            // }, 1000);
        })
    });
}
if (tourDeleteBtn) {
    tourDeleteBtn.forEach(element => {
        element.addEventListener('click', e => {
            e.target.innerText = ' Deleting...';
            const tourId = e.target.dataset.tourId;
            tourDelete(tourId);
            // setTimeout(() => {
            //     e.target.innerText = 'Deleted'
            // }, 1000);
        })
    });
}

if (tourDeleteBtn2) {
    tourDeleteBtn2.forEach(element => {
        element.addEventListener('click', e => {
            e.target.innerText = ' Deleting...';
            const tourId = e.target.dataset.tourId;
            tourDelete(tourId);
            // setTimeout(() => {
            //     e.target.innerText = 'Deleted'
            // }, 1000);
        })
    });
}


if (userDeleteBtn) {
    userDeleteBtn.forEach(element => {
        element.addEventListener('click', e => {
            e.target.innerText = ' Deleting...';
            const userId = e.target.dataset.userId;
            userDelete(userId);
            // setTimeout(() => {
            //     e.target.innerText = 'Deleted'
            // }, 1000);
        })
    });
}

if (userDeleteBtn2) {
    userDeleteBtn2.forEach(element => {
        element.addEventListener('click', e => {
            e.target.innerText = ' Deleting...';
            const userId = e.target.dataset.userId;
            userDelete(userId);
            // setTimeout(() => {
            //     e.target.innerText = 'Deleted'
            // }, 1000);
        })
    });
}
if (userUpdateForm) {
    userUpdateForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const userId = document.getElementById('user').value;
        userUpdate(name, email, role, userId);
    })
}
if (userCreateForm) {
    userCreateForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const userId = document.getElementById('user').value;
        userUpdate(name, email, role, userId);
    })
}
if (tourCreateForm) {
    tourCreateForm.addEventListener('submit', async e => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('maxGroupSize').value;
        const difficulty = document.getElementById('difficulty').value;
        const description = document.getElementById('description').value;
        const summary = document.getElementById('summary').value;
        const price = document.getElementById('price').value;




        // start startDates
        let startDates1 = document.querySelectorAll('.date');
        // console.log(startDates1);
        // startDates1.forEach
        var startDates = new Array();
        startDates1.forEach(el => {
            startDates.push(el.value)
        });
        console.log("Date values", startDates);



        // console.log(startLocation.coordinates);
        var imageCover = document.getElementById('imageCover').files[0]
        console.log(imageCover);
        var image1 = document.getElementById('image1').files[0]
        var image2 = document.getElementById('image2').files[0]
        var image3 = document.getElementById('image3').files[0]
            // console.log(b);
            // form.append('photo', document.getElementById('photo').files[0]);
            // await (tourCreate(startDates, name, duration, maxGroupSize, difficulty, guides, price, summary, description, imageCover, image1, image2, image3, startLocation, locations)).then(tour => {

        // });

        // instead, do this:
        // const callTour = async() => {
        //     var id = await tourCreate(startDates, name, duration, maxGroupSize, difficulty, guides, price, summary, description, imageCover, image1, image2, image3, startLocation, locations)
        // }

        // callTour().then(function(v) {
        //         var valueS = { guides, startLocation, locations };
        //         tourUpdate(v, valueS)
        //     })
        // Promise.resolve(tourCreate(startDates, name, duration, maxGroupSize, difficulty, guides, price, summary, description, imageCover, image1, image2, image3, startLocation, locations))
        //     .then(function(v) {
        //         console.log(v);

        //     });

        // id.then(tourUpdate(id, valueS));
        // var final = await;
        tourCreate(startDates, name, duration, maxGroupSize, difficulty, price, summary, description, imageCover, image1, image2, image3)

    })
}

if (tourUpdateForm) {
    tourUpdateForm.addEventListener('submit', async e => {
        e.preventDefault();
        // const name = document.getElementById('name').value;
        // const email = document.getElementById('email').value;
        // const role = document.getElementById('role').value;
        const tourId = document.getElementById('tour').value;
        // userUpdate(name, email, role, userId);

        // start location
        const descriptionSub = document.getElementById('descriptionSub').value;
        const type = document.getElementById('type').value;
        var coordinates = (document.getElementById('coordinates').value).split(',')
            // const coordinates1 = ((document.getElementById('coordinates').value).split(','));
            // var coordinates = new Array();
        coordinates[0] = Number(coordinates[0]);
        coordinates[1] = Number(coordinates[1]);
        console.log(coordinates)
            // coordinates1.forEach(el => {
            //     coordinates.push(Number(el));
            // });
        const address = document.getElementById('address').value;

        // Guides
        let guides1 = document.querySelectorAll('.gname');
        // guides = guides.map(el => el.value);
        var guides = new Array();
        var i = 0;
        guides1.forEach(async el => {
            var a = (el.value).toLowerCase();
            console.log(el.value, a);
            guides[i] = a;
            ++i;
        });


        // locations
        const descriptionL = document.getElementById('descriptionL').value;
        const typeL = document.getElementById('typeL').value;
        const coordinatesP = (document.getElementById('coordinatesL').value).split(',');
        var coordinatesL = new Array();
        console.log("coordinatesL", coordinatesP);
        coordinatesL[0] = Number(coordinatesP[0]);
        coordinatesL[1] = Number(coordinatesP[1]);
        // const addressL = document.getElementById('addressL').value;
        const dayL = document.getElementById('dayL').value;
        let locations = [{
            "description": descriptionL,
            "type": typeL,
            "coordinates": coordinatesL,
            "day": dayL
        }]

        console.log(coordinatesL);
        let startLocation = {
            "description": descriptionSub,
            "type": type,
            "coordinates": coordinates,
            "address": address
        }


        console.log("Content of guides", guides)
        var valueS = {
            guides: guides,
            startLocation,
            locations
        };
        //         tourUpdate(v, valueS)
        tourUpdate(tourId, valueS);
    })
}