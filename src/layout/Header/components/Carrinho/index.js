import React from "react";
import "./styles.css";

import { GrClose } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAppContext } from "../../../../AppContext";
import InputQuantidade from "../../../../components/InputQuantidade";

function Carrinho({ carrinhoAberto, setCarrinhoAberto }) {
  const carrinhoStore = useAppContext();
  return (
    <div
      className={`carrinho float position-fixed ${
        carrinhoAberto ? "active" : ""
      }`}
    >
      <div className="row h-100 m-0 p-lg-5 d-flex flex-column justify-content-between">
        <h2 className="title mb-4">
          Carrinho
          <button
            className="icon float-right border-0 bg-none"
            onClick={() => setCarrinhoAberto(false)}
          >
            <GrClose size="3.5rem" />
          </button>
        </h2>
        <div className="col mb-5 list-items overflow-auto">
          {carrinhoStore.carrinho.map((quadrinho, index) => (
            <div
              key={quadrinho.id}
              className={` quadrinho-${quadrinho.id} d-flex mb-5`}
            >
              <img
                src={`${quadrinho.thumbnail.path}.${quadrinho.thumbnail.extension}`}
                alt="capa"
                className="col-3"
              />
              <div className="col-9 infos">
                <h3 className="name text-truncate">
                  {" "}
                  <big>{quadrinho.title}</big>
                  <button
                    className="botao-delete float-right border-0"
                    onClick={() => carrinhoStore.removeCarrinho(index)}
                  >
                    <FaRegTrashAlt size="2rem" />
                  </button>
                </h3>
                <p>
                  {" "}
                  <strong>Valor Unitário: </strong>{" "}
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quadrinho.prices[0].price)}
                </p>
                <p>
                  {" "}
                  <strong>Valor: </strong>{" "}
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quadrinho.prices[0].price * quadrinho.quantidade)}
                </p>
                <InputQuantidade
                  quantidade={quadrinho.quantidade}
                  index={index}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="total text-right">
          <p className="preco-final">
            <strong>Valor Final: </strong>{" "}
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(carrinhoStore.total)}
          </p>
        </div>
        <div className="finalizar-compra">
          <button className="py-3 font-weight-bold btn btn-success btn-block text-uppercase">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carrinho;
