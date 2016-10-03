import React, {
    PropTypes
} from 'react';
import { connect } from 'react-redux';
import actions from './counter-actions';

const Counter = ({ value, onIncrease, onDecrease }) => {
    const onIncreaseHandler = () => { onIncrease(2); };
    const onDecreaseHandler = () => { onDecrease(); };
    return (
        <div>
            <span>{value}</span>
            <br />
            <button onClick={onIncreaseHandler}>+</button>
            <button onClick={onDecreaseHandler}>-</button>
            <p>I am a component that expects a store wrapper.</p>
        </div>
    );
};

Counter.propTypes = {
    value: PropTypes.number,
    onIncrease: PropTypes.func,
    onDecrease: PropTypes.func
};

function mapStateToProps(storeState) {
    return {
        value: storeState.counter.value
    };
}

const CounterContainer = connect(mapStateToProps, actions)(Counter);

export { Counter };
export { CounterContainer };

export default CounterContainer;
