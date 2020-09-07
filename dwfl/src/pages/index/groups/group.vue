<template>
  <div class="container" v-if="showdata">
    <banner :bannerlist="bannerlist" v-if="bannerlist.length>0"></banner>
    <div class="serchbox" :style="'width:'+ minwidth">
      <serchcpn :serchobj="serchobj" @onfocus="onfocus"></serchcpn>
    </div>
    <div class="groupsbox" v-for="item in grouplist">
      <grouplist @jionfn="jionfn" :iteminfo="item"></grouplist>
    </div>
    <bottomnav :navarr="navarr" @checknav="checknav"></bottomnav>
  </div>
</template>

<script>
  import banner from '@/components/h5banner/banner'
  import bottomnav from '@/components/h5nav/bottomnav'
  import serchcpn from '@/components/groups/serchcpn'
  import grouplist from '@/components/groups/grouplist'
  import _cloneDeep from 'lodash/cloneDeep'
    export default {
        components: {bottomnav,banner,serchcpn,grouplist},
        data() {
            return {
              minwidth:'',
              showdata:false,
              serchobj:{
                placher:'搜索社群或动态',
              },
              navarr:[
                {img:'/static/images/home1.png',val:'首页',click:false,type:1},
                {img:'/static/images/shequn2.png',val:'社群',click:true,type:2},
                {img:'/static/images/wode1.png',val:'我的',click:false,type:3},
              ],
              grouplist:[],
              bannerlist:[],
              alldata:'',
            }
        },
        props: {},
        methods: {
          checknav(obj){
            console.log(obj)
          },
          onfocus(){
            window.location.href = '#/serchpage'
          },
          jionfn(obj){
            window.location.href = '#/group_detail?id='+obj.id+'&&title='+obj.title
          },
          setdata(obj){

            //设置banner
            for (let i =0;i<obj.banner.length;i++){
              var newarr = {url: 'javascript:', img: obj.banner[i].covers_pic,link:obj.banner[i].link,title: '送你一朵fua'}
              this.bannerlist.push(newarr)
            }
            //设置list
            this.grouplist = _cloneDeep(obj.list)
            console.log(this.grouplist,'this.grouplist')
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/Community/community'
            let data = {}
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
        created() {
          document.title ='社群'
          this.getdata()
          this.minwidth = this.docwidth+'px'
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
    .groupsbox{
      width: 100%;
      margin-top: 15px;
      overflow: hidden;
    }
  }
</style>
