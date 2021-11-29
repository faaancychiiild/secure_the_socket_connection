import { createStore } from 'redux';

let localstate = JSON.parse(localStorage.getItem('authState'));
let { access_token, email, logCount } = localstate || {};

const initialState = {
  access_token: access_token || '',
  email: email || '',
  logCount: logCount || 0,
  userCount: ''
}
const setStatus = (state = initialState, action) => {
  switch(action.type){
    case 'count_logs':
      return {...state, logCount: action.logs}
    case 'set_email':
      return {...state, email: action.email}
    case 'set_user_count':
      return {...state, userCount: action.count}
    default:
      return state
  }
}
const store = createStore(setStatus);

export default store;