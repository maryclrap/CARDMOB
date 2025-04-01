import React, { useState } from "react";

const Contato = ({ id, nome, contato, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNome, setEditedNome] = useState(nome);
  const [editedContato, setEditedContato] = useState(contato);

  const handleSave = () => {
    onEdit(id, editedNome, editedContato);
    setIsEditing(false);
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedNome}
            onChange={(e) => setEditedNome(e.target.value)}
            className="form-control mb-2"
            placeholder="Nome"
          />
          <input
            type="text"
            value={editedContato}
            onChange={(e) => setEditedContato(e.target.value)}
            className="form-control"
            placeholder="Contato"
          />
        </div>
      ) : (
        <div>
          <strong>{nome}</strong>
          <p className="mb-0">{contato}</p>
        </div>
      )}
      <div>
        {isEditing ? (
          <button className="btn btn-success btn-sm me-2" onClick={handleSave}>
            Salvar
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}
        <button className="btn btn-danger btn-sm" onClick={() => onDelete(id)}>
          Deletar
        </button>
      </div>
    </li>
  );
};

export default Contato;