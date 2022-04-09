import { useContext } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";

import { AuthContext } from "../auth/AuthContext";

export const NavBar = () => {
  const { auth, logout } = useContext(AuthContext);

  const history = Navigate();

  const handleLogout = () => {
    history.replace("/login");

    logout();
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-md navigation-clean-button">
        <div className="container">
          <Link className="navbar-brand text-white" to="/">
            Users App
          </Link>
          <button
            data-bs-toggle="collapse"
            className="navbar-toggler"
            data-bs-target="#navcol-1"
          >
            <span className="visually-hidden">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-item nav-link"
                  exact
                  to="/home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  activeClassName="active"
                  className="nav-item nav-link"
                  exact
                  to="/secret"
                >
                  Secret
                </NavLink>
              </li>
            </ul>
            <span className="navbar-text actions">
              {" "}
              <a
                className="login"
                href="/"
                style={{ color: "rgb(255,255,255)" }}
              >
                {auth.name}
              </a>
              <button
                className="btn btn-light action-button"
                onClick={handleLogout}
                style={{ background: "rgb(127,127,127)" }}
              >
                Log Out
              </button>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};
