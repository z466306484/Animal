<template>
  <div class="container"  v-if="showpage" :style="'min-height:'+ mincht">
      <leftnav></leftnav>
        <div class="rightbox">
          <div class="topbox">
            <topnav></topnav>
          </div>
      <!--首页内容-->
      <div class="content">
        <div class="index_top">
         <p>欢迎<span>动物福利教育平台</span>管理系统，祝你工作愉快！</p>
        </div>
        <div class="index_list">
            <div class="list_r list1">
              <p class="p1">{{showdata.user_number}}</p>
              <p>用户数</p>
            </div>
            <div class="list_r list2">
              <p class="p1">{{showdata.article_number}}</p>
              <p>资料数</p>
            </div>
            <div class="list_r list3">
              <p class="p1">{{showdata.community_number}}</p>
              <p>社群数</p>
            </div>
            <div class="list4">
              <p class="p1">{{showdata.dynamic_number}}</p>
              <p>动态数</p>
            </div>
        </div>
        <p class="index_title">今日数据</p>
        <div class="index_data">
             <div class="index_datalist">
               <div>
                 <img src="../../../../static/img/index1.png" alt="">
               </div>
               <div>
                 <div class="databox">
                   <p class="p1">{{showdata.user_number_today}}</p>
                   <p>用户新增</p>
                 </div>
               </div>
             </div>
             <div class="myhr"></div>
             <div class="index_datalist">
               <div><img src="../../../../static/img/index2.png" alt=""></div>
               <div>
                 <div class="databox">
                 <p class="p1">{{showdata.article_number_today}}</p>
                 <p>资料新增</p>
                 </div>
               </div>
             </div>
             <div class="myhr"></div>
             <div class="index_datalist">
               <div><img src="../../../../static/img/index3.png" alt=""></div>
               <div>
                 <div class="databox">
                 <p class="p1">{{showdata.community_number_today}}</p>
                 <p>社群新增</p>
                 </div>
               </div>
             </div>
             <div class="myhr"></div>
             <div class="index_datalist">
               <div><img src="../../../../static/img/index4.png" alt=""></div>
               <div>
                 <div class="databox">
                 <p class="p1">{{showdata.dynamic_number_today}}</p>
                 <p>动态新增</p>
                 </div>
               </div>
             </div>
        </div>
        <div class="index_echarts">
         <!--echarts列表-->
          <div class="echarts1">
            <p class="echarts_title">用户新增趋势</p>
            <div>
              <div  style="height: 60px">
                <button id="echarts1_small"  class="list_btn grid-demo1 removeBtn " v-bind:class="{ removeBtn1: isActive }" @click="userchooseData()">近7日趋势</button>
                <button id="echarts1_long" class="grid-demo1 removeBtn" v-bind:class="{ removeBtn1:!isActive}" @click="userchoosemData()">近30日趋势</button>
              </div>
              <div ref="main1" style="width: 100%;height:300px" id="main1">

              </div>
            </div>
          </div>
          <div>
            <p class="echarts_title">资料新增趋势</p>
            <div>
              <div  style="height: 60px">
                <button id="echarts2_small"  class="list_btn grid-demo1 removeBtn " v-bind:class="{ removeBtn1: isActive1 }" @click="actchooseData()">近7日趋势</button>
                <button id="echarts2_long" class="grid-demo1 removeBtn" v-bind:class="{ removeBtn1: !isActive1 }" @click="actchoosemData()">近30日趋势</button>
              </div>
              <div ref="main2" style="width: 100%;height:300px" id="main2">

              </div>
            </div>
          </div>
        </div>
        <div class="index_echarts echarts_footer">
          <!--echarts列表2-->
          <div class="echarts1">
            <p class="echarts_title">社群新增趋势</p>
            <div>
              <div  style="height: 60px">
                <button id="echarts3_small"  class="list_btn grid-demo1 removeBtn " v-bind:class="{ removeBtn1: isActive2 }" @click="communitychooseData()">近7日趋势</button>
                <button id="echarts3_long" class="grid-demo1 removeBtn" v-bind:class="{ removeBtn1: !isActive2 }" @click="communitychoosemData()">近30日趋势</button>
              </div>
              <div ref="main3" style="width: 100%;height:300px" id="main3">

              </div>
            </div>
          </div>
          <div>
            <p class="echarts_title">动态新增趋势</p>
            <div>
              <div  style="height: 60px">
                <button id="echarts4_small"  class="list_btn grid-demo1 removeBtn " v-bind:class="{ removeBtn1:isActive3 }" @click="dynamicchooseData()">近7日趋势</button>
                <button id="echarts4_long" class="grid-demo1 removeBtn" v-bind:class="{ removeBtn1: !isActive3 }" @click="dynamicchoosemData()">近30日趋势</button>
              </div>
              <div ref="main4" style="width: 100%;height:300px" id="main4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
    export default {
        components: {leftnav,topnav},
        data() {
            return {
              showpage:false,
              showdata:'',
              userday:1,
              actday:1,
              communityday:1,
              dynamicday:1,
              userdays:[],
              userdata:[],
              actdays:[],
              actdata:[],
              communitydays:[],
              communitydata:[],
              dynamicdays:[],
              dynamicdata:[],
              mincht:'',
              showuserdata:false,
              // 标志
              isActive:true,
              isActive1:true,
              isActive2:true,
              isActive3:true,
              fullscreenLoading: false
            }
        },
        props: {},
        mounted(){
          this.mincht = (this.docheight )  +'px'
          this.initdata();
        },
        methods: {
          initdata(){
            let _this=this
            this.axios.post(this.apis+"/san/Index/index")
              .then((res)=> {
              console.log(res.data)
              console.log(res.data.code)
                if(res.data.code==10000){
                  _this.showdata=res.data.data
                  for(var i=0;i<res.data.data.user_q.length;i++){
                    _this.userdays.push(res.data.data.user_q[i].month)
                    _this.userdata.push(res.data.data.user_q[i].count)
                  }
                  _this.setmain1();
                  for(var a=0;a<res.data.data.act_q.length;a++){
                    _this.actdays.push(res.data.data.act_q[a].month)
                    _this.actdata.push(res.data.data.act_q[a].count)
                  }
                  _this.setmain2();
                  for(var b=0;b<res.data.data.community_q.length;b++){
                    _this.communitydays.push(res.data.data.community_q[b].month)
                    _this.communitydata.push(res.data.data.community_q[b].count)
                  }
                  _this.setmain3();
                  for(var i=0;i<res.data.data.dynamic_q.length;i++){
                    _this.dynamicdays.push(res.data.data.dynamic_q[i].month)
                    _this.dynamicdata.push(res.data.data.dynamic_q[i].count)
                  }
                  _this.setmain4();
                  _this.showpage=true
                }
                if(res.data.code==10008){
                  _this.$router.push({path:'/san_login'})
                }
              })
              .catch(function (err) {

              })
          },
          setmain1(){
            let _this = this
            if(this.$refs.main1==undefined){
              setTimeout(()=>{
                _this.setmain1()
              },100)
            }else {
              var main = this.$refs.main1
              var days = this.userdays
              var data = this.userdata
              var name = '用户新增数'
              _this.userdrawLine(main,data,name,days)
            }
          },
          setmain2(){
            let _this = this
            if(this.$refs.main2==undefined){
              setTimeout(()=>{
                _this.setmain2()
              },100)
            }else {
                var main = this.$refs.main2
                var days = this.actdays
                var data = this.actdata
                var name = '资料新增数'
              _this.userdrawLine(main,data,name,days)
            }
          },
          setmain3(){
            let _this = this
            if(this.$refs.main3==undefined){
              setTimeout(()=>{
                _this.setmain3()
              },100)
            }else {
                var main = this.$refs.main3
                var days = this.communitydays
                var data = this.communitydata
                var name = '社群新增数'
              _this.userdrawLine(main,data,name,days)
            }
          },
          setmain4(){
            let _this = this
            if(this.$refs.main4==undefined){
              setTimeout(()=>{
                _this.setmain4()
              },100)
            }else {
                var main = this.$refs.main4
                var days = this.dynamicdays
                var data = this.dynamicdata
                var name = '动态新增数'
              _this.userdrawLine(main,data,name,days)
            }
          },
          userdrawLine(main,data,name,days){
            // 基于准备好的dom，初始化echarts实例
            let myChart1 = this.$echarts.init(main)
            // 绘制图表
            myChart1.setOption({
              tooltip: {
                trigger: 'axis'
              },
              xAxis:  {
                type: 'category',
                axisLine:{
                  show:false,
                },
                axisTick: {
                  show: false
                },
                boundaryGap: false,
                data:days
              },
              yAxis: {
                type: 'value',
                axisTick: {
                  show: false
                },
                axisLine:{
                  show:false
                },
                splitArea : {show : false},
              },
              series: [
                {
                  name:name,
                  type:'line',
                  itemStyle:{
                    color :'#FE981A',
                    borderWidth:2
                  },
                  symbolSize :10,
                  lineStyle:{
                    color:  '#43A0FD'
                  },
                  data:data,
                }
              ]
            })
            this.showuserdata = true
           },
          // 用户30
          userchoosemData(){
            // 获取用户
            this.isActive=false
            this.axios.post(this.apis+"/san/Index/trend_user",{
              type:2
            })
              .then((res)=> {
                this.userdays=[]
                this.userdata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.userdays.push(res.data.data[i].month)
                  this.userdata.push(res.data.data[i].count)
                }
                this.setmain1();
              })
              .catch(function (err) {

              })
          },
          userchooseData(){
            this.isActive=true
            this.axios.post(this.apis+"/san/Index/trend_user",{
              type:1
            })
              .then((res)=> {
                this.userdays=[]
                this.userdata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.userdays.push(res.data.data[i].month)
                  this.userdata.push(res.data.data[i].count)
                }
                this.setmain1();
              })
              .catch(function (err) {

              })
          },
         // 资料30
          actchoosemData(){
            // 获取用户
            this.isActive1=false
            this.axios.post(this.apis+"/san/Index/trend_act",{
              type:2
            })
              .then((res)=> {
                this.actdays=[]
                this.actdata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.actdays.push(res.data.data[i].month)
                  this.actdata.push(res.data.data[i].count)
                }
                this.setmain2();
              })
              .catch(function (err) {

              })
          },
          actchooseData(){
            this.isActive1=true
            this.axios.post(this.apis+"/san/Index/trend_act",{
              type:1
            })
              .then((res)=> {
                this.actdays=[]
                this.actdata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.actdays.push(res.data.data[i].month)
                  this.actdata.push(res.data.data[i].count)
                }
                this.setmain2();
              })
              .catch(function (err) {

              })
          },
          // 社群30
          communitychoosemData(){
            this.isActive2=false
            // 获取用户
            this.axios.post(this.apis+"/san/Index/trend_community",{
              type:2
            })
              .then((res)=> {
                this.communitydays=[]
                this.communitydata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.communitydays.push(res.data.data[i].month)
                  this.communitydata.push(res.data.data[i].count)
                }
                this.setmain3();
              })
              .catch(function (err) {

              })
          },
          communitychooseData(){
            this.isActive2=true
            this.axios.post(this.apis+"/san/Index/trend_community",{
              type:1
            })
              .then((res)=> {
                this.communitydays=[]
                this.communitydata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.communitydays.push(res.data.data[i].month)
                  this.communitydata.push(res.data.data[i].count)
                }
                this.setmain3();
              })
              .catch(function (err) {

              })
          },
          //动态30
          dynamicchoosemData(){
            this.isActive3=false
            // 获取用户
            this.axios.post(this.apis+"/san/Index/trend_dynamic",{
              type:2
            })
              .then((res)=> {
                this.dynamicdays=[]
                this.dynamicdata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.dynamicdays.push(res.data.data[i].month)
                  this.dynamicdata.push(res.data.data[i].count)
                }
                this.setmain4();
              })
              .catch(function (err) {

              })
          },
          dynamicchooseData(){
            this.isActive3=true
            this.axios.post(this.apis+"/san/Index/trend_dynamic",{
              type:1
            })
              .then((res)=> {
                this.dynamicdays=[]
                this.dynamicdata=[]
                for(var i=0;i<res.data.data.length;i++){
                  this.dynamicdays.push(res.data.data[i].month)
                  this.dynamicdata.push(res.data.data[i].count)
                }
                this.setmain4();
              })
              .catch(function (err) {

              })
          },
        },
        created() {
          this.fullscreenLoading = true
          document.title = '系统首页'
        },
    }
</script>

<style scoped lang="less">
.container{
  display: flex;
  width: 100%;
  overflow: hidden;
  .rightbox{
    width:87%;
    height: 100%;
    max-height: 100%;
    margin-left: 200px;
    display: flex;
    overflow-y: auto;
    overflow-x: hidden;
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
      .index_top{
        margin-top: 20px;
        margin-bottom: 20px;
        width: 96%;
        margin-left: 1.5%;
        font-size: 14px;
        padding: 15px 0px 15px 10px;
        background-color: white;
        p{
          margin-top: 0px;
          margin-bottom: 0px;
        }
        span{
          color: #2e8ded;
        }
      }
      .index_list{
        display: flex;
        width: 97%;
        margin-left: 1.5%;
        height: 120px;
        .list_r{
          margin-right: 3%/3;
        }
        .list1{
          background-color: #ffa81f;
        }
        .list2{
          background-color: #2e8ded;
        }
        .list3{
          background-color: #33cc66;
        }
        .list4{
          background-color: #00cc99;
        }
        div{
          width:100%/4;
          height: 120px;
          border-radius:4px;
          p{
            color: white;
            text-align: center;
            font-size: 14px;
            margin-top: 0px;
          }
          .p1{
            font-weight: bolder;
            font-size: 20px;
            margin-top: 40px;
            margin-bottom:0px;
          }
        };
      }
      .index_title{
        font-size: 14px;
        margin-left: 1.5%;
      }
      .index_data{
        display: flex;
        width: 97%;
        margin-left: 1.5%;
        height: 120px;
        background-color: white;
        .index_datalist{
          display: flex;
          width: 100%/4;
          height: 120px;
          div{
            width: 50%;
            height: 120px;
            img{
              margin-left:50%;
              margin-top: 30px;
            }
            p{
              font-size: 14px;
              text-align: left;
              margin: 0px;
            }
            .p1{
              font-weight: 500;
              font-size: 20px;
            }
          }
        }
        .myhr{
          display: inline-block;
          float: left;
          width: 1px;
          height: 26px;
          background-color: #cccccc;
          margin-top:47px;
        }
      }
      .index_echarts{
        display: flex;
        margin-top: 20px;
        width: 97%;
        margin-left: 1.5%;
        height: 400px;
        div{
          width: 50%;
          height: 400px;
          div{
            width: 100%;
            height: 360px;
            background-color: white;
          }
          .echarts_title{
            font-size: 14px;
            margin-top: 0px;
            margin-bottom:15px;
          }
        }
        .echarts1{
          margin-right:10px;
        }
      }
      .echarts_footer{
        margin-bottom: 40px;
      }
    }
  }
}
.databox{
  width: 100%;
  height: 120px;
  display: table-cell;
  vertical-align: middle;
}
.removeBtn{
  margin: 0;
  padding: 0;
  background-color: white;
  border:none;
  outline: none;
  margin-top: 20px !important;
}
.grid-demo1{
  width: 80px;
  height: 26px;
  line-height:26px;
  text-align: center;
  margin-top: 50px;
  margin-right: 15px;
  margin-bottom:40px;
  font-size: 12px;
  color: #666666;
  cursor: pointer;
  border: 1px solid #cfcfcf;
}
.removeBtn1{
  border: 1px solid #2e8ded;
  color: #2e8ded;
}
.list_btn{
   margin-left: 20px;

  }
</style>
