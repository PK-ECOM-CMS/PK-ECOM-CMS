import React, { useEffect } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAdminUserAction,
  fetchAdminUsersAction,
} from "../admin-login/userAction";

const AdminUsers = () => {
  const { adminUsers, user } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminUsersAction());
  }, [dispatch]);
  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete the admin user?")) {
      dispatch(deleteAdminUserAction(_id));
    }
  };
  return (
    <AdminLayout>
      <Container className="p-3">
        <div className="text-end">
          <Link to="/register">
            <Button variant="warning">Add new admin user </Button>
          </Link>
        </div>
        <div className="table-responsive">
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td
                    className={
                      item.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status}
                  </td>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Button
                      variant="danger"
                      disabled={item._id === user._id}
                      onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </AdminLayout>
  );
};

export default AdminUsers;
