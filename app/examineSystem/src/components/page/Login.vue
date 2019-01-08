<template>
    <div class="login-wrap">
        <div class="ms-title">
            <span>登录</span>
        </div>
        <div class="form">
            <van-cell-group>
            <van-field
                v-model="form.username"
                label=" "
                placeholder="账号"
                :error-message="user"
                @focus="user=''"
            />
            <van-field
                v-model="form.password"
                label=" "
                placeholder="密码"
                :error-message="word"
                 @focus="word=''"
            />
            </van-cell-group>
            <van-button type="danger" style="margin-top: 50px" @click="submitForm">登录</van-button>
        </div>
       
    </div>
</template>

<script>
import { Toast } from 'vant';

import qs from "qs";
import { postAjax, getAjax, uploadImg } from "../../api/api.js";
    export default {
        data(){
            return {
                form:{
                    username: '',
                    password: ''
                },
                user:"",
                word:"",
               
            }
        },
        methods: {
            submitForm() {
               
                if(this.form.username==""){
                    this.user="请输入账号";
                    return;
                }
                if(this.form.password==""){
                    this.word="请输入密码";
                    return;
                }
                // Toast.loading({
                //     mask: true,
                //     message: '加载中...'
                // });


                console.log(this.form); 
                let data=qs.stringify(this.form)
                postAjax("user/get_sso_login_url").then(res => {
                    location.href=res.data.data;
                });

               
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        width:100%;
        height:100%;
        overflow: hidden;
    }
    .ms-title{
        width: 90%;
        height: 150px;
        margin: 15px auto;
        background: red;
        position: relative;
    }
    .ms-title span{
        display: inline-block;
        padding: 10px;
        color: white;
        border-bottom: 2px solid white;
        position: absolute;
        bottom:0;
        left: 20px;
    }
    .form{
        width: 85%;
        margin: 30px auto;
    }
</style>
