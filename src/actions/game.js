export const stopGame = () => ({
    type: 'END',
    gameStarted: false

});

export const startGame = () => ({
    type: 'BEGIN',
    gameStarted: true
});

export const level1 = () => ({
    type: 'LEVEL1',
    level: 'colorCircle-level1 circleBtn'
});

export const level2 = () => ({
    type: 'LEVEL2',
    level: 'colorCircle-level2 circleBtn'
});

export const level3 = () => ({
    type: 'LEVEL3',
    level: 'colorCircle-level3 circleBtn'
});

export const level4 = () => ({
    type: 'LEVEL4',
    level: 'colorCircle-level4 circleBtn'
});
