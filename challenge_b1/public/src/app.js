var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Square = function (_React$Component) {
  _inherits(Square, _React$Component);

  function Square() {
    _classCallCheck(this, Square);

    return _possibleConstructorReturn(this, (Square.__proto__ || Object.getPrototypeOf(Square)).apply(this, arguments));
  }

  _createClass(Square, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
      return React.createElement('td', { className: classes, onClick: function onClick(e) {
          e.preventDefault();
          _this2.props.handleClick(_this2.props.number);
        } });
    }
  }]);

  return Square;
}(React.Component);

var Board = function (_React$Component2) {
  _inherits(Board, _React$Component2);

  function Board() {
    _classCallCheck(this, Board);

    return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
  }

  _createClass(Board, [{
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          this.props.board.map(function (row, rowIndex) {
            return React.createElement(
              'tr',
              null,
              row.map(function (square, colIndex) {
                return React.createElement(Square, {
                  value: square,
                  key: rowIndex * 8 + colIndex,
                  number: rowIndex * 9 + colIndex,
                  handleClick: _this4.props.handleClick });
              })
            );
          })
        )
      );
    }
  }]);

  return Board;
}(React.Component);

var PlayerInfo = function (_React$Component3) {
  _inherits(PlayerInfo, _React$Component3);

  function PlayerInfo() {
    _classCallCheck(this, PlayerInfo);

    return _possibleConstructorReturn(this, (PlayerInfo.__proto__ || Object.getPrototypeOf(PlayerInfo)).apply(this, arguments));
  }

  _createClass(PlayerInfo, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'playerinfo' },
        this.props.isDarkTurn ? 'Dark' : 'Red',
        ' is next'
      );
    }
  }]);

  return PlayerInfo;
}(React.Component);

var Game = function (_React$Component4) {
  _inherits(Game, _React$Component4);

  function Game(props) {
    _classCallCheck(this, Game);

    var _this6 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

    _this6.state = {
      board: [[null, 'black', null, 'black', null, 'black', null, 'black'], ['black', null, 'black', null, 'black', null, 'black', null], [null, 'black', null, 'black', null, 'black', null, 'black'], [null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null], ['white', null, 'white', null, 'white', null, 'white', null], [null, 'white', null, 'white', null, 'white', null, 'white'], ['white', null, 'white', null, 'white', null, 'white', null]],
      isDarkTurn: true
    };
    _this6.handleClick = _this6.handleClick.bind(_this6);
    return _this6;
  }

  _createClass(Game, [{
    key: 'handleClick',
    value: function handleClick(numberOfSquare) {
      // if there is a piece on the square (black or white)

      // set it's state to active

      // if not, check if there is any active piece one jump from there

      // if yes change state, delete from previous state, add to this

    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          null,
          React.createElement(Board, { board: this.state.board, handleClick: this.handleClick })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(PlayerInfo, { turn: this.state.isDarkTurn })
        )
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById('app'));