import request from '@/helpers/request'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return request(URL.GET, 'GET')
    },
    addNotebooks({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    },
    updateNotebooks(notebooksId, { title = '' } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', notebooksId), 'PATCH', { title })
    },
    deleteNotebooks(notebooksId) {
        return request(URL.DELETE.replace(':id', notebooksId), 'DELETE')
    }
}