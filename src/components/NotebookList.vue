<template>
  <div class="detail" id="notebook-list">
    <main>
      <div class="layout">
        <div class="book-title">
          <h3>笔记本列表</h3>
          <el-button type="primary" class="add"  @click="onCreate" icon="el-icon-plus">新建笔记本</el-button>
        </div>
        <div class="book-list">
          <router-link v-for="list in booksList"
          :key="list.id" :to="`/note?notebookId=${list.id}`" class="notebook">
            <div class="yin">
              <div>
                <div class="txt">
                  <span class="title">{{list.title}}</span>
                  <span class="date">{{list.createdAt}}</span>
                </div>
              </div>
              <div class="function">
                <el-button @click.stop.prevent="onEdit(list)" icon="el-icon-edit" circle></el-button>
                <el-button @click.stop.prevent="onDelete(list)" icon="el-icon-delete" circle></el-button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'
import Notebooks from '@/apis/notebooks'
window.Notebooks = Notebooks
export default{
  data(){
      return {
        mag:'列表',
        booksList:[]
      }
  },
  created(){
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    });
    Notebooks.getAll().then(res=>{
      this.booksList = res.data
    })
  },
  
  methods:{
    onCreate(){
      this.$prompt('请输入标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题格式不正确'
        }).then(({ value }) => {
          return Notebooks.addNotebooks({title:value})
        }).then(res=>{
            this.booksList.unshift(res.data)
            this.$message({
              type: 'success',
              message: '创建成功',
              duration: 800
            }); 
          })
    },
    onEdit(notebook){
        this.$prompt('请输入标题', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue:notebook.title,
          inputPattern: /^.{1,30}$/,
          inputErrorMessage: '标题格式不正确'
        }).then(({ value }) => {
          return Notebooks.updateNotebooks(notebook.id,{title:value}).then(res=>{
          this.$message({
            type: 'success',
            message: '修改成功',
            duration: 800
          }); 
          notebook.title=value
        })
          })
          
    },
    onDelete(notebook){
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return Notebooks.deleteNotebooks(notebook.id)
      }).then((res)=>{
        this.booksList.splice(this.booksList.indexOf(notebook),1)
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 800
        });
      })      
    }
  }
}
</script>

<style lang="less" scoped>
.notebook:hover{
  background: #FAFAFA;
}
.book-title{
  font-size: 1.8em;
  display: flex;
  justify-content:space-between;
  h3{
    display: inline-block;
  }
  .add{
    margin-right: 12px;
  }
}
#notebook-list{
  margin: 12px auto auto auto;
}
.function{
  margin:auto 24px auto auto;
  span{
    padding: 0 20px;
  }
}
main{
  margin-top: 12px;
  width: 80vh;
  .book-list{
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    border-bottom:1px solid #e7e7e7;
    a{
      display: inline-block;
      padding: 24px 0;
      border-top:1px solid #e7e7e7;
      padding-left: 6px;
      div{
        display: flex;
        flex-direction: row;
        .txt{
        display: flex;
        flex-direction: column;
        }
        .iconfont{
          margin: auto 24px auto auto;
        }
        .title{
          font-size: 1.2em;
        }
        .date{
          font-size: 0.8em;
          margin-top: 0.2em;
          color:#86909c;
        }
      }
    }
  }
}
</style>