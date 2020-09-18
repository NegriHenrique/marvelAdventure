import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

// import { Container } from './styles';

function Home() {
  return (
    <div
      id="home"
      className="landing-page d-flex align-items-center justify-content-center text-white"
    >
      <div className="wrapper d-flex h-75 flex-column justify-content-between align-items-center">
        <h2 className="font-weight-bold">
          Bem vindo à loja virtual da Marvel Comics.{" "}
        </h2>
        <Link
          to="/catalogo"
          className="btn btn-primary text-uppercase font-weight-bold p-2 rounded-pill"
        >
          Navegar
        </Link>
      </div>
    </div>
  );
}

export default Home;
