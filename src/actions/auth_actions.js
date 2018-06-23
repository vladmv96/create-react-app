import { SAVE_TOKEN_ACTION, SAVE_ACCOUNT_ACTION, SAVE_FIRSTNAME_ACTION, SAVE_PROJECT_ID, SAVE_STATUSES, GET_PROJECTS, GET_DATA, GET_STATUSES, GET_ACCOUNTS } from '../reducers/auth';

export function saveToken(token) {
    return {type: SAVE_TOKEN_ACTION, token}
}

export function savePermalink(permalink) {
    return {type: SAVE_ACCOUNT_ACTION, permalink}
}

export function saveFirstName(first_name) {
    return {type: SAVE_FIRSTNAME_ACTION, first_name}
}

export function saveProjectId(id) {
    return {type: SAVE_PROJECT_ID, id}
}

export function saveStatuses(statuses) {
    return {type: SAVE_STATUSES, statuses}
}

export function getProjects() {
    return {type: GET_PROJECTS, types:['a','b','c'], meta:{fetch:{url:'~admin2/projects', method: 'get'}}}
}

export function getData() {
    return {type: GET_DATA, types:['a','b','c'], meta:{fetch:{url:'~admin2/info'}}}
}

export function getStatuses() {
    return {type: GET_STATUSES, types:['a','b','c'], meta:{fetch:{url:'~admin2/ticket_statuses', method: 'get'}}}
}

export function getAccounts() {
    return {type: GET_ACCOUNTS, types:['a','b','c'], meta:{fetch:{url:'~admin2/accounts', method: 'get'}}}
}