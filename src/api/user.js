import api from './api';
import qs from 'qs';

let user = {};

const login = function (data, success, error) {
    api.post('api/jwt', data, (res) => {
        if (res.code === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.login = login;


export default user;