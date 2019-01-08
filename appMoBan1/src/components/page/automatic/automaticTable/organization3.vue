<template>
    <div>
         第四级页面
        <span class="look reTop" @click="onGobback">返回上一级</span>
        <el-table
        :data="tableData3"
        height="300"
        border
        stripe
        style="width: 100%;margin-bottom: 30px; clear:both;">
        <el-table-column
        prop="date"
        label="党组织"
        width="350">
        </el-table-column>
        <el-table-column
        prop="name"
        label="下属支部数量">
        </el-table-column>
        <el-table-column
        prop="standard"
        label="已达标支部数">
        </el-table-column>
        <el-table-column
        prop="ustandard"
        label="未达标支部数">
        </el-table-column>
        <el-table-column
        label="操作"
        >
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
  
</template>

<script>
export default {
  data() {
    return {
        currentPage: 5,  //分页
        tableData3: [  //表格
        {
          id:0,
          date: "2016-05-03",
          name: "王小虎",
          standard: "上海市普",
          ustandard:"哪里",
        },
        {
          id:1,
          date: "2016-05-02",
          name: "王小虎",
          standard: "上海市普陀区",
          ustandard:"哪里",
        },
        {
          id:2,
          date: "2016-05-04",
          name: "王小虎",
          standard: "上海市普陀区",
          ustandard:"哪里",
        },
        {
          id:3,
          date: "2016-05-01",
          name: "王小虎",
          standard: "上海市普陀区",
          ustandard:"哪里",
        },
        {
          id:4,
          date: "2016-05-08",
          name: "王小虎",
          standard: "上海市普陀区",
          ustandard:"哪里",
        },
        {
          id:5,
          date: "2016-05-06",
          name: "王小虎",
          standard: "上海市普陀区",
          ustandard:"哪里",
        },
        {
          id:6,
          date: "2016-05-07",
          name: "王小虎",
          standard: "上海市普陀",
          ustandard:"哪里",
        }
      ]
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    seeTask(id){//表格查看
      console.log(id);
      this.$router.push({
        name: "supervision",
        query: {
          Id: id, //id
        }
      });
    },
    onGobback(){  //返回上一级
        window.history.back(-1);
    }
  }
};
</script>

<style scpoed>
.block{
    width: 50%;
    margin: 10px auto;
}
.look{
    color:#42a6d8;
    cursor: pointer;
}
.reTop{
    float: right;
    display: block;
    margin: -30px 30px 0 0;
}
</style>
