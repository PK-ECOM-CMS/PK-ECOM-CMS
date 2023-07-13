import React, { useEffect } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemAction, getSingleItemAction } from "./itemAction";
import { EditItemForm } from "../../components/item-form/EditItemForm";
const EditItem = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem } = useSelector((state) => state.items);
  useEffect(() => {
    _id && dispatch(getSingleItemAction(_id));
  }, [_id, dispatch]);
  const handleOnDelete = () => {
    if (window.confirm("Are you sure, you want to delete this function?")) {
      dispatch(deleteItemAction(_id));
    }
  };

  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/items">
          <Button variant="none">
            <i className="fa-solid fa-less-than"> Back</i>
          </Button>
        </Link>
      </div>
      <h1>Update Item</h1>
      <hr />
      <div className="">
        <EditItemForm></EditItemForm>
      </div>
      <div className="text-end">
        <Button
          className="btn-lg m-3"
          variant="danger"
          onClick={handleOnDelete}
        >
          Delete
        </Button>
      </div>
    </AdminLayout>
  );
};

export default EditItem;
