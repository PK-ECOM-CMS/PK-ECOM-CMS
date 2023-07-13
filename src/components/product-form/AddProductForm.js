import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row, Form } from "react-bootstrap";
import {
  getProductsAction,
  postProductsAction,
} from "../../pages/products/productAction";
const initialState = {
  status: "inactive",
  name: "",
  catId: null,
  subCatId: null,
};
export const AddProductForm = () => {
  const [categoryId, setCategoryId] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    if (name === "catId") {
      setCategoryId(value);
    }
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postProductsAction(form));
  };
  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);
  return (
    <div>
      <Form
        className="mb-5 border p-3 shadow-lg rounded"
        onSubmit={handleOnSubmit}
      >
        <h4>Add new Product</h4>
        <Row className="g-2">
          <Col md="1">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Check
                name="status"
                // label="status"
                type="switch"
                onChange={handleOnChange}
              ></Form.Check>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="catId"
                onChange={handleOnChange}
                required={true}
              >
                <option value="">Select Category</option>
                {categories.length > 0 &&
                  categories.map(
                    (item, i) =>
                      !item.catId && (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group>
              <Form.Label>Sub-Category</Form.Label>
              <Form.Select
                name="subCatId"
                onChange={handleOnChange}
                required={true}
              >
                <option value="">Select Sub-category</option>
                {categories.length > 0 &&
                  categories.map(
                    (item, i) =>
                      item.catId === categoryId && (
                        <option key={i} value={item._id}>
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="3">
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Enter product name"
                type="text"
                onChange={handleOnChange}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md="2">
            <Form.Group>
              <Form.Label>Action</Form.Label>
              <Col md={1}>
                <Button type="submit">Add</Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
