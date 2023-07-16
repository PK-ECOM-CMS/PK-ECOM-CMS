import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getItemsAction } from "../../pages/items/itemAction";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
export const ItemTable = () => {
  const dispatch = useDispatch();
  const { itemsList } = useSelector((state) => state.items);
  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th># gfgf</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Name</th>
            <th>Quantity</th>
            <th> Price</th>
            <th>Sales Price</th>
            <th>Sales Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {itemsList.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={item.thumbnail}
                  crossOrigin="anonymous"
                  width="70rem"
                  alt=""
                ></img>
              </td>
              <td
                className={
                  item.status === "active" ? "text-success" : "text-danger"
                }
              >
                {item.status}
              </td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td> {item.price}</td>
              <td>{item.salesPrice}</td>
              <td>
                {item.salesStartDate && item.salesStartDate.substr(0, 10)}{" "}
                {item.salesStartDate ? " to " : "-"}
                {item.salesEndDate && item.salesEndDate.substr(0, 10)}
              </td>
              <td>
                <Link to={`/items/edit/${item._id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
