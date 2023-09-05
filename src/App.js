import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);

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
    };

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

  const onCardClick = (index) => {
    console.log("before update",cards);
    console.log("index here",index);
    //only allow onCardClick if card.flipped = false;
    if (!cards[index].flipped){
    // cards[index].flipped = !cards[index].flipped;
       // Create a copy of the cards array with the updated card
       const updatedCards = [...cards];
       updatedCards[index] = { ...updatedCards[index], flipped: !updatedCards[index].flipped };
       
       setCards(updatedCards); // Set the updated cards as the new state
    console.log("after update",cards);
  }
    
    if (openCards.length ===1) {
      console.log("inside onCardClick1");
      setOpenCards((prev) => [...prev,index]);
    } else {
      console.log("inside onCardClick2");
      setOpenCards([index]);
    }
  }

  // checking if 2 current open cards are a match
  const matchingPairs =() => {
    //index of the first and second selected cards
    const [firstSelection, secondSelection] = openCards;
    if (cards[firstSelection].cardName === cards[secondSelection].cardName) {
      console.log("we got a match!")
    } else {
      const updatedCards = [...cards];
      updatedCards[firstSelection] = { ...updatedCards[firstSelection], flipped: !updatedCards[firstSelection].flipped };
      updatedCards[secondSelection] = { ...updatedCards[secondSelection], flipped: !updatedCards[secondSelection].flipped };       
      setCards(updatedCards); // Set the updated cards as the new state
    }

  };


  const handlenewGameClick = () => {
    shuffleCards();
    // console.log(cards);
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(matchingPairs, 1000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);


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
      <button className="NewGame" onClick={handlenewGameClick}> New Game</button>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card key={index} card={card} index={index} onClick={()=>onCardClick(index)} isFlipped={card.flipped}/>
        ))}
      </div>
      <h3>Match found:</h3>
    </div>
  );
}

export default App;
