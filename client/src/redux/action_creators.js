export const LogIn = () => {
    return {
        type: 'log_in'
    }
}
export const LogOut = () => {
    return {
        type: 'log_out'
    }
}
export const SetEmail = (email) => {
    return {
        type: 'set_email',
        email
    }
}
