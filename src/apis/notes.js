import request from '@/helpers/request'

const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId'
}

export default {
    getAll({ notebookId }) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId), 'GET').then(res => {
                res.data = res.data.sort((notebook1, notebook2) => {
                    notebook1.createdAt > notebook2.createdAt
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    addNotebooks({ notebookId }, { title = '', content = '' } = { title: '', content: '' }) {
        return request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content })
    },
    updateNotebooks({ noteId }, { title, content }) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title, content })
    },
    deleteNotebooks({ noteId }) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    }
}