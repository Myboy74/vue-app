<template>
        <div class="step1-content step4">
            <van-steps :active="active" active-color="#f00b0b">
                <van-step>基本信息</van-step>
                <van-step>参会人员</van-step>
                <van-step>会议内容</van-step>
                <van-step>影像资料</van-step>
            </van-steps>
            <div>
               <van-cell-group style="margin-left:20px;">
                <van-field
                    label="图片:"
                    placeholder="限上传3-6张"
                    disabled
                />
                   <el-upload
                  class="upload-demo"
                  :multiple = "true"
                  :action="fileUpload"
                  :with-credentials="true"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :on-error="handleError"
                  :on-change = "handleChange"
                  :on-progress = "handleProgress"
                  :before-upload="beforeUpload"
                  :file-list="fileList"
                  :limit=6
                  :on-exceed="tirggerFile"
                  list-type="picture">
                   <i data-v-20847794="" class="van-icon van-icon-photograph f_picture"
                  tiple="multiple">
                  </i>
                </el-upload>
               
               
                <!-- <van-field
                    label="视频:"
                    placeholder="传0-3段"
                    disabled
                    style=" border-top: 1px solid #eee;margin-top:10px;"
                /> -->
                
                <!-- <el-upload
                  class="upload-demo"
                  :action="fileMp"
                  :on-preview="handlePreview2"
                  :on-success="handleSuccess2"
                  :on-remove="handleRemove2"
                  :before-upload="beforeUpload2"
                  :file-list="fileVideo"
                  :limit=3
                  :on-exceed="tirggerFile2"
                  :show-file-list="false"
                  list-type="picture">
                     <i data-v-20847794="" class="van-icon van-icon-photograph f_picture"
                  tiple="multiple">
                 </i> 
                </el-upload>
  <video v-for="(item,index) in fileVideo" :key="index" v-if="fileVideo.Video !='' && videoFlag == false" :src="fileVideo.url" class="avatar" controls="controls">您的浏览器不支持视频播放</video>
                  --> 
          </van-cell-group>
            </div>
           
            <div class="btn-content" style="clear:both;">
                <van-button type="primary" style="margin: 0 auto; width:40%; border-radius:5px;" @click="Prev">上一步</van-button>
                <van-button type="danger" style="margin: 0 auto; width:40%; border-radius:5px;" @click="saveAndPublick">保存并发布</van-button>
            </div>

        </div>
</template>

<script>
import { Toast } from "vant";
import qs from "qs";
import {
  postAjax,
  getAjax,
  uploadImg,
  fileUpload,
} from "../../../api/api.js";
import { Dialog } from "vant";
import Vue from "vue";
import { Upload } from "element-ui";
Vue.use(Upload);
export default {
  created() {
    if (this.goBack) {
      let img = this.$store.state.fileimg; //上传图片专用
      let vioList = this.$store.state.fileMp; //上传视频专用

      if (img.length) {
        img.forEach(item => {
          this.fileList.push({
            id: item.attachmentId, //id
            name: item.attachmentRelName, //名字
            url: this.imgFile + item.attachmentAddr, //预览路径
            address: item.attachmentAddr //地址
          });
        });
      }
      if (vioList.length) {
        vioList.forEach(item => {
          this.fileVideo.push({
            id: item.attachmentId, //id
            name: item.attachmentRelName, //名字
            url: this.videoFile + item.attachmentAddr, //预览路径
            address: item.attachmentAddr //地址
          });
        });
      }
    }
  },
  data() {
    return {
      fileUpload: fileUpload(), //图片上传地址
      // fileMp: fileUploadMp(), //视频上传地址
      imgFile: uploadImg(), //回显图片
      // videoFile: uploadVideo(), //回显视频
      goBack: this.$route.query.goBack,
      active: 3,
      fileList: [], //上传图片专用
      // fileVideo: [], //上传视频专用
      videoFlag: false,
      toast: ""
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // return;
      //文件列表移除文件时的钩子
      if (file.uid) {
        let ind = file.uid;
        let fileArr = this.fileList;

        Array.prototype.remove = function(val) {
          let index = -1;
          for (let i = 0; i < this.length; i++) {
            if (this[i].uid === val) {
              index = i;
            }
          }
          if (index > -1) {
            this.splice(index, 1);
          }
        };

        fileArr.remove(ind);
      }
    },
    handleProgress(event, file, fileList) {
      //上传过程中
      this.toast.message = "图片上传中:" + parseInt(event.percent) + "%";
      if (event.percent == 100) {
        this.toast.message = "图片正在同步到E支部系统";
      }
    },
    handlePreview(file) {
      //点击文件列表中已上传的文件时的钩子
    },
    handleChange(file, fileList) {},
    handleSuccess(response, file, fileList) {
      //文件上传成功时的钩子
      Toast.clear();

      this.fileList.push({
        id: response.data.fileId, //id
        uid: file.uid,
        name: response.data.fileName, //名字
        url: file.url, //预览路径
        // address: response.data.address //地址
        address: ""
      });
      if (!response.success) {
        this.fileList.splice(this.fileList.length - 1, 1);
      }
    },
    handleError: function(err, file, fileList) {
      Toast("图片上传失败");
      setTimeout(function() {
        Toast.clear();
      }, 2000);
    },
    tirggerFile(files, fileList) {
      //文件上传超出数量后
      // console.log(5);
      Toast("图片最多上传6张~~");
    },
    beforeUpload(file) {
      //上传文件之前的钩子
      if (file.type.indexOf("image") != 0) {
        Toast("只能上传图片~~");
        return false;
      }
      this.toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "图片正在上传"
      });
    },

    handleRemove2(file, fileList) {
      //文件列表移除文件时的钩子
      // console.log(file)
      if (file.uid) {
        let ind = file.uid;
        let fileArr = this.fileVideo;
        if (fileArr.length == 1) {
          this.fileVideo = [];
        } else {
          fileArr.splice(fileArr.findIndex((item, index) => item.id == ind), 1);
        }
      }
    },
    handlePreview2(file) {
      //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    },
    handleSuccess2(response, file, fileList) {
      //文件上传成功时的钩子
      this.fileVideo.push({
        id: response.data[0].fileId, //id
        name: response.data[0].fileName, //名字
        url: this.videoFile + response.data[0].address, //预览路径
        addresss: response.data[0].address //地址
      });
      // console.log(this.unloadMp);
    },
    tirggerFile2(files, fileList) {
      //文件上传超出数量后
      Toast("视频最多上传3个~~");
    },
    beforeUpload2(file) {
      //上传文件之前的钩子
      // console.log(file);
      var flag = false; //状态
      var arr = ["mp4", "MP4"];
      //取出上传文件的扩展名
      var index = file.name.lastIndexOf(".");
      var ext = file.name.substr(index + 1);
      //循环比较
      for (var i = 0; i < arr.length; i++) {
        if (ext == arr[i]) {
          flag = true; //一旦找到合适的，立即退出循环
          break;
        }
      }
      var fileSize = file.size / 1024 / 1024 < 500;
      var fileMin = file.size / 1024 / 1024 < 300;
      //条件判断
      if (!fileSize) {
        Toast("上传视频大小不能超过 500MB!");
        return false;
      }
      // if (fileMin) {
      //   Toast("上传视频大小不能小于 300MB!");
      //   return false;
      // }
      if (!flag) {
        Toast("只能上传视频~~");
        return false;
      }
    },

    Prev() {
      //上一步
      //   fileList: [], //上传图片专用
      // fileVideo: [], //上传视频专用

      // this.$store.dispatch("Vdeo", this.fileVideo);  //加上会让修改的时候上一步在回来,图片不会显
      // this.$store.dispatch("Imags", this.fileList);
      this.$router.push({
        path: "/step3",
        query: {
          goBack: 4
        }
      });
    },
    saveAndPublick() {
      // 保存并发布
      var xiugai = sessionStorage.getItem("xiugai"); //是否是修改状态,是走修改接口,否则走创建接口
      let form = this.$store.state.form; //用户/创建人得信息
      let stepOneType = this.$store.state.stepOneType; //1页得分类
      let stepOneCon = this.$store.state.stepOneCon; //1页得其他信息
      let stepTwoSum = this.$store.state.stepTwo1; //2页 应参加党员 信息
      let stepTwoCount = this.$store.state.stepTwoNum; //2页 具体人数
    
      let stepThreeCon = this.$store.state.stepThreeCon; //3页 内容概要  主要内容
      let checked = this.$store.state.votesDto; //3页 投票结果
      if (!form.branchId) {
        Toast("所填信息丢失请重新创建填写~~");
        return;
      }
      if (this.fileList.length < 3) {
        Toast("最少上传3张图片~~");
        return;
      }
      let name = sessionStorage.getItem("branchName");
      let meetingId = []; //分类，集合
      stepOneType.forEach(item => {
        meetingId.push({
          classificationId: item.classificationId,
          classificationName: item.classificationName
        });
      });
     
      let picture = [];
      this.fileList.forEach(ite => {
        picture.push({
          attachmentId: ite.id,
          attachmentAddr: ite.address, //附件地址
          attachmentRelName: ite.name //文件名称
        });
      });
      this.$store.dispatch("Imags", picture); //图片

      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "内容提交中...."
      });
      //是否是修改状态
      if (xiugai == 1) {
        // console.log("修改")
        //修改
        let fileNow = this.$store.state.modifyFile; //修改放置无用的信息,但必须带过去
        let obj = {
          branchId: form.branchId, //支部ID
          orgCode: form.orgCode, //组织编码
          branchName: name, //支部名称
          meetingName: stepOneCon.meetingName, //	标题
          speaker: stepOneCon.speaker, //	主持人
          recorder: stepOneCon.recorder, //	记录人
          meetingAddress: stepOneCon.meetingAddress, //	会议地点
          startTime: stepOneCon.startTime, //	开始时间
          endTime: stepOneCon.endTime, //	结束时间
          meetingNum: stepTwoCount.meetingNum, //	应到人数
          actualNum: stepTwoCount.actualNum, //	实到人数
          absentNum: stepTwoCount.absentNum, //缺席人数
          meetingLog: stepThreeCon.meetingLog, //	内容概要
          meetingContent: stepThreeCon.meetingContent, //	主要内容
          publishFlag: 1, //发布状态
          votesDtoList: checked, //投票集合
          userlist: stepTwoSum, //应参加党员和缺席党员集合
          meetingUnClassInficationList: meetingId, //分类，集合
          attachmentList: picture, //图片附件集合
          videoList:[], //视频附件集合
          //没用到的字段放进来传给后台
          absentList: fileNow.absentList, //缺席人员列表
          classificationId: fileNow.classificationId,
          classificationName: fileNow.classificationName,
          createBranchid: fileNow.createBranchid,
          createBy: fileNow.createBy,
          createTime: fileNow.createTime,
          delFlag: fileNow.delFlag,
          desc: fileNow.desc,
          enroll: fileNow.enroll,
          enrollListStr: fileNow.enrollListStr,
          enrollStatus: fileNow.enrollStatus,
          formatDate: fileNow.formatDate,
          isplanFlag: fileNow.isplanFlag,
          leave: fileNow.leave,
          leaveListStr: fileNow.leaveListStr,
          leaveStatus: fileNow.leaveStatus,
          meetingId: fileNow.meetingId,
          newAbsentList: fileNow.newAbsentList,
          newPersonnelList: fileNow.newAbsentList,
          personnelList: fileNow.personnelList,
          planStatus: fileNow.planStatus,
          planTime: fileNow.planTime,
          planadjustmentFlag: fileNow.planadjustmentFlag,
          plancompleteTime: fileNow.plancompleteTime,
          plantimeupdateFlag: fileNow.plantimeupdateFlag,
          publishTime: fileNow.publishTime,
          uploadFileList: fileNow.uploadFileList,
          version: fileNow.version,
          yjs: fileNow.yjs,
          zzbm: fileNow.zzbm,
          zzjx: fileNow.zzjx
        };
        postAjax("meeting/updateMeeting", obj).then(res => {
          if (res.data.success) {
            Toast.clear();
            Dialog.alert({
              title: "修改保存成功！",
              message: "即刻跳转至详情页..."
            }).then(() => {
              this.$router.push({
                path: "/organizationDetails",
                query: {
                  uid: obj.meetingId
                }
              });
            });
          } else {
            Toast.fail(res.data.message);
           
          }
        });
      } else {
        //新建
        // console.log("新建")
        let obj = {
          branchId: form.branchId, //支部ID
          orgCode: form.orgCode, //组织编码
          branchName: name, //支部名称
          meetingName: stepOneCon.meetingName, //	标题
          speaker: stepOneCon.speaker, //	主持人
          recorder: stepOneCon.recorder, //	记录人
          meetingAddress: stepOneCon.meetingAddress, //	会议地点
          startTime: stepOneCon.startTime, //	开始时间
          endTime: stepOneCon.endTime, //	结束时间
          meetingNum: stepTwoCount.meetingNum, //	应到人数
          actualNum: stepTwoCount.actualNum, //	实到人数
          absentNum: stepTwoCount.absentNum, //缺席人数
          meetingLog: stepThreeCon.meetingLog, //	内容概要
          meetingContent: stepThreeCon.meetingContent, //	主要内容
          publishFlag: 1, //发布状态
          votesDtoList: checked, //投票集合
          userlist: stepTwoSum, //应参加党员和缺席党员集合
          meetingUnClassInficationList: meetingId, //分类，集合
          attachmentList: picture, //图片附件集合
          videoList: [], //视频附件集合
          uploadFileList: []
        };
        postAjax("meeting/createMeeting", obj).then(res => {
          // console.log(res.data);
          // return;
          if (res.data.success) {
            Toast.clear();
            Dialog.alert({
              title: "保存成功！",
              message: "即将跳转至详情页..."
            }).then(() => {
              this.$router.push({
                path: "/organizationDetails",
                query: {
                  uid: res.data.data
                }
              });
            });
          } else {
            Toast.fail(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.step1-content {
  width: 100%;
  height: 100%;
  background: #fff;
}
.btn-content {
  background: #fff;
  margin: 50px auto 0px;
  width: 80%;
  text-align: center;
}
.btn-tip {
  width: 48px;
  display: block;
  float: left;
  margin: 6px 6px 0px 0px;
}
.van-cell__left-icon {
  min-width: 1em;
  font-size: 20px !important;
  line-height: 24px;
  margin-right: 5px;
}
.img-container {
  margin: 0 auto;
  /* width: calc(85% - 55px); */
}
.f_ul li {
  float: left;
  position: relative;
}
.f_ul li i {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 3px;
  background: red;
  border-radius: 50%;
}
.after-img {
  display: inline-block;
  width: 70px;
  height: 70px;
  margin: 0 10px;
  border: #aeaeae dashed 1px;
  border-radius: 5px;
}
.f_picture {
  width: 50px;
  height: 50px;
  border: 1px dashed rgb(174, 174, 174);
  border-radius: 5px;
  z-index: 0;
  margin-left: 5px;
  position: relative;
}
.f_input {
  width: 70px;
  height: 70px;
  opacity: 0;
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
}
.avatar {
  margin-top: 5px;
}
</style>