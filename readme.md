# Sistema de Gestão de Estoque

Este é um sistema simples de gestão de estoque, que permite o cadastro de materiais, consulta de estoque, registro de entradas e retiradas, e cálculo automático de totais e saldos. O sistema armazena os dados no `localStorage` do navegador, garantindo que as informações sejam persistentes entre as sessões.

## Funcionalidades

- **Cadastro de Materiais**: Registre materiais com código, produto, quantidade, unidade e valor unitário.
- **Consulta de Estoque**: Visualize todos os materiais cadastrados e suas respectivas movimentações.
- **Movimentação de Estoque**: Registre entradas e retiradas de materiais, atualizando automaticamente os totais e o saldo.
- **Edição e Exclusão**: Edite ou exclua qualquer material cadastrado no sistema.
- **Busca**: Pesquise materiais pelo código, nome, data de movimentação ou tipo de movimentação.
- **Persistência de Dados**: Os materiais são armazenados no `localStorage`, garantindo que os dados não sejam perdidos ao recarregar a página.

## Tecnologias Utilizadas

- **HTML**: Para a estrutura do sistema.
- **CSS**: Para a estilização da interface.
- **JavaScript**: Para a lógica de negócio e interação com o `localStorage`.

## Estrutura do Projeto

A seguir está a estrutura básica do projeto:


### `index.html`

Contém a estrutura do formulário de cadastro, tabela de consulta e modais de edição.

### `styles.css`

Define a aparência visual da página, incluindo a disposição dos elementos na tela e estilização dos botões.

### `script.js`

Contém a lógica do sistema, incluindo as funcionalidades de adicionar, editar, excluir e retirar materiais do estoque, além de atualizar os totais e saldos automaticamente.

## Como Usar

1. Clone este repositório para sua máquina local:

```bash
git clone https://github.com/jhonatasilva1902/Gestao-de-Estoque
