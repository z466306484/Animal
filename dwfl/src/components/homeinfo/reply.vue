<template>
  <div class="replybox">
    <div class="replyitem" v-for="item in updatedata">
      <div class="userimg" @click="touser(item.user_id)">
        <img :src="item.photos">
      </div>
      <div class="userinfo">
        <div class="usernamebox">
          <div class="username" @click="cnew(item.dynamic_id)">{{item.nickname}}</div>
          <div class="userzw" v-if="updatetype==6 && item.user_occupation"><div>{{item.user_occupation}}</div></div>
          <div v-if="updatetype == 4" style="margin-left: 10px"><span>发布于</span> <span style="color: rgb(47,157,245)" @click="togroup(item.community_id)">{{item.community_name}}</span></div>
          <div class="delinfobtn" v-if="item.is_del==1" @click="deldtfn(item.dynamic_id)">删除此动态</div>
          <div class="replydate" v-if="updatetype!=2 &&updatetype!=6">{{item.ctime}}</div>
          <div class="replydate" v-if="updatetype==2" @click="delbtn(item.dynamic_id)">删除</div>
        </div>
        <div class="groupname" v-if="updatetype==2 ||updatetype==6">
          <div class="replydate" @click="cnew(item.dynamic_id)">{{item.ctime}}</div>
          <div>发布于</div>
          <div class="groupval" @click="togroup(item.community_id)">{{item.name}}</div>
        </div>
        <div class="replycontent">
          <div class="ctext" @click="cnew(item.dynamic_id)">{{item.content}}</div>
          <div class="cimgbox" v-if="item.picture.length>0">
            <div class="cimg" ref="cimg" v-for="(index,index2) in item.picture" :key="index2"><img @click="showImg(item.picture,index,index2)" :src="index"></div>
          </div>
          <div class="cvideo" v-if="item.video">
            <video :src="item.video" controls="controls"></video>
          </div>
          <div class="zfbox" v-if="item.is_forward && item.is_forward== 1">
            <div class="zfimgbox" @click="toolddt(item.forward_dynamic_dynamic_id)">
              <div class="zfimg" v-if="item.forward_dynamic_picture"><img :src="item.forward_dynamic_picture"></div>
              <div :class="item.forward_dynamic_picture?'zfcontent':'zfcontent2'">
                <div class="zfuser">{{item.forward_user_nickname}}:</div>
                <div class="zfval">{{item.forward_dynamic_content}}</div>
              </div>
            </div>
            <div class="zfvideo"  v-if="item.forward_dynamic_video">
              <video :src="item.forward_dynamic_video" controls="controls"></video>
            </div>
          </div>
        </div>
        <div class="replycz" v-if="item.czarr &&item.czarr.length>0" @click="cnew(item.dynamic_id)">
          <div class="czbox" v-for="index in item.czarr">
            <div class="zcicon"><img :src="index.img"></div>
            <div :class="index.img=='/static/images/good1.png'?'cznum2':'cznum'" v-if="index.num">{{index.num}}</div>
          </div>
        </div>
        <div v-if="updatetype!=3 && !item.czarr" style="width: 100%" @click="cnew(item.dynamic_id)">
          <replycz :iteminfo="item" :dz="item.dz" :isdz="item.is_dz" :ly="item.ly" @clickcz="clickcz"></replycz>
        </div>
      </div>
    </div>
    <div class="dialogimg" v-if="showHideOnBlur &&bannerlist.length">
      <div class="alertimgbox" ref="alertimgbox">
        <swiper auto style="width:100%;margin:0 auto;" dots-class="custom-bottom" dots-position="center">
          <swiper-item class="swiper-demo-img" style="width: 100%" v-for="(item, index) in bannerlist" :key="index"><img style="width: 100%" @click="imgfn(item)" :src="item.img"></swiper-item>
        </swiper>
      </div>
      <div class="alertzzc" @click="showHideOnBlur=false">
        <span class="vux-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import replycz from '@/components/homeinfo/replycz'
  import banner from '@/components/h5banner/banner'
  import bus from '@/assets/evnetBus';
  import { XDialog,Swiper,SwiperItem } from 'vux'
    export default {
        components: {replycz,XDialog,banner,Swiper,SwiperItem},
        data() {
            return {
              showalt:false,
              showHideOnBlur:false,
              clickimg:'',
              bannerlist:[],
            }
        },
        props: {
          updatedata:{},
          updatetype:{},
          imgtype:{},
        },
        mounted(){
        },
        methods: {
          togroup(id){
            window.location.href = '#/group_detail?id='+id
          },
          showImg(arr,index,num) {
            this.bannerlist = []
            if(arr.length>0){
              for(let i = 0;i<arr.length;i++){
                if(i>=num){
                  var newarr = {url: 'javascript:',img:arr[i],link:'',title: ''}
                  this.bannerlist.push(newarr)
                }
              }
              for(let i = 0;i<arr.length;i++){
                if(i<num){
                  var newarr = {url: 'javascript:',img:arr[i],link:'',title: ''}
                  this.bannerlist.push(newarr)
                }
              }
            }
            this.showHideOnBlur = true
            console.log(this.bannerlist,'bannerlist')
          },
          clickcz(type){
            this.$emit('clickcz',type)
          },
          touser(id){

            if(this.imgtype&&this.imgtype==1){

            }else {
              window.location.href = '#/herssend?id='+id
            }
          },
          clickcz1(type,item){
            this.$emit('clickcz1',{type:type,item:item})
          },
          cnew(id){
            this.$emit('cnew',{id:id})
          },
          deldtfn(id){
            this.$emit('deldtfn',{id:id})
          },
          delbtn(id){
            this.$emit('delbtn',{id:id})
          },
          toolddt(id){
            window.location.href = '#/dt_detail?id='+id
            this.$emit('toolddt',{id:id})
          }
        },
        created() {
          console.log(this.updatedata,'updatedata2')
        },
    }
</script>

<style scoped lang="less">
  .replybox{
    width: 100%;
    .replyitem{
      width: 100%;
      border-bottom: 1px solid #eee;
      padding: 15px 4%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .userimg{
        width:50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .userinfo{
        flex: 1;
        height: 100%;
        margin-left: 15px;
        font-size: 1rem;
        .usernamebox{
          display: flex;
          width: 100%;
          height: 20px;
          line-height: 20px;
          flex-direction: row;
          .username{
            font-size: 1em;
            font-weight: bolder;
          }
          .userzw{
            margin-left: 10px;
            height: 20px;
            line-height: 20px;
            border-radius: 10px;
            padding: 0 5px;
            font-size: 1em;
            color: rgb(47,157,245);
            background-color: rgb(235,245,254);
          }
          .delinfobtn{
            margin-left: 10px;
            color: rgb(150,150,150);
            font-size: 1em;
          }
          .replydate{
            flex: 1;
            text-align: right;
            color: rgb(150,150,150);
            font-size: 1rem;
          }
        }
        .groupname{
          margin-bottom: 5px;
          font-size: 1rem;
          color: rgb(150,150,150);
          display: flex;
          .replydate{
            margin-right: 10px;
          }
          .groupval{
            color: rgb(47,157,244);
            margin-left: 10px;
          }
        }
        .replycontent{
          width: 100%;
          .ctext{
            font-size: 1rem;
            display: -webkit-box;
            padding: 5px 0;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;  //这里是在第二行有省略号
            overflow: hidden;
          }
          .cimgbox{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            flex-wrap: wrap;
            .cimg{
              display: inline-block;
              width: 70px;
              height: 70px;
              margin-right: 10px;
              font-size: 0;
              margin-top: 10px;
              overflow: hidden;
              img{
                width: 140px;
              }
            }
          }
          .cvideo{
            width: 180px;
            font-size: 0;
            margin-top: 10px;
            video{
              width: 100%;
            }
          }
          .zfbox{
            width: 100%;
            box-sizing: border-box;
            background-color: rgb(245,245,245);
            .zfimgbox{
              width: 100%;
              display: flex;
              flex-direction: row;
              .zfimg{
                width: 60px;
                height: 60px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .zfcontent,.zfcontent2{
                margin-left: 10px;
                flex: 1;
                height: 60px;
                display: flex;
                font-size: 1rem;
                flex-direction: row;
                div{
                  height: 60px;
                  line-height: 60px;
                }
                .zfuser{
                  color: rgb(47,157,245);
                  margin-right: 10px;
                }
                .zfval{
                  flex: 1;
                  overflow: hidden;
                }
              }
              .zfcontent2{
                height: 30px;
                div{
                  height: 30px;
                  line-height: 30px;
                }
              }
            }
            .zfvideo{
              width: 180px;
              font-size: 0px;
              margin-left: 10px;
              overflow: hidden;
              video{
                width: 100%;
              }
            }
          }
        }
        .replycz{
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          overflow: hidden;
          .czbox{
            width: 100/3%;
            display: flex;
            .zcicon{
              width: 20px;
              height: 20px;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .cznum,.cznum2{
              height: 20px;
              line-height: 20px;
              color: rgb(150,150,150);
              margin-left: 5px;
            }
            .cznum2{
              color: rgb(47,157,245);
            }
          }
        }
      }
    }
    .dialogimg{
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      position: fixed;
      top: 0;
      z-index: 100;
      letter-spacing: 0;
      .alertimgbox{
        position: absolute;
        width: 100%;
        font-size: 0;
        left: 0;
        top: 25%;
        overflow: hidden;
        .imglist{
        }
      }
      .alertzzc{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
<style>
  .alertimgbox .vux-swiper{
    height: 360px!important;
  }
</style>
