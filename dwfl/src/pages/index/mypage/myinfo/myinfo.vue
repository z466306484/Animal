<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="userimgbox" v-if="alldata!=''">
      <div class="infobox">
        <div class="el-icon-arrow-right righticon"></div>
        <div class="usertximg">
          <input id="upimage" type="file" @change="handleChange" multiple accept="image/jpg,image/jpeg,image/png,image/gif">
          <img :src="userimg">
        </div>
        <div class="usertxname">头像</div>
      </div>
      <div class="inputbox">
        <x-input title="用户名" @on-focus="onfocus" @on-blur="onblur" placeholder="请输入用户名" v-model="username" :show-clear="false" text-align="right"></x-input>
      </div>
      <div class="selectbox">
          <selector title="性别" direction="rtl" :options="list" v-model="usersex"></selector>
      </div>
      <div class="inputbox">
        <x-input title="所在单位" @on-focus="onfocus" @on-blur="onblur" v-model="userdw" placeholder="请输入您所在的单位" :show-clear="false" text-align="right"></x-input>
      </div>
      <div class="inputbox">
        <x-input title="职位" @on-focus="onfocus" @on-blur="onblur" placeholder="请输入您的职位" v-model="userzw" :show-clear="false" text-align="right"></x-input>
      </div>
      <div class="inputbox">
        <x-input title="所在城市" @on-focus="onfocus" @on-blur="onblur" v-model="usercity" placeholder="请输入您所在的城市" :show-clear="false" text-align="right"></x-input>
      </div>
    </div>
    <div class="btnbox">
      <savebtn :btntype="1" btnval="保存" @savefn="savefn"></savebtn>
    </div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <loading :show="showload" :text="loadval"></loading>
  </div>
</template>

<script>
  import savebtn from '@/components/comcpn/savebtn'
  import { Selector,XInput,Toast,Loading } from 'vux'
    export default {
        components: {Selector,XInput,savebtn,Toast,Loading},
        data() {
            return {
              loadval:'保存中',
              showload:false,
              mincht:'',
              list: [{key: 'boy', value: '男'}, {key: 'girl', value: '女'}],
              userimg:'',
              username:'',
              usersex: 'boy',
              userdw:'',
              userzw:'',
              usercity:'',
              alldata:'',

              //toast提示
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
              showdata:false,
              itemimgarr:'',
            }
        },
        props: {},
        methods: {
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
          handleChange(e){
            let _this = this
            var f = e.target.files[0]
            if(e.target.files.length!=1){
              _this.toastshow = true
              _this.toasttext = '只能选择一张社群头像'
              _this.toatype = 'cancel'
              return false
            }
            var reads= new FileReader();
            this.userimg = window.URL.createObjectURL(f),
            reads.readAsDataURL(f);
            reads.onload=function (event) {
              _this.itemimgarr = event.target.result
            };
          },
          savefn(){
            let _this = this
            let url = this.apis+'/wx/my/edit'
            var usersex = 1
            if(this.usersex == 'girl'){
              usersex = 2
            }
            let data = {
              nickname:this.username,
              user_city:this.usercity,
              user_sex:usersex,
              user_occupation:this.userzw,
              user_company:this.userdw,
              photos:this.itemimgarr,
            }
            _this.showload = true
            this.axios.post(url,data).then(function (res) {
              _this.showload = false
              _this.toastshow = true
              _this.toasttext = res.data.msg
              if(res.data.code == 10000){
                window.location.href = '#/mypage'
                _this.toatype = 'success'
              }else {
                _this.toatype = 'cancel'
              }
            })
          },
          setdata(obj){
            this.userimg = obj.photos
            this.itemimgarr = obj.photos
            this.username = obj.nickname
            if(obj.user_sex == 1){
              this.usersex = 'boy'
            }else {
              this.usersex = 'girl'
            }
            this.userdw = obj.user_company
            this.userzw = obj.user_occupation
            this.usercity = obj.user_city
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/editshow'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.setdata(res.data.data)
                _this.alldata = res.data.data
                _this.showdata = true
              }
            })
          }
        },
        mounted(){
          this.mincht = this.docheight+'px'
        },
        created() {
          document.title = '我的资料'
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    position: relative;
    overflow: hidden;
    .userimgbox{
      width: 100%;
      padding-left: 4%;
      box-sizing: border-box;
      background-color: #fff;
      .infobox{
        width: 100%;
        display: flex;
        padding: 10px 0;
        box-sizing: border-box;
        flex-direction: row-reverse;
        border-bottom: 1px solid #eee;
        .righticon{
          width: 24px;
          height: 50px;
          line-height: 50px;
          color: rgb(150,150,150);
        }
        .usertximg{
          width: 50px;
          height: 50px;
          margin-right: 10px;
          position: relative;
          #upimage{
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 100;
          }
          img{
            width: 100%;
            height: 100%;
          }
        }
        .usertxname{
          font-size: 1em;
          flex: 1;
          text-align: left;
          height: 50px;
          line-height: 50px;
        }
      }
      .selectbox,.inputbox{
        padding: 5px 0;
        font-size: 1em;
        width: 100%;
        border-bottom: 1px solid #eee;
      }
    }
    .btnbox{
      width: 92%;
      margin-left: 4%;
      margin-top: 40px;
    }
  }
</style>
<style>
  .selectbox>.vux-selector.weui-cell_select-after{
    padding: 0 !important;
  }
  .inputbox>.weui-cell{
    padding-left: 0 !important;
  }
</style>
