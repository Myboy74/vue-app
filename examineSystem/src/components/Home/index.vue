<template>
    <div class="index-content">
       <div class="head-content">
            <van-icon class="top-icon"  name="search" slot="right" @click="onSearch"/>
            <!-- <span class="login-type" v-if="!option.length==1" @click="show=true">管理权限</span> -->
            <span class="login-type" v-if="lock"  @click="show=true">管理权限</span>
            <!-- 选择管理权限 -->
            <van-actionsheet v-model="show" title="请选择：">
                <van-radio-group v-model="optionChange" >
                    <van-cell-group>
                        <van-cell v-for="(ite,index) in option"
                        :key="index"
                        :title="ite.roleDescription" clickable @click="onLoad(ite.manageCode,ite.manageId)">
                        <van-radio :name="ite.manageCode"/>
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
               <ul class="newlist" v-if="listcontext.length">
                    <li v-for="(item,index) in listcontext"
                     :key="index" 
                     @click="onOrganDetail(item.id)">
                        <p>{{item.center}}</p>
                        <p class="date">{{item.date}}</p>
                    </li>
                </ul>
                <p v-else style=" text-align: center; padding:50px 0;color:#aeaeae">暂无内容</p>
           </div>
       </div>
       <div class="echarts-container f_picture">
           <div class="echarts-cont-title">
               <div class="tag">工作提醒</div>
               <span class="date">截止到今日凌晨</span>
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
               <span class="create-btn">创建组织生活记录</span>
           </div>
       </div>
    </div>
</template>
<script>
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
export default {
  mounted() {
    this.optionChange=sessionStorage.getItem("orgCode");
    let that_ = this;
    let time=setInterval(function(){
      let orgId = sessionStorage.getItem("orgId");

      if(orgId){
        that_.jiexi();
        clearInterval(time);
      }
     
    },200);
   
  },
  data() {
    return {
      lock:true,//权限管理 如果只有一个不显示
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
        meetingName: "", //	会议标题
        pageNum: "", //页码,从1开始
        pageSize: "" //每页条数,默认30
      }
    };
  },
  methods: {
    autoZuZhi(date) {
      //组织生活
      date.branchId = sessionStorage.getItem("orgId");
      date.orgCode = sessionStorage.getItem("orgCode");
      let data = qs.stringify(date);
      
      postAjax("meeting/nowMeetingList", data).then(res => {
        // console.log(res);
        let num = res.data.data.data;
        // console.log(num)
        if (num) {
          for (var i = 0; i < 2; i++) {
            // 开始时间
            let meetingTime = "";
            // console.log()
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
                "--" +
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
        }

        //    console.log(this.listcontext);
      });
    },
    onLoad(val, id) {
      // console.log(val,id)
      sessionStorage.setItem("orgCode",val);
      // this.optionChange = id;
      //  life: {
      //   branchId: "", //支部ID
      //   classificationId: "", //组织生活类型ID
      //   orgCode: "", //组织code
      //   meetingName: "", //	会议标题
      //   pageNum: "", //页码,从1开始
      //   pageSize: "" //每页条数,默认30
      // }
      this.life.orgCode = val;
      this.life.branchId = id;
      sessionStorage.setItem("orgCode",val);
      sessionStorage.setItem("orgId",id);
        this.wordTop = {
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
      };
      this.listcontext = [];
      this.autoZuZhi(this.life); //组织生活
      this.wordTi(this.life.branchId); //工作提醒
      this.show = false;
    },
    wordTi(id) {
      let obj = {
        branchId: id
      };
      let data = qs.stringify(obj);

      postAjax("checkEvaluate/remindList", data).then(res => {
        // console.log(res);
        // res={"data":[{"quarterType":"0","finishNum":3,"classificationId":"1","minNum":4},{"quarterType":"1","finishNum":0,"classificationId":"1","minNum":1},{"quarterType":"0","finishNum":1,"classificationId":"2253028057613312","minNum":12},{"quarterType":"2","finishNum":0,"classificationId":"2253028057613312","minNum":1},{"quarterType":"0","finishNum":0,"classificationId":"3","minNum":1},{"quarterType":"0","finishNum":0,"classificationId":"4","minNum":1},{"quarterType":"0","finishNum":2,"classificationId":"8","minNum":4},{"quarterType":"1","finishNum":0,"classificationId":"8","minNum":1}],"success":true};
        let num = res.data.data;

        num.forEach((item, index) => {
          let txt = "";
          if (item.classificationId == "1") {
            txt = "党员大会";
            let sum = item.finishNum ? item.finishNum : 0;
            let min = item.minNum;
            var a = Number(sum) / Number(min) * 100;
            a = Number(a.toFixed(2));
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
            a = Number(a.toFixed(2));
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
            a = Number(a.toFixed(2));
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
            a = Number(a.toFixed(2));
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
            a = Number(a.toFixed(2));
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
      sessionStorage.setItem("xiugai",0);//是否是修改状态,最后保存创建得内容时使用
      //创建的时候初始化一遍,防止修改得时候返回将修改得内容回显
      this.$store.dispatch("increase", this.life);
      this.$store.dispatch("stepFirst", []); //1页得分类
      this.$store.dispatch("stepFirstCon", {
        meetingName: "", //标题
        meetingAddress: "", //	会议地点
        speaker:sessionStorage.getItem("userName"),//主持人
        recorder:sessionStorage.getItem("userName"),//	记录人
        startTime: "", //开始时间
        endTime: "" //结束时间
      }); //1页得其他信息
      this.$store.dispatch("stepTwoPerson1", []); // 2页 应参加党员 信息
      this.$store.dispatch("stepTwoParty", {
        meetingNum: "", //	应到人数
        actualNum: "", //实到人数
        absentNum: "" //缺席人数
      }); // 2页  具体人数 信息
      this.$store.dispatch("stepTwoAllover", { one: "2", two: "1" }); //应参加党员 缺席是否全选,
      this.$store.dispatch("stepThreeConList", {
        //3页 内容概要  主要内容
        meetingLog: "", //内容概要
        meetingContent: "", //主要内容
        lock: false //是否投票
      }); //3页 内容概要  主要内容
      this.$store.dispatch("stepVotesDtoList",[]); //3页 投票结果
      this.$store.dispatch("Vdeo",[]);
      this.$store.dispatch("Imags",[]);

      this.$router.push({
        path: "/step1",
        query: {
          goBack: 2
        }
      });
    },
    onRadion(val) {
      //选择管理权限
      // console.log(val); //code
      if (val) {
        let obj = [];
        this.option.forEach(item => {
          if (item.manageCode == val) {
            obj.push({
              manageId: oldData[i].manageId, //受管理的党支部/党委ID
              manageName: oldData[i].manageName, //受管理的党支部/党委名称
              manageCode: oldData[i].manageCode, //受管理的党支部/党委名称
              roleDescription: oldData[i].roleDescription, //具体角色显示得名称
              roleId: oldData[i].roleDescription, //id
              roleName: oldData[i].roleDescription
            });
          }
        });
        if (obj) {
          let name = obj.manageId;
          this.$store.dispatch("increase", this.life);
          sessionStorage.setItem("branchName", name);
          // this.life={
          //     branchId:obj.manageId,   //支部ID
          //     classificationId:"",   //组织生活类型ID
          //     orgCode:obj.manageCode,   //组织code
          //meetingName	:"",//	会议标题
          //     pageNum:"1",    //页码,从1开始
          //     pageSize:"30",   //每页条数,默认30
          // }
          // this.autoZuZhi(this.life);
        }
      }
    },
    onDetails() {
      //跳转到组织生活更多tab页面
      sessionStorage.setItem("value", "");
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
    jiexi() {
      let roleDataStr = sessionStorage.getItem("roledata");
      this.option = JSON.parse(roleDataStr);
      if(this.option.length==1){
          this.lock=false;
      }
      this.optionChange = sessionStorage.getItem("orgCode");
      this.life = {
        branchId: sessionStorage.getItem("orgId"),   //支部ID
        // branchId: "3abcce49-0dd6-4837-9ddd-617783fe6eb8",
        // branchId: "84e5f1db-5a05-4723-9707-61c1899911eb",
        classificationId: "", //组织生活类型ID
        orgCode	: sessionStorage.getItem("orgCode"),   //组织code
        meetingName: "", //会议标题
        // orgCode: "000002000008000003000007000002000002000003",
        // orgCode: "000002000008000006000055000001000001",

        pageNum: "1", //页码,从1开始
        pageSize: "30" //每页条数,默认30
      };
      this.$store.dispatch("increase", this.life);
      // console.log(this.life);
      this.autoZuZhi(this.life); //组织生活

      this.wordTi(this.life.branchId); //工作提醒
    },
    // getUser() {
    //   let self = this;
    //   postAjax("user/getUserInfo").then(res => {
    //     // console.log(res);
    //     if (res.data.success) {
    //       let w_data = res.data.data;
    //       self.jiexi(w_data);
    //     }
    //   });
    // },
    formatTen(num) {
      //调整时间格式
      return num > 9 ? num + "" : "0" + num;
    }
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
  margin-bottom: 150px;
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
.article1:last-child {
  height:200px;
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
