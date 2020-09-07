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
            创建社群
            <router-link to="/san_club_list">
            <a href="" class="return_list"><el-button size="small">返回列表</el-button></a>
            </router-link>
          </div>
          <div class="add_manager">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <div class="list">
                <div class="list_title"><p> <span>*</span>社群名称</p></div>
                <div class="list_content">
                  <el-input style="width:80%;"  v-model="ruleForm.name" placeholder="请填写社群名称"></el-input>
                </div>
              </div>
              <div class="list">
                <div class="list_title"><p> <span>*</span>社群封面</p></div>
                <div class="list_content">
                  <label for="file" class='btn'>上传图片</label>
                  <input type="file"name="file" id="file" style="display: none;" accept="image/*" @change="changepic(this)" />
                  <input type="hidden" id="showinput" />
                  <div v-if="ruleForm.img==''" style=" display:table-cell;vertical-align: middle;text-align: center;outline: 1px solid #dcdfe6;width: 160px;height: 120px">
                    <img  class="addimg" src="../../../../../static/img/system.png" alt="">
                  </div>
                  <div v-if="ruleForm.img!=''" style="width: 160px;height: 120px">
                    <img  style="width: 100%;height: 100%" id="show" :src="ruleForm.img" alt="">
                  </div>
                  <p  style="padding-top: 20px;margin: 0px;font-size: 12px;color: #606266">建议尺寸：640*240px</p>
                </div>
              </div>
              <div class="list">
                <div class="list_title"><p>社群简介</p></div>
                <div class="list_content">
                  <el-input style="width: 80%" :autosize="{ minRows: 4}" type="textarea" v-model="ruleForm.desc" placeholder="请填写社群简介信息"></el-input>
                </div>
              </div>
              <div class="list">
                <div class="list_title"><p>是否推荐</p></div>
                <div class="list_content">
                  <div style="line-height: 40px">
                    <el-radio v-model="ruleForm.tj" label="1">是</el-radio>
                    <el-radio v-model="ruleForm.tj" label="0">否</el-radio>
                  </div>

                </div>
              </div>
              <div class="list">
                <div class="list_title"><p>显示</p></div>
                <div class="list_content">
                  <div style="line-height: 40px">
                    <el-radio v-model="ruleForm.show" label="1">显示</el-radio>
                    <el-radio v-model="ruleForm.show" label="2">隐藏</el-radio>
                  </div>
                </div>
              </div>
              <div class="list">
                <div class="list_title"><p>排序</p></div>
                <div class="list_content">
                  <el-input v-model="ruleForm.order" placeholder="请填写"></el-input>
                </div>
              </div>
              <el-form-item class="addclubbtn">
                <el-button class="add_btn" type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                <router-link to="/san_club_list">
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
          name: '',
          order: '',
          desc: '',
          tj:'1',
          show:'1',
          img:''
        },
        rules: {
          name: [
            { required: true, message: '请输入社群名称', trigger: 'blur' },
          ],
        },
        showdata:'',
        title:'',
        searchid:'',
        type:0,
      }
    },
    props: {},
    methods: {
      changepic(){
        let _this=this
          var reads= new FileReader();
          var f=document.getElementById('file').files[0];
          reads.readAsDataURL(f);
          reads.onload=function (e) {
            _this.ruleForm.img=this.result;
        };
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 编辑
            let _this=this
            if(this.ruleForm.name==''){
              this.$message({
                duration:1000,
                center: true,
                message: '请输入社群名称',
                type: 'error'
              });
              return false
            }
            if(this.ruleForm.img==''){
              this.$message({
                duration:1000,
                center: true,
                message: '请上传社群封面',
                type: 'error'
              });
              return false
            }
            if(_this.type==1){
              return false;
            }
            _this.type=1;
            if(this.title==2){
              this.axios.post(this.apis+'/san/community/editcom', {
                community_id:this.searchid,
                name:this.ruleForm.name,
                community_pic:this.ruleForm.img,
                introduction:this.ruleForm.desc,
                is_top:this.ruleForm.tj,
                status:this.ruleForm.show,
                sort:this.ruleForm.order,
              }).then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/san_club_list'})
                  },1000)
                }else{
                  _this.type=0;
                  this.$message({
                    duration:1000,
                    center: true,
                    message:res.data.msg,
                    type: 'error'
                  });
                }
              })
                .catch(function (err) {
                })
            }
            // 新增
            if(this.title==1){
              this.axios.post(this.apis+'/san/community/addcom', {
                name:this.ruleForm.name,
                community_pic:this.ruleForm.img,
                introduction:this.ruleForm.desc,
                is_top:this.ruleForm.tj,
                status:this.ruleForm.show,
                sort:this.ruleForm.order,
              }).then((res) => {
                if(res.data.code==10000){
                  _this.type=0;
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/san_club_list'})
                  },1000)
                }else{
                  this.$message({
                    duration:1000,
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
          this.axios.post(this.apis+'/san/community/editshow', {
            id:this.searchid,
          }).then((res) => {
            _this.ruleForm.name=res.data.data.name
            _this.ruleForm.img=res.data.data.community_pic
            _this.ruleForm.desc=res.data.data.introduction
            _this.ruleForm.order=res.data.data.sort
            _this.ruleForm.tj=String(res.data.data.is_top)
            _this.ruleForm.show=String(res.data.data.status)
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
      document.title = '社群新增'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      if(this.$route.query.id){
        this.searchid=this.$route.query.id
      }
      this.getinfo();
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
  .list{
    display: flex;
    margin-bottom: 20px;
    .list_content{
      width: 85%;
    }
    .list_title{
      margin-right: 10px;
      width:15%;
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
  .el-select,.el-input{
    width: 80%;
  }
  .el-form-item__label{
    font-weight:bolder;
  }
  .add_text{
    font-size: 12px;
    margin-left:14%;
    color: #606266;
  }
  .add_btn{
    margin-right: 10px;
  }
  .btn{
    display: inline-block;
    background-color: #0080ff;
    text-align: center;
    line-height: 35px;
    color: white;
    height: 35px;
    width: 130px;
    margin-bottom: 20px;
  }
  .addclubbtn{
    padding-bottom: 30px;
  }
  .addimg{
    display: inline-block;
    width: 50%;
  }
</style>
