import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ItemTable } from "../../components/items/ItemTable";

const Item = () => {
  return (
    <AdminLayout>
      <h1>Items</h1>
      <div className="text-end">
        <Link to="/items/new">
          <Button variant="info">
            <i className="fa-sharp fa-solid fa-plus"></i> Add New Items
          </Button>
        </Link>
      </div>
      <hr />
      <div className="products-list">
        <ItemTable></ItemTable>
      </div>
    </AdminLayout>
  );
};

export default Item;
