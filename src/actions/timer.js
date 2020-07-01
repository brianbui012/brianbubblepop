export const startTimer = (timeLeft) => ({
    type: 'START_TIMER',
    timeLeft
});

export const setTimerId = (timerId) => ({
    type: 'SET_TIMER_ID',
    timerId
});

export const addTime = () => ({
    type: 'ADD_TIME',
})

export const subtractTime = () => ({
    type: 'SUB_TIME',
});