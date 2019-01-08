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
export default {
    data(){
        return{
            value:""//输入框的内容
        }
    },
    methods:{
        onSearch(){//搜索
            console.log(this.value);

            // this.$router.push({
            //     name:"index",
            // })
        }
    }
}
</script>
<style scoped>

</style>
