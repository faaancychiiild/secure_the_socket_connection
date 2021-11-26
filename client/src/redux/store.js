import { createStore } from 'redux';

const initialState = {
  logged_in: false
}
const setStatus = (state = initialState, action) => {
  switch(action.type){
    case 'log_in':
      return {...state, logged_in: true}
    case 'log_out':
      return {...state, logged_in: false}
    default:
      return state
  }
}
const store = createStore(setStatus);

export default store;