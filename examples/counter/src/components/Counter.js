import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../state/counter';

const Counter = ({ counter, increaseCount, decreaseCount }) => {
	return (
		<div>
			<h1>{counter}</h1>
			<button>➕</button>
			<button>➖</button>
		</div>
	);
};

Counter.propTypes = {};
Counter.defaultProps = {};

const mapState = ({ counter }) => ({ counter });

export default connect(mapState, actions)(Counter);
