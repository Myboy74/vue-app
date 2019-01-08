<template>
    <div class="organDetails">
        <div class="topTitle">
            <span v-if="metContent.yjs">已结束</span>
            <span v-else>未进行</span>
            <van-collapse v-model="activeNames">
            <van-collapse-item :title="metContent.meetingName?metContent.meetingName:'暂无标题'" name="1">
                <ul class="topContent">
                    <li>
                        <span><i class="icon"></i>时间</span>
                        <div>{{meetingTime}}</div>
                    </li>
                    <li>
                        <span><i  class="icon_date"></i>地点</span>
                        <div>{{metContent.meetingAddress}}</div>
                    </li>
                    <li>
                        <span style="margin-right:20px;"><i class="icon_people"></i>应到人数</span>
                        <div>{{metContent.meetingNum?metContent.meetingNum+"人":"无"}}</div>
                    </li>
                    <li>
                        <span style="margin-right:20px;"><i class="icon_people"></i>实到人数</span>
                        <div>{{metContent.actualNum?metContent.actualNum+"人":"无"}}</div>
                    </li>
                    <li>
                        <span style="margin-right:20px;"><i class="icon_overPeople"></i>缺勤人数</span>
                        <div>{{metContent.absentNum?metContent.absentNum+"人":"无"}}</div>
                    </li>
                       <li>
                        <span><i class="icon_zcr"></i>主持人</span>
                        <div>{{metContent.speaker}}</div>
                    </li>
                    <li>
                        <span><i class="icon_jlr"></i>记录人</span>
                        <div>{{metContent.recorder}}</div>
                    </li>
                    <li>
                        <span style="margin-bottom:10px;"><i class="icon_content"></i>内容摘要</span>
                        <div class="clear" style="margin:0 " v-html="metContent.meetingLog"></div>
                    </li>
                </ul>
            </van-collapse-item>
            </van-collapse>
        </div>
        <div class="topTitle topMargin">
           <span class="mainSpan">主要内容</span>
            <van-collapse v-model="activeNames">
            <van-collapse-item title="" name="2" style="color: #848484;">
              <div v-html="metContent.meetingContent"
              style="word-wrap:break-word;"></div>
            </van-collapse-item>
            </van-collapse>
        </div>
         <div class="topTitle topMargin">
             <div class="bomCon">
                <span class="mainSpan">影像资料</span>
             </div>
            <div class="botmText">
                <img v-for="(item,index) in images" :key="index" :src="item.src" alt="" @click="imgClick(index)">
            </div>
        </div>
          <div class="topTitle topMargin">
             <div class="bomCon">
                <span class="mainSpan">参加党员列表</span>
             </div>
            <div class="botmText">
               <span style="display:inline-block; padding:5px;" v-for="(ite,ind) in metContent.userlist"
                    :key="ind" v-if="ite.personnelType==1">{{ite.interName?ite.interName:"暂无参加党员"}}</span>
            </div>
        </div>
          <div class="topTitle topMargin" style="margin-bottom:50px">
             <div class="bomCon">
                <span class="mainSpan">缺席党员列表</span>
             </div>
            <div class="botmText">
            <span style="display:inline-block; padding:5px;" v-for="(value,num) in metContent.userlist"
                :key="num" v-if="value.personnelType==2">
                  {{value.interName?value.interName:"暂无缺席人员"}}
            </span>
            
            </div>
        </div>
        <div class="footer">
            <div @click="goBackList">返回列表</div>
            <div @click="goEdit">修改组织生活</div>
        </div>
    </div>
</template>
<script>
import { Toast } from "vant";
import { ImagePreview } from "vant";
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  created() {
    this.autoMove(this.uid);
  },
  data() {
    return {
      uid: this.$route.query.uid,
      orgCode: this.$store.state.form.orgCode,
      activeNames: ["1", "2"], //内容得展开，收起
      imgOpen: uploadImg(),
      metContent:{}, //会议内容
      meetingTime: "", //会议时间
      imgList: [], //图片预览
      images: [], //图片
      videos: [], //视屏
      startLock: "", //开始时间  抽查评价使用
      endLock: "" //结束时间  抽查评价使用
    };
  },
  methods: {
    autoMove(val) {
      let obj = {
        meetingId: val
      };
      let data = qs.stringify(obj);
      postAjax("meeting/meetingInfo", data).then(res => {
        // console.log(res);
        this.metContent = res.data.data;
        // console.log(this.mettingContent);
        // 开始时间
        let time = this.metContent.startTime;
        let start = new Date(time);
        var y = start.getFullYear();
        var M = start.getMonth() + 1; //月
        var d = start.getDate(); //日
        var H = start.getHours(); //时
        var m = start.getMinutes(); //分
        this.startLock = y + "-" + this.formatTen(M) + "-" + this.formatTen(d);
        //结束时间
        let end = this.metContent.endTime;
        let endOver = new Date(end);
        var yy = endOver.getFullYear();
        var MM = endOver.getMonth() + 1; //月
        var dd = endOver.getDate(); //日
        var HH = endOver.getHours(); //时
        var mm = endOver.getMinutes(); //分
        this.endLock = y + "-" + this.formatTen(MM) + "-" + this.formatTen(dd);
        if (y == yy && M == MM && d == dd) {
          this.meetingTime =
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
          this.meetingTime =
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
        // 图片
        let img = this.metContent.attachmentList;
        // console.log(img);
        img.forEach(element => {
          let fileImg = element.attachmentAddr.indexOf("/pic");
          if (fileImg == 0) {
            this.images.push({
              src: this.imgOpen + element.attachmentAddr,
              address: element.attachmentAddr
            });
            this.imgList.push(this.imgOpen + element.attachmentAddr);
          } else {
             this.images.push({
              src: this.imgOpen +"images/"+ element.attachmentAddr,
              address: element.attachmentAddr
            });
            this.imgList.push(this.imgOpen +"images/"+ element.attachmentAddr);
          }
        });
      });
    },
    goBackList() {
      //返回列表
      // window.history.back(-1);
      this.$router.push({
        name: "organization"
      });
    },
    imgClick(ind) {
      //预览图片
      ImagePreview({
        images: this.imgList,
        startPosition: ind,
        onClose() {
          // do something
        }
      });
    },
    overTime(val) {
      //格式化时间
      val = new Date(val);
      var year = val.getFullYear();
      var month = val.getMonth() + 1;
      var day = val.getDate();
      var hour = val.getHours();
      var minute = val.getMinutes();
      var second = val.getSeconds();
      return (
        year +
        "-" +
        this.formatTen(month) +
        "-" +
        this.formatTen(day) +
        " " +
        this.formatTen(hour) +
        ":" +
        this.formatTen(minute) +
        ":" +
        this.formatTen(second)
      );
      // return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    formatTen(num) {
      return num > 9 ? num + "" : "0" + num;
    },
    goEdit() {
      //修改组织生活
      let data = this.metContent;
      if (!data.meetingUnClassInficationList) {
        Toast.fail("创建得会议只能查看,请回首页查找修改");
        return;
      }
      sessionStorage.setItem("xiugai", 1); //是否是修改状态,最后保存创建得内容时使用

      //一些自带得信息没用
      let contentJson = {
        absentList: data.absentList, //缺席人员列表
        classificationId: data.classificationId,
        classificationName: data.classificationName,
        createBranchid: data.createBranchid,
        createBy: data.createBy,
        createTime: data.createTime,
        delFlag: data.delFlag,
        desc: data.desc,
        enroll: data.enroll,
        enrollListStr: data.enrollListStr,
        enrollStatus: data.enrollStatus,
        formatDate: data.formatDate,
        isplanFlag: data.isplanFlag,
        leave: data.leave,
        leaveListStr: data.leaveListStr,
        leaveStatus: data.leaveStatus,
        meetingId: data.meetingId,
        meetingNum: data.meetingNum,
        newAbsentList: data.newAbsentList,
        newPersonnelList: data.newAbsentList,
        personnelList: data.personnelList,
        planStatus: data.planStatus,
        planTime: data.planTime,
        planadjustmentFlag: data.planadjustmentFlag,
        plancompleteTime: data.plancompleteTime,
        plantimeupdateFlag: data.plantimeupdateFlag,
        publishFlag: data.publishFlag,
        publishTime: data.publishTime,
        uploadFileList: data.uploadFileList,
        version: data.version,
        yjs: data.yjs,
        zzbm: data.zzbm,
        zzjx: data.zzjx
      };
      this.$store.dispatch("noneJson", contentJson);

      // step1页得数据
      this.$store.dispatch("stepFirst", data.meetingUnClassInficationList); //1页得分类

      let time = data.startTime;
      time = this.overTime(time); //格式化时间
      let timeEnd = data.endTime;
      timeEnd = this.overTime(timeEnd);

      let step1ren = {
        meetingName: data.meetingName, //标题
        speaker: data.speaker, //主持人
        recorder: data.recorder, //	记录人
        meetingAddress: data.meetingAddress, //	会议地点
        startTime: time, //开始时间
        endTime: timeEnd //结束时间
      };

      this.$store.dispatch("stepFirstCon", step1ren); //1页得分类

      //step2页得数据
      //应参加党员 缺席党员
      this.$store.dispatch("stepTwoPerson1", data.userlist); //1页得分类

      //2页 具体人数
      let step2ren = {
        meetingNum: data.meetingNum, //	应到人数
        actualNum: data.actualNum, //实到人数
        absentNum: data.absentNum //缺席人数
      };
      this.$store.dispatch("stepTwoParty", step2ren); //1页得分类

      //3页 内容概要  主要内容
      let lovk = data.voteList.length == 0 ? false : true;
      let step3Con = {
        meetingLog: data.meetingLog, //内容概要
        meetingContent: data.meetingContent, //主要内容
        lock: lovk //是否投票
      };
      this.$store.state.stepThreeCon = step3Con;
      this.$store.state.votesDto = data.voteList;

      //4页 图片
      this.$store.dispatch("Imags", data.attachmentList); //1页得分类

      //4页  视频
      this.$store.dispatch("Vdeo", data.videoList); //1页得分类

      this.$router.push({
        name: "step1",
        query: {
          goBack: 2
        }
      });
    }
  }
};
</script>
<style scoped>
.organDetails {
  background: #f3f3f3;
}
.topTitle {
  position: relative;
}
.topMargin {
  margin-top: 5px;
  background: #fff;
}
.topTitle > span,
.bomCon > span {
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 12px;
  color: white;
  background: #a9a9a9;
  position: absolute;
  top: 12px;
  left: 30px;
  z-index: 999;
}
.topTitle > span::before,
.bomCon > span::before {
  content: "";
  width: 3px;
  height: 20px;
  border-radius: 50px;
  background: #df0008;
  position: absolute;
  top: 0;
  left: -10px;
}
.bomCon {
  overflow: hidden;
  height: 45px;
  border-bottom: 1px solid #eee;
}
.botmText {
  padding: 15px;
}
.botmText img {
  width: 30%;
  height: 80px;
  margin: 0 1%;
}
.botmText span {
  position: relative;
  background: none;
  display: inline-block;
  margin-right: 10px;
  color: #848484;
}
.topContent {
  font-size: 12px;
}
.topContent li {
  margin-bottom: 10px;
}
.topContent li span {
  display: inline-block;
  float: left;
  padding-top: 2px;
  line-height: 15px;
  position: relative;
  margin-right: 10px;
  color: #8a8a8a;
  padding-left: 25px;
}
.topContent span i {
  width: 16px;
  height: 16px;
  position: absolute;
  top: 3px;
  left: 5px;
  background-size: 12px;
  background-repeat: no-repeat;
}
.topContent span i.icon {
  /* 时间 */
  background-image: url(../../../../static/img/time.png);
}
.topContent span i.icon_date {
  /* 地点 */
  background-image: url(../../../../static/img/date.png);
}
.topContent span i.icon_people {
  /* 应到人数 */
  background-image: url(../../../../static/img/people.png);
}
.topContent span i.icon_people {
  /* 实到人数 */
  background-image: url(../../../../static/img/people.png);
}
.topContent span i.icon_overPeople {
  /* 缺勤人数 */
  background-image: url(../../../../static/img/overPeople.png);
}
.topContent span i.icon_zcr {
  /* 主持人 */
  background-image: url(../../../../static/img/zcr.png);
}
.topContent span i.icon_jlr {
  /* 记录人 */
  background-image: url(../../../../static/img/jlr.png);
}
.topContent span i.icon_content {
  /* 内容摘要 */
  background-image: url(../../../../static/img/content.png);
}

.topContent div {
  margin-left: 70px;
  min-height: 10px;
  color: #848484;
}
.topTitle span.mainSpan {
  background: white;
  color: #000;
  font-size: 14px;
  font-weight: bold;
  padding-left: 5px;
}

.topTitle span.mainSpan::before {
  top: 3px;
}
.footer {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 0 atuo;
  z-index: 999;
  position: absolute;
  bottom: 0;
  left: 0;
}
.footer div {
  width: 50%;
  height: 100%;
  float: left;
  color: white;
  text-align: center;
  background: #1e8ceb;
}
.footer div:last-child {
  background: #e60000;
}
</style>

