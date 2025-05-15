import React, { useState } from "react";
import "./NomeJogadores.css";

function NomeJogadores() {
  const [openWindow, setOpenWindow] = useState(false);
  const [openWindow2, setOpenWindow2] = useState(false);

  return (
    <div>
      {openWindow && (
        <div className="window-2players">
          <div className="window">
            <h2>Nome dos Jogadores</h2>
            <div className="input-group">
              <label>Jogador 1</label>
              <input type="text" placeholder="Nome do Jogador 1" />
            </div>
            <div className="input-group">
              <label>Jogador 2</label>
              <input type="text" placeholder="Nome do Jogador 2" />
            </div>
            <button
              className="btn-confirmar"
              onClick={() => setOpenWindow(false)}
            >
              Começar Jogo
            </button>
          </div>
        </div>
      )}



      {openWindow2 && (
        <div className="window-CPU">
          <div className="window">
            <h2>Nome do Jogador</h2>
            <div className="input-group">
              <label>Jogador 1</label>
              <input type="text" placeholder="Nome do Jogador 1" />
            </div>
            <button
              className="btn-confirmar"
              onClick={() => setOpenWindow2(false)}
            >
              Começar Jogo
            </button>
          </div>
        </div>
      )}

      <div className="btn-2players" onClick={() => setOpenWindow(true)}>
        2 Jogadores
      </div>

      <div className="btn-CPU" onClick={() => setOpenWindow2(true)}>
        CPU
      </div>
    </div>
  );
}

export default NomeJogadores;
