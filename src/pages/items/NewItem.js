import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AddItemForm } from "../../components/item-form/AddItemForm";

const NewItem = () => {
  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/items">
          <Button variant="none">
            <i className="fa-solid fa-less-than"> Back</i>
          </Button>
        </Link>
      </div>
      <h1>Add New Item Form</h1>
      <hr />
      <AddItemForm></AddItemForm>
    </AdminLayout>
  );
};

export default NewItem;
