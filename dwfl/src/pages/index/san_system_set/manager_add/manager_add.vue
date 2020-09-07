<template>
  <div class="container"  :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            新增管理员<router-link to="/system_manager"><a href="" class="return_list"><el-button size="small">返回列表</el-button></a></router-link>
          </div>
          <div class="add_manager">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="所属角色" prop="player">
                <el-select  clearable v-model="ruleForm.player" placeholder="选择角色">
                  <el-option
                    v-for="item in selectData"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <p class="add_text">超级管理员拥有系统所有权限，一般管理员仅能进行数据查看</p>
              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入管理员用户名，4-12数字或字母组合"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="turename">
                <el-input v-model="ruleForm.turename" placeholder="管理员真实姓名"></el-input>
              </el-form-item>
              <div class="list">
                <div class="list_title"><p>管理员头像</p></div>
                <div class="list_content">
                  <label for="file" class='btn'>上传图片</label>
                  <input type="file"name="file2" id="file" style="display: none;" accept="image/*" @change="changepic(this)" />
                  <input type="hidden" id="showinput" />
                  <div v-if="showimg==''" style=" display: table-cell;vertical-align: middle;text-align: center;outline: 1px solid #dcdfe6;width: 120px;height: 120px">
                    <img  class="addimg" src="../../../../../static/img/system.png" alt="">
                  </div>
                  <div v-if="showimg!=''" style="width: 120px;height: 120px">
                    <img  style="width: 100%;height: 100%" id="show" :src="showimg" alt="">
                  </div>
                  <p  style="padding-top: 20px;margin: 0px;font-size: 12px;color: #606266">建议尺寸：640*240px</p>
                </div>
              </div>
              <el-form-item label="手机号码" prop="checkphone">
                <el-input type="text" v-model="ruleForm.phone" placeholder="管理员手机号码" ></el-input>
              </el-form-item>
              <el-form-item label="密码" >
                <el-input type="password" v-model="ruleForm.pwd" placeholder="6-12位数字或字母组合，区分大小写，默认123456"></el-input>
              </el-form-item>
              <el-form-item label="状态" >
                <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
                <el-radio v-model="ruleForm.status" label="0">禁用</el-radio>
              </el-form-item>
              <el-form-item class="btns">
                <el-button class="add_btn" type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                <router-link to="/system_manager">
                  <el-button size="small">返回列表</el-button>
                </router-link>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  export default {
    components: {leftnav,topnav},
    data() {
      var checkedphone = (rule, value, callback) => {
        let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!myreg.test(this.ruleForm.phone)) {
           callback(new Error('请输入正确的手机号'));
        }else{
          callback();
        }
        };
      return {
        mincht:'',
        selectData:'',
        ruleForm: {
          player: '',
          name: '',
          turename:'',
          phone:'',
          pwd:'',
          status:'1'
        },
        rules: {
          player: [
            { required: true, message: '请选择角色', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          turename: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
          ],
          checkphone: [
            { validator: checkedphone, trigger: 'blur' }
          ],
        },
        searchid:'',
        type:0,
        addtype:0,
        showimg:''
      }
    },
    props: {},
    methods: {
      // 上传图片
      changepic(){
        let _this=this
        var reads= new FileReader();
        var f=document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
          _this.showimg=this.result;
        };
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this=this
            if(this.title==2){
              if(_this.type==1){
                return false;
              }
              _this.type=1;
              this.axios.post(this.apis+'/san/Admin/editadmin',{
                id:this.searchid,
                realname:this.ruleForm.turename,
                mobile:this.ruleForm.phone,
                password:this.ruleForm.pwd,
                status:this.ruleForm.status,
                group_id:this.ruleForm.player,
                username:this.ruleForm.name,
                img:this.showimg,
              }).then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/system_manager'})
                  },1000)
                }else{
                  _this.type=0;
                  this.$message({
                    duration:2000,
                    center: true,
                    message:res.data.msg,
                    type: 'error'
                  });
                }
              })
                .catch(function (err) {
                })
            }
            if(this.title==1){
              if(_this.addtype==1){
                return false;
              }
              _this.addtype=1;
              this.axios.post(this.apis+'/san/Admin/addadmin',{
                realname:this.ruleForm.turename,
                mobile:this.ruleForm.phone,
                password:this.ruleForm.pwd,
                status:this.ruleForm.status,
                group_id:this.ruleForm.player,
                username:this.ruleForm.name,
                img:this.showimg,
              }).then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/system_manager'})
                  },1000)
                }else{
                  _this.addtype=0;
                  this.$message({
                    duration:2000,
                    center: true,
                    message:res.data.msg,
                    type: 'error'
                  });
                }
              })
                .catch(function (err) {
                })
            }
          } else {
            return false;
          }
        });
      },
      getinfo(){
        var _this=this
        // 请求当前页面数据
        if(_this.title==2){
          this.axios.post(this.apis+'/san/admin/editshow', {
            id:this.searchid,
          }).then((res) => {
            this.selectData=res.data.data.auth
            this.showimg=res.data.data.img
            this.ruleForm.player=res.data.data.group_id
            this.ruleForm.name=res.data.data.username
            this.ruleForm.turename=res.data.data.realname
            this.ruleForm.phone=res.data.data.mobile
            this.ruleForm.status=String(res.data.data.status)
          })
            .catch(function (err) {
            })
        }
        if(_this.title==1){
          this.axios.post(this.apis+'/san/admin/add')
            .then((res) => {
            this.selectData=res.data.data
          })
            .catch(function (err) {
            })
        }
      },
    },
    mounted(){
      this.mincht = (this.docheight)  +'px'
    },
    created() {
      document.title = '新增管理员'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      if(this.$route.query.id){
        this.searchid=this.$route.query.id
      }
     this.getinfo()
    },
  }
</script>

<style scoped lang="less">
  .container{
    display: flex;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .rightbox{
      width: 87%;
      height: 100%;
      margin-left: 200px;
      max-height: 100%;
      display: flex;
      flex-direction: column;
      .topbox{
        width: 100%;
        height: 71px;
      }
      .content{
        flex: 1;
        overflow-y: auto;
        width: 100%;
        background-color: #f2f2f2;
        .listbox{
          width: 97%;
          margin-top: 20px;
          margin-bottom: 30px;
          margin-left: 1.5%;
          min-height: 500px;
          background-color: white;
          .listbox_title{
            padding: 10px 0px 10px 30px;
            font-size: 12px;
            border-bottom: 1px solid #e4e4e4;
            .return_list{
              margin-left:85%;
              text-decoration:none;
              color: #666666;
              display: inline-block;
            }
          }
          .add_manager{
            width: 60%;
            margin-left: 9%;
            min-height: 500px;
            margin-top: 60px;
          }
        }
      }
    }
  }
  .el-select,.el-input{
    width: 80%;
  }
  .el-form-item__label{
    font-weight:bolder;
  }
  .add_text{
    font-size: 12px;
    margin-left:15%;
    color: #606266;
  }
  .add_btn{
    margin-right: 10px;
  }
  .list{
    display: flex;
    margin-bottom: 20px;
    .list_title{
      margin-right: 20px;
      width:13%;
      text-align: right;
      p{
        color: #606266;
        span{
          color: red;
          line-height: 40px;
          margin-right: 5px;
        }
        font-weight: 500;
        line-height:40px;
        margin: 0px;
        font-size: 14px;
      }
    }
  }
  .btn{
    display: inline-block;
    background-color: #0080ff;
    text-align: center;
    line-height: 35px;
    color: white;
    height: 35px;
    width: 130px;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .btns{
    padding-bottom: 30px;
  }
  .addimg{
    display: inline-block;
    width: 50%;
  }
</style>
