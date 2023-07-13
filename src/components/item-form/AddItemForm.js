import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInputField } from "../customInputfields/CustomInputField";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../pages/categories/categoryAction";
import { postItemAction } from "../../pages/items/itemAction";
import { useNavigate } from "react-router-dom";
import { getProductsAction } from "../../pages/products/productAction";
const initialState = {
  status: "inactive",
  catId: null,
  subCatId: null,
  productId: null,
  name: "",
  sku: "",
  quantity: "",
  price: 0,
  salesPrice: 0,
  salesStartDate: null,
  salesEndDate: null,
  description: "",
};
export const AddItemForm = () => {
  const [form, setForm] = useState(initialState);
  const [categoryId, setCategoryId] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Item Name",
      required: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "item's unique code",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "50",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "$222",
      required: true,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "$22",
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      rows: 5,
      placeholder: "Description",
      required: true,
    },
    {
      name: "images",
      type: "file",
      accept: "image/*",
      multiple: true,
    },
  ];
  const { categories } = useSelector((state) => state.categories);
  const { Products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    !Products.length && dispatch(getProductsAction());
    !categories.length && dispatch(getCategoriesAction());
  }, [dispatch, Products, categories]);
  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    if (name === "catId") {
      setCategoryId(value);
    }
    if (name === "subCatId") {
      setSubCategoryId(value);
    }
    setForm({ ...form, [name]: value });
  };
  const handleOnImageSelect = (e) => {
    setImages([]);
    const { files } = e.target;
    transformFile(files);
  };
  const transformFile = (files) => {
    if (!files.length) {
      return;
    }
    [...files].forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setImages((oldImages) => {
          return [...oldImages, reader.result];
        });
      };
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    form.images = images;
    console.log(form);
    const result = dispatch(postItemAction(form));
    result === "success" && navigate("/items");
  };
  return (
    <div>
      <Form className="py-5" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-2">
          <Form.Check
            name="status"
            type="switch"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="py-3">
          <Form.Label>Select Category</Form.Label>
          <Form.Select name="catId" onChange={handleOnChange} required>
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
        <Form.Group className="py-3">
          <Form.Label>Select Sub-category</Form.Label>
          <Form.Select name="subCatId" onChange={handleOnChange} required>
            <option value="">Select sub-category</option>
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
        <Form.Group className="py-3">
          <Form.Label>Select Product</Form.Label>
          <Form.Select name="productId" onChange={handleOnChange} required>
            <option value="">Select Product</option>
            {Products.length > 0 &&
              Products.map(
                (item, i) =>
                  item.subCatId === subCategoryId &&
                  item.catId === categoryId && (
                    <option key={i} value={item._id}>
                      {item.name}
                    </option>
                  )
              )}
          </Form.Select>
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInputField
            {...item}
            key={i}
            onChange={
              item.name === "images" ? handleOnImageSelect : handleOnChange
            }
          ></CustomInputField>
        ))}
        <Button variant="success" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};