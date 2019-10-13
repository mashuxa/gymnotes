import {combineReducers} from "redux";
import homePageReducer from "./homePageReducer";
import authReducer from "./authReducer";

export default combineReducers({
    homePageReducer,
    authReducer,
});
