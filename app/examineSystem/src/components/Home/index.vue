<template>
    <div class="index-content">
       <div class="head-content">
            <van-icon class="top-icon" name="search" slot="right" @click="onSearch"/>
            <span class="login-type" @click="show=true">管理权限</span>
            <!-- 选择管理权限 -->
            <van-actionsheet v-model="show" title="请选择：">
                <van-radio-group v-model="optionChange" :change="onRadion(optionChange)">
                    <van-cell-group>
                        <van-cell v-for="(ite,index) in option"
                        :key="index"
                        :title="ite.key" clickable @click="optionChange = ite.manageCode">
                        <van-radio :name="ite.manageCode" />
                        </van-cell>
                    <!-- <van-cell title="单选框 2" clickable @click="radio = '2'">
                    <van-radio name="2" />
                    </van-cell> -->
                </van-cell-group>
                </van-radio-group>
            </van-actionsheet>
            <div class="newlist-top-content">
                <div class="newlist-title">
                    <div class="newtitle-word">最近组织生活记录</div>
                    <div class="more-content" @click="onDetails">更多 ></div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>
       </div>
       <div class="list-container">
           <div class="newlist-list-content">
               <ul class="newlist">
                    <li v-for="(item,index) in listcontext"
                     :key="index" 
                     @click="onOrganDetail(item.id)">
                        <p>{{item.center}}</p>
                        <p class="date">{{item.date}}</p>
                    </li>
                </ul>
           </div>
       </div>
       <div class="echarts-container f_picture">
           <div class="echarts-cont-title">
               <div class="tag">工作提醒</div>
               <span class="date">截止昨天：00:00</span>
           </div>
           <div class="article1" v-for="(item,index) in wordTop" :key="index"> 
                <div class="article-title">{{item.title}}</div>
                    <div class="article-echarts" v-for="(val,ind) in item.arr" :key="ind">
                        <div class="shape-content" style="margin-top:10px;">
                            <div class="echarts-circle" v-if="val.type==0"><div class="circle-word">年度</div></div>
                            <div class="echarts-circle" v-if="val.type==1"><div class="circle-word">季度</div></div>
                            <div class="echarts-circle" v-if="val.type==2"><div class="circle-word">本月</div></div>
                            <van-progress
                                class="progress"
                                color="#f44"
                                :percentage="val.bfb"
                                />
                            <div class="state-tip">已完成{{val.sum}}次<span v-if="val.overDate>0"  style="margin-left:10px;color:#00b1e8">超出{{val.overDate}}次</span></div>
                            <div class="count-tip">目标≥{{val.min}}次</div>
                            <div class="clear"></div>
                         
                    </div>
               </div>
           </div>
       </div>
       <div class="bottom-button">
           <div class="bottom-context" @click="toStep1">
               <van-icon style="color:#fff; display:inline-block;" name="add-o" />
               <span class="create-btn">创建组织生活</span>
           </div>
       </div>
    </div>
</template>
<script>
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  created() {
    this.getUser();
  },
  data() {
    return {
      show: false, //弹窗
      radio: "1", //选择管理权限默认第一个
      listcontext: [], //组织生活
      wordTop: {
        0: {
          title: "",
          arr: []
        },
        1: {
          title: "",
          arr: []
        },
        2: {
          title: "",
          arr: []
        },
        3: {
          title: "",
          arr: []
        },
        4: {
          title: "",
          arr: []
        }
      }, //工作提醒
      option: [], //管理权限
      optionChange: "1",
      //查询组织生活
      life: {
        branchId: "", //支部ID
        classificationId: "", //组织生活类型ID
        orgCode: "", //组织code
        pageNum: "", //页码,从1开始
        pageSize: "" //每页条数,默认30
      }
    };
  },
  methods: {
    autoZuZhi(date) {
      //组织生活
      let data = qs.stringify(date);
      postAjax("meeting/nowMeetingList", data).then(res => {
        // console.log(res);
        let num = res.data.data.data;
        for (var i = 0; i < 2; i++) {
          // 开始时间
          let meetingTime = "";
          let time = num[i].startTime;
          let start = new Date(time);
          var y = start.getFullYear();
          var M = start.getMonth() + 1; //月
          var d = start.getDate(); //日
          var H = start.getHours(); //时
          var m = start.getMinutes(); //分

          //结束时间
          let end = num[i].endTime;
          let endOver = new Date(end);
          var yy = endOver.getFullYear();
          var MM = endOver.getMonth() + 1; //月
          var dd = endOver.getDate(); //日
          var HH = endOver.getHours(); //时
          var mm = endOver.getMinutes(); //分

          if (y == yy && M == MM && d == dd) {
            meetingTime =
              y +
              "年" +
              this.formatTen(M) +
              "月" +
              this.formatTen(d) +
              "日  " +
              this.formatTen(H) +
              ":" +
              this.formatTen(m) +
              "-" +
              this.formatTen(HH) +
              ":" +
              this.formatTen(mm);
          } else {
            meetingTime =
              y +
              "年" +
              this.formatTen(M) +
              "月" +
              this.formatTen(d) +
              "日  " +
              this.formatTen(H) +
              ":" +
              this.formatTen(m) +
              "  " +
              yy +
              "年" +
              this.formatTen(MM) +
              "月" +
              this.formatTen(dd) +
              "日  " +
              this.formatTen(HH) +
              ":" +
              this.formatTen(mm);
          }
          //组织生活列表
          this.listcontext.push({
            id: num[i].meetingId,
            center: num[i].meetingName,
            date: meetingTime
          });
        }
        //    console.log(this.listcontext);
      });
    },
    wordTi(id) {
      let obj = {
        branchId: id
      };
      let data = qs.stringify(obj);
      console.log(data);

      postAjax("checkEvaluate/remindList", data).then(res => {
        // console.log(res.data.data);
        let num = res.data.data;
        // { id:"1",name: "三会"},
        // { id:"3",name: "党课" },
        // { id:"4",name: "组织生活会" },
        // { id:"8",name: "民主评议党员" },
        // { id:"2253028057613312",name: "主题党日" }
        num.forEach((item, index) => {
          let txt = "";
          if (item.classificationId == "1") {
            txt = "三会";
            let sum = item.finishNum ? item.finishNum : 0;
            let min = item.minNum;
            var a = Number(sum) / Number(min) * 100;
            if (sum == 0) {
              a = 0;
            }
            if (a >= 100) {
              a = 100;
            }
            // console.log(a)
            var date = "";
            if (Number(sum) > Number(min)) {
              date = Number(sum) - Number(min);
            } else {
              date = 0;
            }
            this.wordTop[0].title = txt;
            this.wordTop[0].arr.push({
              type: item.quarterType, //年度/季度/月度
              sum: item.finishNum ? item.finishNum : 0, //实际完成
              min: item.minNum, //最少完成数量
              bfb: a, //百分比
              overDate: date //超出多少次
            });
          } else if (item.classificationId == "3") {
            txt = "党课";
            let sum = item.finishNum ? item.finishNum : 0;
            let min = item.minNum;
            var a = Number(sum) / Number(min) * 100;
            if (sum == 0) {
              a = 0;
            }
            if (a >= 100) {
              a = 100;
            }
            var date = "";
            if (Number(sum) > Number(min)) {
              date = Number(sum) - Number(min);
            } else {
              date = 0;
            }
            this.wordTop[1].title = txt;
            this.wordTop[1].arr.push({
              type: item.quarterType, //年度/季度/月度
              sum: item.finishNum ? item.finishNum : 0, //实际完成
              min: item.minNum, //最少完成数量
              bfb: a, //百分比
              overDate: date //超出多少次
            });
          } else if (item.classificationId == "4") {
            txt = "组织生活会";
            let sum = item.finishNum ? item.finishNum : 0;
            let min = item.minNum;
            var a = Number(sum) / Number(min) * 100;
            if (sum == 0) {
              a = 0;
            }
            if (a >= 100) {
              a = 100;
            }
            var date = "";
            if (Number(sum) > Number(min)) {
              date = Number(sum) - Number(min);
            } else {
              date = 0;
            }
            this.wordTop[2].title = txt;
            this.wordTop[2].arr.push({
              type: item.quarterType, //年度/季度/月度
              sum: item.finishNum ? item.finishNum : 0, //实际完成
              min: item.minNum, //最少完成数量
              bfb: a, //百分比
              overDate: date //超出多少次
            });
          } else if (item.classificationId == "8") {
            txt = "民主评议党员";
            let sum = item.finishNum ? item.finishNum : 0;
            let min = item.minNum;
            var a = Number(sum) / Number(min) * 100;
            if (sum == 0) {
              a = 0;
            }
            if (a >= 100) {
              a = 100;
            }
            var date = "";
            if (Number(sum) > Number(min)) {
              date = Number(sum) - Number(min);
            } else {
              date = 0;
            }
            this.wordTop[3].title = txt;
            this.wordTop[3].arr.push({
              type: item.quarterType, //年度/季度/月度
              sum: item.finishNum ? item.finishNum : 0, //实际完成
              min: item.minNum, //最少完成数量
              bfb: a, //百分比
              overDate: date //超出多少次
            });
          } else if (item.classificationId == "2253028057613312") {
            txt = "主题党日";
            let sum = item.finishNum ? item.finishNum : 0;
            let min = item.minNum;
            var a = Number(sum) / Number(min) * 100;
            if (sum == 0) {
              a = 0;
            }
            if (a >= 100) {
              a = 100;
            }
            var date = "";
            if (Number(sum) > Number(min)) {
              date = Number(sum) - Number(min);
            } else {
              date = 0;
            }
            this.wordTop[4].title = txt;
            this.wordTop[4].arr.push({
              type: item.quarterType, //年度/季度/月度
              sum: item.finishNum ? item.finishNum : 0, //实际完成
              min: item.minNum, //最少完成数量
              bfb: a, //百分比
              overDate: date //超出多少次
            });
          }
        });
        //   console.log(this.wordTop)
      });
    },
    toStep1() {
      this.$store.dispatch("increase", this.life);
      this.$router.push({ path: "/step1" });
    },
    onRadion(val) {
      //选择管理权限
      console.log(val);//code
      if(val){
         let obj = {};
      obj = this.option.find(item => {
        //this.ruleForm
        return item.manageCode === val; //筛选出匹配数据
      });
      if(obj){
      console.log(obj.key)
      let name=obj.key;
      this.$store.dispatch("increase", this.life);
      sessionStorage.setItem("branchName",name); 
       // this.life={
      //     branchId:obj.manageId,   //支部ID
      //     classificationId:"",   //组织生活类型ID
      //     orgCode:obj.manageCode,   //组织code
      //     pageNum:"1",    //页码,从1开始
      //     pageSize:"30",   //每页条数,默认30
      // }
      // this.autoZuZhi(this.life);
      }
     
      }
     
    
    },
    onDetails() {
      //跳转到组织生活更多tab页面
      this.$router.push({ name: "organization" });
    },
    onOrganDetail(id) {
      //跳转到组织生活详情页
      //   console.log(id);
      this.$router.push({
        name: "organizationDetails",
        query: {
          uid: id
        }
      });
    },
    onSearch() {
      //点击搜索
      this.$router.push({ name: "search" });
    },
    jiexi(data) {
        console.log(data);
      sessionStorage.setItem("userName",data.name);
      let roledata = {
        manage: [],
        permissions: []
      };
      data.roles.forEach(item => {
        if (item.clientId == "yantai-ezb") {
          //   console.log(item.manageCode);
          roledata.manage.push({
            manageId: item.manageId, //受管理的党支部/党委ID
            manageName: item.manageName, //受管理的党支部/党委名称
            manageCode: item.manageCode //受管理的党支部/党委组织编码
          });
        }
        item.permissions.forEach(val => {
          if (val.clientId == "yantai-ezb") {
            roledata.permissions.push({
              permissionId: val.permissionId, //权限id
              permissionName: val.permissionName, //	权限名称
              permissionDescription: val.permissionDescription //权限描述
            });
          }
        });
      });

      sessionStorage.setItem("orgId", roledata.manage.manageId); //保存用户id查询信息用
      sessionStorage.setItem("wId", roledata.manage.manageId); //所属党组织搜索使用id
      sessionStorage.setItem("branchName", roledata.manage.manageOrgName); //支部名称
     
      sessionStorage.setItem("orgId", "a2fded24-57f3-11e7-87ee-0050569a68e4");
      sessionStorage.setItem("wId", "a2fded24-57f3-11e7-87ee-0050569a68e4");
       sessionStorage.setItem("branchName","中国共产党山东委员会"); //支部名称

      roledata.manage.forEach(item => {
        roledata.permissions.forEach(val => {
          this.option.push({
            key: item.manageName + "--" + val.permissionDescription,
            manageId: item.manageId,
            manageCode: item.manageCode,
            permissionName: val.permissionName
          });
        });
      });
      // console.log(this.option);
      this.optionChange = this.option[0].manageCode;
      this.life = {
        // branchId:roledata.manage[0].manageId,   //支部ID
        branchId: "3abcce49-0dd6-4837-9ddd-617783fe6eb8",
        classificationId: "", //组织生活类型ID
        // orgCode	:roledata.manage[0].manageCode,   //组织code
        orgCode: "000002000008000003000007000002000002000003",
        pageNum: "1", //页码,从1开始
        pageSize: "30" //每页条数,默认30
      };
      this.$store.dispatch("increase",this.life);
      //   console.log(this.life);
      this.autoZuZhi(this.life); //组织生活
      this.wordTi(this.life.branchId); //工作提醒
    },
    getUser() {
      let self = this;
      postAjax("user/getUserInfo").then(res => {
        console.log(res);
        if (res.data.success) {
          let w_data = res.data.data;
          self.jiexi(w_data);
        }
      });
    },
    formatTen(num) {
      //调整时间格式
      return num > 9 ? num + "" : "0" + num;
    }
    //    beforeClose(action, done) {//弹窗
    //   if (action === 'confirm') {
    //     setTimeout(done, 1000);
    //   } else {
    //     done();
    //   }
    // }
  }
};
</script>
<style scoped>
/* 容器样式 */
.index-content {
  width: 100%;
  height: 100%;
}
.head-content {
  position: relative;
  width: 100%;
  height: 138px;
  padding: 1px;
  box-sizing: border-box;
  background: #e50d02;
  background: url("../../../static/img/login_bg.png") no-repeat top center;
  background-size: 100% 100%;
}
/* 切换权限按钮 */
.login-type {
  margin-top: 8px;
  width: 58px;
  float: right;
  display: block;
  color: #ffffff;
  font: bold 12px/16px Microsoft YaHei, Arial;
}
/* 标题logo样式 */
.top-icon {
  float: right;
  display: block;
  margin: 10px 10px 0px 0px;
  color: #ffffff;
}
/* 列表顶部样式 */
.newlist-top-content {
  position: absolute;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  width: 90%;
  height: 42px;
  box-sizing: border-box;
  background: #ffffff;
  bottom: 0px;
  left: 5%;
  /* border-top: #dddcdc solid 1px;
  border-left: #dddcdc solid 1px;
  border-right: #dddcdc solid 1px; */
}
.list-container {
  position: relative;
  width: 100%;
  height: 136px;
  margin: 0 auto;
  padding-bottom: 10px;
  background: #f3f3f3;
}
.newlist-list-content {
  position: absolute;
  top: 0px;
  left: 5%;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: calc(90% - 1px);
  height: 130px;
  /* border-left: #dddcdc solid 1px; */
  /* border-right: #dddcdc solid 1px;
  border-bottom: #dddcdc solid 1px; */
  border: #dddcdc solid 1px;
  background: #fff;
  -webkit-box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.3);
}
/* 更多 */
.more-content {
  margin: 10px 10px 0px 0px;
  float: right;
  font: 12px/26px Microsoft YaHei, Arial;
  color: #aeaeae;
}
.newlist-title {
  width: 100%;
  height: 42px;
  /* border-bottom: #dddcdc solid 1px; */
  padding-bottom: 10px;
  box-sizing: border-box;
}
.newtitle-word {
  float: left;
  margin: 10px 0px 0px 10px;
  width: 200px;
  height: 26px;
  font: 14px/26px Microsoft YaHei, Arial;
  color: #656565;
}
.newlist {
  margin: 0 auto;
  box-sizing: border-box;
  width: 96%;
  height: 130px;
  padding-bottom: 1px;
}
.newlist li {
  padding: 1px;
  list-style-type: none;
  display: block;
  width: 100%;
  height: 58px;
  border-bottom: #dddbdb solid 1px;
}
.newlist li:nth-child(2) {
  border-bottom: none;
}
.newlist li p {
  display: block;
  width: 90%;
  margin: 10px auto 0px;
  font: 14px/16px Microsoft YaHei, Arial;
  white-space: nowrap; /*规定文本不换行**/
  text-overflow: ellipsis; /**显示省略符号来代表被修剪的文本。*/
  overflow: hidden;
  color: #000000;
}
.newlist li p.date {
  font-size: 12px;
  text-align: right;
  margin-top: 5px;
  color: #aeaeae;
}
/* echarts容器样式 */
.echarts-container {
  width: 100%;
  margin-bottom: 60px;
  background: #f3f3f3;
}
.echarts-cont-title {
  width: calc(100% - 2px);
  height: 35px;
  background: #fff;
  padding: 1px;
}
.echarts-cont-title .tag {
  float: left;
  margin: 10px 0px 0px 10px;
  width: 120px;
  height: 26px;
  font: 14px/18px Microsoft YaHei, Arial;
  color: #000000;
  font-weight: bold;
}
.echarts-cont-title .date {
  float: right;
  margin: 10px 10px 0px 0px;
  width: 120px;
  height: 26px;
  font: 12px Microsoft YaHei, Arial;
  color: #aeaeae;
}
.echarts-cont-title .tag:before {
  content: "";
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  width: 2px;
  background: #e60000;
  vertical-align: bottom;
}
.article1 {
  border-radius: 5px;
  width: 96%;
  /* height: 140px; */
  background: #fff;
  padding: 5px 0 10px 0;
  margin: 10px auto 0px;
}
.article-title {
  margin: 10px auto 0px;
  width: 92%;
  height: 20px;
  font: bold 14px/18px Microsoft YaHei, Arial;
}
.article-echarts {
  /* margin:10px auto 0px; */
  width: 92%;
  margin: 0 auto;
  /* height: 100px; */
}
.echarts-circle {
  float: left;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #e60000;
  text-align: center;
  padding: 6px;
  text-align: center;
}
.circle-word {
  margin: 7px auto 0px;
  width: 24px;
  height: 12px;
  font: 12px/12px Microsoft YaHei, Arial;
  color: rgb(255, 255, 255);
}
.progress {
  float: left;
  margin: 19px 0px 0px 19px;
  display: block;
  width: 76%;
}
.shape-content {
  position: relative;
  width: 100%;
  height: 50px;
}
.state-tip {
  position: absolute;
  bottom: -14px;
  left: 60px;
  height: 30px;
  font: 12px/12px Microsoft YaHei, Arial;
  color: #9c9a9a;
}
.count-tip {
  position: absolute;
  bottom: -14px;
  right: 0px;
  height: 30px;
  font: 12px/12px Microsoft YaHei, Arial;
  color: #aeaeae;
}
.bottom-button {
  width: 100%;
  height: 40px;
  background: #e60000;
  position: fixed;
  bottom: 0px;
}
.bottom-context {
  margin: 12px auto 0px;
  width: 42%;
  color: #ffffff;
  text-align: center;
}
.create-btn {
  display: inline-block;
  margin-left: 4px;
}
</style>
