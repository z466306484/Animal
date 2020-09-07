<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="replydata">
      <reply :updatedata="alldata" :updatetype="updatetype" @cnew="cnew" @delbtn="delbtn"></reply>
    </div>
    <nodata :nodata="nodata"></nodata>
    <confirm
      v-model="showalt"
      title="删除此动态"
      @on-confirm="onConfirm">
      <p style="text-align:center;">确认删除此动态</p>
    </confirm>
  </div>
</template>

<script>
  import homeinfo from '@/components/homeinfo/homeinfo'
  import nodata from '@/components/homeinfo/nodata'
  import reply from '@/components/homeinfo/reply'
  import _cloneDeep from 'lodash/cloneDeep'
  import { Confirm } from 'vux'
  export default {
    components: {homeinfo,nodata,reply,Confirm},
    data() {
      return {
        mincht:'',
        showalt:false,
        nodata:'底线可不能逾越哦~~',
        updatetype:6,
        alldata:'',
        checkid:'',
        user_id:'',
        showdata:false,
      }
    },
    props: {},
    methods: {
      clicksure(obj){
        console.log(obj)
        if(obj.type  == 1){
          window.location.href = '#/tjdetail'
        }
      },
      onConfirm(){
        let _this = this
        let url = this.apis+'/wx/my/del'
        let data = {
          id:this.checkid
        }
        this.axios.post(url,data).then(function (res) {
          console.log(res.data)
          if(res.data.code == 10000){
            _this.getdata()
          }
        })
      },
      delbtn(obj){
        this.showalt = true
        this.checkid = obj.id
      },
      cnew(obj){
        console.log(22222)
        window.location.href = '#/dt_detail?id='+obj.id
      },
      getdata(){
        let _this = this
        let url = this.apis+'/wx/Community/his_dynamic'
        let data = {
          user_id:this.user_id,
        }
        this.axios.post(url,data).then(function (res) {
          console.log(res.data)
          if(res.data.code == 10000){
            _this.alldata = _cloneDeep(res.data.data)
            _this.showdata = true
          }
        })
      }
    },
    mounted(){
      this.mincht = this.docheight+'px'
    },
    created() {
      document.title = 'TA的发布'
      if(this.$route.query.id){
        this.user_id = this.$route.query.id
      }
      this.getdata()
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    overflow: hidden;
    .replydata{
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      margin-top: 10px;
    }
  }
</style>
