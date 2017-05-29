import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../state/counter';
import { mapActionsToDispatch } from 'redux-creators';

const Counter = ({ counter, increaseCount, decreaseCount, setCounter }) => {
	return (
		<div>
			<h1>{counter}</h1>
			<button onClick={increaseCount}>➕</button>
			<button onClick={decreaseCount}>➖</button>
			<input
				type="number"
				onChange={e => setCounter(e.target.value)}
			/>
		</div>
	);
};

Counter.propTypes = {};
Counter.defaultProps = {};

const mapState = ({ counter }) => ({ counter });
const mapDispatch = mapActionsToDispatch(actions);

// withHandlers({
// 	onIncrease: ({ increaseCount }) => _ => increaseCount()
// })

export default connect(mapState, mapDispatch)(Counter);
