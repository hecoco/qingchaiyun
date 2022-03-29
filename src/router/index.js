import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import NotebookList from '@/components/NotebookList'
import Note from '@/components/NoteDetail'
import Trash from '@/components/TrashDetail'
import Auth from '@/apis/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/notebooks',
      name: 'NotebookList',
      component: NotebookList,
    },
    {
      path: '/note/:noteId',
      name: Note,
      component: Note,
    },
    {
      path: '/trash/:noteId',
      name: Trash,
      component: Trash,
    }
  ]
})

// router.beforeEach(async (to, from, next) => {
//   if (to.meta.auth) {
//     Auth.getInfo().then(data => {
//       data.isLogin
//         ? next()
//         : next({
//           name: 'Login'
//         })
//     })
//   }
// })

export default router;
