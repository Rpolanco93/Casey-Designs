import {useEffect, useState} from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const [message, setMessage] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetch("/api/config").then(
            async (response) => {
                const { publishableKey } = await response.json();

                setStripePromise(publishableKey);
            })
    }, [])

    useEffect(() => {
        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then(async (response) => {
            const { clientSecret } = await response.json();

            setClientSecret(clientSecret);
        })
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-completed`,
            }
        });

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
                <PaymentElement id="payment-element" />
                <button disabled={isProcessing || !stripe || !elements} id="submit">
                    <span id="payment-button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    )
}

export default PaymentForm