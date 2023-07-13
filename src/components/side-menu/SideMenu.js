import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { setShowSidemenu } from "../../pages/system-state/systemSlice";
import { Link } from "react-router-dom";
export const SideMenu = () => {
  const { showSideMenu } = useSelector((state) => state.system);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setShowSidemenu(false));
  return (
    <div>
      <Offcanvas show={showSideMenu} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PK-ECOM CMS</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <ListGroup variant="flush" className="fs-5">
            <ListGroup.Item>
              <Link onClick={handleClose} to="/dashboard" className="nav-link">
                <i className="fa-solid fa-gauge"></i> Dashboard
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/categories" className="nav-link">
                <i className="fa-solid fa-list"></i> Categories
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/products" className="nav-link">
                <i className="fa-solid fa-box"> </i> Products
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/items" className="nav-link">
                <i class="fa-brands fa-shopify"></i> Items
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                onClick={handleClose}
                to="/paymentmethods"
                className="nav-link"
              >
                <i className="fa-solid fa-credit-card"></i> Payment Methods
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/orders" className="nav-link">
                <i className="fa-solid fa-table"></i> Orders
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/reviews" className="nav-link">
                <i className="fa-solid fa-star"></i> Reviews
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/users" className="nav-link">
                <i className="fa-solid fa-users"></i> Users
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link onClick={handleClose} to="/settings" className="nav-link">
                <i className="fa-solid fa-gears"></i> Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link
                onClick={handleClose}
                to="/admin-users"
                className="nav-link"
              >
                <i className="fa-solid fa-users"></i> Admin Users
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
