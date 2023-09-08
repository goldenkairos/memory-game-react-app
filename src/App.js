import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";
import launchConfetti from "./components/Confetti.js";
import { BiPlayCircle } from "react-icons/bi";

function App() {
  const [cards, setCards] = useState([]);
  const [openCards, setOpenCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );

  const cardList = [
    {
      cardName: "burger",
      src: require(`./assets/burger.jpg`),
      id: 1,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "french fries",
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
    {
      cardName: "shiba_sushi",
      src: require(`./assets/shiba_sushi.jpg`),
      id: 16,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "sushi",
      src: require(`./assets/sushi.jpg`),
      id: 17,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "tempura",
      src: require(`./assets/sushi.jpg`),
      id: 18,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "bento",
      src: require(`./assets/bento.jpg`),
      id: 19,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "gyoza",
      src: require(`./assets/gyoza.jpg`),
      id: 19,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "burrito",
      src: require(`./assets/burrito.jpg`),
      id: 20,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "sushi2",
      src: require(`./assets/sushi2.jpg`),
      id: 20,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "chips_salsa",
      src: require(`./assets/chips_salsa.jpg`),
      id: 21,
      matchFound: false,
      flipped: false,
    },
    {
      cardName: "taco",
      src: require(`./assets/taco.jpg`),
      id: 22,
      matchFound: false,
      flipped: false,
    },
  ];

  //shuffle the selected cards and create pairs
  const shuffleCards = () => {
    const selectedCards = getRandomCards(cardList, 8);

    // Double the cards to create pairs
    const cardPairs = selectedCards.concat(selectedCards);

    let i = 0;
    const updatedCardPairs = cardPairs.map((card) => ({
      ...card,
      id: (i += 1),
    }));

    // Shuffle the pairs
    const shuffledPairs = shuffleArray(updatedCardPairs);

    setCards(shuffledPairs);
  };
  console.log(cards);
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
    return (
      index === firstSelection ||
      index === secondSelection ||
      openCards.includes(cards[index]) ||
      cards[index].matchFound
    );
  };

  const handleCardSlection = (index) => {
    if (firstSelection === null && openCards.length === 0) {
      setFirstSelection(index);
      setOpenCards([index]);
    } else if (secondSelection === null && !openCards.includes(index)) {
      setMoves((moves) => moves + 1);
      setSecondSelection(index);
      setOpenCards((prevArray) => [...prevArray, index]);
    }
  };

  const resetCards = () => {
    setOpenCards([]);
    setFirstSelection(null);
    setSecondSelection(null);
  };

  const markCardsAsMatched = (firstSelection, secondSelection) => {
    setCards((prevCards) =>
      prevCards.map((card, index) => {
        if (index === firstSelection || index === secondSelection) {
          return { ...card, matchFound: true };
        }
        return card;
      })
    );
  };

  const matchingProcess = () => {
    if (!firstSelection && !secondSelection) {
      return;
    }
    setOpenCards([firstSelection, secondSelection]);
    if (
      cards[firstSelection].cardName === cards[secondSelection].cardName &&
      !matchedPairs.includes(cards[firstSelection])
    ) {
      setMatchedPairs((prev) => [...prev, cards[firstSelection]]);
      markCardsAsMatched(firstSelection, secondSelection);
      resetCards();
    } else {
      setTimeout(() => resetCards(), 500);
    }
  };
  console.log(matchedPairs);

  const checkCompletion = () => {
    if (
      matchedPairs.length === cards.length / 2 &&
      Object.keys(matchedPairs).length !== 0
    ) {
      const highScore = Math.min(moves, bestScore);
      console.log(highScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
      console.log(localStorage.getItem("bestScore"))
      launchConfetti();
    }
  };

  console.log(localStorage.getItem("bestScore"))

  const handlenewGameClick = () => {
    resetCards();
    setMatchedPairs([]);
    shuffleCards();
    setMoves(0);
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(matchingProcess, 800);
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
  }, [matchedPairs]);

  return (
    <div className="App">
      <header>
        <h1 className="welcome">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100"
            viewBox="0 0 600 100"
            textAnchor="middle"
            alignmentBaseline="middle"
            // className="svgTitle"
          >
            <text
              className="svgText"
              x="50%"
              y="50%"
              fontSize="4vw"
              fontWeight="bold"
              fill="white"
            >
              NomNom Matchup
            </text>
          </svg>
        </h1>
      </header>
      <div className="game-board">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            // onClick={() => onCardClick(index)}
            // isFlipped={card.flipped}
            flipped={checkIsFlipped(index)}
            handleCardSlection={handleCardSlection}
          />
        ))}
      </div>
      <footer>
        <div className="scores">
          <span className="matches">Match found: {matchedPairs.length}</span>
          <span className="moves">Total Moves: {moves}</span>
          <span className="highest-score">
            Best Score: {localStorage.getItem("bestScore")}
          </span>
        </div>
        <div>
          <button className="new-game-button" onClick={handlenewGameClick}>
            <span className="button-text">New Game</span>
            <BiPlayCircle size={30} />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
