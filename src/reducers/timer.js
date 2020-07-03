//STATE =========================================================
const timerReducerDefaultState = {
    timeLeft: 10,
    timerId: undefined
};

//REDUCER ========================================================


const timerReducer = (state = timerReducerDefaultState, action) => {
    switch (action.type) {
        case 'START_TIMER':
            return { ...state, timeLeft: action.timeLeft };
        case 'SET_TIMER_ID':
            return { ...state, timerId: action.timerId };
        case 'ADD_TIME':
            return { ...state, timeLeft: state.timeLeft + 0.5 };
        case 'SUB_TIME':
            return { ...state, timeLeft: state.timeLeft - 0.5 };

        default:
            return state;
    }
};

export default timerReducer;