import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { CustomInputField } from "../customInputfields/CustomInputField";
import { Button } from "react-bootstrap";
import { CustomModal } from "../modal/Modal";
import { useDispatch } from "react-redux";
import { postpaymentMethodsAction } from "../../pages/paymentMethods/PaymentMethodsAction";
const initialState = {
  status: "inactive",
  name: "",
  description: "",
};
export const AddPaymentMethod = () => {
  const dispatch = useDispatch();
  const inputFields = [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter payment name",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      as: "textarea",
      required: true,
      placeholder: "Write information about the payment method",
    },
  ];
  const [form, setForm] = useState(initialState);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postpaymentMethodsAction(form))
  };
  return (
    <CustomModal title="Add new payment method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInputField
            key={i}
            {...item}
            onChange={handleOnChange}
          ></CustomInputField>
        ))}
        <Form.Group>
          <Button variant="success" type="submit">
            Add Payment Method
          </Button>
        </Form.Group>
      </Form>
    </CustomModal>
  );
};
