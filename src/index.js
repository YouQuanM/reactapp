import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './game';
import Clock from './clock';
import Temperature from './temperature'
class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="game-area">
          <Game />
        </div>
        <div className="clock-area">
          <Clock />
        </div>
        <div className="clock-area">
          <Temperature />
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
