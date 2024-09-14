import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink to="/" className={'home-link'}></NavLink>
        </li>
        <li>
          <ProfileButton />
        </li>
      </ul>
    </div>

  );
}

export default Navigation;
