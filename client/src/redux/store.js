import { createStore } from 'redux';

let localstate = JSON.parse(localStorage.getItem('authState'));
let { access_token, email } = localstate || {};

const initialState = {
  access_token: access_token || '',
  email: email || '',
  logCount: 0
}
const setStatus = (state = initialState, action) => {
  switch(action.type){
    case 'count_logs':
      return {...state, logCount: action.logs}
    case 'set_email':
      return {...state, email: action.email}
    default:
      return state
  }
}
const store = createStore(setStatus);

export default store;