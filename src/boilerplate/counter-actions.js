import constants from './counter-constants';

function onIncrease(value = 1) {
    return {
        type: constants.INCREMENT,
        value
    };
}

function onDecrease(value = 1) {
    return {
        type: constants.DECREMENT,
        value
    };
}

export default {
    onIncrease,
    onDecrease
};
