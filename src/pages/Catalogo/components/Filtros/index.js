import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import InputRange from "react-input-range";

function Filtros({ filtrarDados, mdScreen, filtroPreco, setFiltroPreco }) {
  const [filtrosAberto, setFiltrosAberto] = useState(true);

  return (
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
                  <span className="mx-3 d-flex align-items-center">-</span>
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
  );
}

export default Filtros;
