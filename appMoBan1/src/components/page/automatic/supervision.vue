<template>
    <div>
        <div class="headTagLy">
            <h2 class="tag">督查评价</h2>
        </div>
        <div class="ms-articleLy shadowLy">
            <el-form ref="form" :model="form" label-width="120px" style="margin:20px 0;">
              <el-form-item label="所属党组织：" class="zuzhi">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动标题：" class="f_title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="查询周期：" class="fl">
                  <el-radio-group v-model="resource">
                    <el-radio label="今日数据"></el-radio>
                    <el-radio label="历史数据"></el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item class="fl resTime" v-if="resource=='历史数据'">     
              <el-date-picker
                v-model="startTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择开始日期">
               </el-date-picker>
               --
                 <el-date-picker
                v-model="endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择结束日期">
              </el-date-picker>
              </el-form-item>
              <el-form-item label="抽查评价：" class="fl" style="margin-left:20px">
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
            <el-button type="primary" icon="el-icon-search" style="margin-left:20px" @click="onBtn">查询</el-button>
              <div class="cle">
                <el-table type="selection"
                 :data="tableData" 
                   stripe
                  style="width: 98%; margin:30px auto;"
                  border>
                <el-table-column
                  label="标题"
                  prop="id"
                  >
                </el-table-column>
                <el-table-column
                  prop="signBill" label="类型"
                  >
                </el-table-column>
                <el-table-column
                  label="所属支部"
                  prop="subjectOne"
                  >
                </el-table-column>
                <el-table-column
                  label="累计上传素材量"
                  >
                  <el-table-column
                    prop="picture" label="图片"
                    >
                  </el-table-column>
                    <el-table-column
                    prop="video" label="视频"
                    >
                  </el-table-column>
                    <el-table-column
                    prop="file" label="文件"
                    >
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  label="抽查评价"
                  >
                  <template slot-scope="scope">
                    <span class="gray" v-if="scope.row.subjectThree=='合格'">{{scope.row.subjectThree}}</span> 
                    <span class="red" v-else-if="scope.row.subjectThree=='不合格'">{{scope.row.subjectThree}}</span> 
                    <span class="black" v-else>{{scope.row.subjectThree}}</span>                        
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <span class="look" @click="seeTask(scope.row.id)">查看</span>                        
                  </template>

                </el-table-column>
              </el-table>

              <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-sizes="[30, 50, 80, 100]"
                    :page-size="30"
                    layout=" prev, pager, next,sizes"
                    :total="1000">
                  </el-pagination>
                </div>
              </div>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  created() {
    this.autoMove(this.currentPage3);
  },
  data() {
    return {
      form: {
        region: "", //所属党组织
        title:"",//活动标题
        startTime:"",//查询周期 开始时间
        endTime:"",// 查询周期 结束时间 
        value: "", //抽查评价
      },
      resource: "今日数据",
      startTime:"",//历史数据  开始时间
      endTime:"",//历史数据  结束时间 
      currentPage: 5, //分页
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
     
      tableData: [
        {
          id: 0,
          signBill: "会议",
          subjectOne: "山东省党支部",
          picture: "2",
          video: "4",
          file:"1",
          subjectThree:"合格",
        },
         {
          id: 1,
          signBill: "会议",
          subjectOne: "山东省党支部",
          picture: "2",
          video: "4",
          file:"1",
          subjectThree:"不合格",
        },
         {
          id: 2,
          signBill: "会议",
          subjectOne: "山东省党支部",
          picture: "2",
          video: "4",
          file:"1",
          subjectThree:"未抽查",
        },
        ],
    };
  },
  methods: {
    autoMove() {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    seeTask(id) {
      //表格查看
      console.log(id);
      this.$router.push({
        name: "supervisionEvaluate",
        query: {
          Id: id //id
        }
      });
    },
    onBtn(){//查询按钮
      console.log(this.form);
      console.log(this.resource);
      if(this.resource=="今日数据"){
          this.form.startTime=0;
          this.form.endTime=0;
      }else{
          this.form.startTime=this.startTime;
          this.form.endTime=this.endTime;
      }
    },
  }
};
</script>

<style scoped>
.shadowLy {
  overflow: hidden;
}
.gray{
  color: #9a9a9a;
}
.red{
  color: red;
}
.black{
  color: #000;
}
.block{
    width: 50%;
    margin: 10px auto;
}
.look{
    color:#42a6d8;
    cursor: pointer;
}
</style>

