import { PERSONALITIES_MOCK } from "./mock"

export interface Personality {
    image: string
    name: string
    number: string
    info: string
    type: string
    id: number
}

export interface PersonalityResult {
    application_id: number
	  application_count: number
    personalities: Personality[]
}

export const getPersonality = async (): Promise<PersonalityResult> =>{
  return fetch(`http://localhost:3000/api/personality/`, {
  })
      .then((response) => response.json())
}

export const getPersonalityByName = async (name = ''): Promise<PersonalityResult> =>{
    return fetch(`http://localhost:3000/api/personality/?name=${name}`)
        .then((response) => response.json())
        .catch(()=> (PERSONALITIES_MOCK))
}

export const getPersonalityById = async (
  id: number | string
): Promise<PersonalityResult> => {
  return fetch(`http://localhost:3000/api/personality/${id}/`).then(
    (response) => response.json()
  )
};