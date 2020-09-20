export function criarCarrinhoStore() {
  return {
    carrinho: JSON.parse(localStorage.getItem("carrinho")) || [],
    total: Number(JSON.parse(localStorage.getItem("total"))) || 0,

    addCarrinho(item) {
      this.carrinho = [...this.carrinho, item];
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
      this.total += item.prices ? item.prices[0].price * item.quantidade : 0;
      localStorage.setItem("total", JSON.stringify(this.total));
    },

    atualizaQuantidade(quantidade, index) {
      const item = this.carrinho[index];
      this.carrinho[index] = { ...this.carrinho[index], quantidade };
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
      console.log(item.prices[0].price * (quantidade - item.quantidade));
      this.total += item.prices
        ? item.prices[0].price * (quantidade - item.quantidade)
        : 0;
      localStorage.setItem("total", JSON.stringify(this.total));
    },

    removeCarrinho(indexRemover) {
      const item = this.carrinho[indexRemover];
      this.total -= item.prices ? item.prices[0].price * item.quantidade : 0;

      this.carrinho = this.carrinho.filter(
        (item, index) => index !== indexRemover
      );
      localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
      localStorage.setItem("total", JSON.stringify(this.total));
    },
  };
}
