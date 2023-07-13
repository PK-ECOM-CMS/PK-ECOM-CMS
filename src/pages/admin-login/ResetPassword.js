import React, { useState } from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { Alert, Container } from "react-bootstrap";
import { RequestOTP } from "../../components/reset-password/RequestOTP";
import { ResetPasswordForm } from "../../components/reset-password/ResetPasswordForm";
import {
  ResetAdminUserPassword,
  requestOTPResetAdminUserPassword,
} from "../../helpers/axiosHelper";

const ResetPassword = () => {
  const [passwordForm, setPasswordForm] = useState("otp");
  const [response, setResponse] = useState({});
  const [userEmail, setUserEmail] = useState("");
  const handleOnOTPRequest = async (email) => {
    if (!email) {
      return alert("No email received");
    }
    setUserEmail(email);
    const response = await requestOTPResetAdminUserPassword({ email });
    setResponse(response);
    response.status === "success" && setPasswordForm("password");
  };
  const handleOnPasswordUpdate = async (data) => {
    data.email = userEmail;
    const response = await ResetAdminUserPassword(data);
    setResponse(response);
  };

  const form = {
    otp: <RequestOTP handleOnOTPRequest={handleOnOTPRequest}></RequestOTP>,
    password: (
      <ResetPasswordForm handleOnPasswordUpdate={handleOnPasswordUpdate} />
    ),
  };
  return (
    <div>
      <Header />
      <Container className="page-main my-3">
        {response?.message && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}

        <div className="pass-forms">{form[passwordForm]}</div>
      </Container>
      <Footer />
    </div>
  );
};

export default ResetPassword;
