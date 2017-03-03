import React, { Component } from 'react';
import Game from './Game.jsx';
export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			gameStarted: false,
			gameOver: false,
			winner: null,
			tokens: ['X', 'O'],
			boardSize: 3
		}
	}

	gameOver(winner) {
		this.setState({gameOver: true, winner})
	}

	setToken(e, index) {
		const {tokens} = this.state;
		tokens[index] = e.target.value;
		this.setState({tokens})
	}

	render() {
		const { gameOver, winner, gameStarted, tokens, boardSize } = this.state;

		if (!gameStarted) {
			console.log(tokens);
			return (
				<div>
					<div>Player 1 token</div>
					<input defaultValue={tokens[0]} maxLength={1} onChange={(e) => this.setToken(e, 0)} />
					<div>Player 2 token</div>
					<input defaultValue={tokens[1]} maxLength={1} onChange={(e) => this.setToken(e, 1)} />
					{tokens[0]===tokens[1] ? <p>Players can't have the same token</p> : null}
					<div>Board Size</div>
					<input type="number" defaultValue={boardSize} onChange={(e) => this.setState({boardSize: e.target.value})} />
					<button disabled={tokens[0]===tokens[1]} onClick={() => this.setState({gameStarted: true})}>Start Game</button>
				</div>
			)
		} else {
			return ( <div> 
				<Game playerTokens={tokens} 
					boardSize={boardSize} 
					readOnly={gameOver} 
					gameOver={this.gameOver.bind(this)} />
				{gameOver ? (
					<div>
					<div>{`WINNER: Player ${winner + 1}`}</div>
					<button onClick={() => this.setState({gameStarted: false, gameOver: false})}>Start Over</button>
					</div>
				) : null}
			</div>);
		}
	}

}

