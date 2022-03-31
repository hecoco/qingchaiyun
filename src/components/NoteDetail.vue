<template>
    <div class="note">
      <note-sidebar class="link" @update:notes="val => notes = val" :curNote="curNote"></note-sidebar>
      <div class="xx"  >
        <div v-show="!curNote.id">
          <el-empty description="请选择笔记"></el-empty>
        </div>
        <!-- calc -->
        <div v-show="curNote.id">
          <div class="title">
            <span>创建日期: {{curNote.createAtFriendly}}</span>
            <span>更新日期: {{curNote.updatedAtFriendly}}</span>
            <span> {{statusText}} </span>
            <span><i class="el-icon-rank" @click="isShowPreview=!isShowPreview">预览</i></span>
            <span><i class="el-icon-delete" @click="deleteNote"></i></span>
          </div>
          <div>
            <el-input v-model="curNote.title" @input="updateNode" @keyup="statusText='正在输入'" placeholder="请输入标题"></el-input>
          </div>
          <div>
            <!-- element el-input组件 绑定keydown失效  使用.native即可 也可使用keyup -->
            <el-input v-show="!isShowPreview" type="textarea" :rows="35" @input="updateNode" 
            @keydown.native="statusText='正在输入'" placeholder="请输入内容" 
            v-model="curNote.content"></el-input>
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

export default{
  data(){
      return {
        curNote:{},
        notes:[],
        statusText:'未保存',
        isShowPreview:false
      }
  },
  methods:{
    updateNode:_.debounce(function(){//????
      Notes.updateNotebooks({noteId:this.curNote.id},{title:this.curNote.title, content:this.curNote.content}).then(res=>{
        this.statusText='已保存'
      }).catch(error=>this.statusText='保存失败')
    },600),
    deleteNote(){
      Notes.deleteNotebooks({noteId:this.curNote.id}).then(data=>{
        this.notes.splice(this.notes.indexOf(this.curNote),1)
        this.$message.success('删除成功，放入回收站')
        this.$router.replace({path:'/note'})//???
      })
    }
  },
  computed:{
    previewContent(){
      return mk.render(this.curNote.content || '')
    }
  },
  components:{NoteSidebar},
  created(){
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
    bus.$once('update:notes',val=>{
      this.curNote = val.find(note=>note.id == this.$route.query.noteId) || {}
    })
  },
  beforeRouteUpdate(to,from,next){//???
     this.curNote = this.notes.find(note=>note.id == to.query.noteId) || {}
    next()
   }
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