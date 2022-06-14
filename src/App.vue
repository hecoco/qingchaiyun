<template>
  <div id="app">
    <sidebar />
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar"
export default {
  name: 'App',
  components:{Sidebar}
}
</script>

<style>
/* 引入icon */
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body,#app{
  height: 100vh;
}
#app{
  display: flex;
  align-items: stretch;
}
ul,li{
  list-style: none;
}
a{
  text-decoration: none;
  color: #444;
}
</style>
