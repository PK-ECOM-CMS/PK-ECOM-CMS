import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { OrderTable } from "../../components/orders/OrderTable";

const Order = () => {
  return (
    <AdminLayout>
      <h3 className="py-3">Order Management</h3>
      <hr />
      <OrderTable></OrderTable>
    </AdminLayout>
  );
};

export default Order;
