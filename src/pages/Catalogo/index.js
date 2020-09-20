import React, { useEffect, useState } from "react";
import api from "../../services/api";
import QuadrinhoCard from "./components/QuadrinhoCard";
import { useMediaPredicate } from "react-media-hook";

import { BsFillGridFill, BsFillGrid3X3GapFill, BsListUl } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import "./styles.css";
import QuadrinhoList from "./components/QuadrinhoList";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

function Catalogo() {
  const DOIS_ITEM_LINHA = 6;
  const TRES_ITEM_LINHA = 4;

  const [filtroPreco, setFiltroPreco] = useState({ min: 0, max: 100 });

  const [filtrosAberto, setFiltrosAberto] = useState(true);

  const [quadrinhos, setQuadrinhos] = useState({});

  const [quadrinhosFiltrados, setQuadrinhosFiltrados] = useState(
    quadrinhos.results ? quadrinhos.results : []
  );

  const mdScreen = useMediaPredicate("(min-width: 768px)");
  const lgScreen = useMediaPredicate("(min-width: 992px)");

  const [ListaGridView, setListaGridView] = useState(0);
  const [quantidadeItemLinha, setQuantidadeItemLinha] = useState(
    lgScreen && DOIS_ITEM_LINHA
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
            <aside className="col-md-3 h-100 card mr-md-5 px-5 py-4 mb-5 mb-md-0 filtros">
              {mdScreen ? (
                <h4>Filtros</h4>
              ) : (
                <div
                  className="toggle-mobile mb-4 d-flex justify-content-between align-items-baseline"
                  onClick={() => setFiltrosAberto(!filtrosAberto)}
                >
                  <h4 className="m-0">Filtros</h4>
                  <FiChevronDown
                    size="1.8rem"
                    className={`${filtrosAberto ? "open" : ""} toggableIcon`}
                  />
                </div>
              )}

              {filtrosAberto && (
                <>
                  <div className="filtro-preco mt-5">
                    <p className="title">Preço</p>
                    <form className="form my-5 px-3">
                      <InputRange
                        minValue={0}
                        maxValue={100}
                        value={filtroPreco}
                        onChange={(value) => setFiltroPreco(value)}
                      />
                      <div className="col-12">
                        <div className="row mt-5">
                          <input
                            className="border-0 col input-group-text pl-4 rounded text-left"
                            type="number"
                            value={filtroPreco.min}
                            min={0}
                            max={filtroPreco.max}
                            onChange={(e) =>
                              setFiltroPreco({
                                ...filtroPreco,
                                min:
                                  e.target.value <= filtroPreco.max
                                    ? e.target.value
                                    : filtroPreco.max,
                              })
                            }
                          />
                          <span className="mx-3 d-flex align-items-center">
                            -
                          </span>
                          <input
                            className="border-0 col input-group-text pl-4 py-3 rounded text-left"
                            type="number"
                            min={filtroPreco.min}
                            max={100}
                            value={filtroPreco.max}
                            onChange={(e) =>
                              setFiltroPreco({
                                ...filtroPreco,
                                max:
                                  e.target.value >= filtroPreco.min
                                    ? e.target.value
                                    : filtroPreco.min,
                              })
                            }
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="actions">
                    <button
                      className="btn btn-dark btn-success mt-4 float-lg-right font-weight-bold px-5 py-2 text-uppercase"
                      onClick={() => filtrarDados()}
                    >
                      Filtrar
                    </button>
                  </div>
                </>
              )}
            </aside>
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
