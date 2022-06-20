// a simple tic tac toe works for any size of tictactoe in a square matrix
// i.e 2X2, 3X3,..., iXj ; i = j
// where i is number of rows and j is number of columns

//global values accessible across all the functions;
let player = "X";
let gameArray = [];
let count = 0;
const arrLength = 3;

let gameState = false; //if true there is a winner

//check if there is a winner along either diagonal, vertical or horizontal fields
function checkPlay(array) {
  // a dummy temporary array to check if elements in it are equal
  let testArr = [];

  //destructures array
  const [ele1, ele2] = array;

  //check if element is in corner
  if (
    (ele1 === 0 && ele2 === 0) ||
    (ele1 === 0 && ele2 === arrLength - 1) ||
    (ele1 === arrLength - 1 && ele2 === 0) ||
    (ele1 === arrLength - 1 && ele2 === arrLength - 1)
  ) {
    //check top-left to bottom-right
    if (ele1 === ele2) {
      for (let i = 0; i < arrLength; i++) {
        testArr.push(gameArray[i][i]);
        if (testArr[0] !== testArr[i]) {
          break;
        } else if (i === arrLength - 1 && testArr[0] === testArr[i]) {
          return true;
        }
      }
    }
    //check top-right to bottom-left
    else {
      testArr = [];
      for (let i = 0; i < arrLength; i++) {
        testArr.push(gameArray[i][arrLength - 1 - i]);
        if (testArr[0] !== testArr[i]) {
          break;
        } else if (i === arrLength - 1 && testArr[0] === testArr[i]) {
          return true;
        }
      }
    }
  }

  testArr = []; // reset temp array
  //check rows (horizontal)
  for (let i = 0; i < arrLength; i++) {
    testArr.push(gameArray[ele1][i]);
    if (testArr[0] !== testArr[i]) {
      break;
    } else if (i === arrLength - 1 && testArr[0] === testArr[i]) {
      return true;
    }
  }

  testArr = []; //reset temp array
  //check columns (verical)
  for (let i = 0; i < arrLength; i++) {
    testArr.push(gameArray[i][ele2]);
    if (testArr[0] !== testArr[i]) {
      break;
    } else if (i === arrLength - 1 && testArr[0] === testArr[i]) {
      return true;
    }
  }

  return false;
}

// handle onClick events
function btnClick(e) {
  if (gameState === true) return;

  const btn = e.target;
  const numArr = Array.from(btn.name, Number);

  if (btn.innerHTML === "X" || btn.innerHTML === "O") return;
  if (count === Math.pow(arrLength, 2))
    return (document.getElementById("player").innerHTML =
      "maximum field played");

  btn.innerHTML = player;

  if (player === "X") {
    btn.style.color = "red";
    gameArray && (gameArray[numArr[0]][numArr[1]] = "X");
    gameState = checkPlay(numArr);
    if (gameState === true) {
      document.getElementById(
        "player-container"
      ).innerHTML = `Player ${player} wins`;
    }

    player = "O";
  } else if (player === "O") {
    btn.style.color = "green";
    gameArray && (gameArray[numArr[0]][numArr[1]] = "O");
    gameState = checkPlay(numArr);
    if (gameState === true) {
      document.getElementById(
        "player-container"
      ).innerHTML = `Player ${player} wins`;
    }
    player = "X";
  }

  if (count === 8) {
    document.getElementById("player-container").innerHTML =
      "maximum field played";
    document.getElementById("player").innerHTML = "";
  }
  if (gameState === true) {
    document.getElementById("player").innerHTML = "";
  }
  if (gameState === false && count < 8) {
    document.getElementById("player").innerHTML = player;
    count += 1;
  }
}

// a 2-Dimensional matrix using the size of the matrix
function createArray(number) {
  const arr = [];
  for (let i = 0; i < number; i++) {
    const innerArr = [];
    for (let i = 0; i < number; i++) {
      innerArr.push("");
    }
    arr.push(innerArr);
  }
  return arr;
}

//create tictactoe field using the size of the matrix
function createField(number) {
  const arr = [];
  for (let i = 0; i < number; i++) {
    for (let j = 0; j < number; j++) {
      arr.push(`${i}` + `${j}`);
    }
  }
  console.log(arr);
  var content = document.getElementById("content");
  let gridColumns = "auto ".repeat(number);
  content.style.gridTemplateColumns = gridColumns;

  arr.map((i) => {
    var element = document.createElement("button");
    element.name = `${i}`;
    element.value = `${i}`;
    element.className = "field-item";

    element.onclick = btnClick;

    return content.appendChild(element);
  });
}

function game(num = 3) {
  createField(num);
  gameArray = createArray(num);
}

game(arrLength);
