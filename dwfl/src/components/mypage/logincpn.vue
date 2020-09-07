<template>
  <div class="loginbox">
    <div class="logintitle" v-if="type==2">绑定手机号码</div>
    <div class="inputbox">
      <div :class="type==1?'itembox':'itembox2'" v-for="item in inputarr">
        <div class="ipt">
          <x-input type="number" :max="11" @on-change="chageval(item.val)" @on-focus="onfocus" @on-blur="onblur" :placeholder="item.plc" v-model="item.val" :show-clear="false"></x-input>
        </div>
        <div class="timener" v-if="item.type ==3" @click="clickcode">{{count}}</div>
      </div>
    </div>
    <div class="btnbox">
      <savebtn :btntype="1" btnval="提交" @savefn="clickok"></savebtn>
    </div>
    <div class="xieyival" v-if="type==2" @click="toxieyi">点击登录即表示同意《用户使用服务协议》</div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <loading :show="showload" :text="loadval"></loading>
  </div>
</template>

<script>
  import savebtn from '@/components/comcpn/savebtn'
  import {XInput,Toast,Loading } from 'vux'
    export default {
        components: {savebtn,XInput,Toast,Loading},
        data() {
            return {
              loadval:'操作中',
              showload:false,
              inputarr:[],
              toastshow:false,
              canlickyzm:true,
              count:'获取验证码',
              timer: null,

              //toast提示
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
            }
        },
        props: {
          type:{}
        },
        methods: {
          chageval(val){
          },
          onfocus(e){
            console.log(2222)
            let _this = this
            var dom=document.getElementById('tag')
            setTimeout(function(){
              dom.scrollIntoView(true);
              dom.scrollIntoViewIfNeeded();
            },100);
          },//输入框获取焦点
          onblur(){
            var dom=document.getElementById('tag')
            setTimeout(function(){
              dom.scrollIntoView(true);
              dom.scrollIntoViewIfNeeded();
            },100);
          },
          clickcode(){
            if(this.type == 1){
              this.getyzm()
            }else if(this.type == 2){
              this.getyzm2()
            }
          },
          clickok(){
            if(this.type == 1){
              this.savefn()
            }else if(this.type == 2){
              console.log(222)
              this.savefn2()
            }
          },
          getCode(){
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.count = '获取验证码'
                  this.canlickyzm = true
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000)
            }
          },
          setinput(){
            if(this.type == 1){
              this.inputarr = [
                {type:1,plc:'请输入您的注册手机号码',val:''},
                {type:2,plc:'请输入新手机号码',val:''},
                {type:3,plc:'请输入验证码',val:''},
              ]
            }else if(this.type == 2){
              this.inputarr = [
                {type:2,plc:'请输入你的手机号码',val:''},
                {type:3,plc:'请输入验证码',val:''},
              ]
            }
          },
          yznum(num){
            var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if(num){
              if (!myreg.test(num)) {
                return false;
              }else {
                return true
              }
            }else {
              return false;
            }
          },
          getyzm(){
            var zcnum =  this.yznum(this.inputarr[0].val)
            var newnum = this.yznum(this.inputarr[1].val)
            if(!zcnum){
              this.toastshow = true
              this.toasttext = '请输入正确的注册号码'
              this.toatype = 'cancel'
              return false
            }
            if(!newnum){
              this.toastshow = true
              this.toasttext = '请输入正确的新手机号码'
              this.toatype = 'cancel'
              return false
            }
            if(this.canlickyzm){
              let _this = this
              let url = this.apis+'/wx/my/send'
              let data = {
                oldphone:this.inputarr[0].val,
                mobile:this.inputarr[1].val,
              }
              this.axios.post(url,data).then(function (res) {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                if(res.data.code == 10000){
                  _this.toatype = 'success'
                  _this.canlickyzm = false
                  _this.getCode()
                }else {
                  _this.toatype = 'cancel'
                  return false
                }
              })
            }
          },
          getyzm2(){
            var newnum = this.yznum(this.inputarr[0].val)
            if(!newnum){
              this.toastshow = true
              this.toasttext = '请输入正确的新手机号码'
              this.toatype = 'cancel'
              return false
            }
            if(this.canlickyzm){
              let _this = this
              let url = this.apis+'/wx/Community/sent'
              let data = {
                mobile:this.inputarr[0].val,
              }
              this.axios.post(url,data).then(function (res) {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                if(res.data.code == 10000){
                  _this.toatype = 'success'
                  _this.canlickyzm = false
                  _this.getCode()
                }else {
                  _this.toatype = 'cancel'
                  return false
                }
              })
            }
          },
          savefn(){
            //验证注册号码
            var zcnum =  this.yznum(this.inputarr[0].val)
            var newnum = this.yznum(this.inputarr[1].val)
            if(zcnum && newnum){
              let _this = this
              let url = this.apis+'/wx/my/editphone'
              let data = {
                oldphone:this.inputarr[0].val,
                user_phone:this.inputarr[1].val,
                code:this.inputarr[2].val,
              }
              _this.showload = true
              this.axios.post(url,data).then(function (res) {
                _this.showload = false
                _this.toastshow = true
                _this.toasttext = res.data.msg
                if(res.data.code == 10000){
                  _this.toatype = 'success'
                  window.location.href = '#/home'
                  return false
                }else {
                  _this.toatype = 'cancel'
                }
              })
            }
          },
          savefn2(){
            //验证注册号码
            var newnum = this.yznum(this.inputarr[0].val)
            console.log(newnum,'newnum')
            if(newnum){
              let _this = this
              let url = this.apis+'/wx/Community/get_code'
              let data = {
                user_phone:this.inputarr[0].val,
                code:this.inputarr[1].val,
              }
              _this.showload = true
              this.axios.post(url,data).then(function (res) {
                _this.showload = false
                _this.toastshow = true
                _this.toasttext = res.data.msg
                if(res.data.code == 10000){
                  _this.toatype = 'success'
                  _this.$emit('loginfn')
                }else {
                  _this.toatype = 'cancel'
                }
              })
            }
          },
          toxieyi(){
            this.$emit('toxieyi')
          }
        },
        created() {
          this.setinput()
        },
    }
</script>

<style scoped lang="less">
  .loginbox{
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    .logintitle{
      text-align: center;
      font-size: 1.2rem;
      margin-bottom: 20px;
    }
    .inputbox{
      width: 100%;
      .itembox,.itembox2{
        padding: 8px 10px;
        background-color: #fff;
        border-radius:5px;
        margin-bottom: 20px;
        display: flex;
        height: 25px;
        font-size: 0.8rem;
        flex-direction: row;
        .ipt{
          flex: 1;
          height: 25px;
          line-height: 25px;
        }
        .timener{
          font-size: 0.8rem;
          color: rgb(47,157,245);
          height: 25px;
          line-height: 25px;
        }
      }
      .itembox2{
        border: 1px solid #eee;
      }
    }
    .btnbox{
      width: 100%;
      font-size: 0.8rem;
      box-sizing: border-box;
      margin-top: 40px;
    }
    .xieyival{
      text-align: center;
      color: rgb(47,157,245);
      font-size: 0.7rem;
      margin-top: 20px;
    }
  }
</style>
<style>
  .ipt>.weui-cell{
    padding: 0 !important;
  }
</style>
