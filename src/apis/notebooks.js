import request from '@/helpers/request'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET, 'GET').then(res => {
                res.data = res.data.sort((notebook1, notebook2) => {
                    notebook1.createdAt > notebook2.createdAt
                })
                res.data.map(list=>{
                    list.createdAt = list.createdAt.substring(0,10)+" "+(Number(list.createdAt.substring(11,13))+8)+list.createdAt.substring(13,16)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
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