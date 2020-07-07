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
      <td className={classes}>{this.props.value}</td>
    )
  }
}

class Board extends React.Component {
  render() {
    return (
      <table className="board">
        <tbody>
          {/* board is a matrix, so render each row first then render each square inside the rows  */}
          {this.props.boardState.map(row => {
            return (
              <tr>
                {row.map(square => <Square value={square} />)}
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
        Next Player: Red
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: [
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, null, null, null, null, null],
        [null, 'yellow', 'red', 'red', null, null]
      ]
    }

  }

  render() {
    return (
      <div>
        <div>
          <h1>Welcome to Connect Four</h1>
          <p>Click on a column to drop your piece:</p>
        </div>
        <div>
          <Board boardState={this.state.boardState} />
        </div>
        <div>
          <Scoreboard />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));