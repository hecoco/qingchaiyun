<template>
    <div id="sidebar">
        <avatar></avatar>
        <div class="icons">
            <router-link to="/note" title="笔记">
                <i class="iconfont icon-note"></i>
            </router-link>
            <router-link to="/notebooks" title="笔记本">
                <i class="iconfont icon-notebook"></i>
            </router-link>
            <router-link to="/trash" title="回收站">
                <i class="iconfont icon-trash"></i>
            </router-link>
        </div>
        <div class="logout">
            <i class="iconfont icon-logout" @click="logout"></i>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Auth from '@/apis/auth'

export default {
    data() {
        return {

        }
    },
    components: { Avatar },
    methods: {
        //注销
        logout() {
            Auth.logout().then(
                this.$router.push({ path: 'login' }),
                data => console.log(data)
            )
        }
    },

}
</script>

<style scoped lang="less">
#sidebar {
    width: 56px;
    position: relative;
    text-align: center;
    background: #2c333c;

    .icons {
        margin-top: 15px;

        a {
            padding: 6px 0;
            display: block;
        }

        .router-link-active {
            background-color: #5e6266;
        }
    }

    .logout {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;

        .iconfont {
            color: #fff;
        }
    }
}
</style>