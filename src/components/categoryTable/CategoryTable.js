import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoriesAction,
  getCategoriesAction,
} from "../../pages/categories/categoryAction";
import { Button, Row, Table } from "react-bootstrap";
import { EditCatForm } from "../categoryForm/EditCatForm";
import { setModalShow } from "../../pages/system-state/systemSlice";

export const CategoryTable = () => {
  const [selectedCat, setSelectedCat] = useState({});
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  const handleOnEdit = (cat) => {
    setSelectedCat(cat);
    dispatch(setModalShow());
  };

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete the category?")) {
      dispatch(deleteCategoriesAction(_id));
    }
  };
  const Cats = categories.filter(({ catId }) => !catId);
  const subCat = categories.filter(({ catId }) => catId);
  return (
    <Row>
      <EditCatForm selectedCat={selectedCat}></EditCatForm>
      <h3>Categories Table</h3>
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
          {Cats.length > 0 &&
            Cats.map((item, i) => (
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
                    <Button
                      className="action_button"
                      variant="danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      className="action_button"
                      variant="warning"
                      onClick={() => handleOnEdit(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
                {subCat.map(
                  (cat, i) =>
                    cat.catId === item._id && (
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
                        <td>Sub-Category</td>
                        <td>
                          <Button
                            className="action_button"
                            variant="danger"
                            onClick={() => handleOnDelete(cat._id)}
                          >
                            Delete
                          </Button>{" "}
                          <Button
                            className="action_button"
                            variant="warning"
                            onClick={() => handleOnEdit(cat)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    )
                )}
              </>
            ))}
        </tbody>
      </Table>
    </Row>
  );
};
