import React from "react";
import Footer from "./Footer";
import Header from "./Header";

// import { Container } from './styles';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
