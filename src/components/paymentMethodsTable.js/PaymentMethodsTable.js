import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deletepaymentMethodsAction,
  getpaymentMethodsAction,
} from "../../pages/paymentMethods/PaymentMethodsAction";
import { Button } from "react-bootstrap";
import { AddPaymentMethod } from "../payment-methods-forms/AddPaymentMethod";
import { EditPaymentMethod } from "../payment-methods-forms/EditPaymentMethod";
import {setSelectedPaymentMethod } from "../../pages/paymentMethods/paymentmethodSlice";
export const PaymentMethodsTable = ({
  handleOnModalButtonClick,
  showModal,
}) => {
  const { paymentMethods } = useSelector((state) => state.paymentMethods);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getpaymentMethodsAction());
  }, [dispatch]);
  const handleOnDelete = (_id, name) => {
    if (window.confirm(`Are you sure you wan to delete ${name}`)) {
      dispatch(deletepaymentMethodsAction(_id));
    }
  };
  const handleOnEdit = (item) => {
    dispatch(setSelectedPaymentMethod(item))
    handleOnModalButtonClick("edit")
}
  const pmForm = {
    add: <AddPaymentMethod></AddPaymentMethod>,
    edit: <EditPaymentMethod></EditPaymentMethod>,
  };
  return (
    <div>
      {pmForm[showModal]}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(item._id, item.name)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
