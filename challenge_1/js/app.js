var board = document.getElementById('board');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var reset = document.getElementById('reset');

// View

var template = function(moves) {
return `
<table>
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
</table>
`
};

// Model

var moves = ['', '', 'X', '', 'O', '', '', '', ''];

var players = {};


// Controller

// init
var drawBoard = function(moves) {
  board.innerHTML = template(moves);
}

drawBoard(moves);
// p1.setAttribute('style', 'text-decoration: underline');

// clickHandlers
var resetBoard = function() {
  var moves = ['', '', '', '', '', '', '', '', ''];
  drawBoard(moves);
}

var handlePlayerClick = function(event) {
  // get clicked element and get the index that needs to be updated in moves
  var el = event.target;
  var clickedIndex = el.dataset.index;
  console.log(el, clickedIndex);
  // get active player id
  var playerSymbol = 'X';
  // update moves
  moves[clickedIndex] = `${playerSymbol}`;
  // redraw board
  drawBoard(moves);
  // set it to the other player

  // check if any winner

}

reset.addEventListener('click', resetBoard);

board.addEventListener('click', handlePlayerClick);









