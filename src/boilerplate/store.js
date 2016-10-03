import { createStore, combineReducers } from 'redux';
import counter from './counter-reducers';

const catchReducerExceptions = ((/* getStore */) =>
    (reducer) => ((state, action) => {
        try {
            return reducer(state, action);
        } catch (e) {
            if (state === undefined) {
                // don't dispatch if exception occurs during initialization
                throw e;
            }
            console.error(e);
            // use setTimeout to avoid recursive call to dispatch()
            // setTimeout(() => getStore().dispatch({ type: EXCEPTION, exception: e }));
            return state;
        }
    })
);

const reducers = combineReducers({
    counter
});

const store = createStore(
    catchReducerExceptions(() => store)(
        reducers
    )
);

export default store;
