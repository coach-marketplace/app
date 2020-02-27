import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./modules/auth/reducers";
import customerReducer from "./modules/customer/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
