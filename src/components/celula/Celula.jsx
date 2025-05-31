import { useState, useEffect } from "react";
import "../../components/celula/Celula.css";

/**
 * Componente que renderiza uma célula individual do tabuleiro.
 * Cada célula pode estar em um dos seguintes estados:
 * - Vazia (sem peça)
 * - Com peça azul (jogador 1)
 * - Com peça vermelha (jogador 2)
 * - Célula bônus (destacada em laranja)
 * 
 * Quando uma nova peça é colocada, a célula executa uma animação
 * de queda, simulando a peça caindo do topo do tabuleiro até sua
 * posição final. A distância da queda é calculada com base na
 * posição da linha.
 * 
 * @param {Object} props - Propriedades do componente
 * @param {number} props.row - Índice da linha (0-5, de cima para baixo)
 * @param {number} props.col - Índice da coluna (0-6, da esquerda para direita)
 * @param {number|null} props.value - Valor da célula (1 = azul, 2 = vermelho, null = vazia)
 * @param {boolean} props.isBonus - Se true, a célula é uma célula bônus
 */
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
