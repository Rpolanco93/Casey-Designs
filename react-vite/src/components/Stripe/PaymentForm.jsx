import {useEffect, useState} from "react";

function PaymentForm() {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

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

            console.log(clientSecret)
        })
    }, []);

    return (
        <div className="payment-form">
            <h2>Payment Form</h2>
        </div>
    )
}

export default PaymentForm