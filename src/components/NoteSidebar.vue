<template>
  <div class="qc-row">
    <div class="top">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ curBook.title }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="link in notebooks" :command=link.id :key="link.id">{{ link.title }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button @click="addNote"> 添加笔记 </el-button>
    </div>
    <el-divider class="el-divider"></el-divider>
    <div class="title">
      <router-link class="qc-title" v-for="lins in notes" :key="lins.id" :to="`/note?noteId=${lins.id}&notebookId=${curBook.id}`">
        <div>
          <span>{{ lins.title ||  '无标题'  }}</span>
        </div>
    </router-link>
    </div>
  </div>
</template>

<script>
import Notes from '@/apis/notes'
import Notebooks from '@/apis/notebooks'
import bus from '@/helpers/bus'

export default {
  data() {
    return {
      notes: [],
      notebooks: [],
      curBook: {}
    }
  },
  created() {
    Notebooks.getAll().then(res => {
      this.notebooks = res.data;
      // notebook.id返回的是number
      // this.$route.query.notebookId 返回的是string
      this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId) || this.notebooks[0] || {};
      return Notes.getAll({ notebookId: this.curBook.id })
    }).then(res => {
      this.notes = res.data;
      this.$emit('update:notes', this.notes);//???
      bus.$emit('update:notes', this.notes)
    })
  },
  props: ['curNote'],
  methods: {
    handleCommand(notebookId) {
      console.log(notebookId)
      this.curBook = this.notebooks.find(notebook => notebook.id == notebookId)
      Notes.getAll({ notebookId }).then(res => {
        this.notes = res.data
      })
    },
    addNote() {
      Notes.addNotebooks({ notebookId: this.curBook.id }).then(res => {
        this.notes.unshift(res.data)
      })
    }
  },
}
</script>

<style scoped lang="less">

.qc-row{
  display: flex;
  flex-direction: column;
  width: 290px;
  border-right:1px solid #e7e7e7;
  .top{
    margin: 0 auto;
    margin-top: 12px;
  }
  .title{
    div{
    padding: 12px;
    }
    div:hover{
      background: #e7e7e7;
    }
  }
}
.el-divider{
  margin-top: 6px;
  margin-bottom: 0px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>