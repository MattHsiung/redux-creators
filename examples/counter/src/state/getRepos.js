import { actionCreator, asyncAction, reducerCreator } from 'redux-creators';
import { fetchRepos } from './api';
const PENDING = 'FETCHING_REPOS';
const SUCCESS = 'FETCH_SUCCESS_REPOS';
const FAIL = 'FETCH_FAIL_REPOS';

const pending = (state) => state + 1;
const success = (state) => state - 1;
const fail = (state, value) => value;

const map = {
	[INC]: pending,
	[DEC]: success,
	[SET]: fail,
};

export default reducerCreator(map, 0);

export const actions = actionCreator({
	fetchRepos: asyncAction({
		pending: PENDING,
		success: SUCCESS,
		fail: FAIL,
	}, fetchRepos),
});
