<template>
        <div class="step1-content step2">
            <van-steps :active="active" active-color="#e50d02">
                <van-step>基本信息</van-step>
                <van-step>参会人员</van-step>
                <van-step>内容投票</van-step>
                <van-step>影像资料</van-step>
            </van-steps>
            <van-cell-group>
                <van-field
                    v-model="joinParty"
                    label="应参加党员"
                    icon="arrow" 
                    class="f_canjia"
                    placeholder="请选择应参加党员"
                    @click="openJoinList"
                    @focus="inputNone"
                />
                <van-field
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
                    type="number"
                    placeholder="0"
                />
                <van-field
                    v-model="infactCount"
                    label="实到人数"
                    type="number"
                    placeholder="0"
                />
                <van-field
                    v-model="absentNum"
                    label="缺席人数"
                    placeholder="0"
                />
            </van-cell-group>
            <!-- 实到人数列表弹窗 -->
            <van-popup v-model="showRadioList" position="bottom" :overlay="true">
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
                        :title="`${item.personnelName}`"
                        >
                          <van-checkbox :name="item.personnelName"  ref="checkboxesc"/>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </van-popup>
            <!-- 缺席人数列表弹窗 -->
            <van-popup v-model="showDefaultList" position="bottom" :overlay="true">
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
                        :title="`${item.personnelName}`"
                        >
                          <van-checkbox :name="item.personnelName" ref="checkboxes" />
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
import { Toast } from 'vant';
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  created(){
    this.autoPeople(this.orgId);
        if(this.goBack){
            let peoSum=this.$store.state.stepTwo1;//应参加党员 缺席党员 信息
            // console.log(peoSum);
            let peoCount=this.$store.state.stepTwoNum;//具体人数
            this.joinParty=""; this.defaultParty="";
            peoSum.forEach(item=>{
              if(item.personnelType==1){
                this.joinParty+=item.personnelName+",";
              }else if(item.personnelType==2){
                this.defaultParty+=item.personnelName+",";
              }
            })
            this.shouldCount= peoCount.meetingNum; //应到人数
            this.infactCount= peoCount.actualNum;//实到人数
            this.absentNum= peoCount.absentNum;//缺席人数
        }
  },
  data() {
    return {
        goBack:this.$route.query.goBack,
        orgId:sessionStorage.getItem("orgId"),//单位orgId
        active: 1,
        joinParty: "", //应参加党员
        radio: false, //应参加党员  全选/全不选
        defaultRadio: false, //应参加党员  全选/全不选
        defaultParty: "", //缺席党员
        showRadioList: false, //是否弹出人名列表弹窗
        showDefaultList: false, //是否弹出缺席列表弹窗
        shouldCount: "", //应到人数
        infactCount: "", //实到人数
        absentNum: "", //缺席人数
        partyRadio: "", //党员选择列表
        partyName: "", //党员列表姓名
        partyList: [ ], //实到人员列表
        defaultPartyList: [ ], //缺席人数列表
        partyResult: [], //实到已选择人名
        defaultPartyResult: [] //缺席已选择人名
    };
},
  methods: {
    autoPeople(id){//党员列表
       let obj={
        orgId:"7e23ddae-3efc-4b72-852d-14cee35e1b92"
      }
      // console.log(obj);
      let date = qs.stringify(obj); 
      postAjax("org/queryUserAllByOrgId", date).then(res => {
        // console.log(res.data.data);
        let sum=res.data.data;
        sum.forEach(item =>{
           this.partyList.push({
              personnelHash:item.hash,//--党员hash
              personnelName:item.param1,//   //--党员名称
              personnelId:item.userId,//--党员id
              interName:item.interName//	--互联网名称
           });
           this.defaultPartyList=this.partyList;
        })
       
     
      })
       
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
       this.radio = !this.radio;
      if(this.radio){
        this.partyList.forEach((item,index)=>{
           this.joinParty+=item.personnelName+",";
        })
        this.showRadioList = false
        // for(let i=0; i<this.partyList.length; i++){
        //   this.$refs.checkboxesPeo[i].checked=true;
        // }
        // this.$refs.checkboxesPeo.map(x => {
        //   x.checked = true
        // })
      }else{
        this.joinParty="";
      } 
    },
    defaultRadioClick(){
       //缺席党员  全选/全不选
       this.defaultRadio = !this.defaultRadio;
      if(this.defaultRadio){
        this.defaultPartyList.forEach((item,index)=>{
           this.defaultParty+=item.personnelName+",";
        })
        this.showDefaultList = false
      }else{
        this.defaultParty="";
      } 
    },
    Prev() {
      //上一步
        this.$router.push({ 
          path: "/step1" ,
          query:{
             goBack:2
          }
        });
    },
    nextStep() {
      //下一步
      if(!this.joinParty){
         Toast('请添加应参加党员');
         return;
      }
      if(!this.shouldCount){
          Toast('请添加写应到人数');
         return;
      }
      let a=this.joinParty.split(",");
      let b=this.defaultParty.split(",");
      let personnelTyp1=[]; //1: 参加党员   //2:缺席党员
      this.partyList.forEach((item,index) =>{
        if(item.personnelName==a[index]){
          personnelTyp1.push({
              personnelHash:item.personnelHash,//--党员hash
              personnelName:item.personnelName,//   //--党员名称
              personnelId:item.personnelId,//--党员id
              interName:item.interName,//	--互联网名称
              personnelType:1
          })
        }
      });
      this.defaultPartyList.forEach((item,index) =>{
        if(item.personnelName==b[index]){
          personnelTyp1.push({
            personnelHash:item.personnelHash,//--党员hash
            personnelName:item.personnelName,//   //--党员名称
            personnelId:item.personnelId,//--党员id
            interName:item.interName,//	--互联网名称
            personnelType:2
          })
        }
      });
     let stepTwoPeople={
      meetingNum:this.shouldCount,//	应到人数
      actualNum:this.infactCount,	//实到人数
      absentNum:this.absentNum,//缺席人数
     }
    this.$store.dispatch("stepTwoPerson1", personnelTyp1); // 1: 参加党员 2:缺席党员
    this.$store.dispatch("stepTwoParty", stepTwoPeople);//应到人数  实到人数  缺席人数
    this.$router.push({ 
        path: "/step3",
        query:{
            goBack:4
        }
         });
    },
    inputNone() {
      //禁止输入框弹出默认键盘
      document.activeElement.blur();
    },
    togglePeople(index) {
      //实到checkbox复选框选择方法
      //   this.$refs.checkboxes[index].toggle();
      this.joinParty = "";
      index.forEach(element => {
        this.joinParty += element + ",";
      });
    },
    defaultToggle(index) {
      //缺席checkbox复选框选择方法
      this.defaultParty = "";
      //   this.$refs.checkboxes[index].toggle();
      index.forEach(element => {
        this.defaultParty += element + ",";
      });
    },
  },
  watch: {
    shouldCount(newVal, oldVal) {
      // console.log(newVal, oldVal);
      let num = newVal - this.infactCount;
      if (newVal && this.infactCount) {
        if (num >= 0) {
          this.absentNum = num; //应到人数-实到人数=缺席人数 
        }else{
           this.absentNum =0;
        }
      }
    },
    infactCount(newVal, oldVal) {
      // console.log(newVal, oldVal);
     let num = this.shouldCount - newVal;
      if (this.shouldCount && newVal) {
        if (num >= 0) {
          this.absentNum = num; //应到人数-实到人数=缺席人数 
        }else{
           this.absentNum =0;
        }
      }
    }
  
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