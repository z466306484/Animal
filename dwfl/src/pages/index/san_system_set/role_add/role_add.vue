<template>
  <div class="container" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            新增角色
            <router-link to="/role">
              <a class="return_list"><el-button size="small">返回列表</el-button></a>
            </router-link>
          </div>
          <div class="add_manager">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="角色名称" prop="role">
                <el-input v-model="ruleForm.role" placeholder="请输入角色名称"></el-input>
              </el-form-item>
              <p class="add_role_t">权限配置</p>
             <!-- <el-form-item class="checkbox">
                <el-checkbox v-model="ruleForm.cheaked1s">资料管理</el-checkbox>
              </el-form-item>-->
              <el-form-item class="checkbox1">
                <el-checkbox-group v-model="ruleForm.cheaked1s">
                  <el-checkbox label="1" class="lableone" @change="inputToDisabled(1)">资料管理</el-checkbox>
                  <br>
                  <el-checkbox label="2" :disabled="isAble">新增资料</el-checkbox>
                  <el-checkbox label="3" :disabled="isAble">编辑资料</el-checkbox>
                  <div class="add_hr"></div>
                  <el-checkbox label="4" class="lableone" @change="inputToDisabled(2)">社群管理</el-checkbox>
                  <br>
                  <el-checkbox label="5" :disabled="isAble1">新增社群</el-checkbox>
                  <el-checkbox label="6" :disabled="isAble1">编辑社群</el-checkbox>
                  <div class="add_hr"></div>
                  <el-checkbox label="7" class="lableone" @change="inputToDisabled(3)">用户管理</el-checkbox>
                  <br>
                  <el-checkbox label="8":disabled="isAble2">查看用户</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="状态" >
                <el-radio v-model="ruleForm.status" label="1">启用</el-radio>
                <el-radio v-model="ruleForm.status" label="2">禁用</el-radio>
              </el-form-item>
              <el-form-item class="btns">
                <el-button class="add_btn" type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                <router-link to="/role">
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
      return {
        mincht:'',
        ruleForm: {
          role: '',
          cheaked1s:[],//资料列表
          status:'1',
        },
        rules: {
          role: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
          ],
        },
        searchid:'',
        title:'',
        type:0,
        isAble:true,
        isAble1:true,
        isAble2:true,
      }
    },
    props: {},
    methods: {
       // 复选选择框
      inputToDisabled(type){
        if(type==1){
          if(this.ruleForm.cheaked1s.length>0){
            for(var i=0;i<this.ruleForm.cheaked1s.length;i++){
              if(this.ruleForm.cheaked1s[i]=='1'){
                this.isAble=false
              }else{
                this.isAble=true
                var index=this.ruleForm.cheaked1s
                for(var a=0;a<index.length;a++){
                  for(var a=0;a<this.ruleForm.cheaked1s.length;a++){
                    if(this.ruleForm.cheaked1s[a]=='2'){
                      this.ruleForm.cheaked1s.splice(a,1)
                    }
                  }
                  for(var b=0;b<this.ruleForm.cheaked1s.length;b++){
                    if(this.ruleForm.cheaked1s[b]=='3'){
                      this.ruleForm.cheaked1s.splice(b,1)
                    }
                  }
                }
              }
            }
          }
          else{
            if(this.ruleForm.cheaked1s[i]=='1'){
              this.isAble=false
            }else{
              this.isAble=true
            }
          }
        }
        if(type==2){
          if(this.ruleForm.cheaked1s.length>0){
            for(var i=0;i<this.ruleForm.cheaked1s.length;i++){
              if(this.ruleForm.cheaked1s[i]=='4'){
                this.isAble1=false
              }else{
                this.isAble1=true
                for(var a=0;a<this.ruleForm.cheaked1s.length;a++){
                  if(this.ruleForm.cheaked1s[a]=='5'){
                    this.ruleForm.cheaked1s.splice(a,1)
                  }
                }
                for(var b=0;b<this.ruleForm.cheaked1s.length;b++){
                  if(this.ruleForm.cheaked1s[b]=='6'){
                    this.ruleForm.cheaked1s.splice(b,1)
                  }
                }
              }
            }
          }
          else{
            if(this.ruleForm.cheaked1s[i]=='4'){
              this.isAble1=false
            }else{
              this.isAble1=true
            }
          }
        }
        if(type==3){
          if(this.ruleForm.cheaked1s.length>0){
            for(var i=0;i<this.ruleForm.cheaked1s.length;i++){
              if(this.ruleForm.cheaked1s[i]=='7'){
                this.isAble2=false
              }else{
                this.isAble2=true
                for(var a=0;a<this.ruleForm.cheaked1s.length;a++){
                  if(this.ruleForm.cheaked1s[a]=='8'){
                    this.ruleForm.cheaked1s.splice(a,1)
                  }
                }
              }
            }
          }
          else{
            if(this.ruleForm.cheaked1s[i]=='7'){
              this.isAble2=false
            }else{
              this.isAble2=true
            }
          }
        }
       console.log(this.ruleForm.cheaked1s)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.ruleForm.cheaked1s)
            //  发起请求
            let _this=this
            if(_this.type==1){
              return false;
            }
            _this.type=1;
            if(this.title==2){
              this.axios.post(this.apis+'/san/auth/editauth',{
                id:this.searchid,
                name:this.ruleForm.role,
                status:this.ruleForm.status,
                rules:JSON.stringify(this.ruleForm.cheaked1s),
              }).then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/role'})
                  },1000)
                }else{
                  _this.type=0;
                  this.$message({
                    duration:1000,
                    center: true,
                    message:res.data.msg,
                    type: 'success'
                  });
                }
              })
                .catch(function (err) {
                })
            }
            if(this.title==1){
              console.log("haha")
              this.axios.post(this.apis+'/san/auth/addauth',{
                name:this.ruleForm.role,
                status:this.ruleForm.status,
                rules:JSON.stringify(this.ruleForm.cheaked1s),
              }).then((res) => {
                if(res.data.code==10000){
                  console.log(res.data)
                  this.$message({
                    duration:1000,
                    center: true,
                    message:res.data.msg,
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/role'})
                  },1000)
                }else{
                  this.$message({
                    duration:1000,
                    center: true,
                    message:res.data.msg,
                    type: 'error'
                  });
                  _this.type=0;
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
        let _this=this
        // 请求当前页面数据
        if(_this.title==2){
          this.axios.post(this.apis+'/san/auth/editshow', {
            id:this.searchid,
          }).then((res) => {
            if(res.data.code==10000){
              this.ruleForm.role=res.data.data.name
              this.ruleForm.status=String(res.data.data.status)
              this.ruleForm.cheaked1s=[]
              this.ruleForm.cheaked1s=res.data.data.rules
              for(var i=0;i<res.data.data.rules.length;i++){
                if(res.data.data.rules[i]=='1'){
                  this.isAble=false
                }
                if(res.data.data.rules[i]=='4'){
                  this.isAble1=false
                }
                if(res.data.data.rules[i]=='7'){
                  this.isAble2=false
                }
              }
            }
          })
            .catch(function (err) {
            })
        }
      }

    },
    mounted(){
      this.mincht = (this.docheight)  +'px'
    },
    created() {
      document.title = '新增角色'
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
  .lableone{
    font-weight: 600;
  }
  .el-form-item__label{
    font-weight:bolder;
  }
  .add_role_t{
    width: 88px;
    text-align: right;
    font-size: 14px;
    color: #606266;
  }
  .add_btn{
    margin-right: 10px;
  }
  .checkbox{
    margin-bottom: 0px;
  }
  .checkbox1{
    margin-bottom: 10px;
  }
  .checkbox2{
    margin-top: 10px;
  }
  .add_hr{
    width: 80%;
    height: 1px;
    background-color: #cccccc;
  }
  .btns{
    padding-bottom: 30px;
  }
</style>
