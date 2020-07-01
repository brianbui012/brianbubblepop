export const setStopGame = () => ({
    type: 'END_GAME',
    isGameStarted: false

});

export const setStartGame = () => ({
    type: 'START_GAME',
    isGameStarted: true
});

export const setLevel1 = () => ({
    type: 'LEVEL1',
    level: 'circleSize-level1 circleBtn'
});

export const setLevel2 = () => ({
    type: 'LEVEL2',
    level: 'circleSize-level2 circleBtn'
});

export const setLevel3 = () => ({
    type: 'LEVEL3',
    level: 'circleSize-level3 circleBtn'
});

export const setLevel4 = () => ({
    type: 'LEVEL4',
    level: 'circleSize-level4 circleBtn'
});
