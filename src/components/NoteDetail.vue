<template>
  <div class="note" >
    <note-sidebar class="link" @update:notes="val => notes = val" :curNote="curNote"></note-sidebar>
    <div class="qc-editor">
      <div v-if="!curNote.id">
        <el-empty description="请选择笔记"></el-empty>
      </div>
      <div v-else-if="curNote.id" class="editor">
        <div class="status">
          <div>
            <!-- <span>创建日期: {{ curNote.createAtFriendly }}</span>
            <span>更新日期: {{ curNote.updatedAtFriendly }}</span> -->
            
            <!-- <div >{{curNote.updatedAt}}</div> -->
          </div>
          <div>
            <span style="color:#606266;font-size: 14px;"> {{ statusText }} </span>
            <el-button size="mini" icon="el-icon-rank" @click="isShowPreview = !isShowPreview" round>预览</el-button>
            <el-button size="mini" icon="el-icon-delete" @click="deleteNote" round>删除</el-button>
          </div>
        </div>
        <el-divider class="divider"></el-divider>
        <div class="title">
          <input class="input-title" @onkeyup.ctrl="onKeyDown(e)" v-model="curNote.title" @input="updateNode" @keyup="statusText = '正在输入'" placeholder="请输入文章标题" />
        </div>
        <div class="textarea">
          <!-- element el-input组件 绑定keydown失效  使用.native即可 也可使用keyup -->
          <textarea v-show="!isShowPreview" class="input-textarea" type="textarea" :rows="35" @input="updateNode"
            @keydown.native="statusText = '正在输入'" placeholder="请输入内容" v-model="curNote.content" ></textarea>
          <div v-show="isShowPreview" v-html="previewContent">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import NoteSidebar from '@/components/NoteSidebar'
import Notes from '@/apis/notes'
import bus from '@/helpers/bus'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'

let mk = new MarkdownIt();

window.Notes = Notes

export default {
  data() {
    return {
      curNote: {},
      notes: [],
      statusText: '未保存',
      isShowPreview: false
    }
  },
  
  methods: {
    updateNode: _.debounce(function () {//????
      Notes.updateNotebooks({ noteId: this.curNote.id }, { title: this.curNote.title, content: this.curNote.content }).then(res => {
        this.statusText = '已保存'
      }).catch(error => this.statusText = '保存失败')
    }, 600),
    deleteNote() {
      Notes.deleteNotebooks({ noteId: this.curNote.id }).then(data => {
        this.notes.splice(this.notes.indexOf(this.curNote), 1)
        this.$message.success('删除成功，放入回收站')
        this.$router.replace({ path: '/note' })//???
      })
    },
    onKeyDown(e){
      console.log(1)
      return ''
    }
  },
  computed: {
    previewContent() {
      return mk.render(this.curNote.content || '')//获取笔记内容 md
    },
    
  },
  components: { NoteSidebar },
  created() {
    Auth.getInfo().then(res => {
      if (!res.isLogin) {
        this.$router.push({ path: '/login' })
      }
    })
    bus.$once('update:notes', val => {
      this.curNote = val.find(note => note.id == this.$route.query.noteId) || {}
    })
  },
  beforeRouteUpdate(to, from, next) {//???
    this.curNote = this.notes.find(note => note.id == to.query.noteId) || {}
    next()
  }
}
</script>

<style scoped lang="less">
.note{
  display: flex;
  flex-direction: row;
  align-items:stretch;
  flex:1;
  .qc-editor{
    flex:1;
    display: flex;
    flex-direction: column;
    .editor{  
      width: 95%;
    }
  }
}
.title{
  margin-bottom: 24px;
  .input-title{
  border: none;
  outline:none;
  font-size: 1.6em;
  margin-left: .5em;
}
}
.input-textarea{
  border: none;
  outline:none;
  width: 100%;
  height: 100%;
  font-size: 1.3em;
  margin-left: 2em;
}
.divider{
  margin: 3px 0;
}
.status{
  display: flex;
  justify-content: space-between;
  margin: 6px 0;
}
</style>