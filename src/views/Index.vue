<template>
  <div class="container">
    <h1 style="text-align: center;">人才信息列表</h1>
    <router-link to="/add"><button>添加</button></router-link>
    <el-select v-model="obj.selectedValue" placeholder="请选择">
      <el-option value="">全部</el-option>
    <el-option
      v-for="item in obj.departments"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
    <table>
      <thead>
        <tr>
          <td>人才编号</td>
          <td>人才姓名</td>
          <td>工作年限</td>
          <td>所属部门</td>
          <td>毕业学校</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item,index in obj.pageinfo.list" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.workingLife }}</td>
          <td>{{ item.department.name }}</td>
          <td>{{ item.graduateSchool }}</td>
          <td>
            <router-link :to="{
              path:'/add',
              query:item
            }"><button>修改</button></router-link>
            <button @click="delUser(item.id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="nav_down">
      <button @click="getPage(1)">首页</button>
      <button @click="getPage(obj.pageinfo.prePage)" v-if="!obj.pageinfo.isFirstPage">上一页</button>
      <button v-for="(item, index) in obj.pageinfo.navigatepageNums" :key="index" @click="getPage(item)">
        {{ item }}
      </button>
      <button @click="getPage(obj.pageinfo.nextPage)" v-if="!obj. pageinfo.isLastPage">下一页</button>
      <button @click="getPage(obj.pageinfo.pages)">尾页</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watchEffect } from "vue";
import axios from '../hooks/request'
import { useRoute,useRouter } from "vue-router"; 
const router = useRouter();
const route = useRoute();
const obj = reactive({
    pageinfo:"",
    selectedValue:'',
    departments:""
})
function getPage(i){
axios.get(`enterprisetalent/getPage?pageNum=${i}&id=${obj.selectedValue}`).then(res=>{
    obj.pageinfo=res.data
})
}
function getDep(){
  axios.get("department/getDep").then(res=>{
    obj.departments=res.data
  })
}
function delUser(id){
  axios.delete("enterprisetalent/delUser/"+id).then(res=>{
    if(res.data){
      alert("删除成功！")
      getPage(1);
    }
  })
}
onMounted(()=>{
    getDep()
    getPage(1)
})
watchEffect(()=>{
  getPage(1)
})
</script>

<style scoped>
.container {
    max-width: 800px; /* 设置容器最大宽度 */
    margin: 0 auto; /* 水平居中 */
    padding: 20px; /* 添加内边距 */
    background-color: #f9f9f9; /* 背景颜色 */
}

table {
    width: 100%; /* 表格宽度占据整个容器 */
}

.nav_down {
    margin-top: 20px; /* 顶部留出一定间距 */
    text-align: center; /* 文本居中 */
}

button {
    padding: 8px 16px;
    background-color: #007bff; /* 使用蓝色作为按钮背景色 */
    color: white; /* 按钮文字颜色设为白色 */
    border: none;
    cursor: pointer;
    margin-right: 10px;
}

button:hover {
    background-color: #0056b3; /* 鼠标悬停时变化的背景颜色 */
}



</style>