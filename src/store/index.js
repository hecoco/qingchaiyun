import Vue from 'vue';
import Vuex from 'vuex';
import Auth from '@/apis/auth'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        username: '未登录'
    },
    mutations: {
        getSlug(state) {
            //  = state.username.charAt(0)
            Auth.getInfo().then(res => {
                if (res.isLogin) {
                    state.username = res.data.username
                }
            })
        }
    }
});


export default store;
