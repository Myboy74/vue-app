<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
	
// Vue.prototype.$ajax = axiosV
import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {

            submitForm() {

                let data=qs.stringify({username:this.ruleForm.username,password:this.ruleForm.password})
                postAjax("ajax/login",data).then(res => {
                    console.log(res);
                    if (res.data.state== 1) {
                        var id = res.data.data.sysOfficeId;
                        localStorage.setItem('id',id)
                        sessionStorage.setItem('ms_username',this.ruleForm.username)
                        // localStorage.setItem('ms_username',this.ruleForm.username);
                        this.$message.success('登录成功！');
                        this.$router.push({ path:'/welcome',});
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
                //  this.$http.post('localhost:8080/gzw/admin/login?username=admin&password=admin').then(function(res){
                //     // document.write(res.body);    
                //     console.log(res);
                // },function(){
                //     console.log('请求失败处理');
                // });
 


            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
