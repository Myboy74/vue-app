<template>
        <div class="step1-content">
            <van-steps :active="active" active-color="#e50d02">
                <van-step>基本信息</van-step>
                <van-step>参会人员</van-step>
                <van-step>内容投票</van-step>
                <van-step>影像资料</van-step>
            </van-steps>
            <van-cell-group>
                <van-field
                    v-model="stepTitle" @change="titleText"
                    label="标题"
                    placeholder="应控制在10-50字之间"
                />
                <van-field
                    v-model="classify"
                    label="分类"
                    icon="arrow"
                    placeholder="请选择组织生活分类"
                    @click="openClassify"
                    @focus="inputNone"
                />
                <van-field
                    :value="speaker"
                    label="主持人"
                />
                <van-field
                    :value="recorder"
                    label="记录人"
                />
                <van-field
                    v-model="stepAdress"
                    label="地点"
                    placeholder="请填写活动地址"
                />
                <van-field
                    v-model="startTime"
                    label="开始时间"
                    placeholder="请填写开始时间"
                    @click="showStartWin"
                    @focus="inputNone"
                />
                <van-field
                    v-model="endTime"
                    label="结束时间"
                    placeholder="请填写结束时间"
                    @click="showEndWin"
                    @focus="inputNone"
                />
            </van-cell-group>
            <van-popup v-model="showClassify" position="bottom" :overlay="true">
                  <van-checkbox-group v-model="result" @change="toggle">
                    <div style=" text-align: right;padding: 10px; color:#38f;" @click="showClassify = false">确认</div>
                    <van-cell-group>
                        <van-cell
                        v-for="(item,index) in list"
                        clickable
                        :key="index"
                        :title="`${item.name}`">
                        <van-checkbox :name="item.name" ref="checkboxes" />
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-popup>
            <van-popup position="bottom" v-model="showStartTime" :overlay="true">
                <van-datetime-picker
                v-model="startCurrentDate"
                type="date"
                :formatter="formatter"
                @confirm="confirmStart"
                @cancel="cancelStart"
                />
            </van-popup>
            <van-popup  position="bottom" v-model="showEndTime" :overlay="true">
                <van-datetime-picker
                v-model="endCurrentDate"
                type="date"
                :formatter="formatter"
                @confirm="confirmEnd"
                @cancel="cancelEnd"
                />
            </van-popup>
            <div class="btn-content">
                <van-button type="danger"
                 style="margin: 0 auto; width:100%;
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
    // console.log(this.orgCode);
    this.zuzhiType(this.orgCode);
     if(this.goBack){
        let type=this.$store.state.stepOneType;//分类
        let peoArr=this.$store.state.stepOneCon//其他信息
        this.classify="";
        type.forEach(item=>{
           this.classify += item.classificationName + ",";
        })
        this.stepTitle=peoArr.meetingName;  //标题
        this.speaker =peoArr.speaker;//主持人
        this.recorder=peoArr.recorder;//	记录人
        this.stepAdress=peoArr.meetingAddress;//	会议地点
        this.startTime = peoArr.startTime;
        this.endTime= peoArr.endTime;
     }
  },
  data() {
    return {
      goBack:this.$route.query.goBack,
      orgCode:this.$store.state.form.orgCode,
      active: 0,
      stepTitle: "",
      list: [],//分类一共有哪些
      result: [], //分类 监听
      classify: "", //分类
      showClassify: false, //是否弹出分类弹窗
      stepAdress: "", //活动地址
      startTime: "", //开始时间
      startCurrentDate: new Date(), //开始时间控件
      startMinDate: new Date(), //开始时间最小日期
      showStartTime: false, //是否显示开始时间弹窗
      endTime: "", //结束时间
      endCurrentDate: new Date(), //结束时间控件
      endMinDate: new Date(), //结束时间最小日期
      showEndTime: false, //是否显示开始时间弹窗
      speaker:sessionStorage.getItem("userName"),//支持人
      recorder:sessionStorage.getItem("userName"),//记录人
      };
  },
  methods: {
       toggle(index) {  //分类显示得内容里面的方法
        // console.log(index);
        this.classify="";
        index.forEach(element => {
          this.classify += element + ",";
        });
        let obj = []; 
        for(var i=0;i<index.length;i++){
            for(var j=0; j<this.list.length; j++){
              if(index[i]==this.list[j].name){
                obj.push({
                  orgId:this.list[j].orgid,
                  classificationName:this.list[j].name,
                  classificationId:this.list[j].classid
                })
              }
            }
          }
          this.$store.dispatch("stepFirst", obj);
          // console.log(obj);
    },
    openClassify() {
      //显示分类弹窗方法
      this.showClassify = true;
    },
    showStartWin() {
      //显示开始时间弹窗方法
      this.showStartTime = true;
    },
    overTime(val){ //格式化时间
      var year = val.getFullYear(); 
      var month = val.getMonth() + 1; 
      var day = val.getDate(); 
      var hour = val.getHours(); 
      var minute = val.getMinutes(); 
      var second = val.getSeconds(); 
      // return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)+" "+this.formatTen(hour)+":"+this.formatTen(minute)+":"+this.formatTen(second);
      return year + "-" + this.formatTen(month) + "-" + this.formatTen(day);
    },
    confirmStart(val) {
      //开始时间 确定键
      // console.log(val);
      this.showStartTime = false;
      this.startTime= this.overTime(val);
      // console.log( this.startTime);
    },
    cancelStart() {
      //开始时间 取消键
      this.showStartTime = false;
    },
    showEndWin() {
      //结束时间 显示开始时间弹窗方法
      this.showEndTime = true;
    },
    confirmEnd(val) {
      //结束时间确定键
    this.showEndTime = false; 
    this.endTime= this.overTime(val);
    },
    formatTen(num) { 
        return num > 9 ? (num + "") : ("0" + num); 
    },
    cancelEnd() {
      //结束时间 取消键
      this.showEndTime = false;
    },
    nextStep() {
      //下一步
       //判断结束时间是否大于开始时间
    let start=new Date(this.startTime);
    let end=new Date(this.endTime);
    start = start.getTime();
    end = end.getTime();
    // console.log(start,end);  
    let obj={
      meetingName:"",//标题
      speaker:this.speaker,//主持人
      recorder:this.recorder,//	记录人
      meetingAddress:this.stepAdress,//	会议地点
      startTime:"",//开始时间
      endTime:"",//结束时间
    }
    if(this.stepTitle.length>15){
       Toast('标题请控制在10-15字~');
       return;
    }else{
      obj.meetingName=this.stepTitle;//标题
    }  
    if(start>end){
      Toast('结束时间不能小于开始时间~ ~ ~');
      return;
      // alert("结束时间不能小于开始时间")
    } else {
        obj.startTime=this.startTime;
        obj.endTime=this.endTime;
    }
      // console.log(obj);
      this.$store.dispatch("stepFirstCon",obj); //保存信息
      this.$router.push({
         path: "/step2",
         query:{
           goBack:3
         }
          });
    },
    inputNone() {
      //禁止输入框弹出默认键盘
      document.activeElement.blur();
    },
    formatter(type, value) {  //日期格式化公共方法
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      }
      return value;
    },
    zuzhiType(id){
      let obj={
        orgCode:id
      }
      // console.log(obj);
      let date = qs.stringify(obj); 
      postAjax("meetingClassInfication/getMeetingClassificationList", date).then(res => { 
          // console.log(res.data.data);
          let num =res.data.data;
          if(num){
             num.forEach(item=>{
            this.list.push({
              orgid:item.orgId,
              name:item.classificationName,
              classid:item.classificationId
            })
          })
          }
         
          
      })

    },
    titleText(val){  //标题验证
      // console.log(val.target.value);
      if(val.target.value.length>15){
         Toast('标题请控制在10-15字~');
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
  background-color: #fff;
  margin: 20px auto 0px;
  width: 38%;

}
</style>

