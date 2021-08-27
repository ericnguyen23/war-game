let dealBtn = document.getElementById("deal-button");
let drawBtn = document.getElementById("draw-button");
let cardOne = document.getElementById("card-one");
let cardTwo = document.getElementById("card-two");
let deckId;
let cardsDealt = false;
let resutlText = document.getElementById("result");
let readyText = document.getElementById("ready");
let deckCount = 52;
let deckCountText = document.getElementById("deck-count");

const dealCards = () => {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => response.json())
    .then((data) => {
      deckId = data.deck_id;
      readyText.textContent = "NEW DECK DEALT, READY TO PLAY!";
      resutlText.textContent = "";
      cardOne.innerHTML = "";
      cardTwo.innerHTML = "";
      deckCountText.textContent = "";
      deckCount = 52;

      setTimeout(() => {
        readyText.textContent = "";
      }, 2000);
    })
    .then((cardsDealt = true));
};

const drawCards = () => {
  if (cardsDealt) {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then((response) => response.json())
      .then((data) => {
        deckCount = deckCount - 2;
        deckCountText.textContent = `Amount of cards left: ${deckCount}`;

        cardOne.innerHTML = `<img src=${data.cards[0].image} class="card"/>`;
        cardTwo.innerHTML = `<img src=${data.cards[1].image} class="card" />`;
        console.log(data.cards[0], data.cards[1]);

        checkHighCard(data.cards[0], data.cards[1]);

        if (deckCount === 0) {
          drawBtn.disabled = true;
        }
      });
  }
};

const checkHighCard = (firstCard, secondCard) => {
  const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  };
  let dealerVal = cardValues[firstCard.value];
  let playerVal = cardValues[secondCard.value];

  console.log(dealerVal, playerVal);

  if (playerVal > dealerVal) {
    resutlText.textContent = "YOU WIN!";
  } else if (dealerVal > playerVal) {
    resutlText.textContent = "YOU LOSE!";
  } else resutlText.textContent = "TIE!";
};

dealBtn.addEventListener("click", dealCards);
drawBtn.addEventListener("click", drawCards);
