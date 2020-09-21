# Projeto marvel

![](https://img.shields.io/badge/ReactJs-16.13.1-blue) ![](https://img.shields.io/badge/MobX-5.15.6-red) ![](https://img.shields.io/badge/NodeJs-12.14.1-green)

Este projeto consiste de um modelo de loja virtual de quadrinhos da Marvel Comic, utilizando a [API Marvel](https://developer.marvel.com), ReactJs e Bootstrap.

## Tecnologias utilizadas

- [x] MobX
- [x] React Context
- [x] React Hooks

A quantidade de itens adquiridos pela API foi limitada para não haver problemas com o limite de request e, portanto, não se viu o porque de fazer a paginação desses itens, tendo em vista que vem em pouca quantidade.

O sistema foi desenhado para ser o mais simples possível ao usuário. Contendo apenas a Landing Page (Home), a pagina de Catalogo e a Pagina de Detalhes do produto, o sistema ainda possui previas de possíveis outras telas/funcionalidades, como por exemplo um dropdown com as telas de usuário, um carrinho (ja implementado, porem apenas na sua versão sticky) e uma funcionalidade de "Comprar Agora" para ir direto para o checkout (que por sua vez não existe, mas o botão esta lá apenas esteticamente).

Também possui regras de negocio simples como não permitir a adição de menos que 1 item no carrinho, filtrar e buscar produtos de qualquer lugar da loja, também pode-se acessar o carrinho de qualquer lugar da loja mesmo e dentro do mesmo pode-se mudar a quantidade de um item e deleta-lo caso necessário.

Há sempre a possibilidade de implementar coisas novas nesse projeto, como a adição de lazyloads e empty state para loading, ou ate mesmo uma forma de adicionar ao carrinho sem entrar na pagina de detalhes do item, mas isso não veio a ser implementado.

Agradeço desde já a oportunidade de estar fazendo esse projeto.
