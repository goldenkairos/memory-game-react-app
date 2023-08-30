// import "./App.css";
// import Card from "./components/Card.js";
// import React, { useState, useEffect } from "react";
// // import cardList from "./CardList/cardList.js";

// function App() {
//   const [cards, setCards] = useState([]);

//   const cardList = [
//     {
//       card: "burger",
//       src: require(`./assets/burger.jpg`),
//       id: 1,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "frend fries",
//       src: require(`./assets/french fries.jpg`),
//       id: 2,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "hotdog",
//       src: require(`./assets/hotdog.jpg`),
//       id: 3,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "ice cream",
//       src: require(`./assets/ice_cream.jpg`),
//       id: 4,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "pancakes",
//       src: require(`./assets/pancakes.jpg`),
//       id: 5,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "veggies",
//       src: require(`./assets/veggies.jpg`),
//       id: 6,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "pizza",
//       src: require(`./assets/pizza.jpg`),
//       id: 7,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "ramen",
//       src: require(`./assets/ramen.jpg`),
//       id: 8,
//       matchFound: false,
//       flipped: false,
//     },
//     {
//       card: "takoyaki",
//       src: require(`./assets/takoyaki.jpg`),
//       id: 9,
//       matchFound: false,
//       flipped: false,
//     },
//   ];

//   useEffect(() => {
//     console.log("useEffect here");
//     shuffleCards(cardList);
//   }, []);


// function shuffleCards(array) {
//   // Shuffle the original array

//   const shuffledArray = [...array];
//   for (let i = shuffledArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffledArray[i], shuffledArray[j]] = [
//       shuffledArray[j],
//       shuffledArray[i],
//     ];
//   }

//   // Select the first 8 cards
//   const selectedCards = shuffledArray.slice(0, 8);

//   // Duplicate the selected cards to create pairs
//   const cardPairs = selectedCards.concat(selectedCards);

//   // Shuffle the duplicated array again
//   for (let i = cardPairs.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
//   }
//   console.log("Shuffled cards:", cardPairs); // Log the shuffled cards
//   // return cardPairs;
//   // setCards([]);
//   setCards(cardPairs);
  // console.log("after setCards in shuffledCard method",cards)
// }

//   // const [cards, setCards] = useState(null);

//   const handlenewGameClick = () => {
//     console.log("New game!");
//     shuffleCards(cardList);
//     console.log("after setCards in New Game", cards);
//   };

//   // useEffect(() => {
//   //   console.log("useEffect here");
//   //   shuffleCards(cardList);
//   // }, []);

//   return (
//     <div className="App">
//       <header>
//         <h2>Hello World! Welcome to Memory Game</h2>
//         <p>
//           Test your brain with this memory game. On the game board, there are
//           always two identical cards. When finding the matching pair, the cards
//           will disappear and you will gain a point!
//         </p>
//       </header>
//       <button onClick={handlenewGameClick}> New Game</button>
//       <div className="game-board">
//         {cards && cards.map((card) => <Card key={card.id} card={card} />)}
//       </div>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const cardList =  [
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


  useEffect(() => {
    shuffleCards(cardList);
  }, []);

  //shuffle the selected cards and create pairs
  const shuffleCards = (array) => {

    const selectedCards = getRandomCards(array, 8)

    // Double the cards to create pairs
    const cardPairs = selectedCards.concat(selectedCards);
    
    // Shuffle the pairs
    const shuffledPairs = shuffleArray(cardPairs);

    setCards(shuffledPairs);
  };

  //randomly picking number of cards out of the deck
const getRandomCards = (array, count) => {
    const shuffledArray = shuffleArray(array);
    return shuffledArray.slice(0, count);
  };

  const shuffleArray = (array) => {
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

  const handlenewGameClick = () => {
    shuffleCards(cardList);
  };

  return (
    <div className="App">
      <header>
        <h2>Hello World! Welcome to Memory Game</h2>
        <p>
          On the game board, there are
          always two identical cards. <br />         
          When finding the matching pair, the cards
          will disappear, and you will gain a point!
        </p>
      </header>
      <button onClick={handlenewGameClick}> New Game</button>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
      <h3>Match found:</h3>
    </div>
  );
}

export default App;
