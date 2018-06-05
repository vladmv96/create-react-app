export const SAVE_TOKEN_ACTION = 'SAVE_TOKEN_ACTION'
export const SAVE_ACCOUNT_ACTION = 'SAVE_ACCOUNT_ACTION'
export const SAVE_FIRSTNAME_ACTION = 'SAVE_FIRSTNAME_ACTION'
export const SAVE_PROJECT_ID = 'SAVE_PROJECT_ID'
export const SAVE_STATUSES = 'SAVE_STATUSES'

const initialState = {
    token: '',
    permalink: '',
    first_name: '',
    id: '',
    statuses: {}
}

export default function (state = initialState, action) {
    console.log('action');
    switch (action.type) {
        case SAVE_TOKEN_ACTION:
            return { ...state, token: action.token }
        case SAVE_ACCOUNT_ACTION:
            return { ...state, permalink: action.permalink }
        case SAVE_FIRSTNAME_ACTION:
            return { ...state, first_name: action.first_name }
        case SAVE_PROJECT_ID:
            return { ...state, id: action.id }
        case SAVE_STATUSES:
            return { ...state, statuses: action.statuses }
        default:
            return state
    }
}