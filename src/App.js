import React, { Component } from "react";
import "./App.css";
import Food from "./Food";
import Snake from "./Snake";

const getRandomFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
  return [x, y];
};

const initialState = {
  snakeDots: [
    [0, 0],
    [4, 0],
  ],
  foodDots: getRandomFood(),
  direction: "RIGHT",
  speed: 100,
  getMoreDots: getRandomFood(),
  fifeTimes: false,
};

export default class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfSnakeOutBorders();
    this.checkIfEat();
    this.ifSnakeHitSelf();
    this.checkIfEatBigApple()
  }

  moveSnake = () => {
    let snakeDots = [...this.state.snakeDots];
    let head = snakeDots[snakeDots.length - 1];
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 4, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 4, head[1]];
        break;
      case "UP":
        head = [head[0], head[1] - 4];
        break;
      case "DOWN":
        head = [head[0], head[1] + 4];
        break;
    }
    snakeDots.push(head);
    snakeDots.shift();
    this.setState({ snakeDots });
  };

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
    }
  };

  gameOver = () => {
    this.setState(initialState);
  };

  checkIfEat = () => {
    let snakeDots = [...this.state.snakeDots];
    let head = snakeDots[snakeDots.length - 1];
    let food = this.state.foodDots;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({ foodDots: getRandomFood() });
      this.enlargeSnake();
      if (snakeDots.length > 5) this.setState({ fifeTimes: true });
    }
  };

  enlargeSnake = () => {
    let snakeDots = [...this.state.snakeDots];
    snakeDots.unshift([]);
    this.setState({ snakeDots });
  };

  ifSnakeHitSelf = () => {
    let snakeDots = [...this.state.snakeDots];
    let head = snakeDots[snakeDots.length - 1];
    snakeDots.pop();
    snakeDots.forEach((dot, i) => {
      if (dot[0] === head[0] && dot[1] === head[1]) this.gameOver();
    });
  };

  checkIfSnakeOutBorders = () => {
    let snakeDots = [...this.state.snakeDots];
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0)
      this.gameOver();
  };

  checkIfEatBigApple = () => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    let bigApple = this.state.getMoreDots;
    if (head[0] === bigApple[0] && head[1] === bigApple[1]) {
      this.enlargeSnake();
    }
  };

  render() {
    return (
      <div className="game-area">
        <Snake dots={this.state.snakeDots} />
        <Food dots={this.state.foodDots} />

        {this.state.fifeTimes ? (
          <div
            className="get-more-score"
            style={{
              left: this.state.getMoreDots[0] + "%",
              top: this.state.getMoreDots[1] + "%",
            }}
          ></div>
        ) : null}
      </div>
    );
  }
}
