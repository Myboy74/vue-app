import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
Vue.use(Router);

// const routers=new Router({
    export default new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: 'home',
        // },
        // {
            
        //     path: '/',
        //     component: resolve => require(['../components/common/loadding.vue'], resolve)
        // },
        //  {
        //     path: '/',
        //     component: resolve => require(['../components/page/Login.vue'], resolve)
        // },
        // {
            
        //     path: '/',
        //     component: resolve => require(['../components/common/loadding.vue'], resolve)
        // },
        // {
            
        //     path: '/logout',
        //     component: resolve => require(['../components/common/logout.vue'], resolve)
        // },
        {
            path: '/',
            // redirect:'welcome',
            name:'home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path:'/',  //自动考评
                    // name:'',
                    component: resolve => require(['../components/page/automatic/automatic.vue'], resolve),
                    children:[
                        {
                            path:'/',  //自动考评 党组织表格
                            name:'organization',
                            component: resolve => require(['../components/page/automatic/automaticTable/organization.vue'], resolve)                    
                        },
                        {
                            path:'/organization1',  //自动考评 党组织表格
                            name:'organization1',
                            component: resolve => require(['../components/page/automatic/automaticTable/organization1.vue'], resolve)                    
                        },
                        {
                            path:'/organization2',  //自动考评 党组织表格
                            name:'organization2',
                            component: resolve => require(['../components/page/automatic/automaticTable/organization2.vue'], resolve)                    
                        },
                        {
                            path:'/organization3',  //自动考评 党组织表格
                            name:'organization3',
                            component: resolve => require(['../components/page/automatic/automaticTable/organization3.vue'], resolve)                    
                        },
                       
                    ]  
               
                },
                // {
                //     path:'automatic',  //自动考评
                //     name:'automatic',
                //     component: resolve => require(['../components/page/automatic/automatic.vue'], resolve)                    
               
                // },
                {
                    path: '/supervision',  //督查评价
                    name:'supervision',
                    component: resolve => require(['../components/page/automatic/supervision.vue'], resolve)
               
                },
                {
                    path: '/supervisionEvaluate',  //督查评价 --详情
                    name:'supervisionEvaluate',
                    component: resolve => require(['../components/page/automatic/supervisionChild/supervisionEvaluate.vue'], resolve)
               
                },



                {
                    path: '/cityStraight',  //市直
                    name:'cityStraight',
                    component: resolve => require(['../components/page/addressList/cityStraight.vue'], resolve)
               
                },

                {
                    path: '/unitManager',  //市直
                    name:'unitManager',
                    component: resolve => require(['../components/page/addressList/unitManager.vue'], resolve)
               
                },
            ]
            
        },
        // {
        //     path: '/home',
        //     component: resolve => require(['../components/common/Home.vue'], resolve)
        // },
    ]
})
// window.location.href=res.data.url
// import { postAjax, getAjax, uploadImg } from "../api/api.js";
// // 全局路由守卫
// routers.beforeEach(function (to, from, next) {  
//     const nextRoute = [ 'welcome', 'allAssign', 'taskManage','newTask', 'taskInfo','taskInfo1', 'taskInfo2','taskInfo3', 'taskInfo4','taskInfo5', 'taskInfo6','editTask', 'planAudit','eidtPlan', 'progressAudit','alltask', 'progressAuditInfo','palnAuditInfo', 'planList','progress', 'progressInfo','planAdd', 'week','addweek', 'month','addmonth', 'weekAuditor','monthAuditor', 'weekly','report', 'weekAll','reportAll', 'weekSee','reportSee', 'desksetting','typeList', 'userSetting','childList', 'addDesk','userAdd', 'roseSetting','addRose', 'authoritySetting','addAuthority'];   
//     if (nextRoute.indexOf(to.name) >= 0) {  
//     getAjax("user/userInfo").then(res => {
//         if(res.data.code==401){
//             window.location.href=res.data.data
//             sessionStorage.setItem('uid',JSON.stringify(res.data.data))
//         }         
//           })
//     }  
//     //已登录的情况再去登录页，跳转至首页  
//     if (sessionStorage.getItem('uid')) {  
//         next(); 
//     }  
//     next();  
// });  
// export default routers;
                                