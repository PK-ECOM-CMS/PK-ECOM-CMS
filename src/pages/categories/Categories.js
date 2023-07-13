import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { CategoryTable } from "../../components/categoryTable/CategoryTable";
import { AddCatForm } from "../../components/categoryForm/AddCatForm";

const Categories = () => {
  return (
    <AdminLayout>
      <h2 className="mt-5 text-center">Categories management</h2>
      <AddCatForm></AddCatForm>
      <CategoryTable></CategoryTable>
    </AdminLayout>
  );
};

export default Categories;
