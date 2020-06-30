export const startTimer = (timeLeft) => ({
    type: 'START',
    timeLeft
});

export const setTimerId = (timerId) => ({
    type: 'SET_TIMER_ID',
    timerId
});

export const addTime = () => ({
    type: 'ADD_TIME',
})

export const subTime = () => ({
    type: 'SUB_TIME',
});