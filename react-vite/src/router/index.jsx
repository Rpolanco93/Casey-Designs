import {createBrowserRouter, defer, Outlet} from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProductDetails from '../components/ProductPage/ProductDetailPage';
import AccountPage from '../components/AccountPage/AccountPageLayout';
import EditProductTiles from '../components/AccountPage/AccountProducts';
import ProductForm from '../components/ProductPage/ProductForm';
import {productAction, reviewAction} from '../components/ProductPage/Action';
import CartDetailPage from '../components/CartDetailsPage';
import PaymentCompletion from "../components/Stripe/PaymentCompletion.jsx";

export const router = createBrowserRouter([
    {
        element: <Layout/>,
        id: 'root',
        loader: () => {
            return fetch('/api/products')
        },
        children: [
            {
                path: "/",
                element: <LandingPage/>
            },
            {
                path: "login",
                element: <LoginFormPage/>,
            },
            {
                path: "signup",
                element: <SignupFormPage/>,
            },
            {
                path: "cart",
                element: <CartDetailPage/>,
                id: "cart",
                loader: async () => {
                    return defer({
                        items: fetch(`/api/cart`).then(res => res.json())
                    })
                },
            },
            {
                path: "payment-completed",
                element: <PaymentCompletion/>
            },
            {
                path: 'account',
                element: <AccountPage/>,
                children: [
                    {
                        path: '/account/products',
                        element: <EditProductTiles/>,
                        loader: async () => {
                            return fetch('/api/products/current')
                        }
                    },
                    {
                        path: '/account/categories',
                        element: <h2>category details</h2>
                    },
                    {
                        path: '/account/orders',
                        element: <h2>order details</h2>
                    },
                    {
                        path: "/account/products/new",
                        element: <ProductForm/>,
                        action: productAction
                    },
                    {
                        path: "/account/products/:productId/edit",
                        element: <ProductForm/>,
                        loader: async ({params}) => {
                            return fetch(`/api/products/${params.productId}`)
                        },
                        action: productAction
                    },
                ]
            },
            {
                path: "products",
                element: <Outlet/>,
                children: [
                    {
                        path: ":productId",
                        element: <ProductDetails/>,
                        loader: async ({params}) => {
                            return defer({
                                product: await fetch(`/api/products/${params.productId}`)
                                    .then(response => response.json()),
                                reviews: fetch(`/api/products/${params.productId}/reviews`)
                                    .then(response => response.json())
                            });
                        },
                        children: [
                            {
                                path: "review",
                                loader: async ({params}) => {
                                    return fetch(`/api/products/${params.productId}/review`);
                                },
                                action: reviewAction
                            }
                        ]
                    },
                ]
            },
            {
                /*Wildcard catch all redirect back to landing page*/
                path: "*",
                element: <LandingPage/>
            }
        ],
    },
]);
