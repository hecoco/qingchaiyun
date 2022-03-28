<template>
    <div id="login">
        <div>
            <span v-if="isShowLogin">登录</span>
            <span v-if="isShowRegister">注册</span>
        </div>
        <div v-show="isShowLogin">
            <input type="text" v-model="login.username" placeholder="用户名"/>
            <input type="password" v-model="login.password" placeholder="密码" />
            <p v-bind:class="{error: login.isError}">{{login.notice}}</p>
            <div class="button" @click="onLogin">登录</div>
            <div @click="showRegister">注册账号</div>
        </div>
        <div v-show="isShowRegister">
            <input type="text" v-model="register.username" placeholder="用户名"  />
            <input type="password" v-model="register.password" placeholder="密码" />
            <input type="password" v-model="register.confirmPassword" placeholder="确认密码" />
            <p v-bind:class="{error: register.isError}">{{register.notice}}</p>
            <div class="button" @click="onRegister">注册</div>
            <div @click="showRegister">登录账号</div>
        </div>
    </div>
</template>

<script>

export default{
  data(){
      return {
        isShowLogin:true,
        isShowRegister:false,
        login:{
            username:'',
            password:'',
            notice:'',
            isError:false
        },
        register:{
            username:'',
            password:'',
            confirmPassword:'',
            notice:'',
            isError:false
        },
      }
  },
  methods:{
      //验证信息
      onLogin(){
        if(this.login.username.trim()==="" || this.login.password.trim() === ""){
            this.login.notice="用户名或密码为空";
            this.login.isError=true;
            return;
        }
        if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)){
            this.login.notice="用户名3~15个字符，仅限于字母数字下划线中文";
            this.login.isError=true;
            return;
        }
        if(!/^.{6,16}$/.test(this.login.password)){
            this.login.notice="密码长度为6~16个字符";
            this.login.isError=true;
            return;
        }
        this.login.isError=false;
        this.login.notice='';
        return;
      },
      //验证信息
      onRegister(){
        console.log(1)
        if(this.register.username.trim()==="" || this.register.password.trim() === "" || this.register.confirmPassword.trim() === ""){
              this.register.notice="用户名或密码为空";
              this.register.isError=true;
              return;
        }
        if(!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.username)){
            this.register.notice="用户名3~15个字符，仅限于字母数字下划线中文";
            this.register.isError=true;
            return;
        }
        if(!/^.{6,16}$/.test(this.register.password)){
            this.register.notice="密码长度为6~16个字符";
            this.register.isError=true;
            return;
        }
        if(!/^.{6,16}$/.test(this.register.confirmPassword)){
            this.register.notice="确认密码长度为6~16个字符";
            this.register.isError=true;
            return;
        }
        if(this.register.password!==this.register.confirmPassword){
            this.register.notice="密码与确认密码不一致";
            this.register.isError=true;
            return;
        }
        this.register.isError=false;
        this.register.notice='';
      },
      //切换登录注册
      showRegister(){
        this.isShowLogin=!this.isShowLogin;
        this.isShowRegister=!this.isShowRegister;
      },
  }
}
</script>

<style scoped>
input{
    display: block;
}
.error{
    color: red;
}
</style>

