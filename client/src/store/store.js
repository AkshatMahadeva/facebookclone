import { configureStore, combineReducers } from "@reduxjs/toolkit";
import modeReducer from "./reducers/modeReducer";

// const rootReducer = combineReducers({
//   modeReducer,
// });

const store = configureStore({
    reducer: modeReducer
});

export default store;
