export type T_Personality = {
    id: string
    name: string
    description: string
    type: number
    number: string
    image: string
    status: number
    count?: string
}

export type T_Company = {
    id: string | null
    status: E_CompanyStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    personalitys: T_Personality[]
    description: string
    accreditation: boolean
}

export enum E_CompanyStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_CompanysFilters = {
    date_formation_start: string
    date_formation_end: string
    status: number
    owner: string
}

export type T_PersonalitysListResponse = {
    personalitys: T_Personality[],
    draft_company_id?: number,
    personalitys_count?: number
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_PersonalityAddData = {
    name: string;
    description: string;
    type: number;
    image?: File | null;
}