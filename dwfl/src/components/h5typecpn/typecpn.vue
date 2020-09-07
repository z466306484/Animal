<template>
  <div class="typeitem" @click="cltype(typeobj.cate_id,typeobj.cate_name)">
    <div class="typeicon"><img :src="typeobj.cate_img"></div>
    <div class="typename">{{typeobj.cate_name}}</div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          typeobj:{}
        },
        methods: {
          cltype(type,name){
            this.$emit('cltype',{type:type,title:name})
          }
        },
        created() {
          console.log(this.typeobj)
        },
    }
</script>

<style scoped lang="less">
.typeitem{
  width: 100/4%;
  margin-top: 20px;
  .typeicon{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .typename{
    width: 100%;
    height: 20px;
    line-height: 20px;
    margin-top: 5px;
    text-align: center;
    font-size: 1rem;
    color: rgb(150,150,150);
  }
}
</style>
