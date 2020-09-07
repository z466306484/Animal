<template>
  <div class="infobox">
    <div class="ifcontent">
      <infoitem :infoarr="infodata.group"></infoitem>
    </div>
    <!--<div class="updatamsg" v-if="infodata.type == 3||infodata.type == 4">-->
      <!--<reply></reply>-->
    <!--</div>-->
  </div>
</template>

<script>
  import infoitem from '@/components/homeinfo/infoitem'
  import reply from '@/components/homeinfo/reply'
    export default {
        components: {infoitem,reply},
        data() {
            return {}
        },
        props: {
          infodata:{}
        },
        methods: {
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
.infobox{
  width: 100%;
  .infotitle{
    padding: 0 4%;
    box-sizing: border-box;
    height: 25px;
    line-height: 25px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .infotype{
      font-size: 1.2em;
      font-weight: bold;
    }
    .infomore{
      display: flex;
      color: rgb(150,150,150);
      div{
        height: 25px;
        line-height: 25px;
        margin-left:5px;
      }
      .ricon{
        position: relative;
        top: 1px;
      }
    }
  }
  .ifcontent{
    width: 100%;
    padding: 0 4%;
    box-sizing: border-box;
  }
  .updatamsg{
    width: 100%;
  }
}
</style>
