import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { CustomInputField } from "../customInputfields/CustomInputField";
import { Button } from "react-bootstrap";
import { CustomModal } from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  updatepaymentMethodsAction,
} from "../../pages/paymentMethods/PaymentMethodsAction";
const initialState = {
  status: "inactive",
  name: "",
  description: "",
};
export const EditPaymentMethod = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { selectedPaymentMethod } = useSelector(
    (state) => state.paymentMethods
  );

  useEffect(() => {
    setForm(selectedPaymentMethod);
  }, [selectedPaymentMethod]);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { createdAt, updatedAt, __v, ...rest } = form;
    dispatch(updatepaymentMethodsAction(rest));
  };
  const inputFields = [
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter payment name",
      value: form.name,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      as: "textarea",
      required: true,
      placeholder: "Write information about the payment method",
      value: form.description,
    },
  ];

  return (
    <CustomModal title="Edit payment method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="status"
            onChange={handleOnChange}
            checked={form.status === "active"}
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
            Update Payment Method
          </Button>
        </Form.Group>
      </Form>
    </CustomModal>
  );
};
