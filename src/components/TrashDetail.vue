<template>
    <div>
        {{mag}}
    </div>
</template>

<script>
import Auth from '@/apis/auth'

export default{
  data(){
      return {
        mag:'回收站',
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

<style scoped>

</style>