import React from "react";
import Header from "./Header";

// import { Container } from './styles';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
