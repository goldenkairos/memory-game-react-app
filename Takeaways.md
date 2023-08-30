##Shuffling logic

When the deck has 10 pairs,and we want to only randomly pick 8 pairs by shuffle the array, select 8 cards, copy the selected card to create pairs. The logic below causes more than 8 pairs to show up after each "New Game" button is clicked
Initial logic:

`  function shuffleCards(array) {
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
    console.log("Shuffled cards:", cardPairs); // Log the shuffled cards
    // return cardPairs;
    // setCards([]);
    setCards(cardPairs);
    // console.log("after setCards in shuffledCard method",cards)
  }
  `

  **Solution**
Breaking each action to separate functions: shuffledCards, getRandomCards and shuffledArray works.

    The issue what I encountered might be related to how React handles state updates and renders components. When we have a complex function that performs multiple operations and then updates state at the end of it, React might not guarantee an immediate re-render. Instead, it batches state updates for performance reasons.

    In the above shuffleCards function, it performs several operations sequentially and then sets the cards state at the end. However, React may batch these updates, leading to unexpected results where the state update doesn't immediately trigger a re-render.

    When breaking down the logic into separate methods (shuffleArray, getRandomCards, and shuffleCards), we are likely allowing React to handle each state update more explicitly, which can lead to a more predictable re-rendering behavior.

    In summary, breaking down complex operations into smaller, more focused functions can help ensure that React handles state updates and component rendering as expected. It allows for better control and predictability in your application's behavior.