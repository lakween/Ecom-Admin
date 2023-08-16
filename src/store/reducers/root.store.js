import {combineReducers} from "@reduxjs/toolkit";
import userDetailsSlice from './userDetails-slice'

const RootStore = combineReducers({
    userDetailsSlice: userDetailsSlice,
})

export default RootStore