import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import authReducer from "./modules/auth/reducers";
import customerReducer from "./modules/customer/reducers";
import serviceReducer from "./modules/service/reducers";
import userReducer from "./modules/user/reducers";
import exerciseReducer from "./modules/exercise/reducers";
import conversationReducer from "./modules/conversation/reducers";
import messageReducer from "./modules/message/reducers";
import workoutReducer from "./modules/workout/reducers";
import programReducer from "./modules/program/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  service: serviceReducer,
  exercise: exerciseReducer,
  user: userReducer,
  conversation: conversationReducer,
  message: messageReducer,
  workout: workoutReducer,
  program: programReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
