import React, { useEffect } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsAction } from "./reviewsAction";

const Reviews = () => {
  const { reviews } = useSelector((state) => state.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReviewsAction());
  }, [dispatch]);
  return (
    <AdminLayout>
      <h3>Reviews management</h3>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Rating</th>
            <th>Reviews</th>
            <th>Reviewed By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.productName}</td>
              <td>{item.rating}</td>
              <td>{item.review}</td>
              <td>{item.reviewedBy}</td>

              <td>
                <Button variant="link">info</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Reviews;
