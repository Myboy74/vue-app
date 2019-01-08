<template>
    <div class="notop"> 
        <img style="width:90%;"  src="../../../static/img/AP.png" alt="">
        <div class="noContent">
            <p style="padding:10px 0;color:#000;font-size:16px">对不起,您没有权限!</p>
            <p style="padding:10px 0;color:#aeaeae;font-size:12px">请使用烟台党支部管理员账号登录</p>
              <!-- <el-button type="danger" plain class="btn" @click="onBtn">切换登录账号</el-button> -->
        </div>
        <img style="width:50%;height:30px" src="../../../static/img/button.png" alt="" @click="onBtn">
    </div>
</template>
<script>
import qs from "qs";
import { postAjax, getAjax, uploadImg, oUrl } from "../../api/api.js";

export default {
  data() {
    return {
      logout: oUrl(),
      code: this.$route.query.code //查询用户信息使用
    };
  },
  methods: {
    onBtn() {
       postAjax("user/appLogout").then(res=>{
         sessionStorage.clear();
          this.$router.push({
            name:"login"
        })
          // window.location.href = this.logout + "user/logout";
       })
     
    }
  }
};
</script>
<style scoped>
.notop {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* display: block; */
  /* margin: 50px auto; */
}
.notop img {
  display: block;
  margin: 0 auto;
}
.noContent {
  text-align: center;
  padding: 20px 0;
}
/* .noContent .btn {
  color: #e60000;
  border: 1px solid #e60000;
  margin-top: 10px;
  background: none;
}
.noContent .btn:hover {
  color: #fff;
  border: 1px solid #e60000;
  background: #e60000;
} */
</style>
