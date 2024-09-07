import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux';
import { thunkLogout } from "../../redux/session";
import './AccountPage.css'

function AccountPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((store) => store.session.user);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate('/')
      };

    const menu = [
        ['products', 'Products'],
        ['categories', 'Categories'],
        ['orders', 'Orders']
    ]

    return user ? (
        <div className="account-page">
            <div className="link-container">
                {menu.map(item => (
                    <Link to={`${item[0]}`} key={item[0]}>
                        <h3>{item[1]}</h3>
                    </Link>
                ))}
                <div className="logout">
                    <div>
                        <button onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    ) : <Navigate to={'/'}></Navigate>
}

export default AccountPage;
