import { actionCreatorCreator, reducerCreator } from 'redux-creators';

const INC = 'INCREASE_COUNTER';
const DEC = 'DECREASE_COUNTER';
const SET = 'SET_COUNTER';

const increase = (state) => state + 1;
const decrease = (state) => state - 1;
const set = (state, value) => value;

const map = {
	[INC]: increase,
	[DEC]: decrease,
	[SET]: set,
};

export default reducerCreator(map, 0);

export const increaseCount = actionCreatorCreator(INC);
export const decreaseCount = actionCreatorCreator(DEC);
export const setCounter = actionCreatorCreator(SET);
export const actions = { increaseCount, decreaseCount, setCounter };