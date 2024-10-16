import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import {PacmanLoader} from "react-spinners";
import PaymentForm from "../Stripe/PaymentForm.jsx";
import {useSelector} from "react-redux";
import CartItem from "../CartItem/CartItem.jsx";
import './Cart.css'
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

function CartDetailPage() {
    const data = useLoaderData();
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.session.user)

    const [stripePromise] = useState(loadStripe('pk_test_51Q5IHr06DYjQMz2DWvJa6nMHt5eamI663YSAuYWuZYT21mVR2LsK8y0FbaVwYlRV8mM3qsFrHgy2Tvx0QPxuptMz00gYjHsKC5')
    );
    const [stripeIntent] = useState(
        fetch("/api/create-payment-intent", {
            method: "POST",
            body: JSON.stringify({}),
        }).then((response) => response.json())
    );


    // check that user is logged in
    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
    }, [currentUser, navigate])

    //calculates the total for all items in the cart
    const getTotal = (cartItems) => {
        let total = 0;
        cartItems.forEach(item => {
            let price = item.quantity * item.price;
            total += price
        })
        //lookup tofix
        return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='shopping-cart-page'>
            <Suspense fallback={<PacmanLoader/>}>
                <Await
                    resolve={data.items}
                >
                    {
                        items => (
                            <div className="cart-detail-page">
                                <h1>{items.length} item(s) in your cart</h1>
                                <div>
                                    {items.length ? items.map((item, key) => (
                                        <CartItem key={key} data={item}/>
                                    )) : <h2>No Items in Cart</h2>}
                                </div>
                                <div className='cart-info'>
                                    <h3 style={{fontSize: "20px"}}>Total: ${getTotal(items)}</h3>
                                    <p>Before taxes and fees.</p>
                                </div>
                                <Suspense fallback={<PacmanLoader/>}>
                                    <Await
                                        resolve={stripeIntent}
                                    >
                                        {
                                            intent => {
                                                const appearance = {
                                                    theme: 'stripe',
                                                };
                                                const options = {
                                                    // passing the client secret obtained from the server
                                                    clientSecret: intent.clientSecret,
                                                    appearance
                                                }
                                                return (
                                                    <Elements stripe={stripePromise} options={options}>
                                                        <PaymentForm data={getTotal(items)}/>
                                                    </Elements>
                                                )
                                            }
                                        }
                                    </Await>
                                </Suspense>
                            </div>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}

export default CartDetailPage;
