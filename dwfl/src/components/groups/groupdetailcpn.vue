<template>
  <div class="detaibox">
    <div class="bgimg"><img src="/static/images/quntxbj.jpg"></div>
    <div class="detinfo">
      <div class="detaiimg"><img :src="community.community_pic"></div>
      <div class="detinfobox">
        <div class="dettitle">{{community.name}}</div>
        <div class="personinfo">
          <div class="detname">成员：  {{community.user_number}}</div>
          <div class="detname">动态：  {{community.dynamic_number}}</div>
        </div>
        <div class="joinstatus" v-if="community.isjoin == 1" @click="joinfn">已加入</div>
        <div class="joinstatus2" v-if="community.isjoin == 0" @click="joinfn">加入</div>
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
          community:{}
        },
        methods: {
          joinfn(){
            this.$emit('joinfn')
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .detaibox{
    width: 100%;
    position: relative;
    height: 95px;
    .bgimg{
      width: 100%;
      height: 100%;
      font-size: 0;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .detinfo{
      position: absolute;
      top: 0;
      left: 0;
      height: 95px;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      .detaiimg{
        width: 75px;
        height: 75px;
        overflow: hidden;
        margin: 10px;
        background-color: #fff;
        border-radius: 10px;
        img{
          height: 100%;
         width: 100%;
        }
      }
      .detinfobox{
        flex: 1;
        height: 100%;
        padding: 10px 0;
        box-sizing: border-box;
        color: white;
        position: relative;
        .dettitle{
          font-size: 1.2em;
          font-weight: bold;
        }
        .personinfo{
          display: flex;
          font-size: 0.9rem;
          margin-top: 2px;
          .detname{
            margin-right: 10px;
          }
        }
        .joinstatus,.joinstatus2{
          width: 80px;
          height: 25px;
          border-radius: 15px;
          background-color: #fff;
          text-align: center;
          line-height: 25px;
          font-size:1em;
          color: rgb(150,150,150);
          position: absolute;
          bottom: 10px;
        }
        .joinstatus2{
          background-color: #fff;
        }
      }
    }
  }
</style>
