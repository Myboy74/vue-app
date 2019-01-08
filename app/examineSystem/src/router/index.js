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
       
        {
            path: '/',
            // redirect:'welcome',
            // name:'home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/login',
                    meta: {
                        title:'灯塔党建在线-E支部助手'
                    },
                    component: resolve => require(['../components/page/Login.vue'], resolve)
                },
                {
                    path:'/',  //首页
                    name:'index',
                    meta: {
                        title:'灯塔党建在线-"两学一做"管理'
                    },
                    component: resolve => require(['../components/Home/index.vue'], resolve),
               
                },
                {
                    path:'/step1',  //创建组织生活步骤1
                    name:"step1",
                    meta: {
                        title:'创建组织生活'
                    },
                    component: resolve => require(['../components/Home/step/step1.vue'], resolve),
               
                },
                {
                    path:'/step2',  //创建组织生活步骤2
                    name:"step2",
                    meta: {
                        title:'创建组织生活'
                    },
                    component: resolve => require(['../components/Home/step/step2.vue'], resolve),
               
                },
                {
                    path:'/step3',  //创建组织生活步骤3
                    name:"step3",
                    meta: {
                        title:'创建组织生活'
                    },
                    component: resolve => require(['../components/Home/step/step3.vue'], resolve),
               
                },
                {
                    path:'/step4',  //创建组织生活步骤4
                    name:"step4",
                    meta: {
                        title:'创建组织生活'
                    },
                    component: resolve => require(['../components/Home/step/step4.vue'], resolve),
               
                },
                {
                    path:'/search',  //首页点击搜索进入搜索页
                    meta: {
                        title:'搜索'
                    },
                    name:"search",
                    component: resolve => require(['../components/Home/step/search.vue'], resolve),
               
                },

                {
                    path:'/organization',  //组织生活更多详情
                    meta: {
                        title:'组织生活'
                    },
                    name:'organization',
                    component: resolve => require(['../components/Home/organizationMore/organization.vue'], resolve)                    
               
                },
                {
                    path:'/organizationDetails',  //组织生活详情页面
                    meta: {
                        title:'组织生活详情'
                    },
                    name:'organizationDetails',
                    component: resolve => require(['../components/Home/organizationMore/organizationDetails.vue'], resolve)                    
               
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
                                