import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaginationBasic } from "../pagination/Pagination";
import { getOrders } from "../../pages/orders/orderAction";
const ordersPerPage = 10;
export const OrderTable = () => {
  const [active, setActive] = useState(1);
  const [display, setDisplay] = useState([]);
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.orders);
  const pages = Math.ceil(display.length / ordersPerPage);
  const ordersStartsAt = ordersPerPage * (active - 1);
  const ordersEndsAt = ordersStartsAt + ordersPerPage;
  const handleOnfilterChange = (e) => {
    const { value } = e.target;
    if (value === "all") {
      return setDisplay(orderList);
    }
    const filteredArg = orderList.filter((item) => item.status === value);
    setDisplay(filteredArg);
    setActive(1);
  };
  const handleOnPaginationClick = (num) => {
    setActive(num);
  };
  useEffect(() => {
    !orderList.length && dispatch(getOrders());
    setDisplay(orderList);
  }, [dispatch, orderList]);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <div className="fw-bold">{display.length} orders found!</div>
        <Form>
          <Form.Group>
            <Form.Select onChange={handleOnfilterChange}>
              <option value="all">----Filter-----</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Buyer Name</th>
            <th>Order Total</th>
            <th>Payment Status</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
          {display.map((item, i) => {
            return (
              i >= ordersStartsAt &&
              i < ordersEndsAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.status}</td>
                  <td>
                    {item?.buyer?.firstName} {item.buyer.lastName}
                  </td>
                  <td>{item?.totalAmount}</td>
                  <td>{item?.paymentInfo?.status}</td>
                  <td>
                    <Link to={`/orders/${item?._id}`}>
                      <Button variant="info">View details</Button>
                    </Link>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </Table>
      <PaginationBasic
        pages={pages}
        active={active}
        handleOnPaginationClick={handleOnPaginationClick}
      ></PaginationBasic>
    </div>
  );
};
