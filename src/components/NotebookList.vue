<template>
    <div>
        <h1>{{mag}}</h1>
        <ul>
          <li><router-link to="/note/#1">笔记一</router-link></li>
          <li><router-link to="/note/#2">笔记二</router-link></li>
        </ul>
    </div>
</template>

<script>

export default{
  data(){
      return {
        mag:'列表',
      }
  }
}
</script>

<style scoped>

</style>