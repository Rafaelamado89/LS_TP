import React, { useState } from "react";
import "./NomeJogadores.css";

/**
 * Componente que gerencia a tela inicial do jogo e a seleção do modo de jogo.
 * Oferece duas opções de jogo:
 * 1. Modo 2 Jogadores:
 *    - Permite que dois jogadores joguem um contra o outro
 *    - Cada jogador pode personalizar seu nome
 *    - Se nenhum nome for fornecido, usa "PLAYER 1" e "PLAYER 2"
 * 
 * 2. Modo CPU:
 *    - Permite que um jogador jogue contra o computador
 *    - O jogador pode personalizar seu nome
 *    - O computador é sempre identificado como "CPU"
 * 
 * O componente gerencia janelas modais para entrada dos nomes
 * e inicia o jogo no modo selecionado após a confirmação.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.setJogador1 - Define o nome do jogador 1
 * @param {Function} props.setJogador2 - Define o nome do jogador 2
 * @param {Function} props.onGameStart - Inicia o jogo após a configuração
 * @param {Function} props.setSelectedLevel - Define o modo de jogo (0 = 2 jogadores, 1 = CPU)
 * @param {boolean} props.hideButtons - Controla a visibilidade dos botões de modo de jogo
 * @param {Function} props.setHideButtons - Alterna a visibilidade dos botões
 */
function NomeJogadores({ setJogador1, setJogador2, onGameStart, setSelectedLevel, setHideButtons, hideButtons }) {
  const [openWindow, setOpenWindow] = useState(false);
  const [openWindow2, setOpenWindow2] = useState(false);
  const [nome1, setNome1] = useState('');
  const [nome2, setNome2] = useState('');

  const handleClick2Players = () => {
    setJogador1(nome1 || "PLAYER 1");
    setJogador2(nome2 || "PLAYER 2");
    setOpenWindow(false);
    setSelectedLevel(0);
    onGameStart();
  };

  const handleClickCPU = () => {
    setJogador1(nome1 || "PLAYER 1");
    setJogador2("CPU");
    setOpenWindow2(false);
    setSelectedLevel(1);
    onGameStart();
  };



  return (
    <div>
      {openWindow && (
        <div className="window-2players">
          <div className="window">
            <h2>Nome dos Jogadores</h2>
            <div className="input-group">
              <label>Jogador 1</label>
              <input 
                type="text" 
                placeholder="Nome do Jogador 1"
                value={nome1}
                onChange={(e) => setNome1(e.target.value)} 
              />
            </div>
            <div className="input-group">
              <label>Jogador 2</label>
              <input 
                type="text" 
                placeholder="Nome do Jogador 2"
                value={nome2}
                onChange={(e) => setNome2(e.target.value)} 
              />
            </div>
            <button className="btn-confirmar" onClick={handleClick2Players}>
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
              <input 
                type="text" 
                placeholder="Nome do Jogador 1"
                value={nome1}
                onChange={(e) => setNome1(e.target.value)} 
              />
            </div>
            <button className="btn-confirmar" onClick={handleClickCPU}>
              Começar Jogo
            </button>
          </div>
        </div>
      )}

      {!hideButtons && (
        <>
          <div 
              className="btn-2players" 
            onClick={() => {
              setOpenWindow(true);
              setHideButtons(true);
            }}
          >
            2 Jogadores
          </div>

          <div
            className="btn-CPU"
            onClick={() => {
              setOpenWindow2(true);
              setHideButtons(true);
            }}
          >
            CPU
          </div>
        </>
      )}
    </div>
  );
}

export default NomeJogadores;