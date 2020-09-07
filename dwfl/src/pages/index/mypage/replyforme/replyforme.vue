<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="repitem">
      <detailreply @replybtn="replybtn" @replyfn="replyfn" v-if="alldata" :relpyarr="alldata" showborder="1" type="2"></detailreply>
    </div>
    <sendalert @aclose="aclose" @surefn="surefn" :sendobj="sendobj" v-if="sendalert"></sendalert>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <nodata :nodata="nodata"></nodata>
  </div>
</template>

<script>
  import detailreply from '@/components/detailreply/detailreply'
  import nodata from '@/components/homeinfo/nodata'
  import sendalert from '@/components/groups/sendalert'
  import _cloneDeep from 'lodash/cloneDeep'
  import { Toast } from 'vux'
    export default {
        components: {detailreply,nodata,Toast,sendalert},
        data() {
            return {
              mincht:"",
              sendalert:false,
              replyobj:{
                showborder:false
              },
              sendobj:{
                type:3,
              },
              nodata:'没有更多了~~',
              relpyarr:[],
              alldata:'',
              //toas
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
              showdata:false,
              message_id:'',
              dynamic_id:'',
            }
        },
        props: {},
        methods: {
          replyfn(obj){
            console.log(obj.dtid)
            window.location.href = '#/dt_detail?id='+obj.dtid
          },
          aclose(){
            this.sendalert = false
          },
          replybtn(obj){
            this.message_id = obj.item.message_id
            this.dynamic_id = obj.item.dynamic_id
            this.sendalert = true
          },
          surefn(obj){
            if(obj.plcval ==''){
              this.toastshow = true
              this.toasttext = '请输入内容'
              this.toatype = 'cancel'
            }
            console.log(obj.plcval)
            let _this = this
            let url = this.apis+'/wx/Community/reply_message'
            let data = {
              message_id:this.message_id,
              dynamic_id:this.dynamic_id,
              content:obj.plcval,
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                _this.toatype = 'success'
                _this.getdata()
              }else {
                _this.toatype = 'cancel'
              }
              _this.toastshow = true
              _this.toasttext = res.data.msg
              _this.sendalert = false
            })
          },
          setred(){
            let _this = this
            let url = this.apis+'/wx/my/issee'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              _this.getdata()
            })
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/message'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)


                _this.alldata = _cloneDeep(res.data.data)
                // _this.alldata = _cloneDeep(arr)
                _this.showdata = true
              }
            })
          }
        },
        mounted(){
          this.mincht = this.docheight+'px'
        },
        created() {
          document.title = '回复我的'
          this.setred()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    overflow: hidden;
    .repitem{
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 4%;
      box-sizing: border-box;
      margin-top: 10px;
    }
  }
</style>
