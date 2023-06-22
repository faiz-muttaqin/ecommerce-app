import React from "react";
import Footer from "./Footer";
import Headers from "./Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Headers />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
