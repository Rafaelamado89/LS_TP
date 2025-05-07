import React from "react";
import { useRef, useEffect, useState } from "react";
import "./NomeJogadores.css";

function SetupGame({ isOpen, onClose }) {
  const ref = useRef();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);


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

export default SetupGame;
