import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

function QuadrinhoList({ quadrinho }) {
  const thumb = quadrinho.thumbnail.path + "." + quadrinho.thumbnail.extension;

  return (
    <Link
      to={`detalhes/${quadrinho.id}`}
      className="list-view d-flex justify-content-between border-bottom p-4 row"
    >
      <img
        src={thumb}
        alt="imagem quadrinho"
        className="h-100 pl-0 col-5 col-md-3"
      />
      <div className="col infos d-flex flex-column justify-content-between">
        <div className="col p-0">
          <h4 className="title">{quadrinho.title}</h4>
          <p className="description">{quadrinho.description}</p>
        </div>
        <p className="price">
          <strong>
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(quadrinho.prices[0].price)}
          </strong>
        </p>
      </div>
    </Link>
  );
}

export default QuadrinhoList;
