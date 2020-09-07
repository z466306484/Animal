<template>
  <div class="container" v-if="showdata">
    <div class="logbox">
      <div class="logimg"><img src="/static/images/logoimg.png"></div>
    </div>
    <div class="byqcontent" v-html="alldata.aboutme"></div>
    <div class="talkus">
      <div class="itembox" v-for="item in talkarr">
        <div class="name">{{item.name}}</div>
        <div class="val">{{item.val}}</div>
      </div>
    </div>
    <div class="componame">版权所有@亚洲动物基金</div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              talkarr:[
                {type:1,name:'客服热线：',val:'028-54698654'},
                {type:1,name:'客服微信：',val:'028-54698654'},
                {type:1,name:'联系邮箱：',val:'028-54698654'},
              ],
              alldata:'',
              showdata:false,
            }
        },
        props: {},
        methods: {
          setdata(obj){
            this.talkarr = [
              {type:1,name:'客服热线：',val:obj.mobile},
              {type:1,name:'客服微信：',val:obj.wx},
              {type:1,name:'联系邮箱：',val:obj.email},
            ]
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/aboutme'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.setdata(res.data.data)
                _this.alldata = res.data.data
                _this.showdata = true
              }
            })
          }
        },
        created() {
          document.title = '关于我们'
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
    .logbox{
      width: 100%;
      overflow: hidden;
      .logimg{
        width: 200px;
        margin: 60px auto;
        img{
          width: 100%;
        }
      }
    }
    .byqcontent{
      width: 100%;
    }
    .talkus{
      margin-top: 60px;
      overflow: hidden;
      .itembox{
        width: 100%;
        height: 20px;
        margin-top: 5px;
        line-height: 20px;
        display: flex;
        font-size: 0.9em;
        .name{
        }
        .val{
          color: rgb(47,157,245);
        }
      }
    }
    .componame{
      margin-top: 30px;
      color: rgb(150,150,150);
      font-size: 0.9em;
      text-align: center;
    }
  }
</style>
