import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function QuadrinhoCard({ quadrinho, quantidadeItemLinha }) {
  const thumb = quadrinho.thumbnail.path + "." + quadrinho.thumbnail.extension;
  return (
    <Link to={`/quadrinho/${quadrinho.id}`}>
      <div
        className={`quadrinho-card mb-5 col-12 col-md-${quantidadeItemLinha}`}
      >
        <img
          src={thumb}
          alt="imagem do quadrinho"
          height={265}
          className="rounded w-100"
        />
        <h4 className="text-truncate mt-3" title={quadrinho.title}>
          {quadrinho.title}
        </h4>
        <p className="price">
          <strong>
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL"
            }).format(quadrinho.prices[0].price)}
          </strong>
        </p>
      </div>
    </Link>
  );
}

export default QuadrinhoCard;
