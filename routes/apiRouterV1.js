var express = require("express");
var apiRouterV1 = express.Router();

var produtos = [
  { id: 1, descricao: "Camiseta", marca: "nike", preco: 49.99 },
  { id: 2, descricao: "Calça Jeans", marca: "Levi's", preco: 89.99 },
  { id: 3, descricao: "Tênis", marca: "Adidas", preco: 99.99 },
  { id: 4, descricao: "Blusa moletom", marca: "Puma", preco: 59.99 },
  { id: 5, descricao: "Bermuda", marca: "Vans", preco: 39.99 },
  { id: 6, descricao: "Jaqueta", marca: "The north face", preco: 149.99 },
  { id: 7, descricao: "Vestido", marca: "Zara", preco: 79.99 },
  { id: 8, descricao: "Sapato", marca: "Gucci", preco: 299.99 },
  { id: 9, descricao: "Shorts", marca: "H&M", preco: 29.99 },
  { id: 10, descricao: "Camisa", marca: "Ralph Lauren", preco: 109.99 },
];

apiRouterV1.get("/produtos", (req, res) => {
  res.json(produtos);
});

apiRouterV1.get("/produtos/:id", (req, res, next) => {
  let id = req.params.id;
  if (id) {
    idInt = Number.parseInt(id)
    let idx = produtos.findIndex((o) => o.id === idInt);
    if (idx >-1) {
      res.json(produtos[idx]);
    } else {
      res.status(404).json({ message: `Produto não encontrado` });
    }
  } else {
    res.status(404).json({ message: `Produto não encontrado` });
  }
});

apiRouterV1.post("/produtos", (req, res) => {
  let produto = req.body
  let newId = Math.max(...produtos.map(o => o.id)) + 1
  produto.id = newId;
  produtos.push(produto)
  res.status(201).json({message: `Produto inserido com sucesso!`,
                                data: {id: newId}})
});

apiRouterV1.delete("/produtos/:id", (req, res, next) => { 
  let id = req.params.id;
  if (id) {
    idInt = Number.parseInt(id)
    let idx = produtos.findIndex((o) => o.id === idInt);
    if (idx >-1) {
      produtos.splice(idx, 1)
      res.status(200).json({message: `Produto excluido com sucesso!`})
    } else {
      res.status(404).json({ message: `Produto não encontrado` });
    }
  } else {
    res.status(404).json({ message: `Produto não encontrado` });
  }
});

apiRouterV1.put("/produtos/:id", (req, res, next) => { 
  let id = req.params.id;
  produto = req.body
  if (id) {
    idInt = Number.parseInt(id)
    let idx = produtos.findIndex((o) => o.id === idInt);
    if (idx >-1) {
      produtos[idx].descricao = produto.descricao; 
      produtos[idx].marca = produto.marca; 
      produtos[idx].preco = produto.preco; 
      res.status(200).json({message: `Produto alterado com sucesso!`,
                  data: {produtos: [idx] } })
    } else {
      res.status(404).json({ message: `Produto não encontrado` });
    }
  } else {
    res.status(404).json({ message: `Produto não encontrado` });
  }
});

module.exports = apiRouterV1;
