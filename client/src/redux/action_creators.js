export const CountLogs = (logs) => {
    return {
        type: 'count_logs',
        logs
    }
}
export const SetEmail = (email) => {
    return {
        type: 'set_email',
        email
    }
}
