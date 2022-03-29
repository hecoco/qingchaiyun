import request from '@/helpers/request'

const URL = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    GET_INFO: '/auth'
}

export default {
    login({ username, password }) {
        return request(URL.LOGIN, 'POST', { username, password })
    },
    register({ username, password }) {
        return request(URL.LOGIN, 'POST', { username, password })
    },
    logout() {
        return request(URL.LOGOUT, 'GET')
    },
    getInfo() {
        return request(URL.GET_INFO, 'GET')
    }
}