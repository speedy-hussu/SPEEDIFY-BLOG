import { LogoutBtn } from "../index";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../logo/Logo";
import "./Header.css";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-post",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="header">
      <div className="logo-div">
        <Logo />
      </div>
      <ul
        className={`links ${
          authStatus ? "login-links" : "without-login-links"
        }`}
      >
        {navItems.map((item) =>
          item.active ? (
            <li key={item.slug}>
              <NavLink
                to={item.slug}
                className={({ isActive }) => {
                  return `NavLink ${isActive ? "active" : ""}`;
                }}
              >
                {item.name}
              </NavLink>
            </li>
          ) : null
        )}
      </ul>
      {authStatus && (
        <div className="logout-btn-div">
          <LogoutBtn />
        </div>
      )}
    </header>
  );
}

export default Header;
