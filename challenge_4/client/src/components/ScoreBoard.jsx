import React from 'react';

class Scoreboard extends React.Component {
  render() {
    if (this.props.isWinner) {
      return (
        <div className="winner">
         {this.props.isRedsTurn ? 'Red' : 'Yellow'}, you won!
        </div>
      )
    } else if (this.props.isTie) {
      return (
        <div className="tie">
          It's a tie!
        </div>
      )
    } else {
      return (
        <div className="player">
          It's {this.props.isRedsTurn ? 'Red' : 'Yellow'}'s turn.
        </div>
      )
    }
  }
}

export default Scoreboard;