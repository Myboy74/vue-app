import axios from 'axios'
// 公共 url
var oUrl = 'http://yantai.fosung.com:8082/yantai-ezb/';//服务器
var upload='http://yantai.fosung.com:8082/yantai-ezb/attachment/uploadImg';//服务器上传图片
var img="http://ezb.dtdjzx.gov.cn/"//查看图片



// var oUrl = 'http://192.168.103.125:8080/yantai-ezb/';//王宜华
// var oUrl = 'http://192.168.102.121:8081/yantai-ezb/';//王宜华
// var upload='http://192.168.102.121:8081/yantai-ezb/attachment/uploadImgCache';  //王宜华  上传图片
// var img='http://dtezb.85ido.cn/img320';  //查看图片


// var oUrl = 'http://192.168.103.140:8080/yantai-ezb/';//蒋志远
// var upload='http://192.168.103.140:8080/yantai-ezb/attachment/uploadImg';  //蒋志远  上传图片 

localStorage.setItem('url',oUrl);


// var uploadVideo='http://192.168.103.140:8080/yantai-ezb/attachment/uploadVideo'; //蒋志远  上传视频
// var uploadVideo='http://192.168.103.125:8080/yantai-ezb/attachment/uploadVideo'; //王宜华  上传视频
// var uploadVideo = 'http://192.168.101.135:8085/yantai-ezb/attachment/uploadVideo';//王宜华
// var uploadVideo='http://yantai.fosung.com:8082/yantai-ezb/attachment/uploadVideo'; //ng
// var videoRen="http://192.168.101.194";//查看视频
export function oUrl(){
  return oUrl;
}
export function uploadImg(){  //回显图片
  return img;  
}
// export function uploadVideo(){  //回显视频
//   return videoRen;  
// }
export function fileUpload(){
  return upload;
}
// export function fileUploadMp(){
//   return uploadVideo;
// }

export function postAjax(urls,obj) { /*post方法*/
  return getPromise(`${oUrl}${urls}`,obj)
}
export function getAjax(urls,obj) {/*get方法*/
  return getPromiseget(`${oUrl}${urls}`,obj)
}
// 封装 promise
function getPromise(url,obj){
  return new Promise((resolve,reject) => {
      axios.post(url,obj).then(
        (response) =>{
          resolve(response)
        }
      ).catch(
        (err) => {
          reject(console.log(err))
        }
      )
    })
}

function getPromiseget(url,obj){
  return new Promise((resolve,reject) => {
      axios.get(url,{params:obj}).then(
        (response) =>{
          resolve(response)
        }
      ).catch(
        (err) => {
          reject(console.log(err))
        }
      )
    })
}