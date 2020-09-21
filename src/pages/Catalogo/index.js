import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useMediaPredicate } from "react-media-hook";

import { BsFillGridFill, BsFillGrid3X3GapFill, BsListUl } from "react-icons/bs";
import "./styles.css";

import QuadrinhoCard from "./components/QuadrinhoCard";
import QuadrinhoList from "./components/QuadrinhoList";

import "react-input-range/lib/css/index.css";
import Filtros from "./components/Filtros";

function Catalogo() {
  const DOIS_ITEM_LINHA = 6;
  const TRES_ITEM_LINHA = 4;

  const [quadrinhos, setQuadrinhos] = useState({});
  const [filtroPreco, setFiltroPreco] = useState({ min: 0, max: 100 });

  const [quadrinhosFiltrados, setQuadrinhosFiltrados] = useState(
    quadrinhos.results ? quadrinhos.results : []
  );

  const mdScreen = useMediaPredicate("(min-width: 768px)");
  const lgScreen = useMediaPredicate("(min-width: 992px)");

  const [ListaGridView, setListaGridView] = useState(0);
  const [quantidadeItemLinha, setQuantidadeItemLinha] = useState(
    lgScreen ? TRES_ITEM_LINHA : mdScreen && DOIS_ITEM_LINHA
  );

  function filtrarDados() {
    //setLoading(true);

    setQuadrinhosFiltrados(
      quadrinhos.results
        ? quadrinhos.results.filter(
            (result) =>
              result.prices[0].price &&
              result.prices[0].price >= filtroPreco.min &&
              result.prices[0].price <= filtroPreco.max
          )
        : []
    );

    //setLoading(false);
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/comics", {
        params: {
          limit: 10,
        },
      });

      setQuadrinhos(response.data.data);
      setQuadrinhosFiltrados(response.data.data.results);
    }

    getData();
  }, []);

  return (
    <div id="catalogo" className="page-padding-header container">
      <div className="row pt-5">
        <section className="title-page col mb-5">
          <h3 className="w-100 title font-weight-bold">Quadrinhos</h3>
        </section>
        <section className="col-12 p-0">
          <div className="row">
            <Filtros
              mdScreen={mdScreen}
              filtrarDados={filtrarDados}
              filtroPreco={filtroPreco}
              setFiltroPreco={setFiltroPreco}
            />
            <main className="col card p-5">
              {quadrinhosFiltrados.length > 0 ? (
                <>
                  <nav className="mb-5 d-flex filter-view justify-content-between align-items-end">
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
                    <ul className="view-per-row d-none d-lg-flex m-0">
                      {!ListaGridView && (
                        <>
                          <li
                            className={`${
                              quantidadeItemLinha === DOIS_ITEM_LINHA
                                ? "active"
                                : ""
                            } pointer`}
                            onClick={() =>
                              setQuantidadeItemLinha(DOIS_ITEM_LINHA)
                            }
                          >
                            <BsFillGridFill />
                          </li>
                          <li
                            className={`${
                              quantidadeItemLinha === TRES_ITEM_LINHA
                                ? "active"
                                : ""
                            } pointer`}
                            onClick={() =>
                              setQuantidadeItemLinha(TRES_ITEM_LINHA)
                            }
                          >
                            <BsFillGrid3X3GapFill />
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                  <ul className="row m-0 ">
                    {ListaGridView
                      ? quadrinhosFiltrados.map((quadrinho) => (
                          <QuadrinhoList
                            key={quadrinho.id}
                            quadrinho={quadrinho}
                          />
                        ))
                      : quadrinhosFiltrados.map((quadrinho) => (
                          <QuadrinhoCard
                            key={quadrinho.id}
                            quadrinho={quadrinho}
                            quantidadeItemLinha={quantidadeItemLinha}
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
