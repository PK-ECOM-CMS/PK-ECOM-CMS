import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { CustomInputField } from "../customInputfields/CustomInputField";
export const ResetPasswordForm = ({ handleOnPasswordUpdate }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    const { password } = form;
    if (name === "confirmPassword") {
      if (!password) {
        setError("Please provide the password first!");
      } else if (password.length < 6) {
        setError("Password must be minimum 6 character long!");
      } else if (!/[A-Z]/.test(password)) {
        setError("Password must contain minimum of 1 uppercase!");
      } else if (!/[a-z]/.test(password)) {
        setError("Password must contain minimum of 1 lowercase!");
      } else if (!/[0-9]/.test(password)) {
        setError("Password must contain minimum of 1 number!");
      } else if (!password.includes(value)) {
        setError("Password and confirm password should match!");
      } else {
        setError("");
      }
    }
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return alert(
        "Password and confirm password didn't match! It is  not matching either at the beginning or at the end."
      );
    }
    if (!window.confirm("Are you sure you want to update the password?")) {
      return;
    }
    const { confirmPassword, ...rest } = form;
    handleOnPasswordUpdate(rest);
  };
  return (
    <div className="form">
      <h2>Reset Password</h2>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        <CustomInputField
          label="OTP"
          name="otp"
          required={true}
          type="text"
          placeholder="034730"
          onChange={handleOnChange}
        ></CustomInputField>
        <CustomInputField
          label="Password"
          name="password"
          required={true}
          type="text"
          placeholder="**********"
          onChange={handleOnChange}
        ></CustomInputField>
        <Form.Group className="py-3">
          <Form.Text>
            Password should be minimum 6 characters long with at least one
            lowercase, one uppercase and a number.
          </Form.Text>
        </Form.Group>
        <CustomInputField
          label="Confirm Password"
          name="confirmPassword"
          required={true}
          type="text"
          placeholder="**********"
          onChange={handleOnChange}
        ></CustomInputField>
        <Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form.Group>
        <Button variant="warning" type="submit" disabled={error}>
          Update Password
        </Button>
        <div className="text-end"><a href="/reset-password">Request OTP</a></div>
      </Form>
    </div>
  );
};
