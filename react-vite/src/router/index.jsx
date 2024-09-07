import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProductDetails from '../components/ProductPage/ProductDetailPage';
import AccountPage from '../components/AccountPage/AccountPageLayout';
import EditProductTiles from '../components/AccountPage/AccountProducts';
import ProductForm from '../components/ProductPage/EditProductPage';
import action from '../components/ProductPage/Action';

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
        path: 'account',
        element: <AccountPage />,
        children: [
          {
            path: '/account/products',
            element: <EditProductTiles />,
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
            element: <ProductForm />,
            // action:
          },
          {
            path: "/account/products/:productId/edit",
            element: <ProductForm />,
            loader: async ({params}) => {
              return fetch(`/api/products/${params.productId}`)
            },
            action:action
          },
        ]
      },
      {
        path: "products/:productId",
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
