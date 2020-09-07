<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata && showdata1">
    <div class="navtable">
      <div :class="item.class" v-for="item in navarr" @click="chenav(item.type)">{{item.val}}</div>
    </div>
    <div class="joinbox">
      <div class="joinhas" v-if="nowdata.list && nowdata.list.length>0">
        <mygrouplist :nowdata="nowdata" @editefn="editefn" :grouptype="grouptype" @dlefn="dlefn" @clickitem="clickitem"></mygrouplist>
      </div>
    </div>
    <div class="joinnot" v-if="nowdata.type==2 || (nowdata.type==1&&nowdata.list.length==0)">
      <div class="notext" v-if="!nowdata.list || nowdata.list.length==0">{{notext}}</div>
      <div class="joinbtn">
        <div class="joinicon el-icon-plus"></div>
        <div class="jointext" @click="cjfn(nowdata.type)">{{jointext}}</div>
      </div>
    </div>
    <confirm
      v-model="showalt"
      title="删除此社群"
      @on-confirm="onConfirm">
      <p style="text-align:center;">确认删除此社群</p>
    </confirm>
    <bottomnav :navarr="bottomnavarr"></bottomnav>
  </div>
</template>

<script>
  import bottomnav from '@/components/h5nav/bottomnav'
  import mygrouplist from '@/components/mypage/mygrouplist'
  import _cloneDeep from 'lodash/cloneDeep'
  import addbtn from '@/components/groups/addbtn'
  import { Confirm } from 'vux'
    export default {
        components: {mygrouplist,Confirm,bottomnav,addbtn},
        data() {
            return {
              bottomnavarr:[
                {img:'/static/images/home1.png',val:'首页',click:false,type:1},
                {img:'/static/images/shequn1.png',val:'社群',click:false,type:2},
                {img:'/static/images/wode2.png',val:'我的',click:true,type:3},
              ],
              showdata:false,
              showdata1:false,
              mincht:'',
              showalt:false,
              clickid:'',
              navarr:[
                {class:'navbtn1',val:'我加入的',type:1},
                {class:'navbtn',val:'我创建的',type:2},
              ],
              mycreatedata:'',
              mycommunity:'',
              nowdata:'',
              grouptype:2,
              notext:'你还没有加入任何社群',
              jointext:'现在加入',
            }
        },
        props: {},
        methods: {
          addbtn(){
            window.location.href = '#/creatgroup?type=1'
          },
          onConfirm(){
            console.log('删除此社群')
            let _this = this
            let url = this.apis+'/wx/my/delcom'
            let data = {
              id:this.clickid,
            }
            this.axios.post(url,data).then(function (res) {
              console.log(res.data)
              if(res.data.code == 10000){
                // _this.mycreatedata = res.data.data
                _this.getcrtdata(2)
              }
            })
          },
          clickitem(obj){
            window.location.href = '#/group_detail?id='+obj.id+'&&title='+obj.title
          },
          editefn(obj){
            window.location.href = '#/creatgroup?type=2&&id='+obj.id
          },
          cjfn(type){
            if(type == 2){
              window.location.href = '#/creatgroup?type=1'
            }else if(type == 1){
              window.location.href = '#/group'
            }
          },
          dlefn(obj){
            this.showalt = true
            this.clickid = obj.id
          },
          chenav(type){
            if(type == 1){
              this.nowdata = _cloneDeep(
                {
                  type:1,
                  list:this.mycommunity
                }
              )
              this.notext = '你还没有加入任何社群',
              this.jointext = '现在加入',
              this.navarr[0].class = 'navbtn1'
              this.navarr[1].class = 'navbtn'
            }else {
              this.nowdata = _cloneDeep(
                {
                  type:2,
                  list:this.mycreatedata
                }
              )
              this.notext = '你还没有创建任何社群',
              this.jointext = '现在创建',
              this.navarr[1].class = 'navbtn1'
              this.navarr[0].class = 'navbtn'
            }
          },
          getcrtdata(type){
            let _this = this
            let url = this.apis+'/wx/my/createcommunity'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              console.log(res.data)
              if(res.data.code == 10000){
                _this.mycreatedata = _cloneDeep(res.data.data)
                if(type ==2){
                  _this.chenav(2)
                }
                _this.showdata = true
              }
            })
          },
          getjoindata(){
            let _this = this
            let url = this.apis+'/wx/my/mycommunity'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              console.log(res.data)
              if(res.data.code == 10000){
                _this.mycommunity = _cloneDeep(res.data.data)
                _this.chenav(1)
                _this.showdata1 = true
              }
            })
          },
        },
        mounted(){
          this.mincht = this.docheight+'px'
        },
        created() {
          document.title = '我的社群'
          this.getcrtdata(1)
          this.getjoindata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .navtable{
      width: 100%;
      height: 50px;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      .navbtn,.navbtn1{
        width: 70px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 1.1em;
      }
      .navbtn1{
        color:rgb(47,157,244);
        border-bottom: 2px solid rgb(47,157,244);
      }
    }
    .joinbox{
      width: 100%;
      .joinhas{
        width: 100%;
        padding-bottom: 60px;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
    .joinnot{
      width: 100%;
      overflow: hidden;
      text-align: center;
      padding-bottom: 60px;
      .notext{
        margin-top: 100px;
        font-size: 1em;
        color: rgb(150,150,150);
      }
      .joinbtn{
        width: 140px;
        line-height: 45px;
        box-sizing: border-box;
        height: 45px;
        margin: 0 auto;
        border-radius: 22.5px;
        font-size: 1em;
        margin-top: 40px;
        background-color: rgb(47,157,245);
        color: white;
        display: flex;
        .joinicon{
          height: 45px;
          line-height: 45px;
          margin-left: 30px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
