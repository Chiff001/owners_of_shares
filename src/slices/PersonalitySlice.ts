import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface filterPersonality {
    searchValue: string
}

const initialState: filterPersonality = {
    searchValue: ''
};

const PersonalitySlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        }
    },
});

export const { setSearchValue } = PersonalitySlice.actions;

export default PersonalitySlice.reducer;
