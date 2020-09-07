<template>
  <div :class="btntype==2?'gonext':'sure'" @click="savefn">{{btnval}}</div>
</template>

<script>
    export default {
        components: {

        },
        data() {
            return {}
        },
        props: {
          btntype:{},
          btnval:{},
        },
        methods: {
          savefn(){
            this.$emit('savefn')
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .sure,.gonext{
    width: 100%;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    background-color: rgb(47,159,245);
    color: white;
    border-radius: 5px;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }
  .gonext{
    background-color: white;
    color: rgb(47,159,245);
    border: 1px solid rgb(47,159,245);
  }
</style>
