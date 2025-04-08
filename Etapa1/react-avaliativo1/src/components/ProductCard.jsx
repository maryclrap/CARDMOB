import React from "react";

const ProductCard = ({ id, nome, preco, onDelete, onEdit }) => {
  return (
    <div
      className="card mb-3 mx-auto"
      style={{
        maxWidth: "400px",
        textAlign: "center",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">{nome}</h5>
        <p className="card-text">Preço: R$ {preco.toFixed(2)}</p>
        <div className="mt-3">
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => alert(`Produto "${nome}" adicionado ao carrinho!`)}
          >
            Adicionar ao Carrinho
          </button>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => onEdit(id)}
          >
            Editar
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(id)}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;