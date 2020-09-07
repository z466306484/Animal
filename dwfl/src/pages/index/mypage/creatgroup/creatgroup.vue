<template>
  <div class="container" v-if="showdata">
    <div class="logbox">
      <div class="logimg">
        <input id="upimage" type="file" @change="handleChange" multiple accept="image/jpg,image/jpeg,image/png,image/gif">
        <img :src="groupimg">
      </div>
      <div class="logtext">{{logtext}}</div>
    </div>
    <div class="iptbox">
      <div class="iptitem">
        <!--<x-input @on-focus="onfocus" @on-blur="onblur" placeholder="设置社群名称" v-model="groupname"></x-input>-->
        <input @on-focus="onfocus" @on-blur="onblur" placeholder="设置社群名称" v-model="groupname"></input>
      </div>
      <div class="ipttra">
        <!--<x-textarea class="ipttare" @on-focus="onfocus" @on-blur="onblur" :max="60" :height="60" v-model="groupjs" placeholder="请填写社群简介"></x-textarea>-->
        <textarea @focus="onfocus" @blur="onblur" @input="inputtextfn" id="ipt" placeholder="请填写社群简介" class="ipttare" v-model="groupjs" :rows="1"></textarea>
        <div class="t_num">{{groupjs.length}}/{{maxlength}}</div>
      </div>
    </div>
    <div class="btnbox">
      <savebtn :btntype="1" :btnval="btnval" @savefn="savefn"></savebtn>
    </div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <loading :show="showload" :text="loadval"></loading>
  </div>
</template>

<script>
  import savebtn from '@/components/comcpn/savebtn'
  import {XInput,XTextarea,Toast,Loading } from 'vux'
    export default {
        components: {XInput,XTextarea,savebtn,Toast,Loading},
        data() {
            return {
              showload:false,
              loadval:'正在创建',
              goupid:'',
              gouptype:1,
              alldata:'',
              groupname:'',
              groupimg:'/static/images/senadd.jpg',
              groupjs:'',
              logtext:'上传社群LOGO',
              btnval:'提交',
              showdata:false,
              itemimgarr:'',
              //toas
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
              maxlength:120,
            }
        },
        props: {},
        methods: {
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
              this.groupimg = window.URL.createObjectURL(f),
              reads.readAsDataURL(f);
              reads.onload=function (event) {
                _this.itemimgarr = event.target.result
              };
          },
          savefn(){
            let _this =this
            if(this.itemimgarr==''){
              _this.toastshow = true
              _this.toasttext = '请选择社群头像'
              _this.toatype = 'cancel'
              return false
            }
            if(this.groupname==''){
              _this.toastshow = true
              _this.toasttext = '请输入社群昵称'
              _this.toatype = 'cancel'
              return false
            }
            let url = this.apis+'/wx/my/community'
            let data = {
              name:this.groupname,
              community_pic:this.itemimgarr,
              introduction:this.groupjs,
            }
            if(this.gouptype == 2){
              url = this.apis+'/wx/my/editcom'
              data['id'] = this.goupid
            }
            _this.showload = true
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                window.location.href = '#/mygroup'
              }else {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'cancel'
              }
              _this.showload = false
            })
          },
          onfocus(e){
            let _this = this
            var dom=document.getElementById('tag')
            setTimeout(function(){
              dom.scrollIntoView(true);
              dom.scrollIntoViewIfNeeded();
              if(e!=undefined){
                e.target.scrollIntoView()
                this.wxBase.log("输入框获取焦点")
              }else {
                _this.inputtextfn()
              }
            },100);
          },//输入框获取焦点
          inputtextfn(){
            let newtext = document.getElementById("ipt");
            newtext.style.height = 'auto';
            newtext.style.height = newtext.scrollHeight + "px";
            if(this.groupjs.length>this.maxlength){
              this.groupjs = this.groupjs.substr(0,this.maxlength)
            }
          },//设置输入框高度
          onblur(){
            var dom=document.getElementById('tag')
            setTimeout(function(){
              dom.scrollIntoView(true);
              dom.scrollIntoViewIfNeeded();
            },100);
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/showedit'
            let data = {
              id:this.goupid
            }
            this.axios.post(url,data).then(function (res) {
              console.log(res.data)
              if(res.data.code == 10000){
                _this.alldata = res.data.data
               _this.groupname =  res.data.data.name
               _this.groupjs =  res.data.data.introduction
               _this.groupimg =  res.data.data.community_pic
                _this.itemimgarr =  res.data.data.community_pic
                _this.logtext = '修改社群LOGO'
                _this.btnval = '保存'
                _this.showdata = true
              }
            })
          },
        },
        created() {
          if(this.$route.query.id){
            this.goupid = this.$route.query.id
            this.getdata()
          }
          if(this.$route.query.type){
            this.gouptype =  this.$route.query.type
            this.showdata = true
            if(this.gouptype == 1){
              document.title = '创建社群'
            }else {
              document.title = '修改社群'
              this.loadval = '拼命修改中'
            }
          }
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    .logbox{
      width: 100%;
      overflow: hidden;
      .logimg{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 20px;
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
      .logtext{
        text-align: center;
        padding: 20px 0;
        font-size: 1em;
        color: rgb(150,150,150);
      }
    }
    .iptbox{
      width: 100%;
      padding: 0 4%;
      box-sizing: border-box;
      .iptitem{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 15px 0;
        box-sizing: border-box;
        color: rgb(30,30,30);
        input{
          font-size: 1rem;
          border: none;
          outline: none;
        }
        input::-webkit-input-placeholder{ /* WebKit browsers */
          color:rgb(130,130,130);
        }
        input:-moz-placeholder{ /* Mozilla Firefox 4 to 18 */
          color:rgb(130,130,130);;
        }
        input::-moz-placeholder{ /* Mozilla Firefox 19+ */
          color:rgb(130,130,130);
        }
        input:-ms-input-placeholder{ /* Internet Explorer 10+ */
          color:rgb(130,130,130);
        }
      }
      .ipttra{
        width: 100%;
        padding-top: 20px;
        .ipttare{
          border: none;
          outline: none;
          width: 98%;
          color: rgb(30,30,30);
          font-size: 1.2rem;
          min-height: 80px;
          resize:none;
        }
        .t_num{
          height: 20px;
          text-align: right;
          font-size: 0.8rem;
          padding: 0 10px;
          box-sizing: border-box;
          width: 100%;
          color:rgb(130,130,130);
        }
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
  .ipttra>.weui-cell{
    padding: 10px 0 !important;
  }
</style>
