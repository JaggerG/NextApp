
"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

type Card = {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const CARD_PAIRS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...CARD_PAIRS, ...CARD_PAIRS]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
  };

  const handleCardClick = (clickedCardId: number) => {
    const clickedCard = cards[clickedCardId];
    
    // Prevent clicking if card is already flipped or matched
    if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newCards = [...cards];
    newCards[clickedCardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, clickedCardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards[firstCardId];
      const secondCard = cards[secondCardId];

      if (firstCard.value === secondCard.value) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstCardId].isMatched = true;
          matchedCards[secondCardId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCardId].isFlipped = false;
          resetCards[secondCardId].isFlipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Memory Game</h1>
      <div className={styles.stats}>
        <p>Moves: {moves}</p>
        <button className={styles.resetButton} onClick={initializeGame}>
          Reset Game
        </button>
      </div>
      <div className={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              card.isFlipped || card.isMatched ? styles.flipped : ""
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}></div>
              <div className={styles.cardBack}>{card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
