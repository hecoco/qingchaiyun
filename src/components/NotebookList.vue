<template>
  <div class="detail" id="notebook-list">
    <header>
      <el-button type="primary" class="btn" @click="onCreate" icon="el-icon-plus">新建笔记本</el-button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表</h3>
        <div class="book-list">
          <router-link v-for="list in booksList"
          :key="list.id" :to="`/note?notebookId=${list.id}`" class="notebook">
            <div>
              <div>
                <span class="iconfont icon-notebook"></span>
                <div class="txt">
                  <span class="title">{{list.title}}</span>
                  <span class="date">{{list.createdAt}}</span>
                </div>
              </div>
              <div class="function">
                <!-- <span class="action" @click.stop.prevent="onEdit(list)">编辑</span> -->
                <!-- <span class="action" @click.stop.prevent="onDelete(list)">删除</span> -->
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
.btn{
  width: 90px;
  height: 34px;
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
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    a{
      display: inline-block;
      padding: 24px 0;
      border-bottom:1px solid #e7e7e7;
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
        }
      }
    }
  }
}

</style>
<!-- 
<style scoped lang="less">
#notebook-list{
  border:1px solid red;
  flex: 1;
  // .btn{
  //   font-size: 12px;
  //   color: #666;
  //   cursor: pointer;//光标
  //   margin-left: 10px;
  // }
  .btn .iconfont{
    font-size: 12px;
  }
  input {
    width: 300px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px 5px;
    outline: none;
  }
  header{
    padding: 12px;
    // border-bottom: 1px solid #ccc;
  }
  main{
    padding: 30px 40px;
  }
  .layout{
    max-width: 966px;
    margin: 0 auto;
  }
  main h3{
    font-size: 12px;
    color: #000;
  }
  main .book-list{
    margin-top: 10px;
    font-size: 14px;
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    font-weight: bold;
    
  }
  main .book-list span{
    font-size: 12px;
    font-weight: bold;
    color: #b3c0c8;
  }
  main .date,
  main .action{
    float: right;
    margin-left: 10px;
  }
  main .iconfont{
    color: #1687ea;
    margin-right: 4px;
  }
  main .notebook{
    display: block;
    cursor: pointer;
  }
  main a.notebook:hover{
    background-color: #f2f7fa;
  }
  main a.notebook div{
    border-bottom: 1px solid #ebebeb;
    padding: 12px 14px;
  }
  main .error-msg{
    font-size: 12px;
    color: red;
  }
}
</style> -->