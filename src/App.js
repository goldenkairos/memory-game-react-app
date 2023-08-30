import "./App.css";
import Card from "./components/Card.js";
import React, { useState } from "react";
// import cardList from "./CardList/cardList.js";

function App() {
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
  ];

  // function shuffleCards(array) {
  //   const shuffledArray = [...array]

  //   for (let i = shuffledArray.length -1; i>0; i--) {
  //     const j = Math.floor(Math.random() * (i+1));

  //     //swapping cards
  //     [ shuffledArray[i], shuffledArray[j] ] = [ shuffledArray[j], shuffledArray[i] ]

  //     //Check for no duplicates
  //     if (shuffledArray[i].id === shuffledArray[j].id) {
  //       //If duplicate is found, swap shuffledArray[i] with the last unprocessed card
  //       const lastUnprocessed = shuffledArray.pop();
  //       shuffledArray[i] = lastUnprocessed;
  //     }
  //   }
  //   let shuffledCards = shuffledArray.slice(0,8)
  //   setCards((shuffledCards.concat(shuffledCards)))
  //   }

  function shuffleCards(array) {
    // Shuffle the original array
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    // Select the first 8 cards
    const selectedCards = shuffledArray.slice(0, 8);

    // Duplicate the selected cards to create pairs
    const cardPairs = selectedCards.concat(selectedCards);

    // Shuffle the duplicated array again
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    console.log(cardPairs);
    return cardPairs;
  }

  const [cards, setCards] = useState(() => shuffleCards(cardList));

  const handlenewGameClick = () => {
    console.log("New game!");
    setCards(shuffleCards(cardList));
  };

  return (
    <div className="App">
      <header>
        <h2>Hello World! Welcome to Memory Game</h2>
        <p>
          Test your brain with this memory game. On the game board, there are
          always two identical cards. When finding the matching pair, the cards will
          disappear and you will gain a point! 
        </p>
      </header>
      <button onClick={handlenewGameClick}> New Game</button>
      <div className="game-board">
        {cards &&
          Object.values(cards).map((card) => (
            <Card key={card.id} card={card.card} />
          ))}
      </div>
    </div>
  );
}

export default App;
