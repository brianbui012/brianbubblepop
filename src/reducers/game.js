//STATE =========================================================
const gameReducerDefaultState = {
    isGameStarted: false,
    level: 'circleSize-level1 circleBtn',
};

//REDUCER ========================================================


const gameReducer = (state = gameReducerDefaultState, action) => {
    switch (action.type) {
        case 'START_GAME':
            return { ...state, isGameStarted: action.isGameStarted };
        case 'END_GAME':
            return { ...state, isGameStarted: action.isGameStarted };
        case 'LEVEL1':
            return { ...state, level: action.level };
        case 'LEVEL2':
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