import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState(null);
  const [secondSelectedCard, setSecondSelectedCard] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  // const [cardsMatch, setCardsMatch] = useState(false);

  const cardList = [
    {
      cardName: "burger",
      src: require(`./assets/burger.jpg`),
      id: 1,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "frend fries",
      src: require(`./assets/french fries.jpg`),
      id: 2,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "hotdog",
      src: require(`./assets/hotdog.jpg`),
      id: 3,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "ice cream",
      src: require(`./assets/ice_cream.jpg`),
      id: 4,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "pancakes",
      src: require(`./assets/pancakes.jpg`),
      id: 5,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "veggies",
      src: require(`./assets/veggies.jpg`),
      id: 6,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "pizza",
      src: require(`./assets/pizza.jpg`),
      id: 7,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "ramen",
      src: require(`./assets/ramen.jpg`),
      id: 8,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "takoyaki",
      src: require(`./assets/takoyaki.jpg`),
      id: 9,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "onigiri",
      src: require(`./assets/onigiri.jpg`),
      id: 10,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "smores",
      src: require(`./assets/smores.jpg`),
      id: 11,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "breakfast",
      src: require(`./assets/breakfast.jpg`),
      id: 12,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "boba",
      src: require(`./assets/boba.jpg`),
      id: 13,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "donut",
      src: require(`./assets/donut.jpg`),
      id: 14,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "coffee_toast",
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

  // const checkIsFlipped = (card) => {
  //   //return true if one of these condition meets
  //   return (
  //     matchedCards.includes(card) ||
  //     card === firstSelectedCard ||
  //     card === secondSelectedCard )
  // };

  const checkIsFlipped = (index) => {
    return (
      index === firstSelectedCard ||
      index === secondSelectedCard ||
      matchedCards.includes(index)
    );
  };

  
  // const onCardClick = (card) => {
  //   console.log(cards);
  //   firstSelectedCard
  //     ? setSecondSelectedCard(card)
  //     : setFirstSelectedCard(card);
  // };

  const onCardClick = (index) => {
    if (matchedCards.includes(index)) {
      // Ignore clicks on matched cards
      return;
    }
  
    if (index === firstSelectedCard) {
      // Ignore the same card clicked twice
      return;
    }

    if (firstSelectedCard === null) {
      setFirstSelectedCard(index);
    } else if (secondSelectedCard === null) {
      setSecondSelectedCard(index);
    }
  };

  const resetCards = () => {
    setFirstSelectedCard(null);
    setSecondSelectedCard(null);

  };

  // const matchingProcess = () => {
  //   if (firstSelectedCard && secondSelectedCard) {
  //     if (firstSelectedCard.cardName === secondSelectedCard.cardName) {
  //       const updatedCards = cards.map((card)=>{
  //         if (card.cardName === firstSelectedCard.cardName) {
  //           return {...card, matchFound: true}
  //         }
  //         return card;
  //       })
  //       setCards(updatedCards);
  //       console.log("it's a match!");
  //       resetCards();
  //     }

  //   } else {
  //     setTimeout(() => resetCards(), 1000)
  //   }
  // }

  const handlenewGameClick = () => {
    shuffleCards();
    setMatchedCards([]);
    resetCards();
  };

//   useEffect(() => {if (firstSelectedCard && secondSelectedCard) {
//     if (firstSelectedCard.cardName === secondSelectedCard.cardName) {
//       console.log("it's a match!");
//       setMatchedPairs((prev) => ([...prev,cards[firstSelectedCard].cardName]));
//       const updatedCards = cards.map((card)=>{
//         if (card.cardName === firstSelectedCard.cardName) {
//           return {...card, matchFound: true}
//         }
//         return card;
//       })
//       setCards(updatedCards);
//       resetCards();
//     }
//   } else {
//     setTimeout(() => resetCards(), 1000)
//   }
// }, [firstSelectedCard, secondSelectedCard]);

useEffect(() => {
  if (firstSelectedCard !== null && secondSelectedCard !== null) {
    if (cards[firstSelectedCard].cardName === cards[secondSelectedCard].cardName) {
      console.log("it's a match!");
      setMatchedCards((prev) => [...prev, cards[firstSelectedCard].cardName]);

      // Add the matched cards to the matchedCards state
      setMatchedCards((prev) => [...prev, firstSelectedCard, secondSelectedCard]);
    } else {
      console.log("No match, flipping cards back...");
      setTimeout(() => {
        // Flip the cards back to their initial state
        setFirstSelectedCard(null);
        setSecondSelectedCard(null);
      }, 1000);
    }
  }
}, [firstSelectedCard, secondSelectedCard, cards]);



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
            isFlipped={checkIsFlipped(index)}
            onClick={onCardClick}
          />
        ))}
      </div>
      <h3>Match found:</h3>
    </div>
  );
}

export default App;
