import { combineReducers } from 'redux';

import { tokenReducer } from './token/reducer';

export const rootReducer = combineReducers({
    token: tokenReducer
});