<template>
    <div class="note">
      <note-sidebar class="link" @update:notes="val => notes = val"></note-sidebar>
      <div class="xx">
        <div class="title">
          <span>创建日期: {{curNote.createAtFriendly}}</span>
          <span>更新日期: {{curNote.updatedAtFriendly}}</span>
          <span>{{statusText}}</span>
          <span><i class="el-icon-delete"></i></span>
          <span><i class="el-icon-check"></i></span>
      </div>
      <div>
        <el-input v-model="curNote.title" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <el-input type="textarea" :rows="35" 
        placeholder="请输入内容" v-model="curNote.content">
</el-input>
      </div>
      </div>
    </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from '@/components/NoteSidebar'
import Notes from '@/apis/notes'

window.Notes = Notes

export default{
  data(){
      return {
        curNote:{
          title:'我的笔记',
          content:'内容',
          createAtFriendly:'一天前',
          updatedAtFriendly:'刚刚',
          statusText:'未更新'
        },
        notes:[]
      }
  },
  components:{NoteSidebar},
  created(){
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
  },
}
</script>

<style scoped lang="less">
.note{
  display: flex;
  flex-direction: row;
  .xx{
    display: flex;
    flex-direction: column;
    min-width: 75%;
  }
}
</style>