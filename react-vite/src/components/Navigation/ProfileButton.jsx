import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FaUserCircle} from 'react-icons/fa';
import {thunkLogin, thunkLogout} from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import {Link} from "react-router-dom";
import './Navigation.css'

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    const handleDemo = async (e) => {
        e.preventDefault();

        const email = 'demo@aa.io';
        const password = 'password';

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            console.log(serverResponse)
        } else {
            closeMenu();
        }
    };

    return (
        <div className="profile-menu-container">
            <button onClick={toggleMenu} className={"user-circle"}>
                <FaUserCircle/>
            </button>
            {showMenu && (
                <ul className={"profile-dropdown"} ref={ulRef}>
                    {user ? (
                        <>
                            {/* <li className={"user-menu-items"} >{user.username}</li>
              <li className={"user-menu-items"} >{user.email}</li> */}
                            <li className={"user-menu-items"}>
                                <Link to={'/account/products'} onClick={closeMenu}>
                                    My Account
                                </Link>
                            </li>
                            <li className={"user-menu-items"}>
                                <button className="login-signup-button" onClick={logout}>Log Out</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className={"user-menu-items"}>
                                <OpenModalMenuItem
                                    itemText="Log In"
                                    onItemClick={closeMenu}
                                    className="login-signup-button"
                                    modalComponent={<LoginFormModal/>}
                                />
                            </li>
                            <li className={"user-menu-items"}>
                                <OpenModalMenuItem
                                    itemText="Sign Up"
                                    onItemClick={closeMenu}
                                    className="login-signup-button"
                                    modalComponent={<SignupFormModal/>}
                                />
                            </li>
                            <li className="user-menu-items">
                                <button className="login-signup-button" onClick={handleDemo}>Demo User</button>
                            </li>
                        </>
                    )}
                </ul>
            )}
        </div>
    );
}

export default ProfileButton;
