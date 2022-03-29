<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate"><i class="iconfont icon-plus"  />新建笔记本</a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表</h3>
        <div class="book-list">
          <router-link v-for="list in booksList" 
          :key="list.id" to="/note/1" class="notebook">
            <div>
              <span class="iconfont icon-notebook"></span>
              <span>{{list.title}}</span>
              <span class="action" @click.stop.prevent="onEdit(list)">编辑</span>
              <span class="action" @click.stop.prevent="onDelete(list)">删除</span>
              <span class="date">时间</span>
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
// window.Notebooks = Notebooks
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
      let title =  window.prompt()
      if(title===null){
        return;
      }else if(title.trim()===''){
        alert('不能为空')
        return;
      }
      Notebooks.addNotebooks({title:title}).then(res=>{
        console.log(res);
        alert(res.msg);
        this.booksList.unshift(res.data)
      })
    },
    onEdit(notebook){
      let title =  window.prompt('修改',notebook.title)
      console.log(title)
      if(title===null){
        return;
      }else if(title.trim()===''){
        alert('不能为空')
        return;
      }
      Notebooks.updateNotebooks(notebook.id,{title:title}).then(res=>{
        console.log(res);
        alert(res.msg);
        notebook.title = title;
        //优化 修改后笔记顶到最上面
      })
      console.log(notebook)
    },
    onDelete(notebook){
      let isConfirm =  window.confirm('确定删除嘛？')
      if(!isConfirm){return;}
      Notebooks.deleteNotebooks(notebook.id).then(res=>{
        console.log(res),
        alert(res.msg);
        this.booksList.splice(this.booksList.indexOf(notebook),1)
      })
    }
  }
}
</script>

<style scoped lang="less">
#notebook-list{
  border:1px solid red;
  flex: 1;
  .btn{
    font-size: 12px;
    color: #666;
    cursor: pointer;//光标
    margin-left: 10px;
  }
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
    border-bottom: 1px solid #ccc;
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





</style>