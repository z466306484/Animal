<template>
  <div class="ccontainer" v-if="showlogin" :style="'height:'+mincht">
    <img class="login_bg" src="../../../../static/img/login.jpg" alt="">
    <div class="imgbox" >
      <img class="imgbg" src="../../../../static/img/loginbox.png"alt="">
      <div class="login_from" >
        <p>登录 <span>|</span> 动物福利教育平台</p>
        <div class="login_user">
          <img src="../../../../static/img/user.png" alt="">
          <input v-model="username"  type="text" placeholder="用户名">
        </div>
        <div class="login_input">
          <img src="../../../../static/img/pwd.png" alt="">
          <input v-model="userpwd" type="password" placeholder="密码">
        </div>
        <!--  <div class="code">
            <div class="login_code">
              <img src="../../../../static/img/code.png" alt="">
              <input v-model="code" type="text" placeholder="验证码">
            </div>
            <div class="login_codeimg">
              <img @click="vitifycode" :src="this.img" alt="">
            </div>
          </div>-->
        <div class="login_btn" @click="login">登录</div>
        <p class="login_repwd" @click="answeralertobj.answeralert = true">忘记密码？</p>
      </div>
    </div>
    <!--忘记密码-->
    <div class="delalert" v-if="answeralertobj.answeralert">
      <div class="deltitle">
        <div>{{answeralertobj.alertitle}}</div>
        <div  style="cursor: pointer" @click="answeralertobj.answeralert = false">×</div>
      </div>
      <div style="padding: 15px 10px;text-align: center;">
       <p>忘记密码请联系超级管理员</p>
      </div>
      <div class="delbtn" style="display: flex;padding: 20px 20px;flex-direction: row-reverse">
        <div class="calbtn"@click="submitanwser()" >确定</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              //动态列表回复弹框参数
              answeralertobj:{
                answeralert:false,
                alertitle:'提示',
                content:'',
                btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
              },
              username:'',
              userpwd:'',
              code:'',
              mincht:'',
              showlogin:false,
              img:'http://dongwu.siantest.com/san/Login/capcha'
            }
        },
        props: {},
        methods: {
          login(){
            //  发请求
            let _this = this
            if(_this.username==''){
              this.$message({
                duration:1000,
                center: true,
                message: '请填写登录用户名',
                type: 'error'
              });
              return false
            }
            if(_this.userpwd==''){
              this.$message({
                duration:1000,
                center: true,
                message: '请填写登录密码',
                type: 'error'
              });
              return false
            }
            this.axios.post(this.apis+'/san/Login/index', {
              username:this.username,
              password:this.userpwd,
             /* verifycode:this.code,*/
            }).then((res) => {
              if(res.data.code==10000){
                this.$message({
                  duration:1000,
                  center: true,
                  message: '登录成功',
                  type: 'success'
                });
                setTimeout(()=>{
                  _this.$router.push({path:'/san_welcome'})
                },1000)
              }else{
                this.$message({
                  duration:2000,
                  center: true,
                  message:res.data.msg,
                  type: 'error'
                });
              }
              })
              .catch(function (err) {

              })

          },
          vitifycode(){
            this.img += '?rmd='+Math.random();
          },
          submitanwser(){
            this.answeralertobj.answeralert=false
          },
        },
        mounted(){
        },
        created() {
          this.mincht = (this.docheight )+'px'
          this.showlogin = true
          document.title = '系统登录'
        },
    }
</script>

<style scoped lang="less">
  .ccontainer{
    width: 100%;
    overflow: hidden;
    .login_bg{
      width: 100%;
      height: 100%;
    }
    .login_from{
      position: absolute;
      padding-top:10%;
      width: 50%;
      right: 4%;
      top: 0;
      margin-top: 20px;
      overflow: hidden;
      p{
        font-size:16px;
        font-weight: 500;
        color: #4c4c4c;
        text-align: center;
        padding-bottom: 30px;
        span{
          display: inline-block;
          margin: 3px 0px;
        }
      }
      .login_user{
        width: 70%;
        height: 34px;
        border-radius:20px;
        margin-left: 15%;
        margin-top:30px;
        border: 1px solid #e0e0e0;
        input{
          outline: none;
          border: none;
          line-height: 34px;
          width: 70%;
          height:32px;
          margin-left:10px;
          font-size: 12px;
          color: #999;
        }
        img{
          display: inline-block;
          vertical-align: middle;
          position: relative;
          left: 10px;
        }
      }
      .login_input{
        width: 70%;
        height: 34px;
        border-radius:20px;
        margin-left: 15%;
        margin-top: 30px;
        border: 1px solid #e0e0e0;
        input{
          outline: none;
          border: none;
          line-height: 34px;
          width: 70%;
          height:32px;
          margin-left:10px;
          font-size: 12px;
          color: #999;
        }
        img{
          display: inline-block;
          vertical-align: middle;
          position: relative;
          left: 10px;
        }
      }
      .code{
        display: flex;
        width: 100%;
        input{
          outline: none;
          border: none;
          line-height: 34px;
          width: 70%;
          height:32px;
          margin-left:10px;
          font-size: 12px;
          color: #999;
        }
        img{
          display: inline-block;
          vertical-align: middle;
          position: relative;
          left: 10px;
        }
        .login_codeimg{
          margin-top: 20px;
          margin-left: 5px;
          width: 20%;
          height: 34px;
          img{
            width: 60px;
            height: 40px;
            cursor: pointer;
          }
        }
        .login_code{
          width: 46%;
          height: 34px;
          border-radius:20px;
          margin-left: 15%;
          margin-top: 20px;
          border: 1px solid #e0e0e0;
        }
      }

      .login_btn{
        width: 70%;
        height: 34px;
        border-radius:20px;
        margin-left: 15%;
        margin-top: 30px;
        color: white;
        text-align: center;
        line-height: 34px;
        font-size: 14px;
        background-color: #2f9ff5;
        cursor: pointer;
      }
      .login_repwd{
        font-size: 12px;
        font-weight: normal;
        text-align: center;
        margin-left: 0px;
        color: #c5c5c5;
        cursor: pointer;
      }
    }
  }
  .delalert{
    background-color:#fff;
    width:25%;
    font-size: 12px;
    left: 40%;
    min-height:160px;
    position: absolute;
    top: 250px;
    border: 1px solid #e2e2e2;
  }
  .deltitle{
    padding: 10px 20px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background-color: #f8f8f8;
  }
  .calbtn{
    background-color: rgb(46, 141, 237);
    padding: 7px 15px;
    color: white;
    cursor: pointer;
    border-radius: 3px;
  }
  .show_btn{
    div{
      cursor: pointer;
    }
  }
  .imgbox{
    width: auto;
    position: absolute;
    top:15%;
    width: 50%;
    left: 25%;
    .imgbg{
      width: 100%;
    }
  }
</style>
