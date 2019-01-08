<template>
    <div class="wrapper">
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
import { Toast } from "vant";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  created() {
    this.autoMove();
  },
  data() {
    return {
      roledata: []
    };
  },
  methods: {
    autoMove(router) {
      this.roledata = [];
      let id = sessionStorage.getItem("orgId");

      if (id) {
        return;
      }

      postAjax("user/getUserInfo").then(res => {
        // console.log(res.data);
        if (!res.data.success) {
          sessionStorage.clear();
          Toast.fail("当前用户暂未登录或登录超时,请重新登录!");
          this.$router.push({ name: "login" });
          return;
        } else {
          sessionStorage.setItem("userName", res.data.data.name);
          let isYTUser = false; // 判定当前用户是否是烟台用户
          res.data.data.roles.forEach(element => {
            let havePer = false; //当前角色是都有访问权限,默认未false

            let orgCode = element.manageCode;
            // console.log(orgCode)
            let num = orgCode.indexOf("000002000008000006");
            //   console.log(num)
            if (num == 0) {
              isYTUser == true;

              element.permissions.forEach(it => {
                if (it.permissionName == "BRANCH_MANAGE") {
                  havePer = true;
                }
              });

              if (havePer) {
                this.roledata.push({
                  manageId: element.manageId, //受管理的党支部/党委ID
                  manageName: element.manageName, //受管理的党支部/党委名称
                  manageCode: element.manageCode, //受管理的党支部/党委名称
                  roleDescription:
                    element.manageName + "--" + element.roleDescription, //具体角色显示得名称
                  roleId: element.roleId //id
                  // roleName: oldData[i].roleDescription //名字
                });
              }
            }
          });

          if (this.roledata.length == 0) {
            this.$router.push({
              name: "nopersition"
            });
            // Toast.fail("没有权限进入,请重新登录");
          } else {
            if (router == "loadding") {
              this.$router.push({ name: "home" });
            }
          }

          let releDataStr = JSON.stringify(this.roledata);

          sessionStorage.setItem("orgId", this.roledata[0].manageId); //保存用户id查询信息用
          sessionStorage.setItem("wId", this.roledata[0].manageId); //所属党组织搜索使用id
          sessionStorage.setItem("branchName", this.roledata[0].manageName); //支部名称
          sessionStorage.setItem("orgCode", this.roledata[0].manageCode);
          sessionStorage.setItem("roledata", releDataStr);
        }
      });
    }
  },
  watch: {
    //监听路由变化
    $route(to, from) {
      this.autoMove(to.name);
    }
  }
};
</script>
<style>
</style>
