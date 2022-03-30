<template>
    <div>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{curBook.title}}
            <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                v-for="link in notebooks" :key="link.id" 
                :command=link.id >{{link.title}}</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <router-link v-for="lins in notes" :key="lins.id" :to="`/note?noteId=${lins.id}&notebookId=${curBook.id}`" class="zzzzz">
          <el-button> {{lins.title}} || {{lins.createdAt}} </el-button>
        </router-link>



        <!-- <el-table :data="notes" highlight-current-row @current-change="bookId()" style="width: 100%">
          <el-table-column prop="createdAt" label="更新时间"></el-table-column>
          <el-table-column prop="title" label="标题"></el-table-column>
        </el-table> -->
    </div>
</template>

<script>
import Notes from '@/apis/notes'
import Notebooks from '@/apis/notebooks'

export default{
  data(){
      return {
          notes:[],
          notebooks:[],
          curBook:{}
      }
  },
  created(){
    console.log(typeof this.$route.query.notebookId)
    Notebooks.getAll().then(res=>{
      this.notebooks = res.data;
      // notebook.id返回的是number 
      // this.$route.query.notebookId 返回的是string
      this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId) || this.notebooks[0] || {};
      return Notes.getAll({notebookId:this.curBook.id})
    }).then(res=>{
      this.notes=res.data;
      this.$emit('update:notes',this.notes);//???
    })
  },
  props:['curNote'],
  methods: {
    handleCommand(notebookId) {
      console.log(notebookId)
      this.curBook = this.notebooks.find(notebook => notebook.id == notebookId)
      Notes.getAll({notebookId}).then(res =>{
        this.notes = res.data
      })
    },
   },
   
}
</script>

<style scoped lang="less">
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>