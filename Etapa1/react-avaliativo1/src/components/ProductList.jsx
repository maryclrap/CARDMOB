import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Produto A", preco: 50.0 },
    { id: 2, nome: "Produto B", preco: 30.0 },
  ]);

  const [novoNome, setNovoNome] = useState("");
  const [novoPreco, setNovoPreco] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const adicionarProduto = () => {
    if (novoNome && novoPreco) {
      if (editandoId) {
        setProdutos(
          produtos.map((produto) =>
            produto.id === editandoId
              ? { ...produto, nome: novoNome, preco: parseFloat(novoPreco) }
              : produto
          )
        );
        setEditandoId(null);
      } else {
        setProdutos([
          ...produtos,
          { id: Date.now(), nome: novoNome, preco: parseFloat(novoPreco) },
        ]);
      }
      setNovoNome("");
      setNovoPreco("");
    }
  };

  const deletarProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  const editarProduto = (id) => {
    const produto = produtos.find((produto) => produto.id === id);
    if (produto) {
      setNovoNome(produto.nome);
      setNovoPreco(produto.preco);
      setEditandoId(id);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Lista de Produtos</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome do Produto"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="number"
          placeholder="Preço do Produto"
          value={novoPreco}
          onChange={(e) => setNovoPreco(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary w-100" onClick={adicionarProduto}>
          {editandoId ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
      </div>
      <div className="row">
        {produtos.map((produto) => (
          <div className="col-md-4" key={produto.id}>
            <ProductCard
              id={produto.id}
              nome={produto.nome}
              preco={produto.preco}
              onDelete={deletarProduto}
              onEdit={editarProduto}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;