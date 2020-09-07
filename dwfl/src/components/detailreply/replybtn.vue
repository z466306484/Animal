<template>
  <div class="navbox">
    <div class="navitem" v-for="item in navarr" @click="checknav(item.type)">
      <div class="navimg"><img :src="item.img"></div>
      <div :class="item.img=='/static/images/good1.png'?'typeval2':'typeval'" v-if="item.num">{{item.num}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
      }
    },
    props: {
      navarr:{},
    },
    methods: {
      checknav(type){
        this.$emit('checknav',{type:type})
      }
    },
    created() {
      console.log(this.navarr,'navarr')
    },
  }
</script>

<style scoped lang="less">
  .navbox{
    border-top: 1px solid #eee;
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    position: fixed;
    background-color: #fff;
    left: 0;
    bottom: 0;
    .navitem{
      width: 100/3%;
      display: flex;
      flex-direction: row;
      padding: 10px 40px;
      box-sizing: border-box;
      .navimg{
        width: 20px;
        margin: 0 auto;
        img{
          width: 20px;
        }
      }
      .typeval,.typeval2{
        flex: 1;
        width: 100%;
        height: 20px;
        line-height: 20px;
        margin-left: 5px;
        color: rgb(206,208,217);
        font-size: 1em;
      }
      .typeval2{
        color: rgb(47,157,245);
      }
    }
  }
</style>
