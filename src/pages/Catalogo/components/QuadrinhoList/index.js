import React from "react";

function QuadrinhoList({ quadrinho }) {
  const thumb = quadrinho.thumbnail.path + "." + quadrinho.thumbnail.extension;

  return (
    <div className="d-flex justify-content-between border-bottom p-4 row">
      <img
        src={thumb}
        alt="imagem quadrinho"
        className="h-100 pl-0 col-5 col-md-3"
      />
      <div className="col infos">
        <h4 className="title">{quadrinho.title}</h4>
        <p className="description">Descrição</p>
        <p className="price">
          <strong>
            {Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL"
            }).format(quadrinho.prices[0].price)}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default QuadrinhoList;
