
import React, {Component, PropTypes} from 'react';
import Board from './Board.jsx';

export default class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: this.createPlayers(props.playerTokens, props.boardSize),
			currentPlayer: 0
		}
	}

	createPlayers(playerTokens, boardSize) {
		const players = {};
		playerTokens.forEach(token => {
			const rows = [];
			const cols = [];
			for (let i = 0; i < boardSize; i++) {
				rows[i] = [];
				cols[i] = [];
			}
			players[token] = {
				rows,
				cols,
				lDiag: [],
				rDiag: []
			}
		});
		return players;
	}

	checkWin(currentPlayerBoard, lastRow, lastCol, boardSize) {
		console.log(lastRow)
		console.log(lastCol)
		return currentPlayerBoard.rows[lastRow].length == boardSize ||
			currentPlayerBoard.cols[lastCol].length == boardSize ||
			currentPlayerBoard.lDiag.length == boardSize ||
			currentPlayerBoard.rDiag.length == boardSize;
	}

	switchPlayers(currentPlayer) {
		const {playerTokens} = this.props;
		const nextPlayer = ((currentPlayer+1) % 2);
		this.setState({currentPlayer: nextPlayer })
	}

	onPlay(value, row, col) {
		const {currentPlayer, players} = this.state;
		const { boardSize } = this.props;
		const currentPlay = players[value];
		currentPlay.rows[row].push(currentPlayer);
		currentPlay.cols[col].push(currentPlayer);
		if (row === col) {
			currentPlay.lDiag.push(currentPlayer);
		}
		if (row + col === boardSize - 1) {
			currentPlay.rDiag.push(currentPlayer);
		}
		this.setState({players});
		if (this.checkWin(currentPlay, row, col, boardSize)) {
			this.props.gameOver(currentPlayer);
		} else {
			this.switchPlayers(currentPlayer);
		}
	}

	render() {
		const {boardSize, playerTokens, readOnly} = this.props;
		const {players, currentPlayer} = this.state;
		return (<Board 
			boardSize={boardSize} 
			players={players} 
			currentPlayer={playerTokens[currentPlayer]} 
			onPlay={this.onPlay.bind(this)}
			readOnly={readOnly}/>);
	}
}

Game.propTypes = {
	boardSize:PropTypes.number,
	playerTokens:PropTypes.arrayOf(PropTypes.string).isRequired,
	gameOver: PropTypes.func,
	readOnly: PropTypes.bool
}