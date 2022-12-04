let points = 0;
if (localStorage.getItem("points") === null) {
  localStorage.setItem("points", points);
} else {
  points = localStorage.getItem("points");
}

const scorePoints = document.querySelector(".score-points");
scorePoints.innerHTML = points;

const RADIUS = 172.67;
const icons = document.querySelectorAll(".icon.clickable");

const closeButton = document.querySelector(".close-button");
const rulesModal = document.querySelector(".rules-modal");
const rulesBackdrop = document.querySelector(".rules-backdrop");
const rulesButton = document.querySelector(".rules-button");
const playAgainButton = document.querySelector(".play-again");

const middleColumn = document.querySelector(".column-middle");

const [userIcon, aiIcon] = document.querySelectorAll(".play-icon");
const result = document.querySelector(".result");

const playSection = document.querySelector(".play");
const mainSection = document.querySelector(".main");

let iconsList = [
  "icon-scissors",
  "icon-paper",
  "icon-rock",
  "icon-lizard",
  "icon-spock",
];
let playerIcon = "";
let computerIcon = "";
let winner;

window.addEventListener("resize", () => {
  console.log(window.innerWidth);
});

function winning(index1, index2) {
  return (index1 + 1) % 5 === index2 || (index1 + 3) % 5 === index2;
}

icons.forEach((icon, index) => {
  //console.log(icon.offsetWidth, icon.offsetHeight);
  let left = 164 + RADIUS * Math.sin((72 * index * Math.PI) / 180);
  let top = RADIUS - RADIUS * Math.cos((72 * index * Math.PI) / 180);

  console.log(left, top);
  icon.style.left = `${
    164 + RADIUS * Math.sin((72 * index * Math.PI) / 180)
  }px`;
  icon.style.top = `${
    RADIUS - RADIUS * Math.cos((72 * index * Math.PI) / 180)
  }px`;

  icon.addEventListener("click", (e) => {
    playSection.classList.remove("disabled");
    mainSection.classList.add("disabled");

    playerIcon = iconsList[index];
    userIcon.classList.add(playerIcon);

    userIcon.prepend(document.createElement("img"));
    userIcon.firstElementChild.src = `./images/${playerIcon}.svg`;
    userIcon.firstElementChild.alt = playerIcon;

    setTimeout(() => {
      let randomIndex = Math.floor(Math.random() * iconsList.length);
      while (randomIndex === index)
        randomIndex = Math.floor(Math.random() * iconsList.length);

      computerIcon = iconsList[randomIndex];
      aiIcon.classList.add(computerIcon);
      aiIcon.classList.remove("icon-disabled");

      aiIcon.prepend(document.createElement("img"));
      aiIcon.firstElementChild.src = `./images/${computerIcon}.svg`;
      aiIcon.firstElementChild.alt = computerIcon;

      middleColumn.classList.remove("disabled");

      if (winning(index, randomIndex)) {
        // Player wins
        winner = 0;
        result.innerHTML = "You win";
        userIcon.classList.add("winning-icon");
        points++;
        scorePoints.innerHTML = points;
        localStorage.setItem("points", points);
      } else {
        // Computer wins
        winner = 1;
        result.innerHTML = "You lose";
        aiIcon.classList.add("winning-icon");
      }
    }, 2000);
  });
});

closeButton.addEventListener("click", () => {
  rulesModal.classList.add("disabled");
  rulesBackdrop.classList.add("disabled");
});

rulesButton.addEventListener("click", () => {
  if (rulesModal.classList.contains("disabled")) {
    rulesModal.classList.remove("disabled");
    rulesBackdrop.classList.remove("disabled");
  }
});

rulesBackdrop.addEventListener("click", () => {
  rulesModal.classList.add("disabled");
  rulesBackdrop.classList.add("disabled");
});

playAgainButton.addEventListener("click", () => {
  middleColumn.classList.add("disabled");
  playSection.classList.add("disabled");
  mainSection.classList.remove("disabled");

  aiIcon.classList.remove(computerIcon);
  aiIcon.classList.add("icon-disabled");

  aiIcon.removeChild(aiIcon.firstElementChild);
  aiIcon.firstElementChild.src = "";
  aiIcon.firstElementChild.alt = "";

  userIcon.classList.remove(playerIcon);
  userIcon.removeChild(userIcon.firstElementChild);

  if (winner === 0) {
    userIcon.classList.remove("winning-icon");
  } else {
    aiIcon.classList.remove("winning-icon");
  }
});
