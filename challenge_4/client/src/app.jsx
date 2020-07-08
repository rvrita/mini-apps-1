import React from 'react';
import ReactDOM from 'react-dom';


class Square extends React.Component {
  render() {
    var classes = 'square';
    if (this.props.value === 'red') {
      classes += ' red';
    } else if (this.props.value === 'yellow') {
      classes += ' yellow'
    }
    return (
      <td className={classes} onClick={(e) => {
        e.preventDefault();
        this.props.handleClick(this.props.colIndex)
      }}></td>
    )
  }
}

class Board extends React.Component {
  render() {
    console.log('inside board render');
    return (
      <table className="board">
        <tbody>
          {/* board is a matrix, so render each row first then render each square inside the rows  */}
          {this.props.boardState.map((row, indexRow) => {
            return (
              <tr key={indexRow}>
                {row.map((square, indexCol) => <Square handleClick={this.props.handleClick} colIndex={indexCol} value={square} key={indexRow * 7 + indexCol} />)}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

class Scoreboard extends React.Component {
  render() {
    console.log('inside scoreboard render', this.props.isWinner);
    if (!this.props.isWinner) {
      return (
        <div className="player">
          It's {this.props.isRedsTurn ? 'Red' : 'Yellow'}'s turn.
        </div>
      )
    } else {
      return (
        <div className="winner">
         {this.props.isRedsTurn ? 'Red' : 'Yellow'}, you won!
        </div>
      )
    }

  }
}

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
      isWinner: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  detectWinner(board) {
    // checking all rows boardState[i][j] i=>row, j=>col
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 4; j++) {
        if ((board[i][j]) && (board[i][j] === board[i][j + 1]) && (board[i][j] === board[i][j + 2]) && (board[i][j] === board[i][j + 3])) {
          return true;
        }
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 7; j++) {
        if ((board[i][j]) && (board[i][j] === board[i + 1][j]) && (board[i][j] === board[i + 2][j]) && (board[i][j] === board[i + 3][j])) {
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
    } else {
      this.setState({
        boardState: newBoardState,
        isRedsTurn: !this.state.isRedsTurn
      })
    }
  }
  
}

render() {
  console.log('inside game render', this.state.isWinner);
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
        <Scoreboard isRedsTurn={this.state.isRedsTurn} isWinner={this.state.isWinner} />
      </div>
    </div>
  )
}
}

ReactDOM.render(<Game />, document.getElementById('app'));