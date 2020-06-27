//STATE =========================================================
const timerReducerDefaultState = {
    timeLeft: 10,
    timerId: undefined
};

//REDUCER ========================================================


const timerReducer = (state = timerReducerDefaultState, action) => {
    switch (action.type) {
        case 'START':
            return { ...state, timeLeft: action.timeLeft };
        case 'SET_TIMER_ID':
            return { ...state, timerId: action.timerId };
        default:
            return state;
    }
};

export default timerReducer;