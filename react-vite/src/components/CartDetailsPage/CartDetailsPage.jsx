import {Await, Link, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {PacmanLoader} from "react-spinners";
import PaymentForm from "../Stripe/PaymentForm.jsx";

function CartDetailPage() {
    const data = useLoaderData();
    return (
        <div className='shopping-cart-page'>
            <Suspense fallback={<PacmanLoader/>}>
                <Await
                    resolve={data.items}
                >
                    {
                        items => (
                            <div className="cart-detail-page">
                                <h1>Shopping Cart</h1>
                                <div>
                                    {items.map(item => (
                                        <div className="my-product-tile" key={item.product_id}>
                                            {/*<img src={item.product.previewImage} className="my-product-images"/>*/}
                                            <Link to={`/products/${item.product.id}`}>
                                                <h3 className="my-product-name-sc">{item.product.name}</h3>
                                            </Link>
                                            <p>Price: {item.price}</p>
                                        </div>
                                    ))}
                                </div>
                                <PaymentForm />
                            </div>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}

export default CartDetailPage;
