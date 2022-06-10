<template>
    <div>
       <span :title="username">{{slug}}</span>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import Bus from '@/helpers/bus'

export default{
  data(){
      return {
        username:'未登录',
      }
  },
  created(){
      Bus.$on('userInfo',data=>{
        this.username = data.username
      })
      Auth.getInfo().then(res=>{
        if(res.isLogin){
            this.username=res.data.username
        }
      })
  },
  computed:{
      slug(){
        return this.username.charAt(0);
      }
  }
}
</script>

<style scoped>
span{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border-radius: 50%;
    /* background: #f2b81c; */
    background: #67c23a;
    color: #fff;
    text-shadow: 1px 0 1px #795c19;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 35px;
    margin-top: 15px;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}
</style>

