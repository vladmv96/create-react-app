import { SAVE_TOKEN_ACTION, SAVE_ACCOUNT_ACTION, SAVE_FIRSTNAME_ACTION, SAVE_PROJECT_ID, SAVE_STATUSES, GET_PROJECTS, GET_DATA, GET_STATUSES, GET_ACCOUNTS, CREATE_STATUS, CREATE_TICKET, DELETE_STATUS, GET_TICKETS, CHANGE_STATUS } from '../reducers/auth';

export function saveToken(token) {
    return { type: SAVE_TOKEN_ACTION, token }
}

export function savePermalink(permalink) {
    return { type: SAVE_ACCOUNT_ACTION, permalink }
}

export function saveFirstName(first_name) {
    return { type: SAVE_FIRSTNAME_ACTION, first_name }
}

export function saveProjectId(id) {
    return { type: SAVE_PROJECT_ID, id }
}

export function saveStatuses(statuses) {
    return { type: SAVE_STATUSES, statuses }
}

export function getProjects() {
    return { type: GET_PROJECTS, types: ['getProjectsLoad', 'getProjectsSuccess', 'getProjectsError'], meta: { fetch: { url: '~admin2/projects', method: 'get' } } }
}

export function getData() {
    return { type: GET_DATA, types: ['getDataLoad', 'getDataSuccess', 'getDataError'], meta: { fetch: { url: '~admin2/info' } } }
}

export function getStatuses() {
    return { type: GET_STATUSES, types: ['getStatusesLoad', 'getStatusesSuccess', 'getStatusesError'], meta: { fetch: { url: '~admin2/ticket_statuses', method: 'get' } } }
}

export function getAccounts() {
    return { type: GET_ACCOUNTS, types: ['getAccountsLoad', 'getAccountsSuccess', 'getAccountsError'], meta: { fetch: { url: '~admin2/accounts', method: 'get' } } }
}

export function createStatus(title) {
    return { type: CREATE_STATUS, types: ['createStatusLoad', 'createStatusSuccess', 'createStatusError'], meta: { fetch: { url: '~admin2/ticket_statuses', method: 'post', data: { 'title': title } } } }
}

export function createTicket(id, name, phone, email) {
    return {
        type: CREATE_TICKET, types: ['createTicketLoad', 'createTicketSuccess', 'createTicketError'], meta: {
            fetch: {
                url: `~admin2/project/${id}/tickets`,
                method: 'post',
                data: {
                    'name': name,
                    'phone': phone,
                    'email': email
                }
            }
        }
    }
}

export function deleteStatus(id) {
    return { type: DELETE_STATUS, types: ['deleteStatusLoad', 'deleteStatusSuccess', 'deleteStatusError'], meta: { fetch: { url: `~admin2/ticket_status/${id}`, method: 'delete', data: { 'force_status': 'novyi' } } } }
}

export function getTickets(id, activePage, status) {
    return { type: GET_TICKETS, types: ['getTicketsLoad', 'getTicketsSuccess', 'getTicketsError'], meta: { fetch: { url: `~admin2/project/${id}/tickets`, method: 'get', params: { page: activePage, status: status } } } }
}

export function changeStatus(ticketId, permalink) {
    return { type: CHANGE_STATUS, types: ['changeStatusLoad', 'changeStatusSuccess', 'changeStatusError'], meta: { fetch: { url: `~admin2/ticket/${ticketId}`, method: 'put', data: { status: permalink } } } }
}