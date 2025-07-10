// ... keep all your existing imports
import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInputField } from "../customInputfields/CustomInputField";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../pages/categories/categoryAction";
import { updateItemAction } from "../../pages/items/itemAction";
import { getProductsAction } from "../../pages/products/productAction";

export const EditItemForm = () => {
  const [form, setForm] = useState({});
  const [categoryId, setCategoryId] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState(false);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

  const { selectedItem } = useSelector((state) => state.items);
  const { categories } = useSelector((state) => state.categories);
  const { Products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
    !Products.length && dispatch(getProductsAction());

    if (selectedItem) {
      setForm({
        ...selectedItem,
        newFilter: "",
      });
      setImages(selectedItem.images || []);
      setCategoryId(selectedItem.catId);
      setSubCategoryId(selectedItem.subCatId);
    }
  }, [dispatch, categories, Products, selectedItem]);

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
    setNewImages([]);
    const { files } = e.target;
    transformFile(files);
  };

  const transformFile = (files) => {
    if (!files.length) return;
    [...files].forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        setNewImages((oldImages) => [...oldImages, reader.result]);
      };
    });
  };

  const handleOnImageDelete = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((img) => img !== value));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { __v, slug, createdAt, updatedAt, sku, rating, newFilter, ...rest } = form;
    const updatedForm = { ...rest, imgToDelete, newImages };
    dispatch(updateItemAction(updatedForm));
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.name,
    },
    {
      name: "length",
      label: "Length (cm)",
      type: "number",
      placeholder: "Item length",
      required: true,
      value: form.length,
    },
    {
      name: "height",
      label: "Height (cm)",
      type: "number",
      placeholder: "Item height",
      required: true,
      value: form.height,
    },
    {
      name: "width",
      label: "Width (cm)",
      type: "number",
      placeholder: "Item width",
      required: true,
      value: form.width,
    },
    {
      name: "weight",
      label: "Weight (kg)",
      type: "decimal",
      placeholder: "Item weight",
      required: true,
      value: form.weight,
    },
    {
      name: "fromSuburb",
      label: "From Suburb",
      type: "text",
      placeholder: "Suburb",
      required: true,
      value: form.fromSuburb,
    },
    {
      name: "fromPostCode",
      label: "From Post Code",
      type: "text",
      placeholder: "Enter from post code",
      required: true,
      value: form.fromPostCode,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Product's unique code",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      placeholder: "50",
      required: true,
      value: form.quantity,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "$222",
      required: true,
      value: form.price,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "$22",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
      value: form?.salesStartDate ? form.salesStartDate.slice(0, 10) : null,
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
      value: form?.salesEndDate ? form.salesEndDate.slice(0, 10) : null,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      rows: 5,
      placeholder: "Description",
      required: true,
      value: form.description,
    },
    {
      name: "images",
      type: "file",
      accept: "image/*",
      multiple: true,
    },
  ];

  return (
    <div>
      <Form className="py-5" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-2">
          <Form.Check
            name="status"
            type="switch"
            label="Status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>

        <Form.Group className="py-3">
          <Form.Label>Assign to Category</Form.Label>
          <Form.Select name="catId" onChange={handleOnChange} required>
            <option value="">Select Category</option>
            {categories.map((item, i) =>
              !item.catId ? (
                <option key={i} value={item._id} selected={item._id === form.catId}>
                  {item.name}
                </option>
              ) : null
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="py-3">
          <Form.Label>Assign to Sub-category</Form.Label>
          <Form.Select name="subCatId" onChange={handleOnChange} required>
            <option value="">Select Sub-category</option>
            {categories.map((item, i) =>
              item.catId === categoryId ? (
                <option key={i} value={item._id} selected={item._id === form.subCatId}>
                  {item.name}
                </option>
              ) : null
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="py-3">
          <Form.Label>Assign to Product</Form.Label>
          <Form.Select name="productId" onChange={handleOnChange} required>
            <option>Select Product</option>
            {Products.map((item, i) =>
              item.catId === categoryId && item.subCatId === subCategoryId ? (
                <option key={i} value={item._id} selected={item._id === form.productId}>
                  {item.name}
                </option>
              ) : null
            )}
          </Form.Select>
        </Form.Group>

        {inputFields.map((item, i) => (
          <CustomInputField
            {...item}
            key={i}
            onChange={item.name === "images" ? handleOnImageSelect : handleOnChange}
          />
        ))}

        <div className="my-5 d-flex flex-wrap">
          {selectedItem?.images?.map((imgLink) => (
            <div className="p-1" key={imgLink.public_id}>
              <Form.Check
                type="radio"
                label="Use as thumbnail"
                value={imgLink.secure_url}
                name="thumbnail"
                onChange={handleOnChange}
                checked={imgLink.secure_url === form.thumbnail}
              />
              <img src={imgLink.secure_url} width="70rem" alt="" />
              <Form.Check
                label="Delete"
                value={imgLink.public_id}
                onChange={handleOnImageDelete}
              />
            </div>
          ))}
        </div>
        {/* ------------------- Filter Editing Section ------------------- */}
        {form?.filters?.length > 0 && (
          <>
            <Form.Group className="mt-4">
              <Form.Label>Filter Name</Form.Label>
              <Form.Control
                name="filterName"
                value={form?.filterName || ""}
                readOnly
                plaintext
              />
            </Form.Group>

            <div className="mb-3">
              <Form.Label>Current Filters</Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {form.filters.map((filt, idx) => (
                  <div
                    key={idx}
                    className="border rounded px-2 py-1 d-flex align-items-center"
                  >
                    <span className="me-2">{filt}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const updatedFilters = form.filters.filter((_, i) => i !== idx);
                        setForm({ ...form, filters: updatedFilters });
                      }}
                    >
                      x
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Form.Group className="d-flex align-items-end gap-2 mb-4">
              <Form.Control
                placeholder="Add a new filter"
                value={form.newFilter || ""}
                onChange={(e) => setForm({ ...form, newFilter: e.target.value })}
              />
              <Button
                variant="primary"
                onClick={() => {
                  if (!form.newFilter?.trim()) return;
                  const updated = [...(form.filters || []), form.newFilter.trim()];
                  setForm({ ...form, filters: updated, newFilter: "" });
                }}
              >
                Add
              </Button>
            </Form.Group>
          </>
        )}
        {/* -------------------------------------------------------------- */}


        <Button variant="success" type="submit">
          Update Product
        </Button>
      </Form>
      <hr />
    </div>
  );
};
