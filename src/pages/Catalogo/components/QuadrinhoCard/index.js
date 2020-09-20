import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function QuadrinhoCard({ quadrinho, quantidadeItemLinha }) {
  const thumb = quadrinho.thumbnail.path + "." + quadrinho.thumbnail.extension;
  return (
    <Link
      to={`/detalhes/${quadrinho.id}`}
      className={`quadrinho-card mb-5 col-12 col-md-${quantidadeItemLinha}`}
    >
      <div className="imagem position-relative">
        <img
          src={thumb}
          alt="imagem do quadrinho"
          height={
            quantidadeItemLinha === 6
              ? 550
              : quantidadeItemLinha === 12
              ? "auto"
              : 265
          }
          className="rounded w-100"
        />
      </div>
      <h4 className="text-truncate mt-3" title={quadrinho.title}>
        {quadrinho.title}
      </h4>
      <p className="price">
        <strong>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL",
          }).format(quadrinho.prices[0].price)}
        </strong>
      </p>
    </Link>
  );
}

export default QuadrinhoCard;
