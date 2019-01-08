<template>
    <div class="organization">
        <van-tabs @click="onTable">
            <van-tab v-for="index in tabTitle" :key="index" :title="index"></van-tab>
        </van-tabs>
        <ul class="tabContent"
          v-waterfall-lower="loadMore"
          waterfall-disabled="disabled"
          waterfall-offset="400"
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
import { Waterfall } from 'vant';
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../../api/api.js";
export default {
  directives: {
    WaterfallLower: Waterfall('lower')
  },
  created() {
    console.log(this.val);
    this.autoMove(this.val);
  },
  data() {
    return {
      val:this.$store.state.form,
      tabTitle: ["全部", "三会", "党课", "组织生活会", "民主评议党员","主题党日"],
      listcontext: [],
      disabled: false,//蓝加载

    };
  },
   
  methods: {
    autoMove(form) {
      let date = qs.stringify(form); 
     
      postAjax("meeting/nowMeetingList", date).then(res => { 
        // console.log(res.data.data.count);
       
        let num = res.data.data.data;
        console.log(num.data);
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
            center:element.meetingName,
            date: meetingTime
          });

        });
        console.log(this.listcontext);
      });
    },
    loadMore() {
      // this.disabled = true;
       let file=this.$store.form;
      this.autoMove(file);
      // setTimeout(() => {
      //   for (let i = 0; i < 5; i++) {
      //     this.list.push(this.list.length);
      //   }
       
      // }, 200);
    },
    onTable(ind, val) {
      //点击tab切换
      console.log(ind, val);
      //  { id:"1",name: "三会"},
      //   { id:"3",name: "党课" },
      //   { id:"4",name: "组织生活会" },
      //   { id:"8",name: "民主评议党员" },
      //   { id:"2253028057613312",name: "主题党日" }
      let life=this.$store.state.form;//tab切换时使用
      if(ind==0){
         this.$store.dispatch("backClass","");
      }else if(ind==1){
        this.$store.dispatch("backClass","1");
      }else if(ind=2){
         this.$store.dispatch("backClass","3");
      }else if(ind=3){
         this.$store.dispatch("backClass","4");
      }else if(ind=4){
         this.$store.dispatch("backClass","8");
      }else if(ind=5){
        this.$store.dispatch("backClass","2253028057613312");
      }
      let file=this.$store.state.form;
      console.log(this.$store.state.form);
      this.listcontext=[];
      this.autoMove(file);
    },
    onContent(id) {
      //点击内容进入详情页面
      console.log(id);
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
    },
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

