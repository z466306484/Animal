<template>
  <div class="addbtn" @click="addbtn">
    <img src="/static/images/addbtnimg.png">
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {},
        methods: {
          addbtn(){
            this.$emit('addbtn')
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .addbtn{
    width: 60px;
    height: 60px;
    position: fixed;
    right: 4%;
    bottom: 100px;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
