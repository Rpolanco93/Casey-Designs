import { createBrowserRouter, json } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProductDetails from '../components/ProductPage/ProductDetailPage';
import { productDetailsLoader } from '../components/loaders';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    id: 'root',
    loader: () => {
      return fetch('/api/products')
    },
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
        loader: async ({params}) => {
          return await Promise.all([
              (await fetch(`/api/products/${params.productId}`)).json(),
              (await fetch(`/api/products/${params.productId}/reviews`)).json()
          ])
        }
      },
    ],
  },
]);
