import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../state/counter';

const Counter = ({ counter, increaseCount, decreaseCount, setCounter }) => {
	return (
		<div>
			<h1>{counter}</h1>
			<button onClick={() => increaseCount()}>➕</button>
			<button onClick={() => decreaseCount()}>➖</button>
			<input
				type="number"
				onChange={e => setCounter(e.target.value)}
			/>
		</div>
	);
};

const mapState = ({ counter }) => ({ counter });
export default connect(mapState, actions)(Counter);
