import { combineReducers } from "redux"

import user from "./userReducer"
import poro from "./poroReducer"

export default combineReducers({
    user,
    poro
})