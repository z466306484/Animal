<template>
  <div class="tablebox">
    <table class="table table-hover" style="margin-top: 20px;border: 1px solid #ddd;font-size: 12px;width: 100%">
      <thead class="graythead">
      <tr class='grayTr'>
        <td style="padding: 15px 0;text-indent: 9px" v-for="item in tableobj.tharr" :width=item.width>{{item.val}}</td>
      </tr>
      </thead>
      <tbody v-if="tableobj.tabliearr.length>0">
      <tr v-for="item in tableobj.tabliearr" class="table_td">
        <td class="sortEdit">
            <div class="imgdiv">
              <div>
                <img style="width: 40px;height:40px;border-radius:20px;margin-top: 7px" :src="item.img">
              </div>
            <div style="margin-left: 10px;"><p style="line-height: 30px;color: #2e8ded;">{{item.name}} <span style="margin-left: 10px;background-color: #eaf4fe" v-if="item.work">创建人</span></p></div>
          </div>
        </td>
        <td class="sortEdit"  v-if="item.yunum==2" >女</td>
        <td class="sortEdit"  v-if="item.yunum==1" >男</td>
        <td class="sortEdit"  v-if="item.yunum=='--'" >--</td>
        <td class="sortEdit" >{{item.phnum}}</td>
        <td class="sortEdit">{{item.joinnum}}</td>
        <td class="sortEdit" >{{item.time}}</td>
        <td class="sortEdit" >{{item.time1}}</td>
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
      todetai(id){
        this.$emit('todetai',{id:'wwwww'})
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
</style>
