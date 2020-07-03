import api from './api';
import qs from 'qs';

let user = {};

// 登录jwt
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

// home获取列表
const getAllList = function (success, error) {
    api.post('api/all', (res) => {
        if (res.code === 1) {
            success && success(res.data,res.total);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getAllList = getAllList;

export default user;