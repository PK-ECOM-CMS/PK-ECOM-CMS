import React, { useEffect, useState } from "react";
import { CustomModal } from "../modal/Modal";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../../pages/products/productAction";
export const EditProductForm = ({ selectedProduct }) => {
  const [form, setForm] = useState({});
  const [categoryId, setCategoryId] = useState(null);

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    setForm(selectedProduct);
    setCategoryId(selectedProduct.catId);
  }, [selectedProduct]);

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
    const { __v, createdAt, updatedAt, ...rest } = form;
    console.log(rest);
    dispatch(updateProductAction(rest));
  };
  return (
    <CustomModal title="Edit Product">
      <Form
        className="mb-5 border p-3 shadow-lg rounded"
        onSubmit={handleOnSubmit}
      >
        <Row className="g-2">
          <Col lg="1">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Check
                name="status"
                // label="status"
                type="switch"
                onChange={handleOnChange}
                checked={form.status === "active"}
              ></Form.Check>
            </Form.Group>
          </Col>
          <Col lg="3">
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
                        <option
                          key={i}
                          value={item._id}
                          selected={item._id === form.catId}
                        >
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg="3">
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
                        <option
                          key={i}
                          value={item._id}
                          selected={item._id === form.subCatId}
                        >
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg="3">
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                label="Enter category name"
                type="text"
                onChange={handleOnChange}
                required
                value={form.name}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col lg="2">
            <Form.Group>
              <Form.Label>Action</Form.Label>
              <Col lg={1}>
                <Button type="submit">Update</Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
