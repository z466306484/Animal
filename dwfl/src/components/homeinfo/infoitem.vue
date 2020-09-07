<template>
  <div class="infoitem">
    <div v-for="(item,index) in infoarr" :class="index%3 != 0?itembox:itembox1" @click="clickitem(item.community_id,item.name)">
      <div :class="infotype==1?'itemimg':'itemimg2'">
        <img :src="item.community_pic">
      </div>
      <div :class="infotype==1?'itemval':'itemval2'">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              itembox:'itembox',
              itembox1:'itembox1',
            }
        },
        props: {
          infoarr:{},
          infotype:{},
        },
        methods: {
          clickitem(id,title){
            this.$emit('clickitem',{id:id,type:this.infotype,title:title})
          }
        },
        created() {
          console.log(this.infoarr,'www')
        },
    }
</script>

<style scoped lang="less">
.infoitem{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .itembox,.itembox1{
    width: 32%;
    margin-left: 2%;
    margin-top: 10px;
    overflow: hidden;
    text-align: center;
    .itemimg,.itemimg2{
      width: 100%;
      height: 75px;
      margin: 0 auto;
      border-radius: 5px;
      overflow: hidden;
      font-size: 0;
      img{
        height: 100%;
        font-size: 0;
        width: 100%;
      }
    }
    .itemimg2{
      border-radius: 50%;
      width: 75px;
    }
    .itemval,.itemval2{
      width: 100%;
      margin-top: 5px;
      height: 20px;
      font-size: 1rem;
      line-height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #333;
    }
    .itemval{
      text-align: left;
    }
  }
  .itembox1{
    margin-left: 0;
  }
}
</style>
