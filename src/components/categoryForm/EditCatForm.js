import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoriesAction } from "../../pages/categories/categoryAction";
import { CustomModal } from "../modal/Modal";
const initialState = {
  status: "inactive",
  name: "",
  catId: null,
};
export const EditCatForm = ({ selectedCat }) => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
  if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { __v, slug, createdAt, updatedAt, ...rest } = form;
    dispatch(updateCategoriesAction(rest));
  };
  return (
    <CustomModal title="Edit Category">
      <Form
        className="mb-5 border p-3 shadow-lg rounded"
        onSubmit={handleOnSubmit}
      >
        <Row className="g-2">
          <Col lg="2">
            <Form.Group>
              <Form.Check
                name="status"
                label="status"
                type="switch"
                onChange={handleOnChange}
                checked={form.status === "active"}
              ></Form.Check>
            </Form.Group>
          </Col>
          <Col lg="4">
            <Form.Group>
              <Form.Select name="catId" onChange={handleOnChange}>
                <option>Select Parent Category</option>
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
          <Col lg="4">
            <Form.Group>
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
            <Button type="submit">Update Category</Button>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};
