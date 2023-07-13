import React from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import { SideMenu } from "../side-menu/SideMenu";

export const AdminLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <SideMenu></SideMenu>
      <main style={{ minHeight: "70vh" }} className="container">{children}</main>
      <Footer></Footer>
    </div>
  );
};
