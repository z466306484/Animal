<template>
  <div class="container">
    <div class="atitle">拯救大象公益展</div>
    <div class="fabutime">
      <div class="aname">发布时间</div>
      <div class="atime">2019-02-19</div>
      <div class="byqcontent"></div>
    </div>
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
        },
        created() {
          document.title = ''
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    padding: 20px 4%;
    box-sizing: border-box;
    .atitle{
      font-size: 1.1em;
      color: black;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .fabutime{
      font-size: 0.8em;
      color: rgb(150,150,150);
      margin-top: 20px;
      display: flex;
      .atime{
        margin-left: 20px;
      }
    }
  }
</style>
