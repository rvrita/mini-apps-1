import React from 'react';
import Scoreboard from './ScoreBoard.jsx';
import Board from './Board.jsx';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]
      ],
      isRedsTurn: true,
      isWinner: false,
      isTie: false
    }
    this.handleClick = this.handleClick.bind(this),
    this.restart = this.restart.bind(this)
  }

  detectTie(board) {
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 4; j++) {
        if (board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  detectWinner(board) {
    // checking all squares boardState[i][j] i=>row, j=>col
    // row check
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 4; j++) {
        if ((board[i][j]) && (board[i][j] === board[i][j + 1]) && (board[i][j] === board[i][j + 2]) && (board[i][j] === board[i][j + 3])) {
          return true;
        }
      }
    }
    // column check
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 7; j++) {
        if ((board[i][j]) && (board[i][j] === board[i + 1][j]) && (board[i][j] === board[i + 2][j]) && (board[i][j] === board[i + 3][j])) {
          return true;
        }
      }
    }
    // diagonal down check
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if ((board[i][j]) && (board[i][j] === board[i+1][j+1]) && (board[i][j] === board[i+2][j+2]) && (board[i][j] === board[i+3][j+3])) {
          return true;
        }
      }
    }
    // diagonal up check
    for (var i = 3; i < 6; i++) {
      for (var j = 0; j < 4; j++) {
        if ((board[i][j]) && (board[i][j] === board[i-1][j+1]) && (board[i][j] === board[i-2][j+2]) && (board[i][j] === board[i-3][j+3])) {
          return true;
        }
      }
    }
  }

  handleClick(colIndex) {
    var newBoardState = this.state.boardState.slice();
    if (!this.state.isWinner) {
    for (var i = 5; i >= 0; i--) {
      if (newBoardState[i][colIndex] === null) {
        if (this.state.isRedsTurn) {
          newBoardState[i][colIndex] = 'red';
        } else {
          newBoardState[i][colIndex] = 'yellow';
        }
        break;
      }
    }
    if (this.detectWinner(newBoardState)) {
      this.setState({
        isWinner: true
      })
    } else if (this.detectTie(newBoardState)) {
      this.setState({
        isTie: true
      })
    } else {
      this.setState({
        boardState: newBoardState,
        isRedsTurn: !this.state.isRedsTurn
      })
    }
  }
}

restart(e) {
  e.preventDefault();
  this.setState({
    boardState: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ],
    isRedsTurn: true,
    isWinner: false,
    isTie: false
  })
}

render() {
  return (
    <div>
      <div>
        <h1>Welcome to Connect Four</h1>
        <p className="rules">Your goal is to make a straight line of four of your own pieces - vertically, horizontally or diagonal.<br />Click on a column to drop your piece:</p>
      </div>
      <div>
        <Board boardState={this.state.boardState} handleClick={this.handleClick}/>
      </div>
      <div>
        <Scoreboard isRedsTurn={this.state.isRedsTurn} isWinner={this.state.isWinner} isTie={this.state.isTie}/>
      </div>
      <div>
        <button onClick={this.restart}>Restart</button>
      </div>
    </div>
  )
}
}

export default Game;