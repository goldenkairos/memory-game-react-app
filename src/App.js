import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState(null);
  const [secondSelectedCard, setSecondSelectedCard] = useState(null);

  const cardList = [
    {
      card: "burger",
      src: require(`./assets/burger.jpg`),
      id: 1,
      matchFound: false,
      flipped: false,
    },
    {
      card: "frend fries",
      src: require(`./assets/french fries.jpg`),
      id: 2,
      matchFound: false,
      flipped: false,
    },
    {
      card: "hotdog",
      src: require(`./assets/hotdog.jpg`),
      id: 3,
      matchFound: false,
      flipped: false,
    },
    {
      card: "ice cream",
      src: require(`./assets/ice_cream.jpg`),
      id: 4,
      matchFound: false,
      flipped: false,
    },
    {
      card: "pancakes",
      src: require(`./assets/pancakes.jpg`),
      id: 5,
      matchFound: false,
      flipped: false,
    },
    {
      card: "veggies",
      src: require(`./assets/veggies.jpg`),
      id: 6,
      matchFound: false,
      flipped: false,
    },
    {
      card: "pizza",
      src: require(`./assets/pizza.jpg`),
      id: 7,
      matchFound: false,
      flipped: false,
    },
    {
      card: "ramen",
      src: require(`./assets/ramen.jpg`),
      id: 8,
      matchFound: false,
      flipped: false,
    },
    {
      card: "takoyaki",
      src: require(`./assets/takoyaki.jpg`),
      id: 9,
      matchFound: false,
      flipped: false,
    },
    {
      card: "onigiri",
      src: require(`./assets/onigiri.jpg`),
      id: 10,
      matchFound: false,
      flipped: false,
    },
    {
      card: "smores",
      src: require(`./assets/smores.jpg`),
      id: 11,
      matchFound: false,
      flipped: false,
    },
    {
      card: "breakfast",
      src: require(`./assets/breakfast.jpg`),
      id: 12,
      matchFound: false,
      flipped: false,
    },
    {
      card: "boba",
      src: require(`./assets/boba.jpg`),
      id: 13,
      matchFound: false,
      flipped: false,
    },
    {
      card: "donut",
      src: require(`./assets/donut.jpg`),
      id: 14,
      matchFound: false,
      flipped: false,
    },
    {
      card: "coffee_toast",
      src: require(`./assets/coffee_toast.jpg`),
      id: 15,
      matchFound: false,
      flipped: false,
    },
  ];

//randomly picking number of cards out of the deck
const getRandomCards = (array, count) => {
      const shuffledArray = shuffleArray(array);
      return shuffledArray.slice(0, count);
};

  //shuffle the selected cards and create pairs
  const shuffleCards = () => {
    const selectedCards = getRandomCards(cardList, 8);

    // Double the cards to create pairs
    const cardPairs = selectedCards.concat(selectedCards);

    //update each card ID
      let i = 0;
      const updatedCardPairs = cardPairs.map((card) => ({
        ...card,
        id: i+=1
      }))
    console.log("cardPairs", cardPairs);

    // Shuffle the pairs
    const shuffledPairs = shuffleArray(updatedCardPairs);
    console.log("shuffledPairs", shuffledPairs);
    setCards(shuffledPairs);
  };

  const shuffleArray = (array) => {
    console.log("array in shuffleArray", array);
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const checkIsFlipped = (card) => {
    //return true if one of these condition meets
    return (
      card === firstSelectedCard ||
      card === secondSelectedCard ||
      card.matchFound
    );
  };

  const onCardClick = (card) => {
    console.log(cards);
    firstSelectedCard
      ? setFirstSelectedCard(card)
      : setSecondSelectedCard(card);
    console.log(card);
  };

  const handlenewGameClick = () => {
    shuffleCards();
  };

  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header>
        <h2>Hello World! Welcome to Memory Game</h2>
        <p>
          On the game board, there are always two identical cards. <br />
          When finding the matching pair, the cards will disappear, and you will
          gain a point!
        </p>
      </header>
      <button className="NewGame" onClick={handlenewGameClick}>
        {" "}
        New Game
      </button>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            isFlipped={checkIsFlipped(card)}
            onClick={onCardClick}
          />
        ))}
      </div>
      <h3>Match found:</h3>
    </div>
  );
}

export default App;
