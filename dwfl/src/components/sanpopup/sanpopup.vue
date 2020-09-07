<template>
  <div class="alertimg" v-if="alertobj.delalert">
    <div class="delalert" >
      <div class="deltitle">
        <div>{{alertobj.alertitle}}</div>
        <div style="cursor: pointer" @click="alterdetai(2)">×</div>
      </div>
      <div style="padding: 25px 20px;text-align: center">{{alertobj.content}}</div>
      <div class="delbtn" style="display: flex;padding: 20px 20px;flex-direction: row-reverse">
        <div class="surebtn" v-for="item in alertobj.btnarr"
             v-bind:class="{ surebtn: item.type=='0',calbtn: item.type=='2'}"
             @click="alterdetai(item.type)"
        >{{item.val}}</div>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props:{
          alertobj:{},
        },
        methods: {
          alterdetai(type){
            this.$emit('alterdetai',{type:type})
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .alertimg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 101;
    background-color: rgba(0,0,0,0.5);
    overflow-x: hidden;
    overflow-y: hidden;
    display:flex;justify-content:center;align-items:center;
  }

  .delalert{
    background-color:#fff;
    width:25%;
    font-size: 12px;
    min-height:160px;
   /* position: fixed;
    z-index: 1000;
    top: 40%;*/
    border: 1px solid #e2e2e2;
  }
  .deltitle{
    padding: 10px 20px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background-color: #f8f8f8;
  }
  .surebtn{
    background-color: rgb(240, 240, 240);
    color: #6c6c6c;
    padding: 7px 15px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 3px;
  }
  .calbtn{
    background-color: rgb(46, 141, 237);
    padding: 7px 15px;
    color: white;
    cursor: pointer;
    border-radius: 3px;
  }
</style>
