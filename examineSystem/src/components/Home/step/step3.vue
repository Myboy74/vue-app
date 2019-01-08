<template>
        <div class="step1-content step3">
            <van-steps :active="active" active-color="#e50d02">
                <van-step>基本信息</van-step>
                <van-step>参会人员</van-step>
                <van-step>会议内容</van-step>
                <van-step>影像资料</van-step>
            </van-steps>
            <van-cell-group>
                <van-field
                    v-model="brief"
                    type="textarea"
                    label="内容概要"
                    placeholder="请简单描述活动内容"
                />
                <van-field
                    v-model="primaryContent"
                    type="textarea"
                    label="主要内容"
                    required
                    placeholder="不得少于50字..."
                />
                <van-field
                    value=""
                    label="投票"
                    clearable
                    disabled
                >
                    <van-switch slot="button" v-model="checked" @click="checkedFn" />
                </van-field>
                <van-cell-group v-show="checked" style="background:#cccccc">
                  <div v-for="(item , index) in voetArray" :key="item.key">
                      <van-field
                    value=""
                    label="表决"
                    clearable
                    class="f_abb"
                    disabled>
                        <label class="btn-tip" slot="button">{{item.lock? '记名':'不记名'}}</label>
                        <van-switch slot="button" active-color="#4A90e2" v-model="item.lock" @click="checkedFn" />
                    </van-field>
                    <van-cell-group class="f_text" style="position: relative;">
                        <van-field
                        v-model="item.voteMessage"
                        :key="index"
                        type="textarea"
                        placeholder="表决内容不得超过60个字符"
                        rows="1"
                        autosize
                        style="background:#cccccc;">
                           
                            <!-- <van-icon name=" " slot="icon"  @click="deleteInput(index)"/> -->
                        </van-field>
                         <i class="f_icon" @click="deleteInput(index)"></i>
                    </van-cell-group>
                  </div>
                    <div style="background:#cccccc;">
                    <van-icon name="add-o" style="padding:10px 20px; font-size:20px;" @click="addInput" />
                </div>
                </van-cell-group>
            </van-cell-group>
            <div class="btn-content">
                <van-button type="primary"
                 style="margin: 0 auto; width:40%;
                  border-radius:5px;
                  background-color: #1e8ceb;
                  border: 1px solid #1e8ceb; " @click="Prev">上一步</van-button>
                <van-button type="danger"
                 style="margin: 0 auto; width:40%;
                  border-radius:5px;
                  background-color: #e60000;
                  border: 1px solid #e60000;
                  " @click="nextStep">下一步</van-button>
            </div>
        </div>
</template>

<script>
import { Toast } from 'vant';
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  created(){
      if(this.goBack){
        // console.log(this.$store.state.votesDto)
        let step=this.$store.state.stepThreeCon;
        this.brief= step.meetingLog; //内容概要
        this.primaryContent= step.meetingContent; //主要内容
        let vote=this.$store.state.votesDto;
         this.voetArray=[];//投票
        vote.forEach(item=>{
           this.voetArray.push({
              lock:item.realName==0?false:true,
              voteMessage: item.voteContent 
           });
        })
        this.checked=step.lock;//是否投票
      }
  },
  data() {
    return {
      goBack:this.$route.query.goBack,
      active: 2,
      brief: "", //内容概要
      primaryContent: "", //主要内容
      showRadioList: false, //是否弹出人名列表弹窗
      shouldCount: "", //应到人数
      infactCount: "", //实到人数
      partyRadio: "", //党员选择列表
      partyName: "", //党员列表姓名
      endTime: "", //结束时间
      endCurrentDate: new Date(), //结束时间控件
      endMinDate: new Date(), //结束时间最小日期
      showEndTime: false, //是否显示开始时间弹窗
      checked: false, //投票开关
      // rememberName: false, //记名不记名
      voetArray: [
        {
          lock:false,
          voteMessage: "" //表决内容
        }
      ] //表决内容集合
    };
  },
  methods: {
    openJoinList() {
      //显示应参加党员列表的弹窗方法
      this.showRadioList = true;
    },
    openDefaultList() {
      //显示应到到人数列表的弹窗方法
      this.showRadioList = true;
    },
    checkedFn() {
      //显示隐藏表单
      this.checked = !this.checked;
    },
    rememberFn() {
      //记名不记名方法
      this.rememberName = !this.rememberName;
    },
    addInput() {
      //增加表决内容方法
      this.voetArray.push({
        voteMessage: ""
      });
    },
    deleteInput(selIndex) {
      //删除表决内容方法
      let a = this.voetArray.findIndex((item, index) => {
        if (index == selIndex) {
          this.voetArray.splice(index, 1);
        }
      });
    },
    Prev() {
      //上一步
      this.$router.push({
        path: "/step2",
        query:{
           goBack:3
        }
        });
    },
    nextStep() {
      //下一步
      //  if(!this.brief){
      //   Toast("请填写内容概要");
      //   return;
      // }
        if(!this.primaryContent){
        Toast("请填写主要内容");
        return;
      }
      if(this.primaryContent.length<50 ){
        Toast("主要内容不得少于50字~~");
        return;
      }
      let meetingCon={
        meetingLog:this.brief,//	内容概要
        meetingContent:this.primaryContent,//	主要内容
        lock:this.checked  //是否投票
      }
      let checkLock=false;
      let checkTrue=false;
      let votesDtoList=[];
      if(this.checked){ //如果投票
        this.voetArray.forEach(element => {
          if(element.voteMessage.length>60){
            checkLock=true;
          }else if(!element.voteMessage){
            checkTrue=true;
          }else{
            votesDtoList.push({
              realName:element.lock==true?1:0,
              voteContent:element.voteMessage
            })
          }
        });
      }
      if(checkLock){
        Toast("表决内容不得超过60个字符~~");
        return;
      }
      if(checkTrue){
        Toast("请填写表决内容或删除~~");
        return;
      }
      this.$store.dispatch("stepThreeConList", meetingCon); // 内容概要  主要内容
      this.$store.dispatch("stepVotesDtoList", votesDtoList);//投票结果 

      this.$router.push({ 
        path: "/step4",
        query:{
          goBack:4
        }
        });
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
  /* background: #fff; */
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
.f_abb .van-switch--on {
  background-color: #4a90e2;
}
.f_icon{
  width: 30px;
  height: 30px;
  position: absolute;
  top: 12px;
  right:8px;
  background: #ec483f;
  border-radius: 50%;
}
.f_icon::before{
    content: "";
    width: 61%;
    height: 2px;
    position: absolute;
    top: 45%;
    left: 20%;
    background: white;
}
</style>