import { createStore, combineReducers } from 'redux';
import timerReducer from '../reducers/timer';
import gameReducer from '../reducers/game';

export default () => {
    const store = createStore(
        combineReducers({
            game: gameReducer,
            timer: timerReducer,
        })
    );
    return store;
};