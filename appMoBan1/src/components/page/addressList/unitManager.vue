<template>
    <div class="f_taskManager">
        <div class="headTagLy">
            <h2 class="tag">市直</h2>
            <div class="tag-btn" @click="dialogFormVisible = true,titleWord = true">创建</div>
        </div>
        <div class="ms-articleLy shadowLy">
          <el-form ref="form" :model="form" label-width="120px" style="margin:20px 0;">
            <el-form-item label="单位名称" style="width:30%; margin-top:20px; display:inline-block;">
                <el-input v-model="formInline.user" placeholder="单位名称"></el-input>
            </el-form-item>
            <el-form-item label="类型" style="width:20%; margin-top:20px; margin-right:-100px; display:inline-block;">
                <el-select v-model="form.region" placeholder="请选择类型">
                <el-option label="类型1" value="shanghai"></el-option>
                <el-option label="类型2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width:10%; display:inline-block; margin-top:20px;">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
          <div class="table-content">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection">
              </el-table-column>
              <el-table-column
                label="单位名称"
                width="120">
                <template slot-scope="scope">{{ scope.row.unit }}</template>
              </el-table-column>
              <el-table-column
                prop="type"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="hierarchy"
                label="关联党建层级">
              </el-table-column>
              <el-table-column
                prop="operate"
                label="操作">
                <template slot-scope="slot">
                    <div class="f_box">
                      <div class="slot-btn" @click="dialogFormVisible = true,titleWord = false">修改</div>
                      <div class="slot-btn">删除</div>
                    </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="fenye-content">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>     
        </div>
        <el-dialog :visible.sync="dialogFormVisible">
          <div class="headTagLy" style="margin-bottom:10px;">
              <h2 class="tag">{{titleWord ? "新建" : "编辑"}}</h2>
          </div>
          <el-form label-position="right" :model="form">
            <el-form-item label="单位名称:" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off" style="width:60%;"></el-input>
            </el-form-item>
            <el-form-item label="类型:" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择单位" style="width:60%;">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联党建层级:" :label-width="formLabelWidth">
              <el-input v-model="form.job" autocomplete="off" style="width:60%;"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      titleWord:true,
      formInline: {
        user: ""
      },
      titletStyle: 0, //大标题类名设置
      review: [
        {
          name: "三会"
          // lock:true
        },
        {
          name: "党课"
          // lock:false
        },
        {
          name: "组织生活会"
          // lock:false
        },
        {
          name: "民主评议党员"
          // lock:false
        },
        {
          name: "主题党日"
          // lock:false
        }
      ],
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      tableData3: [
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        },
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        },
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        },
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        },
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        },
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        },
        {
          unit: "国土资源局",
          type: "市直",
          hierarchy: "中国共产党烟台市国土资源局委员会",
          operate: ""
        }
      ],
      multipleSelection: [],
      currentPage4: 4, //分页默认值
      form: {
        region: "" //所属党组织
      },
      dialogFormVisible: false, //控制弹出框属性
      formLabelWidth: '120px' //弹出框的默认宽度
    };
  },
  methods: {
    onli(e) {
      this.titletStyle = e;
      //  console.log(e)
      //  item.lock=!item.lock
    },
    handleNodeClick(data) {
      console.log(data);
    },
    onSubmit() {
      console.log("submit!");
    },
    handleSelectionChange(val) {
      //表格上的功能
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      //分页功能
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //分页功能
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
.fenye-content {
  margin: 1% auto 0px;
  width: 98%;
  height: 8%;
  box-sizing: border-box;
  text-align: center;
}
.table-content {
  margin: 0 auto;
  width: 98%;
  height: calc(100% - 102px - 10%);
  box-sizing: border-box;
  overflow-y: auto;
}
.export-btn {
  width: 28px;
  height: 26px;
  font: normal 14px/25px Microsoft YaHei, Arial;
  border-radius: 5px;
  color: #000;
  float: right;
  padding: 0px 10px 0px 10px;
  margin: 8px 10px 0px 0px;
  cursor: pointer;
}
.tag-btn {
  width: 28px;
  height: 26px;
  font: normal 14px/25px Microsoft YaHei, Arial;
  border-radius: 5px;
  background-color: #4a90e2;
  color: #ffffff;
  float: right;
  padding: 0px 10px 0px 10px;
  margin: 8px 10px 0px 0px;
  cursor: pointer;
}
.del-btn {
  width: 56px;
  height: 26px;
  font: normal 14px/25px Microsoft YaHei, Arial;
  border-radius: 5px;
  background-color: #dd0000;
  color: #ffffff;
  float: right;
  padding: 0px 10px 0px 10px;
  margin: 8px 10px 0px 0px;
  cursor: pointer;
}
.f_taskManager {
  width: 100%;
  height: 100%;
}
.default-height {
  height: calc(100% - 50px);
  box-sizing: border-box;
  overflow-y: auto;
}
.left-content {
  width: 24.5%;
  float: left;
}
.right-content {
  width: 74%;
  float: right;
}
.shadowLy {
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
  background: #e8e8e8;
}

.project ul li {
  margin-left: 20px;
}
.project ul li.sever {
  background: #42a6d8;
  color: white;
}
/* 操作按钮样式 */
.slot-btn{
  width: 40px;
  height:26px;
  font: normal 14px/25px Microsoft YaHei, Arial;
  display: inline-block;
  color: #4a90e2;
} 
.slot-btn:hover{
  color: #dd0000;
  cursor: pointer;
}
</style>

