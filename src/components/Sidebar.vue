<template>
    <div id="sidebar">
        <avatar></avatar>
        <div class="icons">
            <router-link to="/note" title="笔记">
                <el-button class="iconfont" type="text" icon="el-icon-notebook-2">文档</el-button>
            </router-link>
            <router-link to="/notebooks" title="文档">
                <el-button class="iconfont" type="text" icon="el-icon-notebook-1">知识库</el-button>
            </router-link>
            <router-link to="/trash" title="回收站">
                <el-button class="iconfont" type="text" icon="el-icon-delete">回收站</el-button>
            </router-link>
        </div>
        <div class="logout">
            <el-button class="iconfont" type="text" @click="logout" style="color:#66b1ff">注销</el-button>
        </div>
    </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Auth from '@/apis/auth'

export default {
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
    width: 112px;
    position: relative;
    text-align: center;
    // background: #2c333c;
    background: #ecf5ff;

    .icons {
        margin-top: 15px;

        a {
            padding: 6px 0;
            display: block;
        }

        .router-link-active {
            // background-color: #5e6266;
            background-color: #b3d8ff;
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