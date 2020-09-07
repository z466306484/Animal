<template>
  <div class="navbox">
    <div v-for="item in navarr" @click="checknav(item.type)">
      <div class="navimg"><img :src="item.img"></div>
      <div :class="!item.click?'typeval':'typeval2'">{{item.val}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              //:class
            }
        },
        props: {
          navarr:{},
        },
        methods: {
          checknav(type){
            if(type == 1){
              window.location.href = '#/home'
            }else if(type == 2){
              window.location.href = '#/group'
            }else if(type == 3){
              window.location.href = '#/mypage'
            }
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
.navbox{
  width: 100%;
  height: 50px;
  background-color: #fff;
  padding: 0 4%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: fixed;
  background-color: #fff;
  left: 0;
  bottom: 0;
  overflow: hidden;
  div{
    margin-top: 5px;
    width: 100/3%;
    text-align: center;
    .navimg{
      width: 20px;
      height: 20px;
      margin: 0 auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .typeval{
      width: 100%;
      color: rgb(206,208,217);
      font-size: 0.8em;
    }
    .typeval2{
      color: rgb(46,159,244);
      width: 100%;
      font-size: 0.8em;
    }
  }
}
</style>
