export function criarCarrinhoStore() {
  return {
    carrinho: [],

    addCarrinho(item) {
      this.carrinho.push(item);
    },

    removeCarrinho(id) {
      this.carrinho = this.carrinho.filter((item) => item.id !== id);
    },
  };
}
