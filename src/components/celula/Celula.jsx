import { useState, useEffect } from "react";
import "../../components/celula/Celula.css";

function Celula({ row, col, value, isBonus }) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (value) {
      setShouldAnimate(true);
    }
  }, [value]);

  return (
    <div 
      className={`celula ${isBonus ? "bonus" : ""}`}
      style={{ "--drop-distance": (row + 1) }}
    >
      {value && (
        <div 
          className={`peca jogador${value} ${shouldAnimate ? 'animate-drop' : ''}`}
          onAnimationEnd={() => setShouldAnimate(false)}
        />
      )}
    </div>
  );
}

export default Celula;
