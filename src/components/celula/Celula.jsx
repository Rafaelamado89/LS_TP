import React from "react";
import "../../components/celula/Celula.css";

function Celula({ row, col, value, isBonus }) {
  return (
    <div className={`celula ${isBonus ? "bonus" : ""}`} style={{animation: "drop 0.4s ease-out"}}>
      {value && <div className={`peca jogador${value}`} />}
    </div>
  );
}

export default Celula;
