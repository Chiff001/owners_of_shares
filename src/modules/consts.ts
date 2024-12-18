export const PREV_YEAR = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
export const NEXT_YEAR = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

export const PERSONALITY_TYPE_DICT = {
    1: "Физическое",
    2: "Юридическое"
}

export const ACCREDITATION_DICT = {
    undefined: "",
    1: "Нет",
    2: "Есть"
}