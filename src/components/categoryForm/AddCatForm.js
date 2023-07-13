import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCategoriesAction } from "../../pages/categories/categoryAction";
const initialState = {
  status: "inactive",
  name: "",
  catId: null,
};
export const AddCatForm = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postCategoriesAction(form));
  };
  return (
    <Form
      className="mb-5 border p-3 shadow-lg rounded"
      onSubmit={handleOnSubmit}
    >
      <h4>Add new Catgory</h4>
      <Row className="g-2">
        <Col md="2">
          <Form.Group>
            <Form.Check
              name="status"
              label="status"
              type="switch"
              onChange={handleOnChange}
            ></Form.Check>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Group>
            <Form.Select name="catId" onChange={handleOnChange}>
              <option>Select Parent Category</option>
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
        <Col md="4">
          <Form.Group>
            <Form.Control
              name="name"
              label="Enter category name"
              type="text"
              onChange={handleOnChange}
              required
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md="2">
          <Button type="submit">Add</Button>
        </Col>
      </Row>
    </Form>
  );
};
