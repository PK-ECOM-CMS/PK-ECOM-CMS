import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInputField } from "../../components/customInputfields/CustomInputField";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { useDispatch } from "react-redux";
import { postUser } from "../../helpers/axiosHelper";
const AdminRegistrationPage = () => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    if (name === "email") {
      value = value.toLowerCase();
      setForm({ ...form, [name]: value });
    }
    setForm({ ...form, [name]: value });
    const { password } = form;
    if (name === "confirmPassword") {
      if (!password) {
        setError("Please fill up the password first!");
      } else if (password.length < 6) {
        setError("Password must be minimum of 6 characters long!");
      } else if (!/[A-Z]/.test(password)) {
        setError("Password must contain minimum of 1 capital letter!");
      } else if (!/[a-z]/.test(password)) {
        setError("Password must contain minimum of 1 small letter!");
      } else if (!/[0-9]/.test(password)) {
        setError("Password must contain minimum of 1 number!");
      } else if (!password.includes(value)) {
        setError("Password and confirm password must match!");
      } else {
        setError("");
      }
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("password do not match");
    }
    const result = await postUser(rest);
    setResponse(result);
    console.log(response);
  };
  const fields = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Pradeep",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Dhital",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Pradeepdhital22@gmail.com",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "0451644397",
      required: true,
    },
    {
      label: "DOB",
      name: "dob",
      type: "date",
      placeholder: "dd/mm/yy",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      placeholder: "1-3 Clarence Street Strathfield",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "********",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "********",
      required: true,
    },
  ];
  return (
    <div>
      <AdminLayout>
        <Container className="page-main">
          <div className="form">
            <Form onSubmit={handleOnSubmit}>
              <h1>New admin registration</h1>
              {response.message && (
                <Alert
                  variant={response.status === "success" ? "success" : "danger"}
                >
                  {response.message}
                </Alert>
              )}
              {fields.map((item, i) => (
                <CustomInputField
                  key={i}
                  {...item}
                  onChange={handleOnChange}
                ></CustomInputField>
              ))}
              {error && <Alert variant="danger">{error}</Alert>}
              <Button type="submit" disabled={error}>
                Submit
              </Button>
              <div className="text-end">
                <Link to="/admin-users">
                  <Button variant="none">&lt; Back</Button>
                </Link>
              </div>
            </Form>
          </div>
        </Container>
      </AdminLayout>
    </div>
  );
};

export default AdminRegistrationPage;
