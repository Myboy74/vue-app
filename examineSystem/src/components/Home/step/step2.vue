<template>
        <div class="step1-content step2">
            <van-steps :active="active" active-color="#e50d02">
                <van-step>基本信息</van-step>
                <van-step>参会人员</van-step>
                <van-step>会议内容</van-step>
                <van-step>影像资料</van-step>
            </van-steps>
            <van-cell-group>
                <van-field
                    v-model="joinParty"
                    label="应参加党员"
                    icon="arrow" 
                    required
                    class="f_canjia"
                    placeholder="请选择应参加党员"
                    @click="openJoinList"
                    @focus="inputNone"
                />
                <van-field
                v-if="timeLock"
                    v-model="defaultParty"
                    label="缺席党员"
                    icon="arrow"
                    class="f_canjia"
                    placeholder="请选择缺席党员"
                    @click="openDefaultList"
                    @focus="inputNone"
                />
                <van-field
                    v-model="shouldCount"
                    label="应到人数"
                    required
                    type="number"
                    placeholder="0"
                />
                <van-field
                 v-if="timeLock"
                    v-model="infactCount"
                    label="实到人数"
                    type="number"
                    placeholder="0"
                />
                <van-field
                    v-if="timeLock"
                    v-model="absentNum"
                    label="缺席人数"
                    placeholder="0"
                />
            </van-cell-group>
            <!-- 实到人数列表弹窗 -->
            <van-popup  v-model="showRadioList" position="bottom" :overlay="true">
                <van-checkbox-group v-model="partyResult"  @change="togglePeople">
                   <div style=" text-align: right;padding: 10px; color:#38f;" @click="showRadioList = false">确认</div>
                  <div class="allRadio">
                    <van-radio-group v-model="radio">
                        <van-radio name="1" @click="radioClick">全选/全不选</van-radio>
                      </van-radio-group>
                       </div>
                    <van-cell-group>
                        <van-cell
                        v-for="(item,index) in partyList"
                        clickable
                        :key="index"
                        :id="`${item.personnelId}`"
                        :title="`${item.personnelName}`"
                         @click="toggle(index)"
                        >
                          <van-checkbox :name="item.personnelId" ref="checkboxesc"></van-checkbox>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-popup>
            <!-- 缺席人数列表弹窗 -->
            <van-popup v-if="timeLock" v-model="showDefaultList" position="bottom" :overlay="true">
                <van-checkbox-group v-model="defaultPartyResult"  @change="defaultToggle">
                  <div style=" text-align: right;padding: 10px; color:#38f;" @click="showDefaultList = false">确 认</div>
                     <div class="allRadio">
                    <van-radio-group v-model="defaultRadio">
                        <van-radio name="2" @click="defaultRadioClick">全选/全不选</van-radio>
                      </van-radio-group>
                    </div>
                    <van-cell-group>
                        <!-- <van-cell title="全选/全不选"> <van-checkbox name="全选/全不选" ref="checkboxese" /></van-cell> -->
                        <van-cell
                        v-for="(item,index) in defaultPartyList"
                        clickable
                        :key="index"
                        :id="`${item.personnelId}`"
                        :title="`${item.personnelName}`"
                        @click="toggleTwo(index)"
                        >
                          <van-checkbox :name="item.personnelId" ref="checkboxes"> <span style="display:none">{{item.personnelName}}</span> </van-checkbox>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-popup>
            <div class="btn-content">
                <van-button type="primary" 
                style="margin: 0 auto; width:40%;
                  border-radius:5px; 
                  background-color: #1e8ceb;
                  border: 1px solid #1e8ceb;" @click="Prev">上一步</van-button>
                <van-button type="danger" 
                style="margin: 0 auto;  width:40%;
                  border-radius:5px;
                  background-color: #e60000;
                  border: 1px solid #e60000;
                 " @click="nextStep">下一步</van-button>
            </div>
        </div>
</template>

<script>
import { Toast } from "vant";
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
import { ButtonGroup } from 'element-ui';
export default {
  data() {
    return {
      goBack: this.$route.query.goBack,
      orgId: sessionStorage.getItem("orgId"), //单位orgId
      active: 1,
      timeLock:true,//判断创建得结束时间决定是否显示缺席党员及缺席人数
      radio: "2", //应参加党员  全选/全不选
      defaultRadio: "1", //应参加党员  全选/全不选
      radioBtn:false, //应参加党员  全选/全不选
      defaultRadioBtn: false, //应参加党员  全选/全不选
      showRadioList: false, //是否弹出人名列表弹窗
      showDefaultList: false, //是否弹出缺席列表弹窗
      shouldCount: "", //应到人数
      infactCount: "", //实到人数
      absentNum: "", //缺席人数
      partyRadio: "", //党员选择列表
      joinParty: "", //应参加党员  显示得名字
      defaultParty: "", //缺席党员 显示得名字
      Peoradio:[],//回显参加人员使用
      partyList: [], //实到人员列表
      defaultPartyList: [], //缺席人数列表
      partyResult: [], //实到已选择人名  选择框
      defaultPartyResult: [], //缺席已选择人名  选择框
      objRadio:{
        one:false,
        two:false
      }
    };
  },
  created() {
      let timeOver=this.$store.state.stepOneCon.endTime; //1页得结束时间
  
       
       timeOver = timeOver.split(/[- : \/]/),
        timeOver = new Date(timeOver[0], timeOver[1]-1, timeOver[2], timeOver[3], timeOver[4], timeOver[5]);
      // console.log(timeOver);
      var date=new Date();
      // console.log(date);
      if(timeOver>date){
        //如果创建得结束时间大于现在的时间,
        //不显示缺席党员及缺席人数
        this.timeLock=false;
      }
    this.autoPeople(this.orgId);
  
    if (this.goBack) {
      let peoSum = this.$store.state.stepTwo1; //应参加党员 缺席党员 信息
      let peoCount = this.$store.state.stepTwoNum; //具体人数
      let stepAll=this.$store.state.stepTwoAll;//参加单元 缺席党员是否全选
      // radio: false, //应参加党员  全选/全不选
      // defaultRadio: false, //应参加党员  全选/全不选
    if(stepAll.one=="1"){ 
        this.radio='1';
        // console.log(this.radio)
      }else{
        this.radio="2";
      }
      if(stepAll.two=="2"){
        this.defaultRadio='2';
      }else{
        this.defaultRadio="1";
      }
      
      this.joinParty = "";
      this.defaultParty = "";
      peoSum.forEach(item => {
        if (item.personnelType == 1) {
           this.partyResult.push(item.personnelId);
          this.joinParty += item.interName + ",";
        }
      });
      peoSum.forEach(item => {
        if (item.personnelType == 2) {
         this.defaultPartyResult.push(item.personnelId); 
          this.defaultParty += item.interName + ",";
        }
      });
      this.shouldCount = peoCount.meetingNum; //应到人数
      this.infactCount = peoCount.actualNum; //实到人数
      this.absentNum = peoCount.absentNum; //缺席人数
    }
  

  },

  methods: {
    autoPeople(id) {
      //党员列表
      let obj = {
        orgId: id
      };
      // console.log(obj);
      let date = qs.stringify(obj);
      postAjax("org/queryUserAllByOrgId", date).then(res => {
        // console.log(res.data.data);
        let sum = res.data.data;
        sum.forEach(item => {
          this.partyList.push({
            personnelHash: item.hash, //--党员hash
            name:item.userId,  //保存名称
            personnelName: item.param1, //   //--党员名称
            personnelId: item.userId, //--党员id
            interName: item.interName //	--互联网名称
          });
          this.defaultPartyList.push({
            personnelHash: item.hash, //--党员hash
            name:item.userId,  //保存名称
            personnelName: item.param1, //   //--党员名称
            personnelId: item.userId, //--党员id
            interName: item.interName //	--互联网名称
          }) 
        });
        // console.log(this.partyList)
        //  console.log(this.defaultPartyList)
      });
    },
    openJoinList() {
      //显示应参加党员列表的弹窗方法
      this.showRadioList = true;
      //   this.joinParty = this.partyResult; //赋值
    },
    openDefaultList() {
      //显示应到到人数列表的弹窗方法
      this.showDefaultList = true;
      //   this.defaultParty = this.partyResult; //赋值
    },

    radioClick() {
      //因参加党员  全选/全不选
      //应参加党员  全选/全不选
      this.radioBtn = !this.radioBtn;
      if (this.radioBtn) {
        this.radio="1";
        this.objRadio.one="1";
        this.partyList.forEach((item, index) => {
          this.partyResult.push(item.personnelId);
          this.joinParty += item.interName + ",";
        });
        // this.showRadioList = false;
      } else {
        this.radio="2";
        this.objRadio.one="2";
        this.joinParty = "";
        this.partyResult=[];
      }
    },
    defaultRadioClick() {
      //缺席党员  全选/全不选
        //   radioBtn:false, //应参加党员  全选/全不选
      // defaultRadioBtn:
      this.defaultRadioBtn = !this.defaultRadioBtn;
      if (this.defaultRadioBtn) {
        this.defaultRadio= "2"; 
         this.objRadio.two="2";
        this.defaultPartyList.forEach((item, index) => {
          this.defaultPartyResult.push(item.personnelId);
          this.defaultParty += item.interName + ",";
        });
        // this.showDefaultList = false;
      } else {
         this.defaultRadio= "1"; 
         this.objRadio.two="1";
        this.defaultParty = "";
        this.defaultPartyResult=[];
      }
    },
    Prev() {
      //上一步
      sessionStorage.setItem("fileNowJson",true);
      this.$router.push({
        path: "/step1",
        query: {
          goBack: 2
        }
      });
    },

    inputNone() {
      //禁止输入框弹出默认键盘
      document.activeElement.blur();
    },
    toggle(index) {  //让参加党员可以点击列表就选中,不必非得点到复选框上
      this.$refs.checkboxesc[index].toggle(); 
    },
     toggleTwo(index) {  //让参加党员可以点击列表就选中,不必非得点到复选框上
      this.$refs.checkboxes[index].toggle();
    },
    togglePeople(index) {
      //实到checkbox复选框选择方法
      // this.
      this.joinParty = "";
      this.partyResult=index;
      let list=this.partyList;
      for(let i=0; i<list.length;i++){
        for(let j=0; j<index.length; j++){
          if(index[j]==list[i].personnelId){
            this.joinParty+= list[i].interName + ",";
          }
        }
       
      }
    },
    defaultToggle(index) {
      //缺席checkbox复选框选择方法
      this.defaultParty = "";
      this.defaultPartyResult=index;
      let list=this.defaultPartyList;
      for(let i=0; i<list.length;i++){
        for(let j=0; j<index.length; j++){
          if(index[j]==list[i].personnelId){
            this.defaultParty+=list[i].interName + ",";
          }
        }
      }
    },
     nextStep() {
      //下一步
      if (!this.joinParty) {
        Toast("请添加应参加党员");
        return;
      }
      if (!this.shouldCount) {
        Toast("请添加写应到人数");
        return;
      }
      let peopleType=this.personn2(this.partyResult,this.partyList,1);//参加党员
      let peoType= this.personn2(this.defaultPartyResult,this.defaultPartyList,2);//缺席党员
      

      let count = peopleType.concat(peoType);
  
      let stepTwoPeople = {
        meetingNum: this.shouldCount, //	应到人数
        actualNum: this.infactCount, //实到人数
        absentNum: this.absentNum //缺席人数
      };
      this.$store.dispatch("stepTwoAllover", this.objRadio); // 1: 参加党员 2:缺席党员
     
      this.$store.dispatch("stepTwoPerson1", count); // 1: 参加党员 2:缺席党员
      
      this.$store.dispatch("stepTwoParty", stepTwoPeople); //应到人数  实到人数  缺席人数
 
      // console.log(count);
      // console.log(this.$store.state.stepTwo1);
      // return;
      this.$router.push({
        path: "/step3",
        query: {
          goBack: 4
        }
      });
    },
    personn2(obj,arr,type) {
      //封装的所选参加党员和缺席党员的信息
      let b = obj;
      let list=arr;
      let person2 = []; //2:缺席党员
      for(let i=0;i<list.length; i++){
        for(let j=0;j<b.length; j++){
          if(list[i].personnelId == b[j]){
              person2.push({
                personnelHash:list[i].personnelHash, //--党员hash
                personnelName: list[i].name, //   //--党员名称
                personnelId: list[i].personnelId, //--党员id
                interName: list[i].interName, //	--互联网名称
                personnelType: type
            });
          }
        }
      }
      return person2;
    }
  },
  watch: {
    shouldCount(newVal, oldVal) {
      // console.log(newVal, oldVal);
      let num = newVal - this.infactCount;
      if (newVal && this.infactCount) {
        if (num >= 0) {
          this.absentNum = num; //应到人数-实到人数=缺席人数
        } else {
          this.absentNum = 0;
        }
      }
    },
    infactCount(newVal, oldVal) {
      // console.log(newVal, oldVal);
      let num = this.shouldCount - newVal;
      if (this.shouldCount && newVal) {
        if (num >= 0) {
          this.absentNum = num; //应到人数-实到人数=缺席人数
        } else {
          this.absentNum = 0;
        }
      }
    },
     
  }
};
</script>

<style scoped>
.step1-content {
  width: 100%;
  height: 100%;
}
.btn-content {
  margin: 20px auto 0px;
  width: 80%;
  text-align: center;
}
.allRadio {
  text-align: center;
  padding: 15px 0;
}
</style>