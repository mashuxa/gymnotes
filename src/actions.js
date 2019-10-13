export function setUsers(params) {
    return {
        type: 'SET_USERS',
        payload: params
    }
}

export function setStartDate(params) {
    return {
        type: 'SET_START_DATE',
        payload: params
    }
}

export function setEndDate(params) {
    return {
        type: 'SET_END_DATE',
        payload: params
    }
}

export function setTextFilter(params) {
    return {
        type: 'SET_TEXT_FILTER',
        payload: params
    }
}
