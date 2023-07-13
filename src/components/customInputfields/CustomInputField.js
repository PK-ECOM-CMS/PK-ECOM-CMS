import React from "react";
import { Form } from "react-bootstrap";

export const CustomInputField = ({ label, ...rest }) => {
  return (
    <div>
      {/* controlId="formBasicEmail" taken off of here from form group because, this way all form group seemed to happen same controlID  */}
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control {...rest} />
    </Form.Group>
    </div>
  );
};
