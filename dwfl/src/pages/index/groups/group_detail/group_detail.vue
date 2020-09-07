<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <groupdetailcpn :community="community" @joinfn="joinfn"></groupdetailcpn>
    <group-introduction :info="community.introduction" @toeasygroup="toeasygroup"></group-introduction>
    <div class="serchbox">
      <serchcpn :serchobj="serchobj" @onfocus="onfocus"></serchcpn>
    </div>
    <div class="replydata">
      <reply :updatedata="detailist" :updatetype="updatetype" @cnew="cnew" @clickcz1="clickcz"></reply>
    </div>
    <nodata :nodata="nodata"></nodata>
    <addbtn @addbtn="addbtn"></addbtn>
    <bottomnav :navarr="navarr" @checknav="checknav"></bottomnav>
    <div class="phonealert" v-if="phonealert">
      <div class="phbox">
        <logincpn :type="2" @toxieyi="toxieyi" @loginfn="loginfn"></logincpn>
      </div>
      <div class="closebox el-icon-circle-close" @click="closebox"></div>
    </div>
    <sendalert @aclose="aclose" @checktype="checktype" :sendobj="sendobj" v-if="sendalert"></sendalert>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <div class="xieyibox" v-if="showxieyi">
      <div class="xieyinei">
        <div class="closexieyi" @click="showxieyi = false">×</div>
        <div class="titlexieyi">{{xieyititle}}</div>
        <div class="contentxieyi" v-html="protocol"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import reply from '@/components/homeinfo/reply'
  import logincpn from '@/components/mypage/logincpn'
  import groupdetailcpn from '@/components/groups/groupdetailcpn'
  import groupIntroduction from '@/components/groups/groupIntroduction'
  import serchcpn from '@/components/groups/serchcpn'
  import addbtn from '@/components/groups/addbtn'
  import homeinfo from '@/components/homeinfo/homeinfo'
  import nodata from '@/components/homeinfo/nodata'
  import bottomnav from '@/components/h5nav/bottomnav'
  import sendalert from '@/components/groups/sendalert'
  import _cloneDeep from 'lodash/cloneDeep'
  import { Toast } from 'vux'
  import bus from '@/assets/evnetBus';
    export default {
        components: {groupdetailcpn,groupIntroduction,serchcpn,homeinfo,nodata,bottomnav,addbtn,reply,logincpn,sendalert,Toast},
        data() {
            return {
              updatetype:1,
              sendalert:false,
              showxieyi:false,
              sendobj:{
                type:1,
              },
              serchobj:{
                placher:'搜索动态',
              },
              mincht:'',
              navarr:[
                {img:'/static/images/home1.png',val:'首页',click:false,type:1},
                {img:'/static/images/shequn2.png',val:'社群',click:true
                  ,type:2},
                {img:'/static/images/wode1.png',val:'我的',click:false,type:3},
              ],
              nodata:'底线可不能逾越哦~~',
              community_id:'',
              alldata:'',
              community:'',
              detailist:'',
              showdata:false,
              phonealert:false,
              isbinph:false,
              dynamic_id:'',
              //toas
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
              xieyititle:'',
              protocol:'',
            }
        },
        props: {},
        methods: {
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
          clickcz(obj){
            console.log(obj,'obj')
            if(obj.type == 3){
              let _this = this
              let url = this.apis+'/wx/Community/dynamic_zan'
              let data = {
                dynamic_id:obj.item.dynamic_id,
                is_zan:obj.item.is_zan,
              }
              console.log(data,'data')
              this.axios.post(url,data).then(function (res) {
                if(res.data.code == 10000){
                  console.log(res.data)
                  _this.getdata()
                }
              })
            }
          },
          checktype(obj){
            window.location.href = '#/senpage?type='+obj.type+'&&id='+this.community_id
          },
          aclose(){
            this.sendalert = false
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
          addbtn(){
            let _this = this
            if(_this.alldata.community.isjoin==0) {
              _this.toastshow = true
              _this.toasttext = '请加入群再发布动态'
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
          onfocus(){
            window.location.href = '#/serchpage'
          },
          cnew(obj){
            window.location.href = '#/dt_detail?id='+obj.id
          },
          toeasygroup(){
            window.location.href = '#/gtoup_easy?id='+this.community_id
          },
          joinfn(){
            console.log(1222)
            let _this = this
            let url = this.apis+'/wx/Community/community_join'
            let data = {
              community_id:this.community_id,
              isjoin:this.alldata.community.isjoin,
            }
            console.log(data)
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
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
          checknav(obj){
            console.log(obj)
            if(obj.type == 2){
              window.location.href = '#/group'
            }
          },
          setdata(obj){
            this.community = _cloneDeep(obj.community)
            if(obj.list.length>0 &&obj.list){
              console.log(obj.list,'obj.list')
              for(let i = 0;i<obj.list.length;i++){
                if(obj.list[i].is_zan==0){
                  var arr = [
                    {img:'/static/images/fenxiang.png',num:0,type:1},
                    {img:'/static/images/reply.png',num:obj.list[i].pl,type:2},
                    {img:'/static/images/good.png',num:obj.list[i].dz,type:3},
                  ]
                }else {
                  var arr = [
                    {img:'/static/images/fenxiang.png',num:0,type:1},
                    {img:'/static/images/reply.png',num:obj.list[i].pl,type:2},
                    {img:'/static/images/good1.png',num:obj.list[i].dz,type:3},
                  ]
                }
                // obj.list[i]['ly'] = obj.list[i].pl
                obj.list[i]['czarr'] = arr
                obj.list[i]['istype'] = 1
              }
              this.detailist = _cloneDeep(obj.list)
              // bus.$emit('clickgood',this.detailist)
              console.log(this.detailist,'this.detailist')
            }
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/Community/community_sel'
            console.log(this.community_id,'this.community_id')
            let data = {
              community_id:this.community_id
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
          document.title = '社群详情'
          if(this.$route.query.cate_id){
            this.community_id = this.$route.query.cate_id
          }
          if(this.$route.query.id){
            this.community_id = this.$route.query.id
          }
          if(this.$route.query.title){
            document.title = this.$route.query.title
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
    .serchbox{
      width: 100%;
      padding: 10px 0;
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
    }
    .replydata{
      width: 100%;
      box-sizing: border-box;
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
