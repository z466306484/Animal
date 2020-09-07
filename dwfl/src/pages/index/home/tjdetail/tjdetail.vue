<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="serchbox" v-if="cate_id">
      <serchcpn :serchobj="serchobj" @changefn="changefn"></serchcpn>
    </div>
    <tjlist @clickdetai="clickdetai" v-if="alldata.length" :alldata="alldata"></tjlist>
    <nodata :nodata="nodata"></nodata>
    <bottomnav v-if="!cate_id" :navarr="navarr" @checknav="checknav"></bottomnav>
  </div>
</template>

<script>
  import bottomnav from '@/components/h5nav/bottomnav'
  import tjlist from '@/components/tjlist/tjlist'
  import nodata from '@/components/homeinfo/nodata'
  import serchcpn from '@/components/groups/serchcpn'
  import _cloneDeep from 'lodash/cloneDeep'
    export default {
        components: {bottomnav,tjlist,nodata,serchcpn},
        data() {
            return {
              alldata:"",
              showdata:false,
              serchobj:{
                placher:'搜索要找的资料',
              },
              navarr:[
                {img:'/static/images/home2.png',val:'首页',click:true,type:1},
                {img:'/static/images/shequn1.png',val:'社群',click:false,type:2},
                {img:'/static/images/wode1.png',val:'我的',click:false,type:3},
              ],
              mincht:'',
              nodata:'就推荐这么多吧~',
              cate_id:'',
            }
        },
        props: {},
        mounted(){
        this.mincht = this.docheight+'px'
        },
        methods: {
          changefn(obj){
            let _this =this
            let url = this.apis+'/wx/Material/search'
            let data = {
              search:obj.val
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                _this.alldata = res.data.data
              }
            })
          },
          checknav(obj){
            console.log(obj)
          },
          clickdetai(obj){
            window.location.href = '#/Information_details?id='+obj.id+'&&title='+obj.title
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/Classify/get_clas'
            let data = {
              cate_id:this.cate_id
            }
            if(!this.cate_id){
              url = this.apis+'/wx/Material/more'
              data = {}
            }
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.alldata = res.data.data
                _this.showdata = true
              }
            })
          }
        },
        created() {
          if(this.$route.query.cate_id){
            this.cate_id = this.$route.query.cate_id
            document.title =this.$route.query.title
          }else {
            document.title ='推荐资料'
          }
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    overflow: hidden;
    padding-bottom: 60px;
    background-color: rgb(245,245,245);
    .serchbox{
      width: 100%;
      padding: 10px 0;
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
    }
  }
</style>
