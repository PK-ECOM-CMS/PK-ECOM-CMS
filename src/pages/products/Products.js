import React  from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { ProductTable } from "../../components/product-table/ProductTable";
import { AddProductForm } from "../../components/product-form/AddProductForm"
const Products = () => {
  return (
    <AdminLayout>
      <h3 className="text-center">Add Products</h3>
      <AddProductForm></AddProductForm>
      <ProductTable></ProductTable>
    </AdminLayout>
  );
};

export default Products;
