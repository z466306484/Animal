<template>
  <div class="container" :style="'min-height:'+mincht">
    <div class="serchbox">
      <serchcpn :serchobj="serchobj" @changefn="changefn"></serchcpn>
    </div>
    <div class="navtable">
      <div :class="item.class" v-for="item in navarr" @click="chenav(item.type)">{{item.val}}</div>
    </div>
    <div class="serchcontent">
      <div class="aertgroup" v-if="aertgroup">
        <div class="groupsbox" v-for="item in groupdata">
          <grouplist @jionfn="jionfn" :iteminfo="item"></grouplist>
        </div>
      </div>
      <div class="replydata" v-if="replydata">
        <reply :updatedata="dtdata" :updatetype="updatetype" @cnew="cnew"></reply>
      </div>
      <nodata :nodata="nodata"></nodata>
    </div>
  </div>
</template>

<script>
  import reply from '@/components/homeinfo/reply'
  import serchcpn from '@/components/groups/serchcpn'
  import grouplist from '@/components/groups/grouplist'
  import homeinfo from '@/components/homeinfo/homeinfo'
  import nodata from '@/components/homeinfo/nodata'
  import bus from '@/assets/evnetBus'
    export default {
        components: {serchcpn,grouplist,homeinfo,nodata,reply},
        data() {
            return {
              mincht:'',
              nodata:'没有更多了~~',
              aertgroup:false,
              replydata:true,
              serchobj:{
                placher:'搜索社群或动态',
              },
              navarr:[
                {class:'navbtn1',val:'动态',type:1},
                {class:'navbtn',val:'社群',type:2},
              ],
              updatetype:4,
              groupdata:'',
              dtdata:'',
              keyval:'',
              navtype:1,
            }
        },
        props: {},
        methods: {
          jionfn(obj){
            window.location.href = '#/group_detail?id='+obj.id
          },
          changefn(obj){
            this.keyval = obj.val
            if(this.navtype == 1){
              this.getdt(obj.val)
            }else{
              console.log(1112)
              this.getgroup(obj.val)
              console.log(111)
            }
          },
          cnew(obj){
            window.location.href = '#/dt_detail?id='+obj.id
          },
          chenav(type){
            if(type == 1){
              this.navarr[0].class = 'navbtn1'
              this.navarr[1].class = 'navbtn'
              this.replydata = true
              this.navtype = 1
              this.aertgroup = false
            }else {
              this.navarr[1].class = 'navbtn1'
              this.navarr[0].class = 'navbtn'
              this.navtype = 2
              this.replydata = false
              this.aertgroup = true
            }
            bus.$emit('clearval')
          },
          clicksure(obj){
            console.log(obj)
            if(obj.type  == 1){
              window.location.href = '#/tjdetail'
            }
          },
          getdt(val){
            let _this = this
            let url = this.apis+'/wx/Community/dynamic_search'
            let data = {
              search:val
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.dtdata = res.data.data
              }
            })
          },
          getgroup(val){
            let _this = this
            let url = this.apis+'/wx/Community/community_search'
            let data = {
              search:val
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.groupdata = res.data.data
              }
            })
          },
        },
        mounted(){
        this.mincht = this.docheight+'px'
      },
        created() {
          document.title = '搜索动态'
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .serchbox{
      width: 100%;
      padding: 10px 0;
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
    }
    .navtable{
      width: 100%;
      height: 50px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      .navbtn,.navbtn1{
        width: 60px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 1em;
      }
      .navbtn1{
        color:rgb(47,157,244);
        border-bottom: 2px solid rgb(47,157,244);
      }
    }
    .serchcontent{
      width: 100%;
      .aertgroup{
        width: 100%;
        overflow: hidden;
        .groupsbox{
          width: 100%;
          margin-top: 15px;
        }
      }
      .replydata{
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        margin-top: 10px;
      }
    }
  }
</style>
