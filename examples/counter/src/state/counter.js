import { actionCreatorCreator, reducerCreator } from 'redux-creators';

const INC = 'INCREASE_COUNTER';
const DEC = 'DECREASE_COUNTER';

const increase = (state) => state + 1;
const decrease = (state) => state - 1;

const map = {
	[INC]: increase,
	[DEC]: decrease,
};

export default reducerCreator(map, 0);

export const increaseCount = actionCreatorCreator(INC);
export const decreaseCount = actionCreatorCreator(DEC);
export const actions = { increaseCount, decreaseCount };