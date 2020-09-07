<template>
  <div class="container">
    <div class="title">为了更好地提供服务，请完善以下资料</div>
    <div class="content">
      <div class="danwei">
        <x-input @on-focus="onfocus" @on-blur="onblur" placeholder="请填写你所在的单位" :show-clear="false" v-model="dwval"></x-input>
      </div>
      <div class="danwei">
        <div class="placher">{{zwval}}</div>
        <div class="clickbtn" @click="checkbtn"><div>点击选择 </div><div class="el-icon-arrow-right ricon"></div></div>
      </div>
    </div>
    <div class="btnbox">
      <savebtn :btntype="1" btnval="确定" @savefn="savefn"></savebtn>
      <savebtn :btntype="2" btnval="跳过" @savefn="calefn"></savebtn>
    </div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
  </div>
</template>

<script>
  import { XInput,Toast } from 'vux'
  import authorization from '@/components/authorization/authorization'
  import savebtn from '@/components/comcpn/savebtn'
    export default {
      components: {authorization,XInput,savebtn,Toast},
      data() {
        return {
          btnarr:[
            {type:1,val:"确定"},
            {type:2,val:"跳过"},
          ],
          zwval:'请填写你的职位',
          dwval:'',
          //toast提示
          toastshow:false,
          toasttext:'成功',
          toatype:'success',
        }
      },
      props: {
      },
      methods: {
        savefn(){
          if(!this.dwval){
            this.toastshow = true
            this.toasttext = '请输入所在单位'
            this.toatype = 'cancel'
            return false
          }
          let _this = this
          let url = this.apis+'/wx/Improve/infor'
          let data = {
            user_company:this.dwval,
            user_occupation:this.zwval,
          }
          this.axios.post(url,data).then(function (response) {
            if(response.data.code == 10000){
              window.location.href = '#/home'
            }
          })
        },
        calefn(){
          window.location.href = '#/home'
        },
        checkbtn(){
          window.location.href = '#/setposition?dwval='+this.dwval
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
        },//输入框失去焦点
      },
      created() {
        document.title = '完善信息'
        if(this.$route.query.val){
          this.zwval = this.$route.query.val
        }
        if(this.$route.query.dwval){
         this.dwval =  this.$route.query.dwval
        }
      },
    }
</script>

<style scoped lang="less">
.container{
  padding: 0 8%;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  .title{
    color: rgb(47,159,245);
    margin-top: 40px;
    font-size: 1em;
  }
  .content{
    margin-top: 40px;
    width: 100%;
    height: 200px;
    .danwei{
      margin-top: 20px;
      border-bottom: 1px solid #eee;
      padding: 5px 0;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      height: 60px;
      x-input{
      }
      .placher{
        color: rgb(130,130,130);
        padding: 10px 0;
        height: 30px;
        line-height: 30px;
      }
      .clickbtn{
        padding: 10px 15px;
        color: rgb(47,159,245);
        height: 30px;
        box-sizing: border-box;
        display: flex;
        div{
          height: 30px;
          line-height: 30px;
        }
        .ricon{
          margin-left: 5px;
          color: rgb(200,200,200);
        }
      }
    }
  }
  .btnbox{
    margin-top: 30px;
    width: 100%;
    text-align: center;
    line-height: 50px;
  }
}
</style>
<style>
  .danwei>.weui-cell{
    padding-left: 0 !important;
  }
</style>
