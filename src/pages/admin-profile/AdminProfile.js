import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { CustomInputField } from "../../components/customInputfields/CustomInputField";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminPasswordAction,
  updateAdminProfileAction,
} from "../admin-login/userAction";

const AdminProfile = () => {
  const [form, setForm] = useState({});
  const [password, setPassword] = useState({});
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const inputFields = [
    {
      label: "First Name",
      name: "firstName",
      value: form.firstName,
      type: "text",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      value: form.lastName,
      type: "text",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      value: form.email,
      type: "email",
      required: true,
      disabled: true,
    },
    {
      label: "Phone",
      name: "phone",
      value: form.phone,
      type: "number",
      required: true,
    },
    {
      label: "Date of Birth",
      name: "dob",
      value: form.dob ? form.dob.slice(0, 10) : "",
      type: "date",
    },
    {
      label: "Address",
      name: "address",
      value: form.address,
      type: "text",
    },
  ];
  useEffect(() => {
    user?._id && setForm(user);
  }, [user]);
  const handleOnProfileUpdate = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnProfileSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, dob, address, _id } = form;
    dispatch(
      updateAdminProfileAction({
        firstName,
        lastName,
        phone,
        dob,
        address,
        _id,
      })
    );
  };
  const handleOnPasswordUpdate = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
    const { newPassword } = password;
    if (name === "confirmPassword") {
      if (!newPassword) {
        setError("Fill up the New password field first");
      } else if (newPassword?.length < 6) {
        setError("The password should be minimum 6 character long");
      } else if (!/[a-z]/.test(newPassword)) {
        setError("the password must have at least one lower case character");
      } else if (!/[A-Z]/.test(newPassword)) {
        setError("the password must have at least one upper case character");
      } else if (!/[0-9]/.test(newPassword)) {
        setError("The password must have at least one number");
      } else if (!newPassword.includes(value)) {
        setError("Password and confirm password should match");
      } else {
        setError("");
      }
    }
  };
  const handleOnPasswordSubmit = (e) => {
    e.preventDefault();
    const { originalPassword, newPassword, confirmPassword } = password;
    if (!originalPassword) {
      window.alert("Please provide the original password");
      return;
    }
    if (newPassword !== confirmPassword) {
      window.alert("passwords donot match");
      return;
    }
    if (!window.confirm("Are you sure you want to update your password?")) {
      return;
    }
    updateAdminPasswordAction({
      originalPassword,
      newPassword,
      _id: user._id,
    });
  };

  return (
    <AdminLayout>
      <div className="user-profile">
        <h2>Update Profile</h2>
        <Form onSubmit={handleOnProfileSubmit}>
          {inputFields.map((input, i) => (
            <CustomInputField
              key={i}
              {...input}
              onChange={handleOnProfileUpdate}
            />
          ))}
          <Button type="submit" variant="warning">
            Update profile
          </Button>
        </Form>
        <hr></hr>

        <Form onSubmit={handleOnPasswordSubmit} className="my-5">
          <h2 className="mt-5">Update Password</h2>
          <hr></hr>
          <CustomInputField
            required="true"
            type="password"
            label="Current Password"
            name="originalPassword"
            onChange={handleOnPasswordUpdate}
          ></CustomInputField>
          <CustomInputField
            required="true"
            type="password"
            label="New Password"
            name="newPassword"
            onChange={handleOnPasswordUpdate}
          ></CustomInputField>

          <Form.Group className="mb-3">
            <Form.Text>
              Password must contain lowercase, uppercase , number and minimum 6
              characters.
            </Form.Text>
          </Form.Group>
          <CustomInputField
            required="true"
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleOnPasswordUpdate}
          ></CustomInputField>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button type="submit" variant="danger" disabled={error}>
            Update Password
          </Button>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
