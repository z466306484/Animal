<template>
  <div class="sendalert">
    <div class="whitealert" v-if="sendobj.type == 1">
      <div class="titlebox">
        <div class="atitle">选择类型</div>
        <div class="aclose" @click="aclose">×</div>
      </div>
      <div class="acontent">
        <div class="senimgbox">
          <div class="imgbox"><img src="/static/images/t11.png"></div>
          <div class="aval">发布图片</div>
        </div>
        <div class="senimgbox">
          <div class="imgbox"><img src="/static/images/t13.png"></div>
          <div class="aval">发布视频</div>
        </div>
      </div>
    </div>
    <div class="whitealert2" v-if="sendobj.type == 2">
      <div class="titlebox">
        <div class="aclose" @click="aclose">×</div>
        <div class="atitle">转发动态</div>
        <div class="asure" @click="surefn">确定</div>
      </div>
      <div class="acontent">
        <div class="textra">
          <x-textarea :placeholder="placeholder" :height="100"></x-textarea>
        </div>
        <div class="sendinfoimg">
          <div class="infoimg"><img src="/static/images/t11.png"></div>
          <div class="infotext">分享图片</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XTextarea } from 'vux'
  export default {
    components: {XTextarea},
    data() {
      return {
        placeholder:'转发理由',
      }
    },
    props: {
      sendobj:{}
    },
    methods: {
      aclose(){
        this.$emit('aclose')
      },
      surefn(){

      },
    },
    created() {
    },
  }
</script>

<style scoped lang="less">
  .sendalert{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column-reverse;
    .whitealert{
      width: 100%;
      padding: 15px 4%;
      box-sizing: border-box;
      background-color: #fff;
      .titlebox{
        width: 100%;
        position: relative;
        .atitle{
          text-align: center;
          font-size: 1em;
        }
        .aclose{
          position: absolute;
          right: 4%;
          top: 0px;
          height: 21px;
          line-height: 21px;
          font-size: 1.5em;
        }
      }
      .acontent{
        width: 100%;
        padding: 25px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        .senimgbox{
          width: 60px;
          .imgbox{
            width: 100%;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .aval{
            width: 100%;
            text-align: center;
            font-size: 0.8em;
            margin-top: 10px;
          }
        }
      }
    }
    .whitealert2{
      width: 100%;
      background-color: #fff;
      .titlebox{
        width: 100%;
        position: relative;
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        .atitle{
          text-align: center;
          font-size: 1em;
        }
        .aclose{
          position: absolute;
          left: 4%;
          top: 15px;
          height: 21px;
          line-height: 21px;
          font-size: 1.5em;
        }
        .asure{
          position: absolute;
          top: 15px;
          right: 4%;
          height: 21px;
          line-height: 21px;
          font-size: 0.9em;
          color: rgb(47,157,245);
        }
      }
      .acontent{
        width: 100%;
        padding: 15px 4%;
        box-sizing: border-box;
        .sendinfoimg{
          width: 100%;
          background-color: rgb(242,242,242);
          padding: 10px;
          border-radius: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          .infoimg{
            width: 50px;
            height: 50px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .infotext{
            height: 50px;
            line-height: 50px;
            margin-left: 10px;
            font-size: 0.8em;
            color: rgb(150,150,150);
          }
        }
      }
    }
  }
</style>
<style>
  .textra>.weui-cell{
    padding: 0 !important;
  }
</style>
