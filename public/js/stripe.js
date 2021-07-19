/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// console.log("at this point");

export const bookTour = async tourId => {
    try {
        // 1) Get checkout session from API
        const stripe = Stripe('pk_test_51J9orFB77MW7oryyKVX2kbd5sQnoMjVy6YNxfez7v8yTEWCdDYW612MLQsoeOEjqtWuvzU32yDkt43RTXLX5657s00Z6OgRu7L')
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        // console.log(session);

        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};