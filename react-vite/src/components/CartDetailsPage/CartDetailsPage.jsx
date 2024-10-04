import {Await, Link, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useEffect} from "react";
import {PacmanLoader} from "react-spinners";
import PaymentForm from "../Stripe/PaymentForm.jsx";
import {useSelector} from "react-redux";
import CartItem from "../CartItem/CartItem.jsx";
import './Cart.css'

function CartDetailPage() {
    const data = useLoaderData();
    const navigate = useNavigate()
    const currentUser = useSelector(state => state.session.user)

    // check that user is logged in
    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
    }, [currentUser])

    //calculates the total for all items in the cart
    const getTotal = (cartItems) => {
        let total = 0;
        cartItems.forEach(item => {
            let price = item.quantity * item.price;
            total+= price
        })
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
                                <PaymentForm data={getTotal(items)} />
                            </div>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}

export default CartDetailPage;
