import React, { useState } from "react";

import logo from "../../assets/logo/marvel-logo-7.png";
import { FaSearch, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import { useHistory } from "react-router-dom";
import "./styles.css";
import { Dropdown } from "react-bootstrap";
import { useObserver } from "mobx-react";
import Carrinho from "./components/Carrinho";
function Header() {
  const [activeSearch, setActiveSearch] = useState("");
  const [displaySearch, setDisplaySearch] = useState("d-none");
  const [search, setSearch] = useState("");
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  const history = useHistory();
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

  function handleSearch(e) {
    e.preventDefault();
    history.push(`/catalogo?search=${search}`);
  }

  return useObserver(() => (
    <header className="d-flex justify-content-between">
      <nav className="d-flex justify-content-between menu position-fixed px-md-5 w-100">
        <div className="img py-4 px-3 px-md-0 col-6 col-md-2 h-100">
          <Link to="/">
            <img src={logo} alt="Logo marvel" className="h-100 w-100" />
          </Link>
        </div>
        <ul
          id="actions"
          className="align-items-center justify-content-around d-flex font-weight-regular m-0 col-6 col-md-2"
        >
          <li className="search-container">
            <FaSearch onClick={() => handleSearchDiv()} />
            <form
              id="search"
              onSubmit={handleSearch}
              className={`${activeSearch} ${displaySearch}`}
            >
              <input
                type="text"
                className="py-2"
                placeholder="buscar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </li>
          <li
            id="carrinho-icone"
            className="position-relative"
            onClick={() => setCarrinhoAberto(true)}
          >
            <FaShoppingCart />
            <span className="tag">
              {carrinhoStore.carrinho.length > 0
                ? carrinhoStore.carrinho.reduce(
                    (accumulator = 0, currentValue) => {
                      return accumulator + currentValue.quantidade;
                    }
                  )
                : 0}
            </span>
          </li>
          <li>
            <Dropdown>
              <Dropdown.Toggle as="a" id="dropdown-usuario">
                <FaRegUserCircle />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-usuario">
                <Dropdown.Item href="#/action-1">Minha Conta</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Pedidos</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </nav>
      <Carrinho
        carrinhoAberto={carrinhoAberto}
        setCarrinhoAberto={setCarrinhoAberto}
      />
    </header>
  ));
}

export default Header;
