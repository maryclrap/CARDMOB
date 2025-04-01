import React, { useState } from "react";
import Contato from "./Contato";

const ListaContatos = () => {
  const [contatos, setContatos] = useState([
    { id: 1, nome: "Maria Clara Pereira", contato: "mary@gmail.com" },
    { id: 2, nome: "Jonatas de Macedo", contato: "jojo@gmail.com" },
  ]);

  const [novoNome, setNovoNome] = useState("");
  const [novoContato, setNovoContato] = useState("");

  const adicionarContato = () => {
    if (novoNome && novoContato) {
      setContatos([
        ...contatos,
        { id: Date.now(), nome: novoNome, contato: novoContato },
      ]);
      setNovoNome("");
      setNovoContato("");
    }
  };

  const deletarContato = (id) => {
    setContatos(contatos.filter((contato) => contato.id !== id));
  };

  const editarContato = (id, novoNome, novoContato) => {
    setContatos(
      contatos.map((contato) =>
        contato.id === id
          ? { ...contato, nome: novoNome, contato: novoContato }
          : contato
      )
    );
  };

  return (
    <div>
      <h2>Lista de Contatos</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nome"
          value={novoNome}
          onChange={(e) => setNovoNome(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Contato"
          value={novoContato}
          onChange={(e) => setNovoContato(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary" onClick={adicionarContato}>
          Adicionar
        </button>
      </div>
      <ul className="list-group">
        {contatos.map((contato) => (
          <Contato
            key={contato.id}
            id={contato.id}
            nome={contato.nome}
            contato={contato.contato}
            onDelete={deletarContato}
            onEdit={editarContato}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListaContatos;