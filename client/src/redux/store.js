import { createStore } from 'redux';

let localstate = JSON.parse(localStorage.getItem('authState'));
let { logged_in, email } = localstate || {};

const initialState = {
  logged_in: logged_in || false,
  email: email || ''
}
const setStatus = (state = initialState, action) => {
  switch(action.type){
    case 'log_in':
      return {...state, logged_in: true}
    case 'log_out':
      return {...state, logged_in: false}
    case 'set_email':
      return {...state, email: action.email}
    default:
      return state
  }
}
const store = createStore(setStatus);

export default store;