<template>
    <div></div>
</template>

<script>
import Auth from '@/apis/auth'

export default{
  data(){
      return {
        mag:'详情',
      }
  },
  created(){
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
  }
}
</script>

<style scoped lang="less">

</style>