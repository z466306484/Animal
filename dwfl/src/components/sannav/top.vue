<template>
  <div class="containerbox">
    <div class="left_top"><p>动物福利在线图书馆后台管理系统</p></div>
    <div class="right_top">
      <img :src="userimg" alt="">
      <span class="topusername">{{username}}</span>
      <span class="loginout" @click="loginout">退出</span>
    </div>
    <popup  :alertobj="alertobj" @alterdetai="alterdetai($event)"></popup>
  </div>
</template>

<script>
  import bus from '@/assets/evnetBus'
  import popup from '@/components/sanpopup/sanpopup'
    export default {
        components: {popup},
        data() {
            return {
              username:'',
              userimg:'',
              rolebox:'',
              alertobj:{
                delalert:false,
                alertitle:'退出提示',
                content:'确定要退出登录吗？',
                btnarr:[{type:0,val:'确定'},{type:2,val:'取消'}]
              },
            }
        },
        props: {},
        methods: {
          //退出登录
          loginout(){
            this.alertobj.delalert=true
          },
          alterdetai(obj){
            //点击弹框确定
            let _this = this
            if(obj.type==0){
              this.alertobj.delalert=false
              //  发请求
              let _this=this
              this.axios.post(this.apis+'/san/Login/outlogin').then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '退出成功',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/san_login'})
                  },1000)
                }
              })
                .catch(function (err) {
                })
            }
            //点击弹框取消
            if(obj.type==2){
              this.alertobj.delalert=false
            }
          },
          // 获取登录信息
          getinfo(){
            let _this = this
            this.axios.post(this.apis+'/san/Login/get_user').then((res) => {
              if(res.data.code==10000){
                console.log(res.data.data)
                if(res.data.data){
                  _this.username=res.data.data.username
                  _this.userimg=res.data.data.img
                  _this.rolebox=res.data.data.rule_id
                }
              }
            })
              .catch(function (err) {
              })

          },

        },
      created() {
          this.getinfo()
        },
    }
</script>

<style scoped lang="less">
.containerbox{
  /*display: flex;*/
  width: 100%;
  font-size: 14px;
  min-height: 70px;
  border-bottom: 1px solid #e4e4e4;
  background-color: white;
  .right_top{
    padding: 10px 0px 10px 0px;
    /*width: 20%;*/
    float: right;
    margin-right: 2%;
    img{
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 20px;
    }
    span{
     display: inline-block;
      position: relative;
      bottom: 15px;
      padding-left:3px;
      padding-right: 10px;
    }
  }
  .left_top{
    float: left;
    padding: 10px;
    p{
      font-weight: 600;
      font-size: 18px;
    }
  }
}
.loginout{
  cursor: pointer;
  color: #999999;
}
  .topusername{
    color: #2e8ded;
  }
</style>
