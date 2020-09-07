<template>
  <div class="container">
    <div class="userimg">
      <div class="imgbox"><img src="/static/images/my_bg.png"></div>
    </div>
    <div class="title">网页由该公众号开发，请确认授权以下信息</div>
    <div class="msg">获得您的公开信息（昵称、头像等）</div>
    <div class="surebtn" @click="surebtn">确认登录</div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {

      }
    },
    props: {
    },
    methods: {
      surebtn(){
        this.$emit('clicksure')
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="less">
  .container{
    padding: 0 8%;
    box-sizing: border-box;
    width: 100%;
    .userimg{
      width: 100%;
      margin-top: 60px;
      padding: 60px 0;
      border-bottom: 1px solid #eee;
      .imgbox{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin: 0 auto;
        border: 1px solid #eee;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .title{
      font-size: 1em;
      padding: 10px 0;
      margin-top: 10px;
      color: rgb(70,70,70);
    }
    .msg{
      margin-top: 5px;
      padding: 10px 0;
      color: rgb(150,150,150);
      font-size: 0.8em;
    }
    .surebtn{
      height: 45px;
      line-height: 45px;
      text-align: center;
      width: 100%;
      background-color: rgb(29,196,26);
      color: white;
      font-size: 1.1em;
      border-radius: 5px;
      margin-top: 100px;
    }
  }
</style>
