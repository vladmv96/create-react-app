export const SAVE_TOKEN_ACTION = 'SAVE_TOKEN_ACTION'
export const SAVE_ACCOUNT_ACTION = 'SAVE_ACCOUNT_ACTION'
export const SAVE_FIRSTNAME_ACTION = 'SAVE_FIRSTNAME_ACTION'
export const SAVE_PROJECT_ID = 'SAVE_PROJECT_ID'
export const SAVE_STATUSES = 'SAVE_STATUSES'
export const GET_PROJECTS = 'GET_PROJECTS'
export const GET_DATA = 'GET_DATA'
export const GET_STATUSES = 'GET_STATUSES'
export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const CREATE_STATUS = 'CREATE_STATUS'
export const CREATE_TICKET = 'CREATE_TICKET'
export const DELETE_STATUS = 'DELETE_STATUS'
export const GET_TICKETS = 'GET_TICKETS'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const SAVE_TICKETS_ACTION = 'SAVE_TICKETS_ACTION'
export const SAVE_COUNT_ACTION = 'SAVE_COUNT_ACTION'


const initialState = {
    token: '',
    permalink: '',
    first_name: '',
    id: '',
    statuses: [],
    tickets: [],
    count: null
}

export default function (state = initialState, action) {
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
        case GET_PROJECTS:
            return { ...state}
        case GET_DATA:
            return { ...state}
        case GET_STATUSES:
            return { ...state}
        case GET_ACCOUNTS:
            return { ...state}
        case CREATE_STATUS:
            return { ...state}
        case CREATE_TICKET:
            return { ...state}
        case DELETE_STATUS:
            return { ...state}
        case GET_TICKETS:
            return { ...state}
        case CHANGE_STATUS:
            return { ...state}
        case SAVE_TICKETS_ACTION:
            return { ...state, tickets: action.tickets }
        case SAVE_COUNT_ACTION:
            return { ...state, count: action.count }
        default:
            return state
    }
}