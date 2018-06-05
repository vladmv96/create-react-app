import { SAVE_TOKEN_ACTION, SAVE_ACCOUNT_ACTION, SAVE_FIRSTNAME_ACTION, SAVE_PROJECT_ID, SAVE_STATUSES } from '../reducers/auth';

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