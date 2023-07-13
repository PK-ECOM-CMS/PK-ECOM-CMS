import React, { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import { PaymentMethodsTable } from "../../components/paymentMethodsTable.js/PaymentMethodsTable";
import { useDispatch } from "react-redux";
import { setModalShow } from "../system-state/systemSlice";

const PaymentMethods = () => {
  const [showModal, setShowModal] = useState("");
  const handleOnModalButtonClick = (str) => {
    setShowModal(str);
    dispatch(setModalShow());
  };
  const dispatch = useDispatch();

  return (
    <AdminLayout>
      <h4 className="text-center py-4">Payment methods management</h4>
      <hr></hr>
      <div className="text-end">
        <Button variant="info" onClick={() => handleOnModalButtonClick("add")}>
          <i className="fa-sharp fa-solid fa-plus"></i> Add New Payment Method
        </Button>
      </div>
      <PaymentMethodsTable
        handleOnModalButtonClick={handleOnModalButtonClick}
        showModal={showModal}
      ></PaymentMethodsTable>
    </AdminLayout>
  );
};

export default PaymentMethods;
