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
      path: '/note',
      name: Note,
      component: Note,
    },
    {
      path: '/trash',
      name: Trash,
      component: Trash,
    }
  ]
})

export default router;
