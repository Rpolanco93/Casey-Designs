// import os from "os";
// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import {Route, Router, Routes} from "react-router-dom";
//
// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe(os.environ.get('STRIPE_PUBLISHABLE_KEY'));
//
// function StripeCheckout() {
//     const [clientSecret, setClientSecret] = useState("");
//     const [dpmCheckerLink, setDpmCheckerLink] = useState("");
//
//     useEffect(() => {
//         // Create PaymentIntent as soon as the page loads
//         fetch("/create-payment-intent", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 setClientSecret(data.clientSecret);
//                 // [DEV] For demo purposes only
//                 setDpmCheckerLink(data.dpmCheckerLink);
//             });
//     }, []);
//
//     const appearance = {
//         theme: 'stripe',
//     };
//     const options = {
//         clientSecret,
//         appearance,
//     };
//
//     return (
//         <Router>
//             <div className="App">
//                 {clientSecret && (
//                     <Elements options={options} stripe={stripePromise}>
//                         <Routes>
//                             {/*<Route path="/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink}/>} />*/}
//                             <Route path="/complete" element={<h1>Completed Successfully</h1>} />
//                         </Routes>
//                     </Elements>
//                 )}
//             </div>
//         </Router>
//     );
// }
// export default StripeCheckout;