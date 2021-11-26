import axios from 'axios';

const base_url = 'http://localhost:3000';

const register = (object) => {
    return axios.post(base_url.concat('/register'), object).then((res) => res.data);
}

const login = (object) => {
    return axios.post(base_url.concat('/login'), object).then((res) => res.data);
}

const requests = {
    register, 
    login
}

export default requests;