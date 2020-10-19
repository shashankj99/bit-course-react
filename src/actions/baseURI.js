import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost/bit-course/public',
    headers: {
        'Authorization': localStorage.getItem('access_token')
    }
});
