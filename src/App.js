import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);

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
      card: "veggies",
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
      card: "boba",
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

  //shuffle the selected cards and create pairs
  const shuffleCards = () => {
    const selectedCards = getRandomCards(cardList, 8);

    // Double the cards to create pairs
    const cardPairs = selectedCards.concat(selectedCards);

    //update each card ID
    for (let i = 0; i < cardPairs.length; i++) {
      cardPairs[i].id = i;
    }

    // Shuffle the pairs
    const shuffledPairs = shuffleArray(cardPairs);

    setCards(shuffledPairs);
    console.log(cards);
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

  const checkIsFlipped = (index) => {
    return index === firstSelection || 
    index === secondSelection || 
    openCards.includes(cards[index]) ||
    cards[index].matchFound;
  };

  const handleCardSlection = (index) => {
    // if (openCards.length <2) {
    if (firstSelection === null && openCards.length===0) {
      setFirstSelection(index);
      setOpenCards(([index]))
    } else if (secondSelection === null && !openCards.includes(index)) {
      setSecondSelection(index);
      setOpenCards((prevArray)=>[...prevArray,index]);
    };
  // } else {return;}
  };
console.log(openCards);
console.log(cards);
  // const onCardClick = (index) => {

  //   //only allow onCardClick if card.flipped = false;
  //   if (!cards[index].flipped) {
  //     // Create a copy of the cards array with the updated card
  //     const updatedCards = [...cards];
  //     updatedCards[index] = {
  //       ...updatedCards[index],
  //       flipped: !updatedCards[index].flipped,
  //     };

  //     setCards(updatedCards); // Set the updated cards as the new state
  //     console.log("after update", cards);
  //   }

  //   if (openCards.length === 1) {
  //     console.log("inside onCardClick1");
  //     setOpenCards((prev) => [...prev, index]);
  //   } else {
  //     console.log("inside onCardClick2");
  //     setOpenCards([index]);
  //   }
  // };

  // // checking if 2 current open cards are a match
  // const matchingPairs = () => {
  //   //index of the first and second selected cards
  //   const [firstSelection, secondSelection] = openCards;

  //   if (cards[firstSelection].cardName === cards[secondSelection].cardName) {
  //     console.log("we got a match!");
  //     setMatchedPairs((prev) => ([...prev,cards[firstSelection].cardName]));
  //     setOpenCards([]);
  //   } else {
  //     const updatedCards = [...cards];
  //     updatedCards[firstSelection] = {
  //       ...updatedCards[firstSelection],
  //       flipped: !updatedCards[firstSelection].flipped,
  //     };
  //     updatedCards[secondSelection] = {
  //       ...updatedCards[secondSelection],
  //       flipped: !updatedCards[secondSelection].flipped,
  //     };
  //     setCards(updatedCards); // Set the updated cards as the new state
  //   }
  // };
 const resetCards =()=>{
  setOpenCards([]);
  setFirstSelection(null);
  setSecondSelection(null);
 };

  const matchingProcess =() => {
    setOpenCards([firstSelection, secondSelection]);

    if (cards[firstSelection].cardName === cards[secondSelection].cardName) {
      console.log("we got a match!");
      setMatchedPairs((prev) => ([...prev,cards[firstSelection].cardName]));
      resetCards();
    } else {
      // setOpenCards([]);
      // setFirstSelection(null);
      // setSecondSelection(null);
      setTimeout(resetCards(),1000);
    }
  };

  const checkCompletion =() => {
    console.log("length of matched pairs",Object.keys(matchedPairs).length);
    console.log("length of cards",cards.length/2);
    if (matchedPairs.length === cards.length/2 && Object.keys(matchedPairs).length  !==0) {
      console.log("congrats!!!");
    }
  };


  const handlenewGameClick = () => {
    resetCards();
    setMatchedPairs([]);
    // setOpenCards([]);
    shuffleCards();
    
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      // timeout = setTimeout(matchingPairs, 1000);
      timeout = setTimeout(matchingProcess, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCards]);

  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkCompletion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[matchedPairs]);

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
            index={index}
            // onClick={() => onCardClick(index)}
            isFlipped={card.flipped}
            flipped={checkIsFlipped(index)}
            handleCardSlection={handleCardSlection}
          />
        ))}
      </div>
      <h3>Match found:</h3>
    </div>
  );
}

export default App;
