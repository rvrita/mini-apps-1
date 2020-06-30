// Model

// attach the event handler to the board so when the table resets
// the event handler will still be there
var board = document.getElementById('board');
var table = document.getElementById('table');
// start with empty board
var moves = ['', '', '', '', '', '', '', '', ''];

// players
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');

// elements to reset the board
var resetButton = document.getElementsByClassName('reset');


// View

var template = function(moves) {
  return `
  <tr>
    <td data-index="0">${moves[0]}</td>
    <td data-index="1">${moves[1]}</td>
    <td data-index="2">${moves[2]}</td>
  </tr>
  <tr>
    <td data-index="3">${moves[3]}</td>
    <td data-index="4">${moves[4]}</td>
    <td data-index="5">${moves[5]}</td>
  </tr>
  <tr>
    <td data-index="6">${moves[6]}</td>
    <td data-index="7">${moves[7]}</td>
    <td data-index="8">${moves[8]}</td>
  </tr>
`
};

var drawBoard = function(moves) {
  table.innerHTML = template(moves);
}

var setActivePlayer = function(player) {
  if (player === 'x') {
    p1.style.textDecoration = "underline";
    p2.style.textDecoration = "none";
    currentPlayer = 'X';
  } else {
    p2.style.textDecoration = "underline";
    p1.style.textDecoration = "none";
    currentPlayer = 'O';
  }
}

var setEndMessage = function(state) {
  var winnerMessage = document.getElementById('winner');
  var tieMessage = document.getElementById('tie');
  if (state === 'win') {
    winnerMessage.style.display = 'block';
  } else if (state === 'tie') {
    tieMessage.style.display = 'block';
  } else {
    winnerMessage.style.display = 'none';
    tieMessage.style.display = 'none';
  }
}


// Controller

// clickHandlers
var resetBoard = function () {
  moves = ['', '', '', '', '', '', '', '', ''];
  drawBoard(moves);
  setActivePlayer('x');
  setEndMessage();
}

var handlePlayerClick = function (event) {
  // get clicked element and get the index that needs to be updated in moves
  var el = event.target;
  var clickedIndex = el.dataset.index;

  // update moves only if empty space, if clicked on occupied field do nothing
  if (moves[clickedIndex] === '') {
    moves[clickedIndex] = `${currentPlayer}`;
    // redraw board
    drawBoard(moves);
    // set it to the other player
    if (currentPlayer === 'X') {
      setActivePlayer('o');
    } else {
      setActivePlayer('x');
    }
    // check if any winner
    checkWinner(moves);
  }

}

var checkWinner = function (moves) {
  if ((moves[0] !== '' && moves[0] === moves[1] && moves[0] === moves[2]) ||
  (moves[3] !== '' && moves[3] === moves[4] && moves[3] === moves[5]) ||
  (moves[6] !== '' && moves[6] === moves[7] && moves[6] === moves[8]) ||
  (moves[0] !== '' && moves[0] === moves[3] && moves[0] === moves[6]) ||
  (moves[1] !== '' && moves[1] === moves[4] && moves[1] === moves[7]) ||
  (moves[2] !== '' && moves[2] === moves[5] && moves[2] === moves[8]) ||
  (moves[0] !== '' && moves[0] === moves[4] && moves[0] === moves[8]) ||
  (moves[2] !== '' && moves[2] === moves[4] && moves[2] === moves[6])) {
    document.getElementById('winner').style.display = 'block';
  } else if (!moves.includes('')) {
    document.getElementById('tie').style.display = 'block';
  }
}

console.log(resetButton);
for (var i = 0; i < resetButton.length; i++) {
  resetButton[i].addEventListener('click', resetBoard);
}

board.addEventListener('click', handlePlayerClick);

// inital state of the game
drawBoard(moves);
setActivePlayer('x');


// notes:
// set bgr if winer cubes








