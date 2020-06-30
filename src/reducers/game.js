//STATE =========================================================
const gameReducerDefaultState = {
    gameStarted: false,
    level: 'colorCircle-level1 circleBtn',
};

//REDUCER ========================================================


const gameReducer = (state = gameReducerDefaultState, action) => {
    switch (action.type) {
        case 'BEGIN':
            return { ...state, gameStarted: action.gameStarted };
        case 'END':
            return { ...state, gameStarted: action.gameStarted };
        case 'LEVEL1':
            return { ...state, level: action.level };
        case 'LEVEL2':
            console.log('game reducer level2')
            return { ...state, level: action.level };
        case 'LEVEL3':
            return { ...state, level: action.level };
        case 'LEVEL4':
            return { ...state, level: action.level };
        default:
            return state;
    }
};

export default gameReducer;