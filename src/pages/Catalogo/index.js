import React, { useEffect, useState } from "react";
import api from "../../services/api";
import QuadrinhoCard from "./components/QuadrinhoCard";
import { useMediaPredicate } from "react-media-hook";

import { BsFillGridFill, BsFillGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import "./styles.css";
import QuadrinhoList from "./components/QuadrinhoList";
import { Form } from "react-bootstrap";

function Catalogo() {
  const DOIS_ITEM_LINHA = 6;
  const TRES_ITEM_LINHA = 4;

  const decadas = ["1960", "1970", "1980", "1990", "2000", "2010", "2020"];

  const [quadrinhos, setQuadrinhos] = useState([]);
  const [decadasCheck, setDecadasCheck] = useState([]);

  const mdScreen = useMediaPredicate("(min-width: 768px)");

  const [ListaGridView, setListaGridView] = useState(0);
  const [quantidadeItemLinha, setQuantidadeItemLinha] = useState(
    mdScreen && DOIS_ITEM_LINHA
  );

  function handleDecadasCheck(decada) {
    if (decadasCheck.indexOf(decada) === -1) {
      return setDecadasCheck([...decadasCheck, decada]);
    }
    setDecadasCheck(decadasCheck.filter(decadaCheck => decadaCheck !== decada));
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/comics", {
        params: {
          limit: 1
        }
      });

      setQuadrinhos(response.data.data);
    }

    getData();
  });

  return (
    <div id="catalogo" className="container">
      <div className="row pt-5">
        <section className="col  mb-5">
          <h3 className="w-100 title font-weight-bold">Quadrinhos</h3>
        </section>
        <section className="col-12 p-0">
          <div className="row">
            <aside className="col-md-3 card mr-5 py-4 filtros">
              <h4>Filtros</h4>
              <div className="checkbox filtro-decada">
                <p className="title">Decadas</p>
                {decadas.map((decada, index) => (
                  <div
                    key={index}
                    className={`decada-${decada}`}
                    onClick={() => handleDecadasCheck(decada)}
                  >
                    {decadasCheck.indexOf(decada) !== -1 ? (
                      <ImCheckboxChecked />
                    ) : (
                      <ImCheckboxUnchecked />
                    )}
                    <span>{decada}</span>
                  </div>
                ))}
              </div>
            </aside>
            <main className="col card p-5">
              {quadrinhos.results && quadrinhos.results.lenght > 0 ? (
                <>
                  <nav className="d-flex filter-view justify-content-between align-items-end">
                    <ul className="view-list-grid d-flex m-0">
                      <li
                        className={`${!ListaGridView ? "active" : ""} pointer`}
                        onClick={() => setListaGridView(0)}
                      >
                        <BsFillGrid3X3GapFill />
                      </li>
                      <li
                        className={`${ListaGridView ? "active" : ""} pointer`}
                        onClick={() => setListaGridView(1)}
                      >
                        <BsListUl />
                      </li>
                    </ul>
                    <ul className="view-per-row d-flex m-0">
                      <li
                        className={`${
                          quantidadeItemLinha === DOIS_ITEM_LINHA
                            ? "active"
                            : ""
                        } pointer`}
                        onClick={() => setQuantidadeItemLinha(DOIS_ITEM_LINHA)}
                      >
                        <BsFillGridFill />
                      </li>
                      <li
                        className={`${
                          quantidadeItemLinha === TRES_ITEM_LINHA
                            ? "active"
                            : ""
                        } pointer`}
                        onClick={() => setQuantidadeItemLinha(TRES_ITEM_LINHA)}
                      >
                        <BsFillGrid3X3GapFill />
                      </li>
                    </ul>
                  </nav>
                  <ul className="row m-0 ">
                    {ListaGridView
                      ? quadrinhos.results.map(quadrinho => (
                          <QuadrinhoList
                            key={quadrinho.id}
                            quadrinho={quadrinho}
                          />
                        ))
                      : quadrinhos.results.map(quadrinho => (
                          <QuadrinhoCard
                            key={quadrinho.id}
                            quadrinho={quadrinho}
                            quantidadeItemLinha={4}
                          />
                        ))}
                  </ul>
                </>
              ) : (
                <h1 className="text-center m-0 w-100">
                  Nenhum quadrinho encontrado
                </h1>
              )}
            </main>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Catalogo;
