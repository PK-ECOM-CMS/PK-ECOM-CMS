import React, { useEffect } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Col, Row } from "react-bootstrap";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { CustomTable } from "../../components/custom-table/CustomTable";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAction } from "../items/itemAction";
import { NoticeModal } from "../../components/noticeModal/NoticeModal";

const Dashboard = () => {
  const { itemsList } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const clientTableHead = ["First Name", "Last Name", "Joined Date"];
  const clientTableInfo = [
    {
      firstName: "Pradeep",
      lastName: "Dhital",
      joinedDate: "29-05-2023",
    },
    {
      firstName: "Anjan",
      lastName: "Sharma",
      joinedDate: "30-05-2023",
    },
    {
      firstName: "Yekal",
      lastName: "Yatri",
      joinedDate: "29-05-2023",
    },
  ];
  const orderTableHead = [
    "Status",
    "Payment Status",
    "Name",
    "Order Date",
    "Total Qty",
    "Order Total",
  ];
  const OrderTableInfo = [
    ["Pending", "Paid", "Name", "29-05-2023", 5, 220],
    ["Pending", "Paid", "Name", "29-05-2023", 5, 220],
    ["Pending", "Paid", "Name", "29-05-2023", 5, 220],
    ["Pending", "Paid", "Name", "29-05-2023", 5, 220],
  ];
  const activeProducts = itemsList.filter((item) => item.status === "active");

  useEffect(() => {
    !itemsList.length && dispatch(getItemsAction());
  }, [dispatch, itemsList.length]);
  return (
    <AdminLayout>
      <h4>Dashboard</h4>
      <hr />
      {/* product summary */}
      <div className="products">
        <h5>Items Summary</h5>
        <hr />
        <Row className="g-3">
          <Col md="4">
            <CustomCard count={itemsList.length} title="Total"></CustomCard>
          </Col>
          <Col md="4">
            <CustomCard
              count={activeProducts.length || 0}
              title="Active"
            ></CustomCard>
          </Col>
          <Col md="4">
            <CustomCard
              count={itemsList.length - activeProducts.length || 0}
              title="Inactive"
            ></CustomCard>
          </Col>
        </Row>
      </div>
      {/* Client Summary */}
      <div className="mt-5">
        <h5>New Client</h5>
        <CustomTable
          tableHead={clientTableHead}
          tableData={clientTableInfo}
        ></CustomTable>
      </div>
      {/* Order Summary */}
      <div className="mt-5 ">
        <div className="d-flex">
          <h5>New Orders </h5>{" "}
          <Link to="/orders" className="mx-2 text-decoration-none">
            {" "}
            View all orders
          </Link>
        </div>

        <CustomTable
          tableHead={orderTableHead}
          tableData={OrderTableInfo}
        ></CustomTable>
      </div>
      {/* last 5 orders */}
      <NoticeModal></NoticeModal>
    </AdminLayout>
  );
};

export default Dashboard;
