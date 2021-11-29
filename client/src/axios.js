import axios from 'axios';

const base_url = 'http://localhost:4000';

const register = (object) => {
    return axios.post(base_url.concat('/register'), object).then(res => res);
}

const login = (object) => {
    return axios.post(base_url.concat('/login'), object).then(res => res);
}

const fetchPageStats = (token, email, refresh) => {
    return axios.post(base_url.concat('/fetch_page_stats'), { token, email, refresh }).then(res => res);
}

const requests = {
    register,
    login,
    fetchPageStats
}

export default requests;