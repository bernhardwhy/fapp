import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://fapp-c83e2.firebaseio.com/'
});

export default instance;