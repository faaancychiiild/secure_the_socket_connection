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
export const SetUserCount = (count) => {
    return {
        type: 'set_user_count',
        count
    }
}