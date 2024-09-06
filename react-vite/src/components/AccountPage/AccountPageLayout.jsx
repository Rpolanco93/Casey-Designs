import { NavLink, Outlet } from "react-router-dom";

function AccountPage() {

    return (
        <>
            <div className="link-container">
                <NavLink to={'/account/products'} className="my-products">
                    <h3>Edit Products</h3>
                </NavLink>
                <NavLink to={'/account/categories'} className="categories">
                    <h3>Edit Categories</h3>
                </NavLink>
                <NavLink to={'/account/orders'} className="orders">
                    <h3>View Orders</h3>
                </NavLink>
                <div className="logout">
                    <h3>Logout</h3>
                </div>
            </div>
            <Outlet  className='account-outlet'/>
        </>
    );
}

export default AccountPage;
