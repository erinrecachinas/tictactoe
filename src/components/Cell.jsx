import React, {Component, PropTypes} from 'react';

export default class Cell extends Component {

	onPlay() {
		const {onClick, playerToken, row, column} = this.props;
		onClick(playerToken, row, column);
	}
	render() {
		const { value, onClick, playerToken, row, col } = this.props;
		if (value) {
			return <div>{value}</div>
		} else {
			return <button onClick={this.onPlay.bind(this)}>{`Play ${playerToken}`}</button>
		}
	}
}

Cell.propTypes = {
	value: PropTypes.string,
	onClick: PropTypes.func,
	playerToken: PropTypes.string,
	row: PropTypes.number,
	column: PropTypes.number
}