<template>
        <div class="step1-content step4">
            <van-steps :active="active" active-color="#f00b0b">
                <van-step>基本信息</van-step>
                <van-step>参会人员</van-step>
                <van-step>内容投票</van-step>
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
                  :action="fileUpload"
                  :on-preview="handlePreview"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :before-upload="beforeUpload"
                  :file-list="fileList"
                  :limit=6
                  :on-exceed="tirggerFile"
                  list-type="picture">
                   <i data-v-20847794="" class="van-icon van-icon-photograph f_picture"
                  tiple="multiple">
                  </i>
                </el-upload>
               
               
                <van-field
                  
                    label="视频:"
                    placeholder="传0-3段"
                    disabled
                    style=" border-top: 1px solid #eee;margin-top:10px;"
                />
                <el-upload
                  class="upload-demo"
                  :action="fileMp"
                  :on-preview="handlePreview2"
                  :on-success="handleSuccess2"
                  :on-remove="handleRemove2"
                  :before-upload="beforeUpload2"
                  :file-list="fileVideo"
                  :limit=3
                  :on-exceed="tirggerFile2"
                  list-type="picture">
                   <i data-v-20847794="" class="van-icon van-icon-photograph f_picture"
                  tiple="multiple">
                  </i>
                </el-upload>
            </van-cell-group>
            </div>
           
            <div class="btn-content" style="clear:both">
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
  fileUploadMp
} from "../../../api/api.js";
import { Dialog } from "vant";
import Vue from "vue";
import { Upload } from "element-ui";
Vue.use(Upload);
export default {
  created() {
    if (this.goBack) {
      this.fileList = this.$store.state.fileimg; //上传图片专用
      this.fileVideo = this.$store.state.fileMp; //上传视频专用
    }
  },
  data() {
    return {
      fileUpload: fileUpload(),
      fileMp: fileUploadMp(),
      imgFile:uploadImg(),
      goBack: this.$route.query.goBack,
      active: 3,
      fileList: [], //上传图片专用
      fileVideo: [], //上传视频专用
     
    };
  },
  methods: {
    handleRemove(file, fileList) {
      //文件列表移除文件时的钩子
      // console.log(file)
      if (file.uid) {
        let ind = file.uid;
        let fileArr=this.fileList;
        if (fileArr.length==1) {
          this.fileList=[];
        } else {
          fileArr.splice(fileArr.findIndex((item, index) => item.id == ind), 1);
        }
        // console.log(this.fileList);
      }
    },
    handlePreview(file) {
      //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    },
    handleSuccess(response, file, fileList) {
      //文件上传成功时的钩子
        this.fileList.push({
          id: response.data[0].fileId,  //id
          name: response.data[0].fileName, //名字
          url:this.imgFile+response.data[0].address, //预览路径
          addresss:response.data[0].address  //地址
        })
        // console.log(this.fileList)
    },
    tirggerFile(files, fileList) {
      //文件上传超出数量后
      // console.log(files);
      //  console.log(fileList.length);
      Toast("图片最多上传6张~~");
    },
    beforeUpload(file) {
      //上传文件之前的钩子
      var flag = false; //状态
      var arr = ["jpg", "png", "gif"];
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
      // var fileSize=file.size  / 1024 / 1024 < 50;
      // //条件判断
      // if (!fileSize) {
      //     this.$message.error('上传附件大小不能超过 50MB!');
      //     return false;
      // }
      if (!flag) {
        Toast("只能上传图片~~");
        return false;
      }
    },

    handleRemove2(file, fileList) {
      //文件列表移除文件时的钩子
      // console.log(file)
       if (file.uid) {
        let ind = file.uid;
        let fileArr=this.fileVideo;
        if (fileArr.length==1) {
          this.fileVideo=[];
        } else {
          fileArr.splice(fileArr.findIndex((item, index) => item.id == ind), 1);
        }
        // console.log(this.fileVideo);
      }
    },
    handlePreview2(file) {
      //点击文件列表中已上传的文件时的钩子
      // console.log(file);
    },
    handleSuccess2(response, file, fileList) {
      //文件上传成功时的钩子
      // console.log(response);
      // console.log(file);
      // console.log(fileList);
      this.fileVideo.push({
          id: response.data[0].fileId,//id
          name: response.data[0].fileName, //名字
          url:this.imgFile+response.data[0].address,//预览路径
          addresss:response.data[0].address  //地址
      });
      // console.log(this.unloadMp);
    },
    tirggerFile2(files, fileList) {
      //文件上传超出数量后
      // console.log(files);
      //  console.log(fileList.length);
      Toast("视频最多上传3个~~");
    },
    beforeUpload2(file) {
      //上传文件之前的钩子
      // console.log(file);
      var flag = false; //状态
      var arr = ["mp4"];
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
      var fileSize=file.size  / 1024 / 1024 < 500;
      var fileMin=file.size  / 1024 / 1024 < 300;
      //条件判断
      if (!fileSize) {
        Toast("上传视频大小不能超过 500MB!");
        return false;
      }
      if(fileMin){
        Toast("上传视频大小不能小于 300MB!");
        return false;
      }
      if (!flag) {
        Toast("只能上传视频~~");
        return false;
      }
    },

    Prev() {
      //上一步
      //   fileList: [], //上传图片专用
      // fileVideo: [], //上传视频专用

      this.$store.dispatch("Vdeo", this.fileVideo);
      this.$store.dispatch("Imags", this.fileList);
      this.$router.push({
        path: "/step3",
        query: {
          goBack: 4
        }
      });
    },
    saveAndPublick() {
      // 保存并发布
   

      if (this.fileList.length < 3) {
        Toast("最少上传3张图片~~");
        return;
      }
      let form = this.$store.state.form; //用户/创建人得信息
      let stepOneType = this.$store.state.stepOneType; //1页得分类
      let stepOneCon = this.$store.state.stepOneCon; //1页得其他信息
      let stepTwoSum = this.$store.state.stepTwo1; //2页 应参加党员 信息
      let stepTwoCount = this.$store.state.stepTwoNum; //2页 具体人数
      let stepThreeCon = this.$store.state.stepThreeCon; //3页 内容概要  主要内容
      let checked = this.$store.state.votesDto; //3页 投票结果

      let name = sessionStorage.getItem("branchName");
      name = name.substr(0, name.indexOf("-"));
      let meetingId = []; //分类，集合
      stepOneType.forEach(item => {
        meetingId.push({
          classificationId: item.classificationId
        });
      });
      let people = []; //应参加党员和缺席党员集合
      stepTwoSum.forEach(element => {
        if(element.personnelTyp==1){
           people.push({
          personnelHas: element.personnelHas, //--党员hash
          personnelNam: element.personnelNam, //   //--党员名称
          personnelId: element.personnelId, //--党员id
          interName: element.interName, //	--互联网名称
          personnelTyp: 1 //应参加党员
        });
        }else if(element.personnelTyp==2){
          people.push({
            personnelHas: element.personnelHas, //--党员hash
            personnelNam: element.personnelNam, //   //--党员名称
            personnelId: element.personnelId, //--党员id
            interName: element.interName, //	--互联网名称
            personnelTyp: 2 //缺席党员
          });
        }
       
      });
      let videpload = []; //视频数组
      this.fileVideo.forEach(ite => {
        videpload.push({
          attachmentAddr: ite.addresss, //附件地址
          attachmentRelName: ite.name //文件名称
        });
      });
      let picture = [];
      //  this.unloadArray: [], //图片数组
      this.fileList.forEach(ite => {
        picture.push({
          attachmentAddr: ite.addresss, //附件地址
          attachmentRelName: ite.name //文件名称
        });
      });
    
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
        userlist: people, //应参加党员和缺席党员集合
        meetingUnClassInficationList: meetingId, //分类，集合
        attachmentList: picture, //图片附件集合
        videoList: videpload, //视频附件集合
        uploadFileList: []
      };
      let xiugai = sessionStorage.getItem("update");
      if (xiugai) {
        postAjax("meeting/updateMeeting", obj).then(res => {
          console.log(res);
          // window.location.reload();
        });
      } else {
        postAjax("meeting/createMeeting", obj).then(res => {
          console.log(res);
          
          // window.location.reload();
        });
      }

      // Dialog.alert({
      //   title: "保存成功！",
      //   message: "即将跳转至详情页..."
      // }).then(() => {
      //   // on close
      //   this.$router.push({ path: "/organizationDetails" });
      // });
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
  margin: 20px auto 0px;
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
  width: 70px;
  height: 70px;
  border: 1px dashed rgb(174, 174, 174);
  border-radius: 5px;
  z-index: 0;
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
</style>