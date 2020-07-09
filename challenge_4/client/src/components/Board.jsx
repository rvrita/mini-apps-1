import React from 'react';
import Square from './Square.jsx';

class Board extends React.Component {
  render() {
    return (
      <table className="board">
        <tbody>
          {/* board is a matrix, so render each row first then render each square inside the rows  */}
          {this.props.boardState.map((row, indexRow) => {
            return (
              <tr key={indexRow}>
                {row.map((square, indexCol) => <Square handleClick={this.props.handleClick} colIndex={indexCol} value={square} key={indexRow * 7 + indexCol}/>)}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Board;