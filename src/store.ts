import { combineReducers, configureStore } from "@reduxjs/toolkit"
import dataReducer from "./slices/PersonalitySlice"


export default configureStore({
    reducer: combineReducers({
        search: dataReducer
    })
})
