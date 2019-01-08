import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from "vuex";
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import echarts from 'echarts';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/biangeng.css'
 


import "babel-polyfill";
window.eventBus = new Vue();
axios.defaults.withCredentials=true;//让ajax携带cookie
Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

const store=new Vuex.Store({
    state:{
        form: {
            region: "", //所属党组织
            bigTitle:"",//考评项目
            smallTitle:"",//考评周期
            value: '',// 状态内容
          }
    },
    mutations:{
        increment(state,price){
            state.form=price;
        }
    },
    actions:{
        increase(context,price){
            context.commit("increment",price);
        }
    }
})




new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');