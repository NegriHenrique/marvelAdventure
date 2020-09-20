import React, { useEffect, useState } from "react";
import "./styles.css";

import { useAppContext } from "../../AppContext";
import InputQuantidade from "../../components/InputQuantidade";
import { Link } from "react-router-dom";
import api from "../../services/api";

function Detalhes({ match }) {
  const [quantidade, setQuantidade] = useState(1);
  const [quadrinho, setQuadrinho] = useState({ error: true });

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(`/comics/${match.params.id}`);

        setQuadrinho(response.data.data.results[0]);
      } catch (err) {
        setQuadrinho({ error: true });
      }
    }

    getData();
  }, [match.params.id]);

  const carrinhoStore = useAppContext();

  async function addItemCarrinho() {
    try {
      await carrinhoStore.addCarrinho({ ...quadrinho, quantidade });
      console.log(carrinhoStore.carrinho);
    } catch (err) {}
  }

  if (!quadrinho || quadrinho.error) {
    return <h1>teste</h1>;
  }
  return (
    <div id="detalhes" className="page-padding-header container">
      <ul className="breadcrumbs row mt-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalogo">Catalogo</Link>
        </li>
        <li className="active">Detalhe</li>
      </ul>
      <div className="row card mt-3 p-5">
        <section className="infos col border-bottom pb-4 pl-md-0 mt-4 d-md-flex">
          <img
            src={`${quadrinho.thumbnail.path}.${quadrinho.thumbnail.extension}`}
            alt="Capa"
            className="rounded  pl-md-0 col-12 col-md-3 h-100"
          />
          <div className="infos-compra col">
            <div className="title-page">
              <h3 className="title w-auto text-center text-md-left mt-4 mt-md-0">
                {quadrinho.title}
              </h3>
              <p className="subtitle text-justify">{quadrinho.description}</p>
              <div className="criadores d-flex justify-content-between">
                <span className="subtitle">
                  <strong>Escritor: </strong>
                  {quadrinho.creators.items
                    .filter(
                      (creator) => creator.role.toLocaleLowerCase() === "writer"
                    )
                    .map(
                      (creator, index, arr) =>
                        `${creator.name}${index < arr.length - 1 ? ", " : "."}`
                    )}
                </span>
                <span className="subtitle">
                  <strong>Desenhista:</strong>
                  {quadrinho.creators.items
                    .filter(
                      (creator) =>
                        creator.role.toLocaleLowerCase() === "penciler"
                    )
                    .map(
                      (creator, index, arr) =>
                        `${creator.name}${index < arr.length - 1 ? ", " : "."}`
                    )}
                </span>
              </div>
              <h1 className="text-center text-md-left">
                <strong className="price">
                  {Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(quadrinho.prices[0].price)}
                </strong>
                <small className="pl-3 font-weight-normal">à vista</small>
              </h1>
              <InputQuantidade
                quantidade={quantidade}
                onClick={setQuantidade}
              />
              <div className="row buttons-finalizar">
                <button
                  className="btn py-4 btn-success col mx-3 rounded text-uppercase font-weight-bold"
                  disabled={quantidade === 0}
                  onClick={() => addItemCarrinho()}
                >
                  Adicionar ao Carrinho
                </button>
                <button className="py-4 btn btn-outline-success col mx-3 rounded text-uppercase font-weight-bold ">
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="more-info">
          <h3 className="mt-5 font-weight-bold">
            <big>Informações sobre o Quadrinho</big>
          </h3>
          <div className="col bg-info p-5 title-page">
            {quadrinho.characters.items.length > 0 && (
              <p className="subtitle">
                <strong>Personagens: </strong>{" "}
                {quadrinho.characters.items.map(
                  (character, index) =>
                    `${character.name}${
                      index < quadrinho.characteres.length - 1 ? ", " : "."
                    }`
                )}
              </p>
            )}
            <p className="subtitle">
              <strong>Quantidade de Páginas: </strong>
              {quadrinho.pageCount}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Detalhes;
