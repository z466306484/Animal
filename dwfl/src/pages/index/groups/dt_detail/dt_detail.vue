<template>
  <div class="container" v-if="showdata" :style="'min-height:'+mincht">
    <div class="detailinfo">
      <!--<homeinfo @clicksure="clicksure" :infodata="updatedata"></homeinfo>-->
      <reply @deldtfn="delfnalert" @toolddt="toolddt" :updatedata="updatedata" :updatetype="updatetype"></reply>
    </div>
    <div class="replybox2">
      <div class="replytitle">
        <div>全部留言</div>
        <div style="margin-left: 20px">{{alldata.sel.pl}}</div>
      </div>
      <detailreply @replyfn="replyfn" @lyczfn="lyczfn" @goodbtn="goodbtn" :relpyarr="relpyarr" showborder="1" type="1"></detailreply>
    </div>
    <div class="nodata">没有更多了</div>
    <replybtn @checknav="zldz" :navarr="navarr" v-if="navarr.length"></replybtn>
    <sendalert @aclose="aclose" @surefn="dtsurefn" :sendobj="sendobj" :alldata="alldata" v-if="sendalert"></sendalert>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <actionsheet v-model="showcofi" :menus="menus1" @on-click-menu="clickmenu"></actionsheet>
    <confirm
      v-model="showalt"
      title="删除此动态"
      @on-confirm="deldtfn">
      <p style="text-align:center;">确认删除此动态</p>
    </confirm>
    <div class="phonealert" v-if="phonealert">
      <div class="phbox">
        <logincpn :type="2" @toxieyi="toxieyi" @loginfn="loginfn"></logincpn>
      </div>
      <div class="closebox el-icon-circle-close" @click="closebox"></div>
    </div>
    <div class="xieyibox" v-if="showxieyi">
      <div class="xieyinei">
        <div class="xbox"><div class="closexieyi" @click="showxieyi = false">×</div></div>
        <div class="titlexieyi">{{xieyititle}}</div>
        <div class="contentxieyi" v-html="protocol"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import reply from '@/components/homeinfo/reply'
  import replybtn from '@/components/detailreply/replybtn'
  import detailreply from '@/components/detailreply/detailreply'
  import homeinfo from '@/components/homeinfo/homeinfo'
  import logincpn from '@/components/mypage/logincpn'
  import sendalert from '@/components/groups/sendalert'
  import _cloneDeep from 'lodash/cloneDeep'
  import { Toast,Actionsheet,Confirm  } from 'vux'
    export default {
        components: {homeinfo,detailreply,replybtn,sendalert,reply,Toast,Actionsheet,Confirm,logincpn},
        data() {
            return {
              sendalert:false,
              showalt:false,
              phonealert:false,
              showxieyi:false,
              xieyititle:'',
              protocol:'',
              updatetype:3,
              sendobj:{
                type:3,
              },
              showcofi:false,
              menus1:{
                reply:'评论',
                dle:'删除',
              },
              updatedata:[],
              navarr:[
                {img:'/static/images/fenxiangpy.png',num:55,type:1},
                {img:'/static/images/reply.png',num:22,type:2},
                {img:'/static/images/good.png',num:111,type:3},
              ],
              dynamic_id:'',
              alldata:'',
              relpyarr:[],
              showdata:false,
              is_zan:0,
              replyuser_id:0,
              replyuser_name:0,
              replytype:1,
              sendtype:1,
              mincht:'',
              //toast提示
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
              isbinph:false,
            }
        },
        props: {},
      methods: {
        addbtn(){
          let _this = this
          if(_this.alldata.sel.isjoin==0) {
            _this.toastshow = true
            _this.toasttext = '请加入群'
            _this.toatype = 'cancel'
            return false
          }
          let url = this.apis+'/wx/Community/phone'
          let data = {}
          this.axios.post(url,data).then(function (res) {
            if(res.data.code == 10000){
              _this.isbinph = true
              _this.sendalert = true
            }else {
              _this.phonealert = true
            }
          })
        },
        loginfn(){
          console.log(2222)
          this.phonealert = false
          this.sendalert = true
        },
        closebox(){
          console.log(1111)
          this.phonealert = false
        },
        toxieyi(){
          let _this = this
          let url = this.apis+'/wx/Community/xieyi'
          let data = {}
          this.axios.post(url,data).then(function (res) {
            if(res.data.code == 10000){
              console.log(res.data)
              _this.xieyititle = res.data.data.title
              _this.protocol = res.data.data.protocol
              _this.showxieyi = true
            }else {
            }
          })
        },
          delfnalert(){
            this.showalt = true
          },
          toolddt(obj){
              console.log(obj.id)
            this.dynamic_id = obj.id
            this.getdata()
          },
          dellyfn(id){
            let _this = this
            let url = this.apis+'/wx/Community/message_del'
            let data = {
              message_id:id
            }
            console.log(data)
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.getdata()
              }else {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'cancel'
              }
            })
          },
          clickmenu(obj){
          if(obj == 'reply'){
            this.sendalert = true
            this.replytype = 3
            this.sendtype = 4
          }else {
            this.dellyfn(this.replyuser_id)
          }
        },
          lyczfn(obj){
            console.log(obj)
            this.replyuser_id = obj.item.message_id
            this.showcofi = true
          },
          deldtfn(){
            let _this = this
            let url = this.apis+'/wx/Community/dynamic_del'
            let data = {
              dynamic_id:this.dynamic_id
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                _this.$router.push({path:'/group_detail?id='+_this.alldata.sel.community_id})
              }else {
                _this.toastshow = true
                _this.toasttext = res.data.msg
                _this.toatype = 'cancel'
              }
            })
          },
          replyfn(obj){
            console.log(obj.id)
            this.replyuser_id = obj.id
            this.replyuser_name = obj.name
            console.log(obj.name)
            this.sendobj = {
              type:3,
            }
            this.replytype =2
            this.sendtype =2
            this.sendalert = true
          },
          dtdz(obj){
            let _this = this
            let url = this.apis+'/wx/Community/dynamic_zan'
            let data = {
              dynamic_id:this.dynamic_id,
              is_zan:this.is_zan,
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
          dtsurefn(obj){
            console.log(obj.plcval)
            let _this = this
            if(obj.plcval==''){
              _this.toastshow = true
              _this.toasttext = '请输入内容'
              _this.toatype = 'cancel'
              return false
            }
            let url = this.apis+'/wx/Community/dynamic_message'
            let data = {
              dynamic_id:this.dynamic_id,
              content:obj.plcval,
            }
            if(this.sendtype == 2){
              url = this.apis+'/wx/Community/reply_message'
              data['message_id'] = this.replyuser_id
            }else if(this.sendtype == 3){
              url = this.apis+'/wx/Community/relay'
              data = {
                dynamic_id:this.dynamic_id,
                community_id:this.alldata.sel.community_id,
                user_id:this.alldata.sel.user_id,
                picture:this.alldata.sel.picture,
                video:this.alldata.sel.video,
                content:obj.plcval,
              }
            }else if(this.sendtype == 4){
              url = this.apis+'/wx/Community/reply_message'
              data = {
                dynamic_id:this.dynamic_id,
                message_id:this.replyuser_id,
                content:obj.plcval,
              }
            }
            this.axios.post(url,data).then(function (res) {
                console.log(res.data)
                _this.toastshow = true
                _this.toasttext = res.data.msg
                if(res.data.code == 10000){
                  _this.toatype = 'success'
                  _this.getdata()
                }else {
                  _this.toatype = 'cancel'
                }
                _this.sendalert = false
            })
          },
          zldz(obj){
            console.log(obj)
            if(obj.type ==3){
              this.dtdz(obj)
            }else if(obj.type ==2){
              this.sendobj = {
                type:3,
              }
              this.replytype = 1
              this.sendtype = 1
              this.sendalert = true
            }else if(obj.type ==1){
              this.sendobj = {
                type:2,
              }
              this.replytype = 3
              this.sendtype = 3
              this.addbtn()
              // this.sendalert = true
            }
          },
          goodbtn(obj){
            console.log(obj,'obj')
            let _this = this
            let url = this.apis+'/wx/Community/message_zan'
            let data = {
              message_id:obj.id,
              is_zan:obj.is_dz,
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
          clicksure(obj){
            console.log(obj)
            if(obj.type  == 1){
              window.location.href = '#/tjdetail'
            }
          },
          aclose(){
            this.sendalert = false
          },
          setdata(obj){
            var listp = obj.listP
            for(let i =0;i<listp.length;i++){
              listp[i]['comment_id'] = listp[i].message_id
              listp[i]['is_dz'] = listp[i].is_zan
            }
            this.relpyarr=_cloneDeep(listp)
            this.updatedata = _cloneDeep([obj.sel])
            console.log(this.updatedata,'this.updatedata')
            this.is_zan = _cloneDeep(obj.sel.is_zan)
            if(obj.sel.is_zan == 1){
              var newarr = [
                {img:'/static/images/fenxiang.png',num:0,type:1},
                {img:'/static/images/reply.png',num:obj.sel.pl,type:2},
                {img:'/static/images/good1.png',num:obj.sel.dz,type:3},
              ]
            }else {
              var newarr = [
                {img:'/static/images/fenxiang.png',num:0,type:1},
                {img:'/static/images/reply.png',num:obj.sel.pl,type:2},
                {img:'/static/images/good.png',num:obj.sel.dz,type:3},
              ]
            }
            this.navarr=_cloneDeep(newarr)
          },
          getdata() {
              let _this = this
              let url = this.apis+'/wx/Community/dynamic_sel'
              let data = {
                dynamic_id:this.dynamic_id
              }
              this.axios.post(url,data).then(function (res) {
                if(res.data.code == 10000){
                  console.log(res.data)
                  _this.alldata = res.data.data
                  _this.setdata(res.data.data)
                  _this.showdata = true
                }
              })
          }
        },
        mounted(){
          this.mincht = this.docheight+'px'
        },
        created() {
          document.title = '动态详情'
          if(this.$route.query.id){
            this.dynamic_id = this.$route.query.id
          }
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    padding-bottom: 60px;
    box-sizing: border-box;
    overflow: hidden;
    .detailinfo{
      background-color: #fff;
    }
    .replybox2{
      margin-top: 15px;
      width: 100%;
      background-color: #fff;
      .replytitle{
        width: 100%;
        display: flex;
        padding: 15px 4%;
        height: 20px;
        line-height: 20px;
        font-size: 1rem;
        font-weight: bold;
      }
      .repitem{
        width: 100%;
        box-sizing: border-box;
        padding-left: 4%;
      }
    }
    .nodata{
      font-size: 0.9em;
      color: rgb(150,150,150);
      text-align: center;
      padding: 15px 0;
      background-color: #fff;
    }
    .phonealert{
      width: 100%;
      background-color: rgba(0,0,0,0.3);
      position: fixed;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 100;
      overflow: hidden;
      .phbox{
        width: 80%;
        margin-left: 10%;
        background-color: #fff;
        border-radius: 10px;
        padding: 30px 0;
        margin-top: 50px;
        box-sizing: border-box;
      }
      .closebox{
        width: 100%;
        text-align: center;
        font-size: 40px;
        margin-top: 20px;
        color: white;
      }
    }
    .xieyibox{
      position: fixed;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      top: 0;
      left: 0;
      z-index: 1000;
      .xieyinei{
        padding: 20px;
        box-sizing: border-box;
        width: 80%;
        margin-left: 10%;
        border-radius: 5px;
        margin-top: 10%;
        overflow: hidden;
        height: 80%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        .xbox{
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          height: 30px;
          .closexieyi{
            width: 30px;
            height: 30px;
            font-size: 1.4rem;
            cursor: pointer;
            text-align: center;
            line-height: 30px;
          }
        }
        .titlexieyi{
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
          padding-bottom: 10px;
        }
        .contentxieyi{
          flex: 1;
          overflow: scroll;
          width: 100%;
          font-size: 1rem;
        }
      }
    }
  }
</style>
<style>
  .contentxieyi>p{
    width: 100%;
    overflow: hidden;
  }
  .contentxieyi>p>a{
    width: 100%;
  }
  .contentxieyi>p>a>strong{
    width: 100%;
  }
</style>
