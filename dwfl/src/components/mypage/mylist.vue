<template>
  <div class="listbox">
    <div :class="item.type == 1?'itembox':'itembox2'" v-for="item in listarr" @click="myitemfn(item.id)">
      <div class="iconimg"><img :src="item.img"></div>
      <div :class="item.type == 1?'itemleft':'itemleft2'">
        <div class="itemname">{{item.val}}</div>
        <div class="rightbox">
          <div class="itemnum" v-if="item.num && item.id == 3">{{item.num}}</div>
          <div class="el-icon-arrow-right ricon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
            }
        },
        props: {
          listarr:{},
        },
        methods: {
          myitemfn(type){
            this.$emit('myitemfn',{type:type})
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .listbox{
    width: 100%;
    padding-bottom: 50px;
    .itembox,.itembox2{
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      .iconimg{
        width: 20px;
        height: 20px;
        border-radius: 5px;
        overflow: hidden;
        margin: 20px 10px;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .itemleft,.itemleft2{
        flex: 1;
        height: 30px;
        padding: 15px 0;
        padding-right: 4%;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #eee;
        .itemname{
          flex: 1;
          height: 30px;
          line-height: 30px;
          font-size: 1em;
        }
        .rightbox{
          height: 30px;
          margin-left: 10px;
          display: flex;
          .itemnum{
            width: 20px;
            height: 20px;
            margin-top: 5px;
            border-radius: 50%;
            background-color: rgb(255,116,115);
            color: white;
            font-size: 0.8em;
            line-height: 20px;
            text-align: center;
          }
          .ricon{
            height: 30px;
            width: 20px;
            text-align: right;
            line-height: 30px;
            color:rgb(150,150,150);
          }
        }
      }
      .itemleft2{
        border-bottom: none;
      }
    }
    .itembox2{
      margin-bottom: 15px;
    }
  }
</style>
