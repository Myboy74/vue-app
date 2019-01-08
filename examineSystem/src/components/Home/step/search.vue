<template>
    <div>
        <van-search
            v-model="value"
            placeholder="请输入组织生活关键词"
            show-action
            @search="onSearch"
            >
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
    </div>
</template>

<script>
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
    data(){
        return{
            value:"",//输入框的内容
            form:this.$store.state.form
        }
    },
    methods:{
        onSearch(){//搜索
            sessionStorage.setItem("value",this.value);
            this.$router.push({
                name:"organization",
            })
        }
    }
}
</script>
<style scoped>

</style>
