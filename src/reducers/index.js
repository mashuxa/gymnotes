import {combineReducers} from "redux";
import authReducer from "./authReducer";
import homePageReducer from "./homePageReducer";
import userSettingsReducer from "./userSettingsReducer";
import userScheduleReducer from "./userScheduleReducer";
import contractorCalendarReducer from "./contractorCalendarReducer";
import scheduleFormReducer from "./scheduleFormReducer";
import scheduleListReducer from "./scheduleListReducer";
import appointmentListReducer from "./appointmentListReducer";

export default combineReducers({
    authReducer,
    homePageReducer,
    userSettingsReducer,
    userScheduleReducer,
    contractorCalendarReducer,
    scheduleFormReducer,
    scheduleListReducer,
    appointmentListReducer
});
