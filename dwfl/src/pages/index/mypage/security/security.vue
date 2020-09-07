<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="infobox" @click="changephfn">
      <div class="usertxname">手机号码</div>
      <div class="usertximg">{{alldata.user_phone}}</div>
      <div class="el-icon-arrow-right righticon"></div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              mincht:'',
              showdata:false,
              alldata:'',
            }
        },
        props: {},
        methods: {
          changephfn(){
            window.location.href = '#/updatenum'
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/phone'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.alldata = res.data.data
                _this.showdata = true
              }
            })
          }
        },
        mounted(){
          this.mincht = this.docheight+'px'
        },
        created() {
          document.title = '账号安全'
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    box-sizing: border-box;
    overflow: hidden;
    .infobox{
      width: 100%;
      display: flex;
      padding: 7px 0;
      padding-left: 4%;
      flex-direction: row;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      .righticon{
        width: 24px;
        height: 50px;
        line-height: 50px;
        color: rgb(150,150,150);
        font-size: 1.2em;
      }
      .usertximg{
        flex: 1;
        height: 50px;
        line-height: 50px;
        text-align: right;
        font-size: 1em;
        margin-right: 10px;
      }
      .usertxname{
        height: 50px;
        line-height: 50px;
        font-size: 1em;
        color: rgb(150,150,150);
      }
    }
  }
</style>
