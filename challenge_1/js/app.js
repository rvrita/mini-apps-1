// Model

var board = document.getElementById('board');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var reset = document.getElementById('reset');
var playagainW = document.getElementById('w-playagain');
var playagainT = document.getElementById('t-playagain');
var table = document.getElementById('table');
var currentPlayer = 'X';
var moves = ['', '', '', '', '', '', '', '', ''];

// View

var template = function (moves) {
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


// Controller

// init
var drawBoard = function (moves) {
  table.innerHTML = template(moves);
}
drawBoard(moves);
p1.setAttribute('style', 'text-decoration: underline');


// clickHandlers
var resetBoard = function () {
  moves = ['', '', '', '', '', '', '', '', ''];
  drawBoard(moves);
  p1.setAttribute('style', 'text-decoration: underline');
  p2.setAttribute('style', 'text-decoration: none');
  document.getElementById('winner').style.display = 'none';
  document.getElementById('tie').style.display = 'none';
}

var handlePlayerClick = function (event) {
  // get clicked element and get the index that needs to be updated in moves
  var el = event.target;
  var clickedIndex = el.dataset.index;
  // get active player id
  if (currentPlayer === 'X') {
    playerSymbol = 'X';
  } else {
    playerSymbol = 'O';
  }

  // update moves, if user clicked on occupied field do nothing
  if (moves[clickedIndex] === '') {
    moves[clickedIndex] = `${playerSymbol}`;
    // redraw board
    drawBoard(moves);
    // set it to the other player
    if (currentPlayer === 'X') {
      currentPlayer = 'O';
      p1.setAttribute('style', 'text-decoration: none');
      p2.setAttribute('style', 'text-decoration: underline');
    } else {
      currentPlayer = 'X';
      p1.setAttribute('style', 'text-decoration: underline');
      p2.setAttribute('style', 'text-decoration: none');
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

reset.addEventListener('click', resetBoard);
playagainW.addEventListener('click', resetBoard);
playagainT.addEventListener('click', resetBoard);
board.addEventListener('click', handlePlayerClick);


// notes:
// set bgr if winer cubes
// refactor








