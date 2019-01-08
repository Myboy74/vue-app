<template>
    <div>
         <div class="headTagLy f_input">
            <h2 class="tag">督查评价</h2>
             <el-button type="danger" class="fr" style="padding: 7px 15px;margin:5px 10px 0 20px">返回</el-button>
            <el-form ref="form" :model="form" label-width="120px" style="margin:20px 0;">
                <el-form-item label="抽查评价：" class="fr">
                    <el-select v-model="form.value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
             
        </div>
         <div class="ms-articleLy shadowLy cle">
             <div class="context cle">
                 <h4>聚焦"保密工作"，福生佳信党支部组织专题学习</h4>
                 <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="80" >主持人</td>
                        <td width="300"></td>
                        <td width="80">记录人</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>时&nbsp;&nbsp;&nbsp;间</td>
                        <td></td>
                        <td>地&nbsp;&nbsp;&nbsp;点</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>应到人数</td>
                        <td>152人</td>
                        <td>实到人数</td>
                        <td>120人</td>
                    </tr>
                    <tr>
                        <td>缺席人数</td>
                         <td colspan="3">1254人</td>
                    </tr>
                    <tr>
                        <td>内容摘要</td>
                         <td colspan="3">
                            <div style="width:98%">
                                在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                                在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                                在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                                在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="cle centext">
                    <p class="red">主要内容</p>
                    <div style="padding:10px 0">
                        在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                        在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                        在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。
                        在海岸边，退潮时你可徒步走到一些岛屿近处，在潮间带里看见诸如海星、海胆、海带等海洋生物，体验甜蜜的幸福感。或是在天气好时，肩并肩坐在海滩上等待日落晚霞，浪漫满溢。  
                    </div>
                </div>
                 <div class="cle centext">
                    <p class="red">影像资料</p>
                    <div class="imgaeData">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                    </div>
                </div>
                 <div class="cle centext">
                    <p class="red">视频 <span style=" color: #676464;">（点击播放）</span></p>
                    <div class="imgaeData">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                    </div>
                </div>
                <div class="cle centext">
                    <p class="red">参加党员列表</p>
                    <div class="imgaeData">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                    </div>
                </div>
                <div class="cle centext">
                    <p class="red">缺席党员列表</p>
                    <div class="imgaeData">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                        <img src="../../../../../static/img/f_icon.png" alt="">
                    </div>
                </div>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    created(){
        console.log(this.id);
    },
    data(){
        return{
            id:this.$route.query.Id,
            options: [
                {
                value: "选项1",
                label: "全部"
                },
                {
                value: "选项2",
                label: "未抽查"
                },
                {
                value: "选项3",
                label: "合格"
                },
                {
                value: "选项4",
                label: "不合格"
                }
            ],
            form:{
                value:""
            }
     
    }
}
}
</script>
<style scoped>

.context{
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
}
table{
    width: 100%;
    height: 100%;
    margin: 20px 0 30px 0;
    color: #676464;
    box-shadow: #ccc 0px 0px 10px;
     
}
tr{width: 96%;height: 30px;margin: 0 auto;}
tr:nth-child(2n){
    background: #e0dddd61;
}

tr td{
  padding: 10px 0 10px 20px;
}
tr td:nth-child(2n+1){
  text-align: center;
}
.red{
    color: #e41414;
    font-weight: bold;
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;
}
.centext{
    margin-top: 30px
}
.imgaeData img{
    margin: 10px 10px 0 0;
}
</style>

