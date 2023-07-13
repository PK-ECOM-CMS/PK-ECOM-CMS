import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { OrderEditForm } from "../../components/orders/OrderEditForm";

const OrderDetails = () => {
  return (
    <AdminLayout>
      <div className="mt-3">
        <Link to="/orders" className="text-decoration-none text-secondary">
          &lt;Back
        </Link>
      </div>
      <h3 className="py-3">Order Details</h3>
      <hr />
      <OrderEditForm></OrderEditForm>
    </AdminLayout>
  );
};

export default OrderDetails;
