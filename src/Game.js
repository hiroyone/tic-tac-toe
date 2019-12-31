import React from 'react';
import Board from './Board.js';
import MoveHistory from './MoveHistory.js';
import './App.css'; // All stylings are stored


class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        position: Number,
      }],
      stepNumber: 0,
      xIsNext: true,
      descending: false,
      stopWatch: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.timer = setInterval(
      () => this.timeTick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  timeTick() {
    this.setState({
      stopWatch: this.state.stopWatch + 1,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        position: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Show the snapshot in the history
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    }
    )
  }

  // Change the order of the game
  orderChange() {
    const checkBox = document.getElementById("descending");
    if (checkBox.checked === true) {
      this.setState({
        descending: true,
      });
    } else {
      this.setState({
        descending: false,
      });
    }
  }

  // Initialize the game
  initialize() {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
        position: Number,
      }],
      stepNumber: 0,
      xIsNext: true,
      descending: false,
    })
    return
  }

  render() {

    const history = this.state.history.slice();
    const current = history[this.state.stepNumber];
    const stepNumber = this.state.stepNumber;
    const winner = calculateWinner(current.squares);
    const stopWatch = this.state.stopWatch

    let status;
    let winPositions = []
    if (winner) {
      status = 'Winner: ' + winner[0];
      winPositions = winner[1]
    } else if (stepNumber === 9) {
      status = 'Draw! No Winner!'
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <h1>Tic Tac Toe</h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={this.handleClick}
              winPositions={winPositions}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
              <MoveHistory
              history={history} 
              stepNumber={stepNumber} 
              descending = {this.state.descending}
              jumpTo={this.jumpTo}
              />
            <div>Timer: {stopWatch}</div>

            <div>Descending       
              <label className="switch" >
                <input type="checkbox" id="descending" onClick={() => this.orderChange()} />
                <span className="slider round"></span>
                </label >
            </div>
            <div>
              <button onClick={() => this.initialize()}>
                Initialize the game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Helper function to return who win the game (at each phase)
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]]
    }
  }
  return null
}

export default Game;

