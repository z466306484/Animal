<template>
  <div class="relbox">
    <div :class="showborder==1?'itembox':'itembox2'" v-for="item in relpyarr">
      <div class="userimg"><img :src="item.photos"></div>
      <div class="replycot">
        <div class="userinfo">
          <div class="nametime">
            <div class="itemname">{{item.nickname}}</div>
            <div class="itemtime">{{item.ctime}}</div>
          </div>
          <div class="goodbtn" v-if="type == 1" @click="goodbtn(item.comment_id,item.is_dz)">
            <img v-if="item.is_dz==0" src="/static/images/good.png">
            <img v-if="item.is_dz==1" src="/static/images/good1.png">
            <div :class="item.is_dz==0?'cznum':'cznum2'">{{item.dz}}</div>
          </div>
          <div class="goodbtn" v-if="type == 2" @click="replybtn(item)">回复</div>
        </div>
        <div class="itemcontent" @click="replyfn(item.comment_id,item.nickname,item.dynamic_id)">{{item.ucontent}}</div>
        <div class="person_reply" v-if="item.acontent && item.arr==undefined">
          <div class="replytext" v-if="item.arr==undefined">
            <div class="replyname"><span v-if="!item.username">管理员回复:</span><span v-if="item.username">{{item.username}}:</span></div>
            <div class="replyval">{{item.acontent}}</div>
          </div>
        </div>
        <div class="person_reply" v-if="item.arr&&item.arr.length>0">
          <div class="replytext1" v-for="index in item.arr" @click="lyczfn(index)">
            <div class="replyname">{{index.nickname}}{{index.uname}}:</div>
            <div class="replyval">{{index.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          relpyarr:{},
          showborder:{},
          type:{},
        },
        methods: {
          goodbtn(id,is_dz){
            this.$emit('goodbtn',{id:id,is_dz:is_dz})
          },
          lyczfn(item){
            this.$emit('lyczfn',{item:item})
          },
          replyfn(id,name,dtid){
            this.$emit('replyfn',{id:id,name:name,dtid:dtid})
          },
          replybtn(obj){
            this.$emit('replybtn',{item:obj})
          },
        },
        created() {
          console.log(this.relpyarr,'relpyarr')
        },
    }
</script>

<style scoped lang="less">
  .relbox{
    width: 100%;
    overflow: hidden;
    .itembox,.itembox2{
      width: 100%;
      border-top: 1px solid #eee;
      padding: 15px 4%;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      .userimg{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .replycot{
        flex: 1;
        overflow: hidden;
        margin-left: 15px;
        .userinfo{
          width: 100%;
          display: flex;
          height: 30px;
          .nametime{
            flex: 1;
            height: 30px;
            font-size: 1em;
            .itemtime{
              margin-top: 3px;
              color: rgb(150,150,150);
            }
          }
          .goodbtn{
            height: 15px;
            margin-top: 10px;
            display: flex;
            color: rgb(47,157,245);
            img{
              width: 15px;
              height: 100%;
              margin-right: 3px;
            }
            div{
              font-size: 1em;
              color: rgb(150,150,150);
              height: 20px;
              line-height: 20px;
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
        .itemcontent{
          margin: 15px 0;
          word-wrap:break-word;
        }
        .person_reply{
          width: 100%;
          padding: 10px 10px;
          background-color: rgb(246,246,246);
          box-sizing: border-box;
          .replytext,.replytext1{
            width: 100%;
            display: flex;
            font-size: 1em;
            flex-direction: row;
            .replyname{
              color: rgb(47,159,245);
              margin-right: 5px;
            }
            .replyval{
              flex: 1;
            }
          }
          .replytext1{
            padding: 3px 0;
            box-sizing: border-box;
          }
        }
      }
    }
    .itembox2{
      border-top: none;
    }
  }
</style>
