
import React, {Component, PropTypes} from 'react';
import Cell from './Cell.jsx';

export default class Board extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cells: this.createCells(props.boardSize)
		}
	}

	createCells(boardSize) {
		const cells = [];
		for (let row = 0; row < boardSize; row++) {
			cells[row] = [];
			for (let col = 0; col < boardSize; col++) {
				cells[row][col] = {value: null, row, col }
			}
		}
		return cells;
	}

	onPlay(value, row, col) {
		const { cells } = this.state;
		const {onPlay} = this.props;
		cells[row][col].value = value;
		this.setState({cells});
		onPlay(value, row, col);
	}

	getKey(row, cell) {
		const {boardSize} = this.props;
		return row * boardSize + cell;
	}

	getCols(row, rowInd, currentPlayer) {
		//key should be row index * boardSize + col;
		return row.map((cell, ind) => (<td key={this.getKey(rowInd, ind)}> 
			<Cell
				playerToken={currentPlayer}
				value={cell.value}
				onClick={(val) => this.onPlay(val, cell.row, cell.col)}
				row={cell.row}
				col={cell.col} />
			</td>)
		)
	}

	getRows(cells, currentPlayer) {
		return cells.map((row, index) => (<tr key={index}>{this.getCols(row, index, currentPlayer)}</tr>))
	}

	render() {
		const { cells } = this.state;
		const {currentPlayer} = this.props;
		return (
			<table>
				<tbody>
					{this.getRows(cells, currentPlayer)}
				</tbody>
			</table>
		);
	}
}

Board.propTypes = {
	boardSize: PropTypes.number,
	players: PropTypes.shape({
		id: PropTypes.shape({
			rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
			cols: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool)),
			rDiag: PropTypes.arrayOf(PropTypes.bool),
			lDiag: PropTypes.arrayOf(PropTypes.bool)
		}),
	}),
	currentPlayer: PropTypes.string,
	onPlay: PropTypes.func.isRequired
}