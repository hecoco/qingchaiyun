<template>
    <div id="login">
        <div class="title">
            <!-- <span v-if="isShowLogin">登录</span> -->
            <!-- <span v-if="!isShowLogin">注册</span> -->
            <span>青柴云笔记</span>
        </div>
        <div v-show="isShowLogin" class="login">
            <input type="text" v-model="login.username" placeholder="用户名" />
            <input type="password" v-model="login.password" placeholder="密码" />
            <p v-bind:class="{ error: login.isError }">{{ login.notice }}</p>
            <div class="button" @click="onLogin">登录</div>
            <div @click="isShowLogin = !isShowLogin" class="to">注册账号</div>
        </div>
        <div v-show="!isShowLogin" class="register">
            <input type="text" v-model="register.username" placeholder="用户名" />
            <input type="password" v-model="register.password" placeholder="密码" />
            <p v-bind:class="{ error: register.isError }">{{ register.notice }}</p>
            <div class="button" @click="onRegister">注册</div>
            <div @click="isShowLogin = !isShowLogin" class="to">登录账号</div>
        </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'

//判断是否登录
Auth.getInfo().then(data => console.log(data))

export default {
    data() {
        return {
            isShowLogin: true,
            isShowRegister: false,
            login: {
                username: '',
                password: '',
                notice: '',
                isError: false
            },
            register: {
                username: '',
                password: '',
                notice: '',
                isError: false
            },
            isOnBlur: false
        }
    },
    methods: {
        onLogin() {
            if (this.login.username.trim() === "" || this.login.password.trim() === "") {
                this.login.notice = "用户名或密码为空";
                this.login.isError = true;
                return;
            }
            if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
                this.login.notice = "用户名3~15个字符，仅限于字母数字下划线中文";
                this.login.isError = true;
                return;
            }
            if (!/^.{6,16}$/.test(this.login.password)) {
                this.login.notice = "密码长度为6~16个字符";
                this.login.isError = true;
                return;
            }

            Auth.login(
                {
                    username: this.login.username,
                    password: this.login.password
                })
                .then(data => {
                    this.login.isError = false;
                    this.login.notice = '';
                    Bus.$emit('userInfo', { username: this.login.username })
                    this.$router.push({ path: 'notebooks' });
                }).catch(error => {
                    this.login.notice = error.msg
                    this.login.isError = true
                })
            return;
        },
        //验证信息
        onRegister() {
            if (this.register.username.trim() === "" || this.register.password.trim() === "") {
                this.register.notice = "用户名或密码为空";
                this.register.isError = true;
                return;
            }
            if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)) {
                this.register.notice = "用户名3~15个字符，仅限于字母数字下划线中文";
                this.register.isError = true;
                return;
            }
            if (!/^.{6,16}$/.test(this.register.password)) {
                this.register.notice = "密码长度为6~16个字符";
                this.register.isError = true;
                return;
            }

            Auth.register({
                username: this.register.username,
                password: this.register.password
            })
                .then(data => {
                    this.register.isError = false;
                    this.register.notice = '';
                    this.showRegister();
                }).catch(error => {
                    this.register.notice = error.msg
                    this.register.isError = true
                })
        },
    }
}
</script>

<style scoped lang="less">
#login {
    margin: 20vh auto auto auto;
    border:.5px solid #eff0f0;
    border-radius:8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}

.to {
    display: inline-block;
    margin-top: 12px;
    cursor: pointer;
}

.error {
    color: red;
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: center;
    margin: 16px 0px;
    font-weight: bolder;

}

.login,
.register {
    padding: 16px 30px;
    border-top: 1px solid #eee;

    input {
        display: block;
        height: 35px;
        line-height: 35px;
        padding: 0 6px;
        border-radius: 4px;
        border: 1px solid #ccc;
        outline: none;
        font-size: 14px;
        margin-top: 16px;
    }
}

.button {
    background-color: #2080F0;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-weight: bold; //加粗
    color: #fff;
    border-radius: 4px;
    margin-top: 30px;
    cursor: pointer;
}

.register>.button {
    background-color: #2bb964;
}
</style>

