import React from 'react';
import './NomeJogadores.css';

const NomeJogadores = () => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Nome dos Jogadores</h2>
        <div className="input-group">
          <label>Jogador 1</label>
          <input type="text" placeholder="Nome do Jogador 1" />
        </div>
        <div className="input-group">
          <label>Jogador 2</label>
          <input type="text" placeholder="Nome do Jogador 2" />
        </div>
        <button className="btn-confirmar">Começar Jogo</button>
      </div>
    </div>
  );
};

export default NomeJogadores;
