<template>
  <div class="container" :style="'min-height:'+mincht" >
    <logincpn :type="1"></logincpn>
  </div>
</template>

<script>
  import logincpn from '@/components/mypage/logincpn'
  export default {
    components: {logincpn},
    data() {
      return {
        mincht:'',
      }
    },
    props: {},
    methods: {
    },
    mounted(){
      this.mincht = this.docheight+'px'
    },
    created() {
      document.title = '更换手机号码'
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    padding-top: 100px;
    box-sizing: border-box;
    background-color: rgb(245,245,245);
    overflow: hidden;
  }
</style>

