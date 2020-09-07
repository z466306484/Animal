<template>
  <div class="container" v-if="showdata">
    <div class="content">
      <div class="dtitle">{{alldata.name}}</div>
      <div class="redbox">
        <div class="redct" v-for="item in redarr">
          <div class="iconimg"><img :src="item.img"></div>
          <div class="rnum">{{item.num}}</div>
          <div class="rnum">{{item.text}}</div>
        </div>
      </div>
      <div class="fdpbox" v-if="alldata.file!=''">
        <fdpcp :fdfile="alldata"></fdpcp>
      </div>
      <div class="compiler" v-html="alldata.content"></div>
      <div class="scbtn" @click="scfn" v-if="alldata.is_sc==0">收藏</div>
      <div class="noscbtn" @click="noscfn" v-if="alldata.is_sc==1">取消收藏</div>
    </div>
    <div class="replybox">
      <div class="replytitle">
        <div>全部评论</div>
        <div style="margin-left: 10px">{{relpyarr.length}}</div>
      </div>
      <detailreply @goodbtn="goodbtn" :relpyarr="relpyarr" showborder="1" type="1"></detailreply>
    </div>
    <div class="nodata">没有更多了~</div>
    <div class="fxalert" v-if="fxalert" @click="fxalert = false"><img src="/static/images/fenxiangpy.png"></div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <sendalert @aclose="aclose" @surefn="surefn" :sendtype="sendtype" :sendobj="sendobj" v-if="sendalert"></sendalert>
    <replybtn @checknav="zldz" :navarr="navarr" v-if="navarr.length"></replybtn>
  </div>
</template>

<script>
  import fdpcp from '@/components/fdpcp/fdpcp'
  import detailreply from '@/components/detailreply/detailreply'
  import replybtn from '@/components/detailreply/replybtn'
  import sendalert from '@/components/groups/sendalert'
  import _cloneDeep from 'lodash/cloneDeep'
  import { Toast } from 'vux'
  import wx from 'weixin-js-sdk'
    export default {
        components: {fdpcp,detailreply,replybtn,Toast,sendalert},
        data() {
            return {
              sendalert:false,
              showdata:false,
              fxalert:false,
              sendtype:{
                plc:'我要评论',
                title:'评论',
              },
              sendobj:{
                type:2,
              },
              redarr:[
                {img:'/static/images/book.png',num:122,text:'阅读'},
                {img:'/static/images/kong_xing.png',num:32,text:'收藏'},
              ],
              navarr:[],
              article_id:"",
              alldata:'',
              relpyarr:[],

              //toas
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
              session:''
            }
        },
        props: {},
        methods: {
          setdata() {
            this.redarr[0].num = this.alldata.views
            this.redarr[1].num = this.alldata.sz
            if(this.alldata.is_dz == 1){
              this.navarr = [
                {img: '/static/images/fenxiang.png',num:0,type:1,dz:0},
                {img: '/static/images/reply.png', num: this.alldata.pl,type: 2,dz:0},
                {img: '/static/images/good1.png', num: this.alldata.dz,type: 3,dz:this.alldata.is_dz}
              ]
            }else {
              this.navarr = [
                {img: '/static/images/fenxiang.png',num:0,type:1,dz:0},
                {img: '/static/images/reply.png', num: this.alldata.pl,type: 2,dz:0},
                {img: '/static/images/good.png', num: this.alldata.dz,type: 3,dz:this.alldata.is_dz}
              ]
            }
            this.relpyarr = _cloneDeep(this.alldata.comment)
          },
          noscfn(){
            let _this = this
            let url = this.apis+'/wx/Material/qx_sc'
            let data = {
              article_id:this.article_id
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'success'
              }else {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'cancel'
              }
              _this.getdata()
            })
          },
          aclose(){
            this.sendalert = false
          },
          surefn(obj){
            if(obj.plcval ==''){
              this.toastshow = true
              this.toasttext = '请输入内容'
              this.toatype = 'cancel'
            }
            let _this = this
            let url = this.apis+'/wx/Material/comment'
            let data = {
              article_id:this.article_id,
              ucontent:obj.plcval,
            }
            this.axios.post(url,data).then(function (res) {
              _this.toastshow = true
              _this.toasttext = res.data.msg
              _this.toatype = 'success'
              _this.sendalert = false
              _this.getdata()
            })
          },
          zldz(obj){
            if(this.session==null){
              this.axios.post(this.apis+'/wx/login/index', {
              }).then((res) => {
                if(res.data.code==10000){

                }else{

                }
              })
                .catch(function (err) {

                })
              return false;
            }
            if(obj.type == 1){
              this.fxalert =true
            }
            else if(obj.type == 2){
              this.sendobj = _cloneDeep({type:3})
              this.sendalert = true
            }
            else if(obj.type == 3){
              let url = this.apis+'/wx/Material/zl_dz'
              if(this.alldata.is_dz == 1){
                url = this.apis+'/wx/Material/zlqx_dz'
              }
              let _this = this
              let data = {
                article_id:this.article_id
              }
              this.axios.post(url,data).then(function (res) {
                if(res.data.code ==10000){
                  _this.toastshow = true
                  _this.toasttext = res.data.msg
                  _this.toatype = 'success'
                  _this.getdata()
                }
              })
            }
          },
          goodbtn(obj){
            let _this = this
            if(_this.session==null){
              _this.$router.push({path:'/authorization'})
              return false;
            }
            let url =this.apis+'/wx/Material/pl_dz'
            if(obj.is_dz == 1){
              url =this.apis+'/wx/Material/plqx_dz'
            }
            let data = {
              comment_id:obj.id,
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code ==10000){
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'success'
                _this.getdata()
              }
            })
          },
          scfn(){
            let _this = this
            if(_this.session==null){
              _this.$router.push({path:'/authorization'})
              return false;
            }
            let url = this.apis+'/wx/Material/is_sc'
            let data = {
              article_id:this.article_id
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                  _this.toastshow = true
                  _this.toasttext = res.data.msg
                  _this.toatype = 'success'
              }else {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'cancel'
              }
              _this.getdata()
            })
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/Material/details'
            let data = {
              article_id:this.article_id
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                console.log(res.data.data.session)
                _this.session=res.data.data.session
                _this.alldata = res.data.data
                _this.setdata()
                _this.showdata = true
                _this.setwxfx(res.data.data)
              }
            })
          },
          setred(){
            let _this = this
            let url = this.apis+'/wx/Material/amount'
            let data = {
              article_id:this.article_id
            }
            this.axios.post(url,data).then(function (res) {
              _this.getdata()
            })
          },
          setwxfx(obj){
            var wxobj = obj.signPackage
            wx.config({
              debug: false,
              appId: wxobj.appId,
              timestamp: wxobj.timestamp,
              nonceStr: wxobj.nonceStr,
              signature: wxobj.signature,
              jsApiList:[
                'onMenuShareTimeline','onMenuShareAppMessage']
            });
            // wx.config()
            let fxvalobj = {
              title: obj.name, // 分享标题
              desc: obj.name, // 分享描述
              link:this.apis+'/#/Information_details?id='+obj.article_id, // 分享链接
              imgUrl: '/static/images/book.png', // 分享图标
            }
            wx.ready(function() { //通过ready接口处理成功验证
// config信息验证成功后会执行ready方法
              wx.onMenuShareAppMessage({ // 分享给朋友  ,在config里面填写需要使用的JS接口列表，然后这个方法才可以用
                title: fxvalobj.title, // 分享标题
                desc: fxvalobj.desc, // 分享描述
                link: fxvalobj.link, // 分享链接
                imgUrl: fxvalobj.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function(res) {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function(res) {

                }
              });
              wx.onMenuShareTimeline({ //分享朋友圈
                title: fxvalobj.title, // 分享标题
                link: fxvalobj.link,
                imgUrl: fxvalobj.imgUrl, // 分享图标
                success: function(res) {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function(res) {
                  // 用户取消分享后执行的回调函数
                }
              });
            });
          },
        },
        mounted(){
          this.setred()
        },
        created() {
          document.title = '资料详情'
          if(this.$route.query.id){
            this.article_id = this.$route.query.id
          }
          if(this.$route.query.title){
            document.title= this.$route.query.title
          }
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    padding-bottom: 60px;
    padding-top: 15px;
    .content{
      width: 100%;
      padding: 10px 4%;
      box-sizing: border-box;
      .dtitle{
        padding: 5px 0;
        font-size: 1.4rem;
        margin-bottom: 5px;
        font-weight: bold;
      }
      .redbox{
        width: 100%;
        height: 15px;
        display: flex;
        .redct{
          height: 15px;
          margin-right: 15px;
          display: flex;
          .iconimg{
            width: 15px;
            height: 15px;
            margin-right: 5px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          div{
            height: 15px;
            line-height: 15px;
            color: rgb(150,150,150);
            font-size:1em;
          }
        }
      }
      .fdpbox{
        margin-top: 20px;
        width: 100%;
        padding: 10px 0;
      }
      .compiler{
        margin-top: 20px;
        width: 100%;
      }
      .scbtn,.noscbtn{
        width: 120px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        background-color: rgb(47,159,245);
        text-align: center;
        color: white;
        font-size: 1rem;
        margin: 0 auto;
        margin-top: 30px;
      }
      .noscbtn{
        background-color: #fff;
        border: 1px solid #eee;
        color: rgb(150,150,150);
      }
    }
    .replybox{
      margin-top: 30px;
      width: 96%;
      margin-left: 4%;
      .replytitle{
        width: 100%;
        display: flex;
        padding: 15px 0;
        font-size: 1em;
        font-weight: bold;
      }
    }
    .nodata{
      font-size: 1em;
      color: rgb(150,150,150);
      padding: 15px 0;
      text-align: center;
    }
    .fxalert{
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      text-align: center;
      font-size: 30px;
      color: white;
      img{
        width:100%;
      }
    }
  }
</style>
<style>
  .compiler{
    width: 100%;
    overflow-x: hidden;
  }
  .compiler>p{
    width: 100%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden !important;
  }
  .compiler img{
    width: 100% !important;

  }
  .compiler>p>img{
    width: 100%;
  }
  .compiler>p>a>img{
    width: 100%;
  }
  .compiler>ul>li>span>img{
    width: 100%;
  }
  .compiler>ul>li>a>img{
    width: 100%;
  }
  .compiler>img{
    width: 100%;
  }
</style>
