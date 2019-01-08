import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';

import Vuex from "vuex";
import echarts from 'echarts';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  

Vue.use(require('vue-wechat-title'));
import {Toast} from 'vant';
Vue.use(Vant);


// import "babel-polyfill";
window.eventBus = new Vue();
Vue.prototype.$echarts = echarts;
axios.defaults.withCredentials = true; //让ajax携带cookie
Vue.use(ElementUI);
Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        form: {//自动考评跳转督查评价使用
            branchId:"", //所属党组织
            orgCode:"",//组织编码
            classificationId:1,//考评项目
            meetingName:"",//会议标题
            pageNum:0,//分页 第几页
            pageSize:30,//默认每页30条
        },
        stepOneType:[
        // {   //1页得分类
        //     orgId:"",
        //     classificationName:"",
        //     classificationId:""
        // }
    ],
        stepOneCon:{  //1页得其他信息
            meetingName:"",//标题
            speaker:"",//主持人
            recorder:"",//	记录人
            meetingAddress:"",//	会议地点
            startTime:"",//开始时间
            endTime:"",//结束时间
        },
        stepTwo1:[
        //     {  //2页 应参加党员 缺席党员   信息
        //     personnelHash:"",//--党员hash
        //     personnelName:"",//   //--党员名称
        //     personnelId:"",//--党员id
        //     interName:""//	--互联网名称
            // personnelType:1||2  //1.参加  2.缺席  党员
        // }
    ],
        stepTwoAll:{one:"2",two:"1"}, //应参加党员  缺席党员 是否全选
        stepTwoNum:{ //2页 具体人数
            meetingNum:"",//	应到人数
            actualNum:"",	//实到人数
            absentNum:""//缺席人数
        },
        stepThreeCon:{   //3页 内容概要  主要内容
            meetingLog:"",//内容概要
            meetingContent:"",//主要内容
            lock:false,//是否投票
        },
        votesDto:[
            // {
            // realName:1||0,
            // voteContent:""
            // }
        ] ,  //3页 投票结果
        fileMp:[],//视频
        fileimg:[
            // attachmentAddr:"", //附件地址
            // attachmentRelName: "" //文件名称
        ],//图片
        modifyFile:{}//修改放置无用的信息,但必须带过去
    },
    mutations:{
        increment(state,price){
            state.form=price;
        },
        onClass(state,price){ //组织生活列表
            state.form.classificationId=price;
        },
        stepOneType(state,price){ //1页得分类
            state.stepOneType=price;
        },
        stepOneTxt(state,price){//1页得其他信息
            state.stepOneCon=price;
        },
        stepTwoType1(state,price){  // 2页 应参加党员 信息
            state.stepTwo1=price;
        },
        stepTwoPeople(state,price){ //2页 具体人数 信息
            state.stepTwoNum=price;
        },
        stepThreeTxt(state,price){ //3页 内容概要  主要内容
            state.stepThreeCon=price;
        },
        stepVotes(state,price){ //3页 投票结果
            state.votesDto=price;
        },
        fileVideo(state,price){ //
            state.fileMp=price;
        },//视频
        filePicture(state,price){ //图片
            state.fileimg=price;
        },
        fileNone(state,price){ //修改放置无用的信息,但必须带过去
            state.modifyFile=price;
        },
        stepTwoAlls(state,price){ //修改内容得状态
            state.stepTwoAll=price;
        }
        
     },
    actions:{
        increase(context,price){
            context.commit("increment",price);
        },
        backClass(context,price){ //组织生活列表
            context.commit("onClass",price);
        },
        stepFirst(context,price){//1页得分类
            context.commit("stepOneType",price);
        },
        stepFirstCon(context,price){//1页得其他信息
            context.commit("stepOneTxt",price);
        },
        stepTwoPerson1(context,price){ //// 2页 应参加党员 信息
            context.commit("stepTwoType1",price);
        },
        stepTwoParty(context,price){ // 2页  具体人数 信息
            context.commit("stepTwoPeople",price);
        },
        stepTwoAllover(context,price){   //应参加党员 缺席是否全选,
            context.commit("stepTwoAlls",price);
        },
        stepThreeConList(context,price){ //3页 内容概要  主要内容
            context.commit("stepThreeTxt",price);
        },
        stepVotesDtoList(context,price){ //3页 投票结果
            context.commit("stepVotes",price);
        },
        Vdeo(context,price){ 
            context.commit("fileVideo",price);
        },
        Imags(context,price){ 
            context.commit("filePicture",price);
        }, 
        noneJson(context,price){   //放置无用的信息必须带过去 修改得信息,
            context.commit("fileNone",price);
        },
      
        
    }
})






Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');



