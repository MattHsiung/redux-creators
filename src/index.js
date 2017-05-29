const reducerCreator = (map, defaultValue) =>
	(state = defaultValue, { type, payload }) =>
		map[type] ? map[type](state, payload) : state;

const actionCreatorCreator = type =>
	dispatch =>
		payload =>
			dispatch({
				type,
				payload,
			});

const asyncActionCreatorCreator = ({ pending, success, fail }, promise) =>
	dispatch =>
		payload => {
			dispatch(pending);
			return promise(payload)
				.then((res) => dispatch({
					type: success,
					payload: res,
				}))
				.catch((err) => dispatch({
					type: fail,
					payload: err,
				}));
		};

const asyncCompose = (...promises) => (payload) =>
	promises.reduce(
		(one, two) => one.then(two),
		Promise.resolve(payload)
	);

const mapActionsToDispatch = (actionCreators) => (dispatch) =>
	Object.keys(actionCreators)
		.reduce((acc, key) => ({
			...acc,
			[key]: actionCreators[key](dispatch)
		}), {});

module.exports = {
	reducerCreator,
	actionCreatorCreator,
	asyncActionCreatorCreator,
	asyncCompose,
	mapActionsToDispatch,
};
