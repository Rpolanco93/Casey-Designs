import {Link, NavLink, useRouteLoaderData} from "react-router-dom";
import "./Navigation.css";
import {MdOutlineLocalGroceryStore} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem.jsx";
import LoginFormModal from "../LoginFormModal/index.js";
import SignupFormModal from "../SignupFormModal/index.js";
import {thunkLogin, thunkLogout} from "../../redux/session.js";
import {useState} from "react";
import {useModal} from "../../context/Modal.jsx";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const cart = useRouteLoaderData("cart");

  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeModal();
  };

  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className={'home-link'}></NavLink>
        </li>
        {user ?
            <li className={"user-menu-items"}>
              <div className='user-cart'>
                <div className="cart-icon-container">
                  <NavLink to="/cart" className="shopping-cart"><MdOutlineLocalGroceryStore/></NavLink>
                  {user && cart && <span className="cart-counter">{cart.length}</span>}
                </div>
              </div>
              <div className={"user-menu-items"}>
                <Link to={'/account/products'}>
                  My Account
                </Link>
              </div>
              <div className={"user-menu-items"}>
                <button className="login-signup-button" onClick={logout}>Log Out</button>
              </div>
            </li> :
            <li className={"user-menu-items"}>
              <div className={"user-menu-items"}>
                <OpenModalMenuItem
                    itemText="Log In"
                    className="login-signup-button"
                    modalComponent={<LoginFormModal/>}
                  />
                </div>
                <div className={"user-menu-items"}>
                  <button className="signup">
                    <OpenModalMenuItem
                        itemText="Sign Up"
                        className="login-signup-button"
                        modalComponent={<SignupFormModal/>}
                    />
                  </button>
                </div>
              </li>
        }
      </ul>
    </div>
  )
}

export default Navigation;
