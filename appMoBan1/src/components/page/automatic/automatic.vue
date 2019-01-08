<template>
    <div class="f_taskManager">
         <div class="headTagLy">
            <h2 class="tag">自动考评</h2>
        </div>
        <div class="ms-articleLy shadowLy">
          <el-form ref="form" :model="form" label-width="120px" style="margin:20px 0;">
            <el-form-item label="所属党组织：" class="zuzhi">
              <el-select v-model="form.region" placeholder="请选择所属党组织">
                <el-option label="上海" value="shanghai"></el-option>
                <el-option label="北京" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <div class="project">
              <label>考评项目：</label>
              <ul class="tab">
                <li v-for="(item,index) in review" :key="index" :id="index" :class="{'sever':titletStyle==index}" @click="onli(index)">{{item.name}}</li>
              </ul> 
             
              <!-- 弹出内容开始 -->
              <el-popover
                placement="bottom"
                v-model="visible2"
                >
                  <p><label>三会：</label> （党员大会+支委会+党小组会）≥4次/年，每季度1次; </p>
                  <p><label>党课：</label> 党课≥4次/年，每季度1次;</p>
                  <p><label>组织生活会：</label> 组织生活会≥4次/年;</p>
                  <p><label>民族评议党员：</label> 民族评议党员≥4次/年;</p>
                  <p><label>主题党日：</label> 主题党日≥12次/年，每月1次; </p>
                  <p><label>其他类型：</label>民主生活会、谈心谈话、开展数量不做考核。</p>
                <div style="text-align: center; margin-top: 10px">
                  <el-button type="primary" size="mini" @click="visible2 = false">关闭</el-button>
                </div> 
                 <!-- 弹出提示内容按钮 -->
              <i class="el-icon-question" slot="reference" style="margin:8px 0 0 15px"></i>
              </el-popover>
              <!-- 弹出内容提示结束 -->
            </div>
            <div class="project cle">
               <label>考评周期：</label>
                  <el-date-picker
                    v-model="form.years"
                    type="year"
                   value-format="yyyy"
                    placeholder="选择年"
                    class="fl"
                    style="margin-left:20px"
                   >
                  </el-date-picker>
                  <span class="fl" style="padding:0 15px;line-height:30px"> -- </span>
                   <el-select v-model="form.value" placeholder="请选择季度周期" class="fl">
                  <el-option
                    v-for="item in quarter"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                  </el-option>
                   </el-select>
              <div class="fl" style="margin-bottom:20px">
                <el-button type="primary" icon="el-icon-search" style="margin-left:20px" @click="onBtn">查询</el-button>
              </div>
            </div>
               <div class="table cle">
                 <transition name="move" mode="out-in"><router-view></router-view></transition>
               </div>
          </el-form>     
        </div>
     
    </div>
</template>
<script>
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  data() {
    return {
      visible2:false,//点击 ？弹出内容
      titletStyle: 0, //大标题类名设置
      review: [
        { name: "三会" },
        { name: "党课" },
        { name: "组织生活会" },
        { name: "民主评议党员" },
        { name: "主题党日" }
      ],
      quarter:[  //季度
         { value: '1',
          label: '全年度'
        }, {
          value: '2',
          label: '1-3月'
        }, {
          value: '3',
          label: '4-6月'
        }, {
          value: '4',
          label: '7-9月'
        },{
          value: '5',
          label: '10-12月'
        }],
      options: [{  //状态
          value: '选项1',
          label: '全部'
        }, {
          value: '选项2',
          label: '已达标'
        }, {
          value: '选项3',
          label: '未达标'
        }],
      form: {
        region: "", //所属党组织
        bigTitle:"",//考评项目
        years:"",//周期年
        value: '',//周期季度
      }
    };
  },
  methods: {
    onli(e) {
      this.titletStyle = e;
      this.form.bigTitle=this.review[e].name;//取得考评项目得名称,用于搜索
    },
    onBtn(){ //搜索按钮
      console.log(this.form);
      this.$store.dispatch("increase",this.form);
      this.$router.push({ name: "organization"});
    }
  }
};
</script>

<style scoped>
.shadowLy {
  overflow: hidden;
}
.project label {
  font-size: 16px;
  padding: 5px 0;
  color: #606266;
  margin-left: 20px;
  float: left;
}

.project ul li {
  font-size: 14px;
  float: left;
  cursor: pointer;
  padding: 7px 20px;
}

.project ul.tab li {
  border-radius: 5px;
  margin: 0 0 20px 20px;
  background: #e8e8e8;
}
.project ul.tab li.sever {
  background: #42a6d8;
  color: white;
}
.table{
  width: 96%;
  clear: both;
  /* height: 300px; */
  /* background: red; */
  margin: 0 auto;
}
</style>

