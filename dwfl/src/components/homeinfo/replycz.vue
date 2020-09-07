<template>
  <div class="replycz">
    <div class="czbox" v-for="item in czarr" @click="clickcz(item.type,iteminfo)">
      <div class="zcicon"><img :src="item.img"></div>
      <div :class="item.img=='/static/images/good1.png'?'cznum2':'cznum'" v-if="item.num">{{item.num}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              czarr:[
                {img:'/static/images/fenxiang.png',num:0,type:1},
                {img:'/static/images/reply.png',num:16,type:2},
                {img:'/static/images/good.png',num:156,type:3},
              ],
            }
        },
        props: {
          isdz:{},
          dz:{},
          ly:{},
          iteminfo:{},
        },
        methods: {
          clickcz(type,item){
            this.$emit('clickcz',{type:type,item:item})
          }
        },
        created() {
          this.czarr[0].num = 0
          this.czarr[1].num = this.ly
          this.czarr[2].num = this.dz
          if(this.isdz == 1){
            this.czarr[2].img = '/static/images/good1.png'
          }
        },
    }
</script>

<style scoped lang="less">
  .replycz{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .czbox{
      width: 100/3%;
      display: flex;
      .zcicon{
        width: 20px;
        height: 20px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .cznum,.cznum2{
        height: 20px;
        line-height: 20px;
        color: rgb(150,150,150);
        margin-left: 5px;
      }
      .cznum2{
        color: rgb(47,157,245);
      }
    }
  }
</style>
