import { actionCreator, reducerCreator } from 'redux-creators';

const INC = 'INCREASE_COUNTER';
const DEC = 'DECREASE_COUNTER';
const SET = 'SET_COUNTER';

const increase = (state) => state + 1;
const decrease = (state) => state - 1;
const set = (state, value) => Number(value);

const map = {
	[INC]: increase,
	[DEC]: decrease,
	[SET]: set,
};

export default reducerCreator(map, 0);

export const actions = actionCreator({
	increaseCount: INC,
	decreaseCount: DEC,
	setCounter: SET,
});