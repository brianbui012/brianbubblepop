export const startTimer = (timeLeft) => ({
    type: 'START',
    timeLeft
});

export const setTimerId = (timerId) => ({
    type: 'SET_TIMER_ID',
    timerId
});