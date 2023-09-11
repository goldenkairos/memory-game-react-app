import "./App.css";
import Card from "./components/Card.js";
import React, { useState, useEffect } from "react";
import launchConfetti from "./components/Confetti.js";
import { BiPlayCircle } from "react-icons/bi";
import { BsSuitHeartFill } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { SiFreepik } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";
import { cardList } from "./cardList.js";

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
  //allow user to continue clicking
  const [enable, setEnable] = useState(false);

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
    setEnable(true);
  };
// console.log("cards",cards);
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
    if (enable === false) {
      return;
    }

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

  //Update card.matchFound when a pair is found
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

  const checkCompletion = () => {
    if (
      matchedPairs.length === cards.length / 2 &&
      Object.keys(matchedPairs).length !== 0
    ) {
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
      launchConfetti();
      setEnable(false);
    }
  };

  const handlenewGameClick = () => {
    resetCards();
    setMatchedPairs([]);
    shuffleCards();
    setMoves(0);
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(matchingProcess, 300);
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
      <header className="welcome">
        {/* <h1 className="welcome"> */}
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
            fontSize="3vw"
            fontWeight="bold"
            fill="white"
          >
            NomNom Matchup!
          </text>
        </svg>
        {/* </h1> */}
      </header>
      <div className="tech-stack">
        Powered by <a className="icon"
          href="https://react.dev/"><FaReact /></a> React,{" "}
        <a className="icon" href="https://react.dev/"><SiNetlify size={"16"}/></a> Netlify,{" "} 
        <a className="icon" href="https://github.com/"><BsGithub /></a> Github & {" "}
        <a className="icon" href="https://www.freepik.com/"><SiFreepik /></a> Freepik
      </div>
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
      <div className="reference">
        Made with <BsSuitHeartFill size={14} /> by{" "}
        <a
          className="minh"
          href="https://goldenkairos.github.io/personal_page/index.html"
        >
          {" "}
          ProgramMinh
        </a>{" "}
        <a
          className="icon"
          href="https://github.com/goldenkairos/memory-game-react-app"
        >
          {" "}
          <BsGithub size={16} />
        </a>
      </div>
    </div>
  );
}

export default App;
