import React, { useState } from "react";

import logo from "../../assets/logo/marvel-logo-7.png";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../../AppContext";

import "./styles.css";
import { Dropdown } from "react-bootstrap";

function Header() {
  const [activeSearch, setActiveSearch] = useState("");
  const [displaySearch, setDisplaySearch] = useState("d-none");
  const [search, setSearch] = useState("");

  const carrinhoStore = useAppContext();

  function handleSearchDiv() {
    if (activeSearch === "") {
      setDisplaySearch("");
      setActiveSearch("active");
      return setSearch("");
    }
    setActiveSearch("");
    setTimeout(() => setDisplaySearch("d-none"), 300);
  }

  return (
    <header className="d-flex justify-content-between">
      <nav className="d-flex flex-wrap justify-content-between menu position-fixed px-md-5 w-100">
        <div className="img py-4 px-0 col-12 col-sm-6 col-md-2 h-100">
          <Link to="/">
            <img src={logo} alt="Logo marvel" className="h-100 w-100" />
          </Link>
        </div>
        <ul
          id="categorias"
          className="d-flex col-12 col-md-6 justify-content-around align-items-center font-weight-regular text-uppercase py-2 py-md-0 px-0 m-0"
        >
          <li>
            <Link to="/quadrinhos">Quadrinhos</Link>
          </li>
          <li>
            <Link to="/personagens">Personagens</Link>
          </li>
        </ul>
        <ul
          id="actions"
          className="align-items-center justify-content-around d-flex font-weight-regular m-0 col-12 col-sm-6 col-md-2"
        >
          <li className="search-container">
            <FaSearch onClick={() => handleSearchDiv()} />
            <form id="search" className={`${activeSearch} ${displaySearch}`}>
              <input
                type="text"
                className="py-2"
                placeholder="buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </li>
          <li id="carrinho-icone" className="position-relative">
            <FaShoppingCart />
            <span className="tag">{carrinhoStore.carrinho.length}</span>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle as="a" id="dropdown-usuario">
                <FaRegUserCircle />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-usuario">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
