import React from "react";
import { Container } from "reactstrap";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div>
    <Header />
    <Container className="mb-4">{children}</Container>
    <Footer />
  </div>
);

export default Layout;
