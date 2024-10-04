import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

//wrap the app in an element
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51Q5IHr06DYjQMz2DWvJa6nMHt5eamI663YSAuYWuZYT21mVR2LsK8y0FbaVwYlRV8mM3qsFrHgy2Tvx0QPxuptMz00gYjHsKC5');

//Get the secret key from the server to use in the environment wrapper
const secret = await fetch("/api/create-payment-intent", {
        method: "POST",
        body: JSON.stringify({}),
    }).then(async (response) => {
        const { clientSecret } = await response.json();

        return clientSecret ? clientSecret : null;
    })

//set the options object to include the secret key and appearance
const appearance = {
    theme: 'stripe',
};
const options = {
    // passing the client secret obtained from the server
    clientSecret: secret,
    appearance
};

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
        <Elements stripe={stripePromise} options={options} >
            <RouterProvider router={router} />
        </Elements>
    </ReduxProvider>
  </React.StrictMode>
);
