<template>
    <div class="header-content">
    <div class="header">
         <!-- <div class="logo"><img src="../../../static/img/u1010.png"></div> -->
        
        <div class="user-info">
            <div class="lef ws">
                <!-- <img class="user-logo" src="../../assets/cunqing.png"> -->
            </div>
            <div class="lef prg">
                 <p><span>{{username}}</span>
                 </p>
                    <el-dropdown trigger="click" >
	                    <span class="el-dropdown-link">
	                      	<span>{{optionChange}}</span> <i class="el-icon-arrow-down el-icon-right"></i>
	                    </span>
	                    <el-dropdown-menu slot="dropdown">
	                     <el-dropdown-item  v-for="(item,index) in option" 
                       :key="index" 
                       :command='index' 
                       :disabled='inx==index?true:false'
                        :class="{red:inx==index}"
                         @click.native="changeName(item,index)">{{item.key}}</el-dropdown-item>
	                    </el-dropdown-menu>
                  	</el-dropdown>
            </div>
               
                <el-popover
                ref="popover4"
                placement="bottom"
                width="400"
                trigger="click">
                <el-table :data="gridData">
                    <el-table-column width="150" property="date" label="日期"></el-table-column>
                    <el-table-column width="100" property="name" label="姓名"></el-table-column>
                    <el-table-column width="300" property="address" label="地址"></el-table-column>
                </el-table>
                </el-popover>
                  <div class="lef">
                <!-- <el-button v-popover:popover4>click 激活</el-button> -->
                <!-- <i><img class="menu-img" src='../../assets/jgg.png' onclick="clickImg()" alt=""></i> -->
                <i class="iconfont default-icon icon-jiugongge" @click="clickImg()"></i>
                <!-- <i class="icons-32a j_i w_tuichu" @click="loginout"></i> -->
                    <!-- <el-dropdown trigger="click" style="margin-top:-10px;">
	                    <span class="el-dropdown-link">
	                      	<i class="icons-32a j_i w_tuichu" @click="loginout"></i>
	                    </span>
	                    <el-dropdown-menu slot="dropdown">
	                     <el-dropdown-item  v-for="(item,index) in option" 
                       :key="index" 
                       :command='index' 
                       :disabled='inx==index?true:false'
                        :class="{red:inx==index}"
                         @click.native="changeName(item,index)">{{item.key}}</el-dropdown-item>
	                    </el-dropdown-menu>
                  	</el-dropdown> -->
                </div>
                <div class="lef">
                  <el-dropdown @command="handleCommand">
                      <span class="el-dropdown-link">
                        <i class="iconfont default-icon icon-shezhi-copy"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown"  class="j_pop">
                        <!-- <el-dropdown-item command="a">黄金糕</el-dropdown-item> -->
                        <!-- <el-dropdown-item command="b">狮子头</el-dropdown-item> -->
                        <el-dropdown-item command="c">退出登录</el-dropdown-item>
                        <!-- <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item> -->
                      </el-dropdown-menu>
                    </el-dropdown>
                                          <!-- <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="icons-32a j_i w_tuichu"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-for="(item,index) in shezhi" 
                        :key="index" 
                        :command='index' 
                        :disabled='inx==index?true:false'
                          :class="{red:inx==index}"
                          @click="loginout(item,index)">{{item.key}}</el-dropdown-item>
                        </el-dropdown-menu>
                  	</el-dropdown> -->
                </div>
                <!-- <div style="padding:5px 10px;">退出</div> -->
                <!-- <span class="w_more" ><img v-popover:popover4 src="../../assets/u1015.png"></span> -->
                
        </div>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      username:'',
      inx:'0',
      name: 'linxin',
      option:[
        {key:'中共山东福生佳信科技股份有限公司党支部--省级管理员'},
      ],
      shezhi:[{
        key:'退出'
      }],
      optionChange:'中共山东福生佳信科技股份有限公司党支部--支部管理员',
      gridData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  mounted()  {
    this.getUser();
  },
  methods: {
     handleCommand(command) {
        // this.$message('click on item ' + command);
        if(command=='c'){
// getAxios('/user/logout').then(res => {
//                 // console.log(res);
//                 if(res.data.code==200){
//                    sessionStorage.clear();
//                   location.href=res.data.data;
                 
//                 }else{
//                   this.$message({
//                     type: 'error',
//                     message: '退出失败'
//                   });
//                 }
//               }).catch(err => {
//                 console.log(err);
//                 this.$message({
//                     type: 'error',
//                     message: '退出失败'
//                   });
//               })
        }
      },
    loginout(item,index){
      console.log(item);
      console.log(index);
      
              // getAxios('/user/logout').then(res => {
              //   console.log(res);
              //   if(res.data.code==200){
              //      sessionStorage.clear();
              //     location.href=res.data.data;
                 
              //   }else{
              //     this.$message({
              //       type: 'error',
              //       message: '退出失败'
              //     });
              //   }
              // }).catch(err => {
              //   console.log(err);
              //   this.$message({
              //       type: 'error',
              //       message: '退出失败'
              //     });
              // })
    },
    changeName: function(obj,ins){
     
            let self=this;
                this.inx=ins;
                this.optionChange=obj.key;
                // console.log(obj);
                // getAxios('user/switch_role?roleId='+obj.roleId+'&manageOrgCode='+obj.manageOrgCode).then(res => {
                //   if(res.data.code==200){
                //     let w_data=res.data.data;
                //     self.jiexi(w_data)
                //     location.reload();
                //   }
                // }).catch(err => {
                //   console.log(err)
                // })

    },
    clickImg(){
      console.log('//')
    },
    jiexi(w_data){
      let self=this;
        let w_permissionName=[];
          w_data.currentRole.permissions.forEach(item => {
            w_permissionName.push(item.permissionName);
          });
  
          let w_roles=[];
          w_data.roles.forEach(item => {
            let w_roledata={
              roleDescription:'',
              permissions:[],
              manageName:'',
              roleId:item.roleId,
              manageCode:item.manageCode
            };
            w_roledata.roleDescription=item.roleDescription
            w_roledata.manageName=item.manageName
            item.permissions.forEach(it => {
              w_roledata.permissions.push(it.permissionName);
            })
            w_roles.push(w_roledata);
          }) 
          // console.log(w_data);
          let userInfor={
            currentRole:{
              manageCode:w_data.currentRole.manageCode,
              manageId:w_data.currentRole.manageId,
              name:w_data.name,
              manageName:w_data.currentRole.manageName,
              roleDescription:w_data.currentRole.roleDescription,
              permissions:w_permissionName
            },
            roles:w_roles    
          }
          sessionStorage.setItem('userInfor',JSON.stringify(userInfor));

          let UserInfor = JSON.parse(sessionStorage.getItem('userInfor')) ;
          this.username=UserInfor.currentRole.name;
          this.option=[];
          this.option.push({
              key:UserInfor.currentRole.manageName+'--'+UserInfor.currentRole.roleDescription,
              roleId:UserInfor.currentRole.roleId,
              manageOrgCode:UserInfor.currentRole.manageOrgId
          })

          UserInfor.roles.forEach((item,index) => {
            // if(index){
              let keys=item.manageName+'--'+item.roleDescription;
              if(self.option[0].key!=keys){
                  this.option.push({
                    key:keys,
                    roleId:item.roleId,
                    manageOrgCode:item.manageCode
                  })
              }
              
            // }
            
          });
          this.optionChange=this.option[0].key;
    },
    getUser(){
      let self=this;
      // getAxios('user/user_info').then(res => {
      //   // console.log(res);
      //   if(res.data.code==200){
      //     let w_data=res.data.data;
      //     self.jiexi(w_data)
      //   }
      // }).catch(err => {
      //   console.log(err)
      // })
    }
           
  
  }
};

</script>
<style scoped>
.default-icon{
  margin-right: 10px;
  font-size:24px;
  display: inline-block;
}
.header-content{
  background-image: linear-gradient(0deg, #a9222e 3%, #ff0000 100%);
}
.laout{
  cursor: pointer;
}
.prg{
  padding-right: 20px;
}
  .red{
    color: #e60000 !important;
  }
.lihe{
    line-height: 100px;
}
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 88px;
  font-size: 22px;
  color: #fff;
  background:url('../../../static/img/head.png') no-repeat;
}
.header .logo {
  float: left;
  width: 350px;
  text-align: center;
  margin-right: 30px;
}
.ws{
    width: 50px;
    height: 50px;
    margin-right: 15px;
}
.w_title {
  display: inline-block;
  float: left;

  line-height: 88px;
    font-weight: bolder;
    font-family: microsoft yahei;
    font-size: 22px;
    margin-left: 20px;
    letter-spacing: 2px;
    text-shadow: 0 1px 2px rgba(0,0,0,.4);
}
.header .logo img {
  display: inline-block;
  
}
.loginout {
  display: inline-block;
  position: absolute;
  top: -20px;
  right: 270px;
  font-size: 14px;
  z-index: 22;
  cursor: pointer;
}
.lef {
  float: left;
}
.el-dropdown-menu__item {
  font-size: 12px;
}
.el-dropdown-menu {
  /* top: 80px !important; */
}

.w_more img {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  top: 10px;
}
.username {
  position: absolute;
  top: -20px;
  width: 100px;
  font-size: 14px !important;
  display: inline-block;
}
.user-info {
  float: right;
  /* padding-right: 50px; */
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  margin-top: 22px;
}
.user-info .el-dropdown-link {
 
  display: inline-block;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  vertical-align: middle;
}
.user-info .user-logo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.menu-img{
  width: 25px;
  cursor:pointer;
}
.icons-32a{
    width: 32px;
    height: 32px;
    display: inline-block;
    /* background: url(../../assets/icons-32.png) no-repeat; */
    background-position: 0px -1024px;
}
.icons-32b{
    width: 32px;
    height: 32px;
    display: inline-block;
    /* background: url(../../assets/icons-32.png) no-repeat; */
    background-position: 0px -992px;
}
.j_i{
  margin-top: 10px;
  padding: 0px 15px 0px 0px;
}
</style>
