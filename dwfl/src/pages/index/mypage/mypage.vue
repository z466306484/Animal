<template>
  <div class="container" v-if="alldata!=''" :style="'min-height:'+mincht">
    <div class="userinfobox">
      <div class="topbj"><img src="/static/images/my_bg.png"></div>
      <div class="userinfo">
        <div class="userimg"><img :src="alldata.photos"></div>
        <div class="usermsgbox">
          <div class="username">{{alldata.nickname}}</div>
          <div class="userzw"><span v-if="!alldata.user_occupation">未完善职位信息</span><span>{{alldata.user_occupation}}</span></div>
        </div>
        <div class="el-icon-arrow-right ricon" @click="updateinfo"></div>
      </div>
      <div class="infoalet">
        <div class="armsgbox" v-for="item in infoaletarr" @click="armsgfn(item.type)">
          <div class="msgnum">{{item.num}}</div>
          <div class="msgtype">{{item.val}}</div>
        </div>
      </div>
    </div>
    <mylist @myitemfn="myitemfn" :listarr="listarr"></mylist>
    <bottomnav :navarr="navarr" @checknav="checknav"></bottomnav>
  </div>
</template>

<script>
  import bottomnav from '@/components/h5nav/bottomnav'
  import mylist from '@/components/mypage/mylist'
    export default {
        components: {bottomnav,mylist},
        data() {
            return {
              mincht:'',
              infoaletarr:[],
              navarr:[
                {img:'/static/images/home1.png',val:'首页',click:false,type:1},
                {img:'/static/images/shequn1.png',val:'社群',click:false,type:2},
                {img:'/static/images/wode2.png',val:'我的',click:true,type:3},
              ],
              alldata:'',
              listarr:[],
            }
        },
        props: {},
        methods: {
          checknav(obj){
            console.log(obj)
          },
          updateinfo(){
            window.location.href = '#/myinfo'
          },
          myitemfn(obj){
            if(obj.type == 1){
              window.location.href = '#/mygroup'
            }else if(obj.type == 2){
              window.location.href = '#/I_releas'
            }else if(obj.type == 3){
              window.location.href = '#/replyforme'
            }else if(obj.type == 4){
              window.location.href = '#/savepage'
            }else if(obj.type == 5){
              window.location.href = '#/security'
            }else if(obj.type == 6){
              window.location.href = '#/guanyu'
            }
          },
          armsgfn(type){
            if(type == 1){
              window.location.href = '#/I_releas'
            }else if(type == 2){
              window.location.href = '#/mygroup'
            }else if(type == 3){
              window.location.href = '#/savepage'
            }
          },
          setdata(obj){
            this.infoaletarr = [
              {num:obj.dynamic_number,val:'动态',type:1},
              {num:obj.community_number,val:'社群',type:2},
              {num:obj.collection_number,val:'收藏',type:3},
            ]

            this.listarr = [
              {type:1,val:'我的社群',img:'/static/images/pengyouquan.png',num:obj.community_number,id:1},
              {type:1,val:'我的发布',img:'/static/images/feiji.png',num:obj.dynamic_number,id:2},
              {type:2,val:'回复我的',img:'/static/images/huifu.png',num:obj.message_number,id:3},
              {type:1,val:'我的收藏',img:'/static/images/xingxing.png',num:obj.collection_number,id:4},
              {type:1,val:'账号安全',img:'/static/images/e.png',num:0,id:5},
              {type:2,val:'关于我们',img:'/static/images/i.png',num:0,id:6},
            ]
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/index'
            let data = {}
            this.axios.post(url,data).then(function (res) {
                console.log(res.data)
              if(res.data.code == 10000){
                _this.alldata = res.data.data
                _this.setdata(_this.alldata)
              }
            })
          }
        },
        mounted(){
          this.mincht = this.docheight+'px'
        },
        created() {
          document.title = '个人中心'
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .userinfobox{
      width: 100%;
      height: 220px;
      position: relative;
      margin-bottom: 15px;
      .topbj{
        width: 100%;
        font-size: 0;
        img{
          width: 100%;
        }
      }
      .userinfo{
        position: absolute;
        width: 100%;
        height: 120px;
        top: 0;
        left: 0;
        padding: 25px 4%;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        .userimg{
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .usermsgbox{
          flex: 1;
          margin-left: 15px;
          color: white;
          height: 40px;
          margin-top: 15px;
          .username{
            height: 20px;
            line-height: 20px;
            font-size: 1.3em;
          }
          .userzw{
            height: 20px;
            line-height: 20px;
            font-size: 1em;
            color: rgb(200,200,200);
          }
        }
        .ricon{
          width: 40px;
          height: 40px;
          line-height: 40px;
          margin-top: 15px;
          color: rgb(200,200,200);
          text-align: right;
        }
      }
      .infoalet{
        width: 92%;
        left: 4%;
        background-color: #fff;
        position: absolute;
        top: 120px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        .armsgbox{
          padding: 25px 0;
          text-align: center;
          width: 100/3%;
          .msgnum{
            font-size: 2em;
          }
          .msgtype{
            font-size: 1em;
            margin-top: 5px;
            color: rgb(150,150,150);
          }
        }
      }
    }
  }
</style>
