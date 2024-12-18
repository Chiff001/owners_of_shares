import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {T_Company, T_CompanysFilters, T_Personality} from "modules/types.ts";
import {NEXT_YEAR, PREV_YEAR} from "modules/consts.ts";
import {api} from "modules/api.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";

type T_CompanysSlice = {
    draft_company_id: number | null,
    personalitys_count: number | null,
    company: T_Company | null,
    companys: T_Company[],
    filters: T_CompanysFilters,
    save_mm: boolean
}

const initialState:T_CompanysSlice = {
    draft_company_id: null,
    personalitys_count: null,
    company: null,
    companys: [],
    filters: {
        status: 0,
        date_formation_start: PREV_YEAR.toISOString().split('T')[0],
        date_formation_end: NEXT_YEAR.toISOString().split('T')[0],
        owner: ""
    },
    save_mm: false
}

export const fetchCompany = createAsyncThunk<T_Company, string, AsyncThunkConfig>(
    "companys/company",
    async function(company_id) {
        const response = await api.companys.companysRead(company_id) as AxiosResponse<T_Company>
        return response.data
    }
)

export const fetchCompanys = createAsyncThunk<T_Company[], object, AsyncThunkConfig>(
    "companys/companys",
    async function(_, thunkAPI) {
        const state = thunkAPI.getState()

        const response = await api.companys.companysList({
            status: state.companys.filters.status,
            date_formation_start: state.companys.filters.date_formation_start,
            date_formation_end: state.companys.filters.date_formation_end
        }) as AxiosResponse<T_Company[]>

        return response.data.filter(company => company.owner.includes(state.companys.filters.owner))
    }
)

export const removePersonalityFromDraftCompany = createAsyncThunk<T_Personality[], string, AsyncThunkConfig>(
    "companys/remove_personality",
    async function(personality_id, thunkAPI) {
        const state = thunkAPI.getState()
        const response = await api.companys.companysDeletePersonalityDelete(state.companys.company.id, personality_id) as AxiosResponse<T_Personality[]>
        return response.data
    }
)

export const deleteDraftCompany = createAsyncThunk<void, object, AsyncThunkConfig>(
    "companys/delete_draft_company",
    async function(_, {getState}) {
        const state = getState()
        await api.companys.companysDeleteDelete(state.companys.company.id)
    }
)

export const sendDraftCompany = createAsyncThunk<void, object, AsyncThunkConfig>(
    "companys/send_draft_company",
    async function(_, {getState}) {
        const state = getState()
        await api.companys.companysUpdateStatusUserUpdate(state.companys.company.id)
    }
)

export const updateCompany = createAsyncThunk<void, object, AsyncThunkConfig>(
    "companys/update_company",
    async function(data, {getState}) {
        const state = getState()
        await api.companys.companysUpdateUpdate(state.companys.company.id, {
            ...data
        })
    }
)

export const updatePersonalityValue = createAsyncThunk<void, object, AsyncThunkConfig>(
    "companys/update_mm_value",
    async function({personality_id, count},thunkAPI) {
        const state = thunkAPI.getState()
        await api.companys.companysUpdatePersonalityUpdate(state.companys.company.id, personality_id, {count})
    }
)

export const acceptCompany = createAsyncThunk<void, string, AsyncThunkConfig>(
    "companys/accept_company",
    async function(company_id,{dispatch}) {
        await api.companys.companysUpdateStatusAdminUpdate(company_id, {status: 3})
        await dispatch(fetchCompanys)
    }
)

export const rejectCompany = createAsyncThunk<void, string, AsyncThunkConfig>(
    "companys/accept_company",
    async function(company_id,{dispatch}) {
        await api.companys.companysUpdateStatusAdminUpdate(company_id, {status: 4})
        await dispatch(fetchCompanys)
    }
)

const companysSlice = createSlice({
    name: 'companys',
    initialState: initialState,
    reducers: {
        saveCompany: (state, action) => {
            state.draft_company_id = action.payload.draft_company_id
            state.personalitys_count = action.payload.personalitys_count
        },
        removeCompany: (state) => {
            state.company = null
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm
        },
        updateFilters: (state, action) => {
            state.filters = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCompany.fulfilled, (state:T_CompanysSlice, action: PayloadAction<T_Company>) => {
            state.company = action.payload
        });
        builder.addCase(fetchCompanys.fulfilled, (state:T_CompanysSlice, action: PayloadAction<T_Company[]>) => {
            state.companys = action.payload
        });
        builder.addCase(removePersonalityFromDraftCompany.rejected, (state:T_CompanysSlice) => {
            state.company = null
        });
        builder.addCase(removePersonalityFromDraftCompany.fulfilled, (state:T_CompanysSlice, action: PayloadAction<T_Personality[]>) => {
            if (state.company) {
                state.company.personalitys = action.payload as T_Personality[]
            }
        });
        builder.addCase(sendDraftCompany.fulfilled, (state:T_CompanysSlice) => {
            state.company = null
        });
    }
})

export const { saveCompany, removeCompany, triggerUpdateMM, updateFilters } = companysSlice.actions;

export default companysSlice.reducer