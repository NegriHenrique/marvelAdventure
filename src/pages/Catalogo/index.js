import React, { useEffect, useState } from "react";
import api from "../../services/api";

import "./styles.css";

function Catalogo() {
  const [quadrinhos, setQuadrinhos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = api.get("/comics/82967");

      console.log(response);
    }

    getData();
  });

  return (
    <div id="catalogo" className="container">
      <section class="pagination">
        <header className="title">
          <h3> Secao 1 </h3>
        </header>
      </section>
    </div>
  );
}

export default Catalogo;
