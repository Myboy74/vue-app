<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
// import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  data() {
    return {
      items: [
        {
          icon: "el-icon-edit-outline",
          index: "2",
          title: "“两学一做”管理",
          subs: [
            {
              index: "/",
              title: "自动考评"
            },
            {
              index: "supervision",
              title: "督查评价"
            },
          ]
        },
        {
          icon: "el-icon-tickets",
          index: "3",
          title: "通讯录",
          subs: [
            {
              index: "cityStraight",
              title: "市直"
            },
            {
              index: "mettingManager",
              title: "县市区"
            },
             {
              index: "unitManager",
              title: "单位管理"
            }
          ]
        }
      ]
    };
  },
  created() {
    // this.getallRoot()
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  methods: {
    // getallRoot() {
    // getAjax("user/queryUserMenus",{menuId:'0'}).then(res => {
    //     if (res.data.code == 200) {
    //         this.items=res.data.data;
    //     }
    // });
    // },
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 88px;
  bottom: 0;
  background: #2e363f;
}
.sidebar > ul {
  height: 100%;
}
</style>
