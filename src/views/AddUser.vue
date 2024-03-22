<template>
  <div>
    <h1>添加人才信息</h1>
    <p>
      人才姓名<span>(*)</span>:<input type="text" v-model="obj.user.name" />
    </p>
    <p>工作年限:<input type="text" v-model="obj.user.workingLife" /></p>
    <p>
      所属部门<span>(*)</span>:
      <el-select v-model="obj.user.departmentId" placeholder="请选择">
        <el-option value="">全部</el-option>
        <el-option
          v-for="item in obj.departments"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </p>
    <p>毕业学校:<input type="text" v-model="obj.user.graduateSchool" /></p>
    <p>
      个人简介:<textarea
        cols="30"
        rows="10"
        v-model="obj.user.personalProfile"
      ></textarea>
    </p>
    <p>
      工作经历:<textarea
        cols="30"
        rows="10"
        v-model="obj.user.workExperience"
      ></textarea>
    </p>
    <p><button @click="commit()">提交</button><button>返回</button></p>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import axios from "../hooks/request";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const obj = reactive({
  user: {
    id: "",
    name: "",
    workingLife: "",
    departmentId: "",
    graduateSchool: "",
    personalProfile: "",
    workExperience: "",
  },
  departments: "",
  selectedValue: "",
});
function getDep() {
  axios.get("department/getDep").then((res) => {
    obj.departments = res.data;
  });
}
function change() {
  obj.user = route.query;
  delete obj.user.department;
}
onMounted(() => {
  change();
  getDep();
});
function commit() {
  axios.post("enterprisetalent/orUser", obj.user).then((res) => {
    if (res.data) {
      router.push("/");
    } else {
      alert(res.data);
    }
  });
}
</script>

<style scoped>
div {
  max-width: 600px; /* 设置最大宽度 */
  margin: 0 auto; /* 居中显示 */
  padding: 20px; /* 添加内边距 */
  background-color: #f9f9f9; /* 背景颜色 */
}

h1 {
  text-align: center; /* 文本居中 */
}

p {
  margin-bottom: 15px; /* 段落间距 */
}

span {
  color: red; /* 设置星号颜色为红色 */
}

input,
textarea {
  width: 100%; /* 输入框宽度占据整行 */
  padding: 5px; /* 内边距 */
  margin-top: 5px; /* 顶部留出一定间距 */
}

button {
  padding: 8px 16px;
  background-color: #007bff; /* 蓝色背景 */
  color: white; /* 白色文字 */
  border: none;
  cursor: pointer;
  margin-right: 10px;
}

button:hover {
  background-color: #0056b3; /* 鼠标悬停时背景颜色 */
}
</style>