const boxes = document.querySelectorAll(".box");
const playerDisplay = document.getElementById("player");
const resetBtn = document.getElementById("reset");
const messageBox = document.getElementById("messageBox");

let currentPlayer = "O";
let gameOver = false;
let moveCount = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
];

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].textContent !== "" &&
      boxes[a].textContent === boxes[b].textContent &&
      boxes[b].textContent === boxes[c].textContent
    ) {
      showWinner(currentPlayer);
      return true;
    }
  }
  return false;
}
function showWinner(winner) {
  messageBox.innerHTML = `Hurray🎉 player ${winner} wins`;
  messageBox.classList.remove("hide");
  gameOver = true;
  disablegame();
}
function checkDraw() {
  if (moveCount === 9 && !gameOver) {
    messageBox.innerHTML = "🤝 It's a draw! Nobody wins this time";
    messageBox.classList.remove("hide");
    gameOver = true;
  }
}
function disablegame() {
  boxes.forEach((box) => (box.disabled = true));
}
function resetGame() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  currentPlayer = "O";
  playerDisplay.textContent = currentPlayer;
  gameOver = false;
  moveCount = 0;
  messageBox.classList.add("hide");
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent != "" || gameOver) return;
    box.textContent = currentPlayer;
    box.disabled = true;
    moveCount++;
    if (!checkWinner()) {
      checkDraw();
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      playerDisplay.textContent = currentPlayer;
    }
  });
});
resetBtn.addEventListener("click", resetGame);
