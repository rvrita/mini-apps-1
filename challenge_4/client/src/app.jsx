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
      this.props.handleClick(this.props.colIndex) }}></td>
    )
  }
}

class Board extends React.Component {
  render() {
    return (
      <table className="board">
        <tbody>
          {/* board is a matrix, so render each row first then render each square inside the rows  */}
          {this.props.boardState.map((row, indexRow) => {
            return (
              <tr key={indexRow}>
                {row.map((square, indexCol) => <Square handleClick={this.props.handleClick} colIndex={indexCol} value={square} key={indexRow*7+indexCol}/>)}
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
    return (
      <div className="player">
        Next Player: {this.props.isRedsTurn ? 'Red' : 'Yellow'}
      </div>
    )
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
      isRedsTurn: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(colIndex) {
    var newBoardState = this.state.boardState.slice();
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
    // set that null to colored in that column that was closest to bottom
    console.log(colIndex);
    this.setState({
      boardState: newBoardState,
      isRedsTurn: !this.state.isRedsTurn
    })
  }

  render() {
    return (
      <div>
        <div>
          <h1>Welcome to Connect Four</h1>
          <p className="rules">Your goal is to make a straight line of four of your own pieces - vertically, horizontally or diagonal.<br/>Click on a column to drop your piece:</p>
        </div>
        <div>
          <Board boardState={this.state.boardState} handleClick={this.handleClick}/>
        </div>
        <div>
          <Scoreboard isRedsTurn={this.state.isRedsTurn} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));