import {useState} from "react";
import {PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import './PaymentForm.css'

function PaymentForm({data}) {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-completed`,
                receipt_email: email,
                // defaultShippingDetails: addressDetails,
            }
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error has occurred");
        }

        setIsProcessing(false);
    }

    return (
        <div className="payment-form">
            <form id="payment-form" onSubmit={handleSubmit}>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                />
                <PaymentElement id="payment-element" />
                <div>
                    <p>Total: ${data}</p>
                </div>
                <button disabled={isProcessing || !stripe || !elements} id="submit">
                    <span id="payment-button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
            <div id="dpm-annotation">
                <p>
                    Payment methods are dynamically displayed based on customer location, order amount, and
                    currency.&nbsp;
                </p>
            </div>
        </div>
    )
}

export default PaymentForm