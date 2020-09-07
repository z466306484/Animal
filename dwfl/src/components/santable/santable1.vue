<template>
  <div class="tablebox">
    <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
      <thead class="graythead">
      <tr class='grayTr'>
        <td style="padding: 15px 0;text-indent: 9px" v-for="item in tableobj.tharr" :width=item.width>{{item.val}}</td>
      </tr>
      </thead>
      <tbody  v-if="tableobj.tabliearr.length>0">
      <tr v-for="(item,index) in tableobj.tabliearr" class="table_td">
        <td class="sortEdit" >{{item.index}}</td>
        <td class="sortEdit" style="display: none">{{item.id}}</td>
        <td class="sortEdit" >{{item.name}}</td>
        <td class="sortEdit" v-if="item.yunum==2">禁用</td>
        <td class="sortEdit" v-if="item.yunum==1">启用</td>
        <td style="display: flex;padding-top:10px;padding-bottom: 10px;box-sizing: border-box;width: 200px;" v-if="item.btnarr">
          <div style="margin-left: 5px" v-for="index in item.btnarr" v-bind:class="{ blue1btn: index.type=='0',bluebtn: index.type=='2',redbtn:index.type=='3'}"
               @click="todetai(item,index.type)">{{index.val}}</div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="tableobj.tabliearr.length<=0" class="lodmore" style="width: 100%;height:auto">
      <div class="noimg"><img src="../../../static/img/nodata.png" alt=""></div>
      <div>暂无相关信息</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      tableobj:{},
    },
    components: {},
    data() {
      return {
      }
    },
    methods: {
      todetai(item,type){
        this.$emit('todetai',{item:item,type:type})
      }
    },
    created() {
    },
  }
</script>

<style scoped lang="less">
  .table{
    border-collapse:collapse;
    .graythead{
      background-color: #f2f2f2;
    }
  }
  /*暂无数据*/
  .lodmore{
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;
    color: rgb(200,200,200);
    font-size: 14px;
  }
  .noimg{
    width: 100%;
    margin-bottom: 10px;
  }
  .noimg>img{
    width: 40px;
  }

  .imgdiv{
    display: flex;
  }
  .table_td{
    border-bottom: 1px solid #e6e6e6;
    td{
      padding-left: 9px;
    }
  }
  .sortEdit{
    line-height: 30px !important;
  }
  .table_td:hover{
    background-color: #f2f2f2;
  }
  .sortEdit>.imgdiv{
    display: flex;
  }
  .bluebtn{
    padding: 5px 10px;
    text-decoration: none;
    color: rgb(49,141,235);
    border: 1px solid rgb(49,141,235);
    border-radius: 3px;
    cursor: pointer;
  }
  .blue1btn{
    padding: 5px 10px;
    text-decoration: none;
    color: rgb(49,141,235);
    border: 1px solid rgb(49,141,235);
    border-radius: 3px;
    cursor: pointer;
  }
  .redbtn{
    padding: 5px 10px;
    text-decoration: none;
    color: rgb(254,51,3);
    border: 1px solid rgb(254,51,3);
    border-radius: 3px;
    cursor: pointer;
  }
  .bluebtn:hover{
    text-decoration: none;
    color: white;
    background-color: rgb(49,141,235);
  }
  .blue1btn:hover{
    text-decoration: none;
    color: white;
    background-color: rgb(49,141,235);
  }
  .redbtn:hover{
    text-decoration: none;
    color: white;
    background-color: rgb(254,51,3);
  }
</style>
