import React from "react";
import "../../components/celula/Celula.css";

function Celula({ row, col, value, isBonus }) {
  return (
    <div className={`celula ${isBonus ? "bonus" : ""}`}>
      {value && <div className={`peca jogador${value}`} />}
    </div>
  );
}

export default Celula;
