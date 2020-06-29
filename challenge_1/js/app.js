var board = document.getElementById('board');

var template =
`
<table>
  <tr>
  <td>O</td>
  <td></td>
  <td></td>
  </tr>
  <tr>
  <td></td>
  <td>X</td>
  <td></td>
  </tr>
  <tr>
  <td></td>
  <td></td>
  <td></td>
  </tr>
</table>
`;

var drawBoard = function() {
  board.innerHTML = template;
}

drawBoard();