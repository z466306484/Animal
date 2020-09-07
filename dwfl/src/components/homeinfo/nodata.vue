<template>
  <div class="nodatabox">{{nodata}}</div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    props: {
      nodata:{}
    },
    methods: {},
    created() {
    },
  }
</script>

<style scoped lang="less">
  .nodatabox{
    width: 100%;
    padding: 15px 0;
    text-align: center;
    background-color: rgb(245,245,245);
    color: rgb(150,150,150);
    font-size: 1em;
  }
</style>
