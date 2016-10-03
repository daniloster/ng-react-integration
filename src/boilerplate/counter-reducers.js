import constants from './counter-constants';

const reducersMapping = {
    [constants.INCREMENT]: (state, { value }) => ({ value: state.value + Number(value) }),
    [constants.DECREMENT]: (state, { value }) => ({ value: state.value - Number(value) })
};

const initialState = {
    value: 0
};

const reducers = (state = initialState, action = {}) => {
    const reducer = reducersMapping[action.type] || (() => state);
    const newState = reducer(state, action);
    return Object.assign({}, state, newState);
};

export { reducersMapping };
export { initialState };
export { reducers };

export default reducers;
