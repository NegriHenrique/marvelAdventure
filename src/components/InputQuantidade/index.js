import React from "react";
import { BsDashCircle, BsPlusCircle } from "react-icons/bs";

import { useAppContext } from "../../AppContext";

import "./styles.css";

function InputQuantidade({ quantidade, index, onClick = () => {} }) {
  const carrinhoStore = useAppContext();

  return (
    <div className="quatidade d-flex align-items-center">
      <button className="quantidade-actions border-0">
        <BsDashCircle
          size="2rem"
          onClick={() =>
            index >= 0
              ? carrinhoStore.atualizaQuantidade(
                  quantidade > 0 ? quantidade - 1 : 0,
                  index
                )
              : onClick(quantidade > 0 ? quantidade - 1 : 0)
          }
        />
      </button>
      <input
        type="number"
        min={0}
        max={99}
        readOnly={true}
        value={quantidade}
        className="quantidade-itens mx-3 my-4 rounded input-group-text"
      />
      <button className="quantidade-actions border-0">
        <BsPlusCircle
          size="2rem"
          onClick={() =>
            index >= 0
              ? carrinhoStore.atualizaQuantidade(
                  quantidade < 99 ? quantidade + 1 : 99,
                  index
                )
              : onClick(quantidade < 99 ? quantidade + 1 : 99)
          }
        />
      </button>
    </div>
  );
}

export default InputQuantidade;
