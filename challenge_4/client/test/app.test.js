import Game from '../src/components/Game.jsx';
import React from 'react';

var testBoardRow = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, 'red', 'red', 'red', 'red', null],
  [null, null, 'yellow', 'yellow', 'red', 'yellow', null],
  [null, 'yellow', 'yellow', 'red', 'yellow', 'red', null]
];

var testBoardCol = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['yellow', null, null, null, null, null, null],
  ['yellow', null, 'red', null, null, null, null],
  ['yellow', null, 'red', null, null, null, null],
  ['yellow', 'red', 'red', null, null, null, null]
];

var testBoardDiagMajor = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, 'red', null, null, null, null, null],
  ['yellow', 'yellow', 'red', null, null, null, null],
  ['yellow', 'red', 'yellow', 'red', null, null, null],
  ['yellow', 'red', 'yellow', 'yellow', 'red', null, null]
];

var testBoardDiagMinor = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  ['red', 'red', null, 'yellow', null, null, null],
  ['yellow', 'red', 'yellow', null, null, null, null],
  ['yellow', 'yellow', 'yellow', 'red', null, null, null],
  ['yellow', 'red', 'yellow', 'red', 'red', null, null]
];

var testBoardTie = [
  ['yellow', 'red', 'yellow', 'yellow', 'yellow', 'red', 'yellow'],
  ['red', 'yellow', 'red', 'red', 'red', 'yellow', 'red'],
  ['yellow', 'red', 'yellow', 'yellow', 'yellow', 'red', 'yellow'],
  ['red', 'yellow', 'red', 'red', 'red', 'yellow', 'red'],
  ['yellow', 'red', 'yellow', 'yellow', 'yellow', 'red', 'yellow'],
  ['red', 'yellow', 'red', 'red', 'red', 'yellow', 'red']
]

describe('Game logic', () => {
  test('should detect a win in a row', () => {
    var game = <Game />;
    expect(game.type.prototype.detectWinner(testBoardRow)).toBe(true);
  });

  test('should detect a win in a column', () => {
    var game = <Game />;
    expect(game.type.prototype.detectWinner(testBoardCol)).toBe(true);
  });

  test('should detect a win diagonal - major', () => {
    var game = <Game />;
    expect(game.type.prototype.detectWinner(testBoardDiagMajor)).toBe(true);
  });

  test('should detect a win diagonal - minor', () => {
    var game = <Game />;
    expect(game.type.prototype.detectWinner(testBoardDiagMinor)).toBe(true);
  });

  test('should detect a tie', () => {
    var game = <Game />;
    expect(game.type.prototype.detectTie(testBoardTie)).toBe(true);
  });
});