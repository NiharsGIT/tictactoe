const button = document.getElementById("reset");
let cells = document.querySelectorAll(".row > div");
const winnigMsg = document.querySelector(".winner");
var player1 = "X";
var player2 = "O";
var currentTurn = 1;
var valueArray = [9];
var xpos = [];
var opos = [];
var winner = "";
winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
];

button.addEventListener("click", reset);
console.log(button);
console.log(cells);

main();

function main() {
  for (let i = 0; i <= cells.length; i++) {
    cells[i].addEventListener("click", cellClicked);
    valueArray[i] = i;
  }
}

function cellClicked() {
  event.target.removeEventListener("click", cellClicked);
  console.log(event);
  if (currentTurn === 1) {
    event.target.innerHTML = player1;
    currentTurn++;
  } else {
    event.target.innerHTML = player2;
    currentTurn--;
  }
  for (let j = 0; j < cells.length; j++) {
    valueArray[j] = cells[j].textContent;

    // making xpos and opos array and checking win wif there are 2 or more values in it with checkwin()
    if (!xpos.includes(j)) {
      if (valueArray[j] === "X") {
        xlen = xpos.push(j);
        if (xlen > 2) {
          checkWin(xpos, "X");
        }
      }
    }
    if (!opos.includes(j)) {
      if (valueArray[j] === "O") {
        olen = opos.push(j);
        if (olen > 2) {
          checkWin(opos, "O");
        }
      }
    }
    if (xpos.length + opos.length === 9) putMsg("Its a DRAW!!");
  }
  console.log(valueArray);
  console.log("xpos: " + xpos + "\n" + "opos: " + opos);
}

function checkWin(pos, player) {
  console.log("checking Win for pos: " + pos);

  winPatterns.forEach((wp) => {
    // checking if wp(winning position) elements are in xpos or ypos , if yes they win
    if (
      wp.every((el) => {
        return pos.indexOf(el) !== -1;
      })
    ) {
      console.log("matched!! Player" + player + "Won");
      putMsg(player + "Won");
      winner = player;
      disableAccess();
    }

    // resetting xpos ypos array if there is wi
  });
  //   console.log(winPatterns.includes(xpos.slice(-3)));
  //   if (winPatterns.includes(1)) console.log("X WON!!");
}
function disableAccess() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", cellClicked);
    valueArray[i] = i;
  }
}

function checkDraw() {
  if (winner === "") putMsg("It's a draw");
}

function putMsg(msg) {
  winnigMsg.textContent = msg;
}
function reset() {
  putMsg("");
  // Add click  listener

  // clear game board/ all the cells
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
  // clear other elements
  xpos = [];
  opos = [];
  valueArray = [];
  console.log("resetting");
  main();
}
