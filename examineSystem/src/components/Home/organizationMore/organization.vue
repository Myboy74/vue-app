<template>
    <div class="organization">
        <van-tabs @click="onTable" class="f_tab">
            <van-tab v-for="(item,index) in tabTitle" :key="index" :title="item.name"></van-tab>
        </van-tabs>
        <!-- <ul class="tabContent"
          v-waterfall-lower="loadMore"
          waterfall-disabled="disabled"
          waterfall-offset="400"
        > -->
         <ul class="tabContent"
        >
         <li v-for="(item,index) in listcontext" :key="index" @click="onContent(item.id)">
                <p class="fontOver">{{item.center}}</p>
                <p class="date">{{item.date}}</p>
            </li>
        </ul>
        <!-- <ul  class="tabContent">
         <li v-for="(item,index) in listcontext" :key="index" @click="onContent(item.id)">
                <p class="fontOver">{{item.center}}</p>
                <p class="date">{{item.date}}</p>
            </li>
        </ul> -->

    </div>
</template>
<script>
import { Toast } from "vant";
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  created() {
    if(this.searchValue){
        this.val.meetingName=this.searchValue;
        this.listcontext = [];
        this.autoMove(this.val);
    }else{
      this.listcontext = [];
       this.autoMove(this.val);
    }
     this.zuzhiType(this.orgCode);
  },
  data() {
    return {
      val: this.$store.state.form,
      orgCode:this.$store.state.form.orgCode,
      searchValue:sessionStorage.getItem("value"),//搜索页面得搜索内容
      tabTitle: [{
        orgid:0,
        name:"全部",
        classid:""
      }],
      listcontext: [],
      disabled: false, //蓝加载
      obj: {
        branchId: "", //所属党组织
        orgCode: "", //组织编码
        classificationId: "", //考评项目
        meetingName: "", //会议标题
        pageNum: "", //分页 第几页
        pageSize: 2 //默认每页30条
      },
      totalPage: 5, //总页数
      scroll: "", //滚动条得实时高度
      conHei:"",//content得高度
    };
  },

  methods: {
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
            this.tabTitle.push({
              orgid:item.orgId,
              name:item.classificationName,
              classid:item.classificationId
            })
          })
          }
      })

    },
    autoMove(form) {
       const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: "spinner",
        message: "获取会议信息中...."
      });
      let date = qs.stringify(form);
      postAjax("meeting/nowMeetingList", date).then(res => {
        // console.log(res.data.success);
        if(!res.data.success){
          Toast.clear();
          Toast.fail("用户信息丢失,获取失败");
          return;
        }
        Toast.clear();
        Toast.success('信息获取成功');
        let total = res.data.data.count; //总条数
        let page = res.data.data.pageSize; //1页多少条
        this.totalPage = Math.ceil(Number(total) / Number(page));
        let num = res.data.data.data;
        // console.log(num.data);
        if (num) {
          this.listcontext=[];
          num.forEach(element => {
            // 开始时间
            let meetingTime = "";
            let time = element.startTime;
            let start = new Date(time);
            var y = start.getFullYear();
            var M = start.getMonth() + 1; //月
            var d = start.getDate(); //日
            var H = start.getHours(); //时
            var m = start.getMinutes(); //分

            //结束时间
            let end = element.endTime;
            let endOver = new Date(end);
            var yy = endOver.getFullYear();
            var MM = endOver.getMonth() + 1; //月
            var dd = endOver.getDate(); //日
            var HH = endOver.getHours(); //时
            var mm = endOver.getMinutes(); //分

            if (y == yy && M == MM && d == dd) {
              meetingTime =
                y +
                "年" +
                this.formatTen(M) +
                "月" +
                this.formatTen(d) +
                "日  " +
                this.formatTen(H) +
                ":" +
                this.formatTen(m) +
                "-" +
                this.formatTen(HH) +
                ":" +
                this.formatTen(mm);
            } else {
              meetingTime =
                y +
                "年" +
                this.formatTen(M) +
                "月" +
                this.formatTen(d) +
                "日  " +
                this.formatTen(H) +
                ":" +
                this.formatTen(m) +
                "--" +
                yy +
                "年" +
                this.formatTen(MM) +
                "月" +
                this.formatTen(dd) +
                "日  " +
                this.formatTen(HH) +
                ":" +
                this.formatTen(mm);
            }
            //组织生活列表
            this.listcontext.push({
              id: element.meetingId,
              center: element.meetingName,
              date: meetingTime
            });
          });
        }else{
          Toast("已经没有数据了~~");
        }

        // console.log(this.listcontext);
      });
    },
    menu() {
      // let con = document.getElementsByClassName("content")[0].offsetHeight;
     
      this.scroll = document.getElementsByClassName("content")[0].scrollTop;
      this.conHei=document.getElementsByClassName("organization")[0].offsetHeight;
      let Whei = document.documentElement.offsetHeight || document.body.offsetHeight;

       
      let sum=Number(Whei+this.scroll-15); 
      // console.log("滚动条的高度" + Number(Whei+this.scroll-15));
    
      // console.log("organization的高度" + this.conHei);

      if (sum >=this.conHei) {
        this.disabled = true;
        let _this = this;
        let file = this.$store.state.form;
        let size = this.obj.pageNum; //页数

        let time = setTimeout(() => {
          size++;
          this.obj.pageNum=size;
          if (size >= this.totalPage) {
            // Toast("已经没有数据了~~");
            clearTimeout(time);
            return;
          } else {
            this.obj = {
              branchId: file.branchId, //所属党组织
              orgCode: file.orgCode, //组织编码
              classificationId: file.classificationId, //考评项目
              meetingName: file.meetingName, //会议标题
              pageNum: size, //分页 第几页
              pageSize: 2 //默认每页30条
            };
            _this.autoMove(this.obj);
          }
          _this.disabled = false;
        }, 200);

       
      }
    },
    onTable(ind, val) {
      //点击tab切换
      // console.log(ind, val);
      let id=this.tabTitle[ind].classid;
      // console.log(id)
   
      this.$store.dispatch("backClass", id);
   
      let file = this.$store.state.form;
      // console.log(this.$store.state.form);
      this.listcontext = [];
      this.autoMove(file);
    },
    onContent(id) {
      //点击内容进入详情页面
      // console.log(id);
      this.$router.push({
        name: "organizationDetails",
        query: {
          uid: id
        }
      });
    },
    formatTen(num) {
      //调整时间格式
      return num > 9 ? num + "" : "0" + num;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.menu, true);
  }
};
</script>
<style scoped>

.tabContent {
  width: 100%;
  height: 100%;
  margin: 15px auto;
  /* background: #eee; */
}
.tabContent li {
  list-style: none;
  font-size: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.tabContent li p {
  width: 90%;
  margin: 0 auto;
  color: #000000;
}
.tabContent li p.date {
  font-size: 12px;
  text-align: right;
  margin-top: 5px;
  color: #aeaeae;
}
</style>

