import React, { useEffect, useState } from "react";
import { getCategoriesAction } from "../../pages/categories/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import {
  deleteProdcutAction,
  getProductsAction,
} from "../../pages/products/productAction";
import { setModalShow } from "../../pages/system-state/systemSlice";
import { EditProductForm } from "../product-form/EditProductForm";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { Products } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState({});
  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      dispatch(deleteProdcutAction(_id));
    }
  };
  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
    !Products.length && dispatch(getProductsAction());
  }, [dispatch, categories, Products]);
  const cats = categories.filter((item) => !item.catId);
  const subCats = categories.filter((item) => item.catId);
  const handleOnEdit = (product) => {
    setSelectedProduct(product);
    dispatch(setModalShow());
  };

  return (
    <div>
      <EditProductForm selectedProduct={selectedProduct}></EditProductForm>
      <h3>Products Table</h3>
      <Table stripped="true" hover bordered>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cats.length > 0 &&
            cats.map((item, i) => (
              <>
                <tr key={i} className="-util-categoryrow">
                  <td
                    className={
                      item.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.name}</td>
                  <td>Category</td>
                  <td>
                    {/* <Button
                      variant="danger"
                      // onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="warning"
                      //   onClick={() => handleOnEdit(item)}
                    >
                      Edit
                    </Button> */}
                  </td>
                </tr>
                {subCats.map(
                  (cat, i) =>
                    cat.catId === item._id && (
                      <>
                        <tr key={i} className="-util-subcategoryrow">
                          <td
                            className={
                              cat.status === "active"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {cat.status}
                          </td>
                          <td>{cat.name}</td>
                          <td>Sub-category</td>
                          <td>
                            {/* <Button
                              variant="danger"
                              // onClick={() => handleOnDelete(cat._id)}
                            >
                              Delete
                            </Button>{" "}
                            <Button
                              variant="warning"
                              // onClick={() => handleOnEdit(cat)}
                            >
                              Edit
                            </Button> */}
                          </td>
                        </tr>
                        {Products.length > 0 &&
                          Products.map(
                            (product, i) =>
                              product.subCatId === cat._id && (
                                <tr key={i} className="-util-productrow">
                                  <td
                                    className={
                                      product.status === "active"
                                        ? "text-success"
                                        : "text-danger"
                                    }
                                  >
                                    {product.status}
                                  </td>
                                  <td>{product.name}</td>
                                  <td>Product</td>
                                  <td>
                                    <Button
                                      className="action_button"
                                      variant="danger"
                                      onClick={() =>
                                        handleOnDelete(product._id)
                                      }
                                    >
                                      Delete
                                    </Button>{" "}
                                    <Button
                                      className="action_button"
                                      variant="warning"
                                      onClick={() => handleOnEdit(product)}
                                    >
                                      Edit
                                    </Button>
                                  </td>
                                </tr>
                              )
                          )}
                      </>
                    )
                )}
              </>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
