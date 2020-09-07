<template>
  <div class="container" v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            系统日志
          </div>
          <div class="martial_table" style="margin-top: 50px;">
            <mterialtable :tableobj="tableobj" @todetai="todetai"></mterialtable>
          </div>
          <!--分页-->
          <div style="margin-top: 30px;display: flex;align-items: center;" v-if="pageobj!=''">
            <pagesnav @clickpage="clickpage" :pageobj="pageobj" :tabliearr="tableobj.allarr"></pagesnav>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  import mterialtable from '@/components/santable/santable6'
  import pagesnav from '@/components/sanpages/pages'
  import _cloneDeep from 'lodash/cloneDeep'
  import bus from '@/assets/evnetBus'
  export default {
    components: {leftnav,topnav,mterialtable,pagesnav},
    data() {
      return {
        mincht:'',
        showpage:false,
        pageobj:{
          pagenum:15,
          nowindex:1,
        },
        //顶部搜索框
        topInput:'',
        //表格传递参数
        tableobj:{
          tharr:[{width:'15%',val:'ID'},{width:'15%',val:'管理员'},{width:'15%',val:'操作详情'},{width:'10%',val:'操作ip'},{width:'15%',val:'操作时间'}],
          tabliearr:[],
          allarr:[]
        },
      }
    },
    props: {},
    methods: {
      clickpage(index){
        let _this = this
        _this.pageobj = _cloneDeep({
          pagenum:15,
          nowindex:index,
        })
        var objdata = _this.tableobj.allarr
        var nowarr = []
        if(objdata.length>_this.pageobj.pagenum*index){
          for(let i =(index-1)*_this.pageobj.pagenum;i<_this.pageobj.pagenum*index;i++){
            nowarr.push(objdata[i])
          }
        }else {
          for(let i =(index-1)*_this.pageobj.pagenum;i<objdata.length;i++){
            nowarr.push(objdata[i])
          }
        }
        _this.tableobj.tabliearr = _cloneDeep(nowarr)
        bus.$emit('checknav',{
          nowindex:index,
          tabarr:_this.tableobj.allarr,
        });
      },
      todetai(obj){
        if(obj.type==1){
          this.$router.push('/didex?id='+obj.id)
        }
      },
      initdata(){
        let _this=this
        this.axios.post(this.apis+"/san/sanlog/indexshow")
          .then((res)=> {
            if(res.data.code==10000){
              _this.tableobj.allarr=[]
              for(var i=0;i<res.data.data.length;i++){
                let my={}
                my.id=res.data.data[i].id
                my.index=i+1
                my.name=res.data.data[i].username
                my.yunum=res.data.data[i].action
                my.phnum=res.data.data[i].ip
                my.edittime=res.data.data[i].time
                _this.tableobj.allarr.push(my)
              }
              _this.clickpage(1)
              _this.showpage = true
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }

          })
          .catch(function (err) {

          })
      },
    },
    mounted(){
      this.mincht = (this.docheight)  +'px'
    },
    created() {
     this.initdata()
    },
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .rightbox{
      width: 87%;
      margin-left: 200px;
      height: 100%;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      .topbox{
        width: 100%;
        height: 71px;
      }
      .content{
        flex: 1;
        overflow-y: auto;
        width: 100%;
        background-color: #f2f2f2;
        .listbox{
          width: 97%;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          min-height: 500px;
          background-color: white;
          .martial_table{
            width: 95.5%;
            margin-left: 2.5%;
            min-height: 300px;
          }
          .listbox_title{
            padding: 15px 0px 15px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
          }
          .listbox_do{
            display: flex;
            margin-top: 30px;
            margin-bottom: 30px;
            .list_inputs{
              width:30%;
              margin-left:47%;
              .topinput{
                width: auto;
              }
            }
            .addbox{
              width: 30%;
              margin-left: 30px;
            }
          }
        }
      }
    }
  }

</style>
