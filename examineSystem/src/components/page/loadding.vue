<template>
    <div class="load">
         <van-loading type="spinner" color="#c9c9c9" class="loadding"/>
         
    </div>
</template>

<script>
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  created() {
    this.autoMove();
  },
  data() {
    return {};
  },
  methods: {
    autoMove() {
    
      postAjax("user/getUserInfo").then(res => {
        if (!res.data.success) {
          sessionStorage.clear();
          this.$router.push({ name: "login" });
        } else {
          this.$router.push({ name: "home" });
        }
      });
    }
  }
};
</script>

<style scoped>
.load {
  background: #797777;
  height: 100%;
  width: 100%;
}
.loadding {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

