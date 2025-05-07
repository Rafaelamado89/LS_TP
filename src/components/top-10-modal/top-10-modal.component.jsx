import React from "react";
import { useRef, useEffect } from "react";
import "./top-10-modal.css";

function Top10Modal({ isOpen, onClose }) {
  const ref = useRef();
  useEffect(
    () => (isOpen ? ref.current?.showModal() : ref.current?.close()),
    [isOpen]
  );
  return (
    <dialog id="modal-top10" ref={ref} onCancel={onClose}>
      <div className="estilos">
        <header>
          <span className="closeModal" data-modalid="top10" onClick={onClose}>
            &times;
          </span>
          <div>TOP 10</div>
        </header>
        <div className="info" id="infoTop"></div>
        <footer>
          <p>© Linguagens Script @ DEIS - ISEC</p>
        </footer>
      </div>
    </dialog>
  );
}

export default Top10Modal;
