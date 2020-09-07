<template>
  <div class="left">
    <div class="content-border">
      <div class="container1">
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :default-active="this.$route.path"
          :unique-opened="true"
          :collapse-transition="false"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          color="#c0c4cc"
          background-color="#273043"
          text-color="#c0c4cc"
          active-text-color="#409EFF">
          <div class="left_logo">
            <img src="../../../static/img/logo.png" alt="">
          </div>
          <el-submenu index="1">
            <template slot="title">
              <i class="iconfont iconshouye"></i>
              <span>系统首页</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/san_welcome">系统首页</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2" :disabled="isactshow">
            <template slot="title">
              <i class="iconfont iconziliao"></i>
              <span>资料管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/san_material_list">资料列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_material_recover">资料回收</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_material_sort">资料分类</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_material_answer">资料评论</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3" :disabled="iscomshow">
            <template slot="title">
              <i class="iconfont iconshequn"></i>
              <span>社群管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/san_club_list">社群列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_club_recover">社群回收站</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_club_trends">动态列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_club_trends_rocover">动态回收站</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4" :disabled="isusershow">
          <template slot="title">
            <i class="iconfont iconyonghu"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/san_user_list">用户列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/san_user_disabledlist">禁用列表</el-menu-item>
          </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="iconfont iconguanggao"></i>
              <span>广告管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/san_advert_list">广告列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_advert_recover">回收站</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="iconfont iconshezhi"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/system_manager">管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/role">角色管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/san_aboutus">关于我们</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/system_log">系统日志</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/protocol">服务协议</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
    </div>
  </div>
</template>

<script>
  import bus from '@/assets/evnetBus'
    export default {
        components: {},
        data() {
            return {
              mincht:'',
              isactshow:true,
              iscomshow:true,
              isusershow:true,
              roledata:''//权限
            }
        },
        props: {},
      mounted(){
        this.mincht = (document.body.offsetHeight-90)  +'px'
      },
       methods: {
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        }
      },
        created() {
          let _this=this
          this.axios.post(this.apis+'/san/Login/get_user').then((res) => {
            if(res.data.code==10000){
              if(res.data.data){
                _this.roledata=res.data.data.rule_id
                for(var i=0;i<_this.roledata.length;i++){
                  if(_this.roledata[i].id==1){
                    _this.isactshow=false
                  }
                  if(_this.roledata[i].id==4){
                    _this.iscomshow=false
                  }
                  if(_this.roledata[i].id==7){
                    _this.isusershow=false
                  }
                }
              }
            }
          })
            .catch(function (err) {
            })
        },
    }
</script>

<style scoped lang="less">
  .left{
    position: fixed;
    width:200px;
    top:0;bottom:0;
    height: 100%;
    overflow-x: hidden;
  }
  .el-menu-item-group__title{
    padding: 0px !important;
    display: none !important;
  }
  .content-border{
    overflow-x: hidden;
    width:220px;
    height: 100%
  }
  .container1{
    width: 200px;
    height: 100%;
  .tac{
    height: 100%;
    width: 200px;
    background-color:#273043;
  }
}
  .el-menu{
    border-right:none ;
  }
.el-submenu .el-menu-item{
   min-width: auto;
}
  .left_logo{
    width: 70%;
    margin-left: 15%;
    text-align: center;
  }
  .el-menu-item-group>div{
    padding: 0px !important;
    display: none !important;
  }

</style>
