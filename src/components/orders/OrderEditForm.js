import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedOrder } from "../../pages/orders/orderSlice";
import { getSingleOrder } from "../../pages/orders/orderAction";
import { Button, Form, Table } from "react-bootstrap";

export const OrderEditForm = () => {
  const { _id } = useParams();
  const { orderList, selectedOrder } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    // check if we have orders in our state, if so select the order from the state
    if (orderList.length) {
      const select = orderList.filter((item) => item._id === _id)[0];
      dispatch(setSelectedOrder(select));
    } else {
      // otherwise, fetch from the server
      dispatch(getSingleOrder(_id));
    }
  }, [dispatch, orderList, _id]);
  const { cart } = selectedOrder;
  console.log(_id);
  return (
    <div>
      {/* status */}
      <div className="fw-bold py-2 d-flex justify-content-between">
        Status: {selectedOrder.status}
        <div>
          <Form className="d-flex gap-2">
            <Form.Group>
              <Form.Select>
                <option value="">--Select--</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Button variant="warning">Update</Button>
          </Form>
        </div>
      </div>
      {/* Buyer Info */}
      <div className="mt-5 p-2 card">
        <h4 className="">Shipping Details</h4>
        <hr />
        <p>
          Order Date: 29-05-2023 <br />
          Name: {selectedOrder?.buyer?.firstName} <br />
          Phone:{selectedOrder?.buyer?.lastName} <br />
          Email: {selectedOrder?.buyer?.email}
          <br />
          Shipping Address: {selectedOrder?.shipping?.street}{" "}
          {selectedOrder?.shipping?.suburb} {selectedOrder?.shipping?.state}{" "}
          {selectedOrder?.shipping?.country}
          <br />
        </p>
      </div>
      {/* Payment Info */}
      <div className="mt-5 p-2 card">
        <h4 className="">Payment Info</h4>
        <hr />
        <p>
          <br />
          Status: {selectedOrder?.paymentInfo?.status} <br />
          Total Paid:{selectedOrder?.paymentInfo?.paidAmount} <br />
          Paid Date: {selectedOrder?.paymentInfo?.paidDate}
          <br />
          Method: {selectedOrder?.paymentInfo?.method}
          <br />
          Transaction ID: {selectedOrder?.paymentInfo?.transactionId}
          <br />
        </p>
      </div>

      {/* Cart Info */}
      <div className="mt-5 p-2 card">
        <h4>Cart Details</h4>
        <hr />
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((item, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>
                  <img src={item.thumbnail} width="100px" alt=""></img>
                </td>
                <td>{item.productName}</td>
                <td>{item.salesPrice}</td>
                <td>{item.qty}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan={5}>Total</td>
              <td>${selectedOrder.cartTotal}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/* add note form */}
      <Form className="mt-5 card p-3">
        <Form.Group>
          <Form.Label>Add Note</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            rows={5}
            placeholder="Add some note ......."
          ></Form.Control>
              </Form.Group>
              <Button variant="primary" className="mt-1">Add note</Button>
      </Form>
      {/* Message history */}
      <div className="mt-5">
        <div className="mt-3">
          Date:29-05-2023
          <div className="card p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            cum, obcaecati recusandae totam minima quas rem quis a quae qui
            inventore exercitationem ipsum mollitia. Quia accusantium quos atque
            minima aut!
          </div>
        </div>
        <div className="mt-3">
          Date:29-05-2023
          <div className="card p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            cum, obcaecati recusandae totam minima quas rem quis a quae qui
            inventore exercitationem ipsum mollitia. Quia accusantium quos atque
            minima aut!
          </div>
        </div>
        <div className="mt-3">
          Date:29-05-2023
          <div className="card p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            cum, obcaecati recusandae totam minima quas rem quis a quae qui
            inventore exercitationem ipsum mollitia. Quia accusantium quos atque
            minima aut!
          </div>
        </div>
        <div className="mt-3">
          Date:29-05-2023
          <div className="card p-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
            cum, obcaecati recusandae totam minima quas rem quis a quae qui
            inventore exercitationem ipsum mollitia. Quia accusantium quos atque
            minima aut!
          </div>
        </div>
      </div>
    </div>
  );
};
