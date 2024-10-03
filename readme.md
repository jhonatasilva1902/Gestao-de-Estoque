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
```
## Funcionalidades Explicadas

### 1. Cadastro de Material

Ao clicar no botão **Cadastrar**, o formulário de cadastro será exibido. Preencha todos os campos e clique em **Adicionar Material**. O material será armazenado no sistema e aparecerá na consulta de estoque.

### 2. Consulta de Estoque

O botão **Consultar Estoque** exibe a tabela com todos os materiais cadastrados, bem como suas respectivas movimentações (entrada ou retirada). A tabela é atualizada automaticamente quando novos materiais são cadastrados ou editados.

### 3. Movimentação de Retirada

Na tabela de consulta, é possível clicar no botão **Retirar** para registrar a retirada de uma quantidade específica de material. O saldo será atualizado automaticamente após a retirada.

### 4. Edição de Materiais

Para editar um material, clique no botão **Editar** na linha do material correspondente. Um modal de edição será exibido, permitindo alterar os dados do material.

### 5. Exclusão de Materiais

Clique no botão **Excluir** para remover um material do sistema. A remoção é permanente e não pode ser desfeita.

### 6. Busca

O campo de busca permite filtrar os materiais por código, produto, data de movimentação ou tipo de movimentação. A tabela de consulta será atualizada automaticamente conforme o termo de busca.

## Melhorias Futuras

- Implementação de autenticação de usuário.
- Exportação de dados para formatos CSV ou Excel.
- Implementação de gráficos para visualização de movimentações.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para o projeto. Você pode fazer isso seguindo os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Envie as alterações para o repositório remoto (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

## Agradecimentos

Este projeto foi desenvolvido durante a **ImersãoDev com Gemini** organizada pela [Alura](https://www.alura.com.br/). A imersão proporcionou uma excelente oportunidade de aprendizado e desenvolvimento prático de habilidades em programação.
