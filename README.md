## Sobre

O **DevBurger-API** é uma API RESTful desenvolvida para gerenciar operações básicas de um restaurante de hambúrgueres. A API é capaz de criar, ler, atualizar e excluir dados relacionados a produtos, pedidos e clientes.

## Tecnologias

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para criar o servidor
- **Postgres**: Banco de dados
- **Docker**: Container do banco de dados


## Funcionalidades

- **Gerenciamento de Produtos**: CRUD (Criar, Ler, Atualizar, Excluir) para produtos de hambúrgueres.
- **Gerenciamento de Pedidos**: Criar e visualizar pedidos, atualizar o status dos pedidos.
- **Gerenciamento de Clientes**: CRUD para clientes, incluindo informações de contato e histórico de pedidos.

## Instalação

Siga estes passos para instalar e executar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/kaiocandido/DevBurger-API.git

## Navegue para o diretório do projeto:
- cd DevBurger-API

## Instale as dependências:
- npm install

## Configure o banco de dados:

Crie um arquivo .env na raiz do projeto e adicione suas variáveis de ambiente. Exemplo:

MONGODB_URI=mongodb://localhost:27017/devburger
PORT=3000

## Inicie o servidor:
- npm start
- yarn dev
O servidor estará disponível em http://localhost:3002.

## Uso

A API possui os seguintes endpoints:

## Produtos

**GET /products:** 
Lista todos os produtos.

**POST /products:**
Cria um novo produto.

**GET /products/**
: Obtém um produto específico.

**PUT /products/**
: Atualiza um produto existente.

**DELETE /products/**
: Exclui um produto.

## Pedidos

**GET /orders:**
Lista todos os pedidos.

**POST /orders:**
Cria um novo pedido.

**GET /orders/**
: Obtém um pedido específico.

**PUT /orders/**
: Atualiza o status de um pedido.

**DELETE /orders/**
: Exclui um pedido.

## Clientes

**GET /customers:**
Lista todos os clientes.

**POST /customers:**
Cria um novo cliente.

**GET /customers/**
: Obtém um cliente específico.

**PUT /customers/**
: Atualiza as informações de um cliente.

**DELETE /customers/**
: Exclui um cliente.
