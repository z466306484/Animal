<template>
  <div class="introduction" @click="toeasygroup">
    <div class="infotitle">
      <div class="ititle">社群简介</div>
      <div class="el-icon-arrow-right ricon"></div>
    </div>
    <div class="infocontent">{{info}}</div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          info:{}
        },
        methods: {
          toeasygroup(){
            this.$emit('toeasygroup')
          }
        },
        created() {
          console.log(this.info,'info')
        },
    }
</script>

<style scoped lang="less">
  .introduction{
    width: 100%;
    padding: 10px 4%;
    box-sizing: border-box;
    background-color: #fff;
    .infotitle{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .ititle{
        height: 26px;
        width: 90px;
        border-radius: 13px;
        background-color: rgb(237,247,255);
        text-align: center;
        line-height: 26px;
        color: rgb(46,159,244);
        font-size: 0.9rem;
      }
      .ricon{
        height: 30px;
        line-height: 30px;
        color: rgb(150,150,150);
      }
    }
    .infocontent{
      width: 100%;
      margin-top: 10px;
      padding-bottom: 10px;
      font-size: 1rem;
      color: rgb(150,150,150);
    }
  }
</style>
