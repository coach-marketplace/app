import { createStore, combineReducers, compose } from "redux";

import authReducer from "./modules/auth/reducers";

const rootReducer = combineReducers({
  auth: authReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers());

export default store;
