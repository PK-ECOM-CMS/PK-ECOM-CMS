import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import pklogo from "./../../../src/assits/images/logo/pk.png";
import { setShowSidemenu } from "../../pages/system-state/systemSlice";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../pages/admin-login/userAction";
export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShow = () => dispatch(setShowSidemenu(true));
  const { user } = useSelector((state) => state.admin);
  const handleOnLogout = () => {
    dispatch(logoutUserAction({}));
    navigate("/");
  };
  return (
    <Navbar variant="dark" expand="md" className="header">
      <Container>
        {user._id && <i onClick={handleShow} className="fa-solid fa-bars"></i>}
        <Navbar.Brand>
          <img src={pklogo} className="pk_logo" alt="pk-ecom-logo"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user._id ? (
              <>
                <Link className="nav-link" to="/admin-profile">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <Link className="nav-link" onClick={handleOnLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
