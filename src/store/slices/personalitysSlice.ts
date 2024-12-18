import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Personality, T_PersonalityAddData, T_PersonalitysListResponse} from "modules/types.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import {saveCompany} from "store/slices/companysSlice.ts";
import {Personality} from "src/api/Api.ts";

type T_PersonalitysSlice = {
    personality_name: string
    personality: null | T_Personality
    personalitys: T_Personality[]
}

const initialState:T_PersonalitysSlice = {
    personality_name: "",
    personality: null,
    personalitys: []
}

export const fetchPersonality = createAsyncThunk<T_Personality, string, AsyncThunkConfig>(
    "fetch_personality",
    async function(id) {
        const response = await api.personalitys.personalitysRead(id) as AxiosResponse<T_Personality>
        return response.data
    }
)

export const fetchPersonalitys = createAsyncThunk<T_Personality[], object, AsyncThunkConfig>(
    "fetch_personalitys",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState();
        const response = await api.personalitys.personalitysList({
            personality_name: state.personalitys.personality_name
        }) as AxiosResponse<T_PersonalitysListResponse>

        thunkAPI.dispatch(saveCompany({
            draft_company_id: response.data.draft_company_id,
            personalitys_count: response.data.personalitys_count
        }))

        return response.data.personalitys
    }
)

export const addPersonalityToCompany = createAsyncThunk<void, string, AsyncThunkConfig>(
    "personalitys/add_personality_to_company",
    async function(personality_id) {
        await api.personalitys.personalitysAddToCompanyCreate(personality_id)
    }
)

export const deletePersonality = createAsyncThunk<T_Personality[], string, AsyncThunkConfig>(
    "delete_personality",
    async function(personality_id) {
        const response = await api.personalitys.personalitysDeleteDelete(personality_id) as AxiosResponse<T_Personality[]>
        return response.data
    }
)

export const updatePersonality = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_personality",
    async function({personality_id, data}) {
        await api.personalitys.personalitysUpdateUpdate(personality_id as string, data as Personality)
    }
)

export const updatePersonalityImage = createAsyncThunk<void, object, AsyncThunkConfig>(
    "update_personality_image",
    async function({personality_id, data}) {
        await api.personalitys.personalitysUpdateImageCreate(personality_id as string, data as {image?: File})
    }
)

export const createPersonality = createAsyncThunk<void, T_PersonalityAddData, AsyncThunkConfig>(
    "update_personality",
    async function(data) {
        await api.personalitys.personalitysCreateCreate(data)
    }
)

const personalitysSlice = createSlice({
    name: 'personalitys',
    initialState: initialState,
    reducers: {
        updatePersonalityName: (state, action) => {
            state.personality_name = action.payload
        },
        removeSelectedPersonality: (state) => {
            state.personality = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPersonalitys.fulfilled, (state:T_PersonalitysSlice, action: PayloadAction<T_Personality[]>) => {
            state.personalitys = action.payload
        });
        builder.addCase(fetchPersonality.fulfilled, (state:T_PersonalitysSlice, action: PayloadAction<T_Personality>) => {
            state.personality = action.payload
        });
        builder.addCase(deletePersonality.fulfilled, (state:T_PersonalitysSlice, action: PayloadAction<T_Personality[]>) => {
            state.personalitys = action.payload
        });
    }
})

export const { updatePersonalityName, removeSelectedPersonality} = personalitysSlice.actions;

export default personalitysSlice.reducer