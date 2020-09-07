<template>
  <div class="mybtn">{{val}}</div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          val:{},
        },
        methods: {},
        created() {
        },
    }
</script>

<style scoped lang="less">
.mybtn{
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  background-color: rgb(47,159,245);
  color: white;
}
</style>
