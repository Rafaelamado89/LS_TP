import React from "react";
import { useRef, useEffect } from "react";
import "./game-over-modal.css";

function GameOverModal({ isOpen, points = 0, onClose }) {
  const ref = useRef();
  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog id="modal-gameOver" ref={ref} onClose={onClose} onCancel={onClose}>
      <div className="estilos">
        <header>
          <span className="closeModal" onClick={onClose}>
            &times;
          </span>
          <div>Jogo Terminado</div>
        </header>
        <div className="info" id="messageGameOver">
          <p>Pontuação: {points}</p>
        </div>
        {/* <div className="info" id="nickname">
          Nick Name:
          <input
            type="text"
            id="inputNick"
            size="16"
            placeholder="Introduza seu Nick"
          />
          <button id="okTop">ok</button>
        </div> */}
      </div>
    </dialog>
  );
}

export default GameOverModal;
