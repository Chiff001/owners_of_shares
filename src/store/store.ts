import {configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import userReducer from "./slices/userSlice.ts"
import companysReducer from "./slices/companysSlice.ts"
import personalitysReducer from "./slices/personalitysSlice.ts"

export const store = configureStore({
    reducer: {
        user: userReducer,
        companys: companysReducer,
        personalitys: personalitysReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
