class Square extends React.Component {
  render() {
    var classes = '';
    if (this.props.value === 'black') {
      classes += 'black';
    } else if (this.props.value === 'white') {
      classes += 'white';
    } else if (this.props.number % 2 === 0) {
      classes += ' darkbgr';
    } else if (this.props.number % 2 === 1) {
      classes += ' lightbgr';
    }
    return (
      <td className={classes} onClick={
        (e) => {
          e.preventDefault();
          this.props.handleClick(this.props.number)
        }
      }></td>
    )
  }
}


class Board extends React.Component {
  render() {
    return (
      <table>
        <tbody>
          {this.props.board.map((row, rowIndex) => {
            return (
              <tr>
                {row.map((square, colIndex) =>
                  <Square
                    value={square}
                    key={rowIndex * 8 + colIndex}
                    number={rowIndex * 9 + colIndex}
                    handleClick={this.props.handleClick} />)}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

class PlayerInfo extends React.Component {
  render() {
    return (
      <div className="playerinfo">{this.props.isDarkTurn ? 'Dark' : 'Red'} is next</div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [
        [null, 'black', null, 'black', null, 'black', null, 'black'],
        ['black', null, 'black', null, 'black', null, 'black', null],
        [null, 'black', null, 'black', null, 'black', null, 'black'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['white', null, 'white', null, 'white', null, 'white', null],
        [null, 'white', null, 'white', null, 'white', null, 'white'],
        ['white', null, 'white', null, 'white', null, 'white', null],
      ],
      isDarkTurn: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(numberOfSquare) {
    // if there is a piece on the square (black or white)

    // set it's state to active

    // if not, check if there is any active piece one jump from there

    // if yes change state, delete from previous state, add to this
    
  }

  render() {
    return (
      <div>
        <div>
          <Board board={this.state.board} handleClick={this.handleClick} />
        </div>
        <div>
          <PlayerInfo turn={this.state.isDarkTurn} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('app'));