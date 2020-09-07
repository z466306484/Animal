<template>
  <div class="replycz">
    <div class="czbox" v-for="item in czarr">
      <div class="zcicon"><img :src="item.img"></div>
      <div class="cznum">{{item.num}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              czarr:[
                {img:'/static/images/book.png',num:56,type:1},
                {img:'/static/images/reply.png',num:16,type:1},
                {img:'/static/images/good.png',num:156,type:1},
              ],
            }
        },
        props: {
          views:'',
          dz:'',
          pl:'',
        },
        methods: {
        },
        created() {
          this.czarr[0].num = this.views
          this.czarr[1].num = this.pl
          this.czarr[2].num = this.dz
        },
    }
</script>

<style scoped lang="less">
  .replycz{
    width: 100%;
    display: flex;
    justify-content: start;
    padding: 5px 0 0;
    .czbox{
      width: 100/4%;
      display: flex;
      .zcicon{
        width: 15px;
        height: 15px;
        margin-right: 5px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .cznum{
        height: 20px;
        line-height: 20px;
        color: rgb(150,150,150);
      }
    }
  }
</style>
