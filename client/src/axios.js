import axios from 'axios';

const base_url = 'http://localhost:4000';

const register = (object) => {
    return axios.post(base_url.concat('/register'), object).then(res => res);
}

const login = (object) => {
    return axios.post(base_url.concat('/login'), object).then(res => res);
}

const fetchUserCount = () => {
    console.log('request sent');
    return axios.get(base_url.concat('/fetch/users')).then(res => console.log(res));
}

const requests = {
    register, 
    login,
    fetchUserCount
}

export default requests;