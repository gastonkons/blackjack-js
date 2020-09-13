// 2C = Trebol
// 2D = Diamante
// 2H = Corazon
// 2S = Espadas

let deck = [];
const typesCard = ["C", "D", "H", "S"];
const specialCard = ["A", "J", "Q", "K"];

let pointsPlayer = 0;
let pointsComputer = 0;

// Referencias del HTML
const btnGet = document.querySelector("#btnGet");
const btnStop = document.querySelector("#btnStop");
const btnNew = document.querySelector("#btnNew");

const cardsPlayer = document.querySelector("#cardsPlayer");
const cardsComputer = document.querySelector("#cardsComputer");
const pointsHTML = document.querySelectorAll(".game-players h2 span");
const result = document.querySelector(".result");
const modal = document.querySelector(".modal");

// Crear Deck

const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (type of typesCard) {
      deck.push(i + type);
    }
  }

  for (spec of specialCard) {
    for (type of typesCard) {
      deck.push(spec + type);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

createDeck();

// Pedir carta

const getCard = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  let card = deck.pop();
  return card;
};

// Valor de la carta

const valueCard = (card) => {
  const value = card.substring(0, card.length - 1);
  return !isNaN(value) ? value * 1 : value === "A" ? 11 : 10;
};

// Agregar carta al HTML según su indice

const createCard = (elementHTML) => {
  const card = getCard();
  if (elementHTML === pointsHTML[0]) {
    pointsPlayer += valueCard(card);
    elementHTML.innerText = pointsPlayer;
  } else {
    pointsComputer += valueCard(card);
    elementHTML.innerText = pointsComputer;
  }
  const imgCard = document.createElement("img");
  imgCard.src = `./assets/images/cartas/${card}.png`;
  imgCard.classList.add("card", "move");
  setTimeout(() => {
    imgCard.classList.remove("move");
  }, 100);
  if (elementHTML === pointsHTML[0]) {
    cardsPlayer.append(imgCard);
  } else {
    cardsComputer.append(imgCard);
  }
};

// Turno de la Computadora

const computerTurn = (pointsMin) => {
  do {
    createCard(pointsHTML[1]);
    if (pointsMin > 21) {
      break;
    }
  } while (pointsComputer <= pointsMin && pointsMin <= 21);

  // Quién gana?

  if (pointsComputer > 21) {
    createModal(
      "You win!",
      "Congratulations, so next time it won't be so easy.."
    );
    toggleActive();
  } else if (pointsComputer === pointsMin) {
    createModal("We tie!", "Nobody lost, that's good right?");
    toggleActive();
  } else {
    createModal("You lost.", "I hope you have more luck next time.");
    toggleActive();
  }
};

// Desabilitar botón

const disableBtn = (btn) => {
  btn.disabled = true;
  btn.style.background = "#333";
};

const disableBtnOff = (btn) => {
  btn.disabled = false;
  btn.style.background = "#06c";
};

// Toggle class .active

const toggleActive = () => {
  result.classList.toggle("active");
};

// Crear Modal

const createModal = (title, description) => {
  modal.innerHTML = "";
  const h3 = document.createElement("h3");
  const p = document.createElement("p");
  const btn = document.createElement("button");
  h3.innerText = title;
  p.innerText = description;
  btn.innerText = "Close";
  btn.addEventListener("click", () => {
    toggleActive();
  });
  modal.prepend(h3, p, btn);
};

// Valores por default

const defaultValues = () => {
  pointsComputer = 0;
  pointsPlayer = 0;
  pointsHTML[0].innerText = 0;
  pointsHTML[1].innerText = 0;
  disableBtnOff(btnGet);
  disableBtnOff(btnStop);
  cardsComputer.innerHTML = "";
  cardsPlayer.innerHTML = "";
};

// Nuevo Juego!

const newGame = () => {
  createDeck();
  defaultValues();
  result.classList.remove("active");
};

// Eventos

btnGet.addEventListener("click", () => {
  createCard(pointsHTML[0]);
  if (pointsPlayer > 21) {
    console.warn("Perdiste :(");
    disableBtn(btnGet);
    disableBtn(btnStop);
    computerTurn(pointsPlayer);
  } else if (pointsPlayer === 21) {
    disableBtn(btnGet);
    disableBtn(btnStop);
    computerTurn(pointsPlayer);
  }
});

btnStop.addEventListener("click", () => {
  disableBtn(btnGet);
  disableBtn(btnStop);
  computerTurn(pointsPlayer);
});

btnNew.addEventListener("click", () => {
  newGame();
});
