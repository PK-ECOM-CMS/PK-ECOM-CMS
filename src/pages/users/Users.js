import React, { useEffect } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAction } from "./usersAction";

const Users = () => {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [dispatch]);
  return (
    <AdminLayout>
      <h3>Users Management</h3>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                {item.firstName} {item.lastName}
              </td>
                  <td>{ item.email}</td>
                  <td>{item.phone}</td>
              <td>
                <Button variant="link">info</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Users;
