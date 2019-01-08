<template>
    <div class="login-wrap">
        <div class="ms-title">
            <span>登录</span>
        </div> 
        <div class="form">
            <van-cell-group>
            <van-field
                v-model.trim="form.username"
                label=" "
                placeholder="账号"
                :error-message="user"
                @focus="user=''"
            />
            <i class="icon"></i>
            <van-field
                v-model.trim="form.password"
                 type="password"
                label=" "
                placeholder="密码"
                :error-message="word"
                 @focus="word=''"
            />
              <i class="icon icon1"></i>
            </van-cell-group>
            <van-button type="danger" style="margin-top: 50px;background:#e60000" @click="submitForm">登录</van-button>
        </div>
    </div>
     <!-- <van-loading type="spinner" color="#c9c9c9" class="loadding"/> -->
</template>

<script>
import { Toast } from "vant";

import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      user: "", //验证显示得文字提示
      word: "" //验证显示得文字提示
    };
  },
  methods: {
    submitForm() {
      if (this.form.username == "") {
        // this.user="请输入账号";
        Toast.fail("请输入账号");
        return;
      }
      if (this.form.password == "") {
        // this.word="请输入密码";
        Toast.fail("请输入密码");
        return;
      }
      const toast = Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '正在登录中....'
        });

      // let data=qs.stringify(this.form)
      postAjax(
        "user/login?userName=" +
          this.form.username +
          "&password=" +
          this.form.password
      ).then(res => {
        // console.log(res);
        if (res.data.success==false) {
          Toast.clear();
          Toast.fail("用户名密码错误，登录失败");
        } else {
          Toast.clear();
          Toast.success('登录成功!');
          this.$router.push({ name: "home" });
        }
      });
    }
  }
};
</script>

<style scoped>
/* .loadding{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
} */
.login-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.ms-title {
  width: 90%;
  height: 150px;
  margin: 15px auto;
  background: url("../../../static/img/login_bg.png") no-repeat top center;
  background-size: 100% 100%;
  /* background: url(../../../static/img/login_bg.png); */
  position: relative;
}
.ms-title span {
  display: inline-block;
  padding: 10px;
  color: white;
  border-bottom: 2px solid white;
  position: absolute;
  bottom: 0;
  left: 20px;
}
.form {
  width: 85%;
  margin: 30px auto;
}
.icon {
  width: 20px;
  height: 20px;
  background: url("../../../static/img/user.png") no-repeat top center;
  background-size: 100% 100%;
  position: absolute;
  top: 12px;
  left: 20px;
}
.icon1 {
  top: 55px;
  background: url("../../../static/img/pass.png") no-repeat top center;
  background-size: 100% 100%;
}
</style>
