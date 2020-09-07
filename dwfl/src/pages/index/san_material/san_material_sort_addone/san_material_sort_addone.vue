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
            新增一级分类
            <router-link to="/san_material_sort">
            <a href="" class="return_list"><el-button size="small">返回列表</el-button></a>
            </router-link>
          </div>
          <div class="add_manager">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请填写分类名称"></el-input>
              </el-form-item>
              <el-form-item label="分类图标" prop="img">
                <label for="file" class='btn'>上传图片</label>
                <input type="file"name="file" id="file" style="display: none;" accept="image/*" @change="changepic(this)" />
                <input type="hidden" id="showinput" />
                <div v-if="ruleForm.img==''" style="position: relative;outline: 1px solid #dcdfe6;width: 145px;height: 145px">
                  <img  class="addimg" src="../../../../../static/img/system.png" alt="">
                </div>
                <div v-if="ruleForm.img!=''" style="width: 145px;height: 145px">
                  <img  style="width: 100%;height: 100%"  :src="ruleForm.img" alt="">
                </div>
                <p  style="margin: 0px;font-size: 12px;color: #606266">建议尺寸：100*100px</p>
              </el-form-item>
              <el-form-item label="状态" >
                <el-radio v-model="ruleForm.show" label="1">显示</el-radio>
                <el-radio v-model="ruleForm.show" label="2">隐藏</el-radio>
              </el-form-item>
              <el-form-item label="排序">
                <el-input v-model="ruleForm.order" placeholder="请填写"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="add_btn" type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                <router-link to="/san_material_sort">
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
        ruleForm: {
          name: '',
          order: '',
          show:'1',
          img:''
        },
        rules: {
          name: [
            { required: true, message: '请填写分类名称', trigger: 'blur' },
          ],
          img:[],
        },
        searchid:'',
        title:'',
        mincht:'',
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
      // 保存提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           /* var sortimg=document.getElementById('showinput').value*/
            //  发起请求
            let _this=this
            if(_this.type==1){
              return false;
            }
            _this.type=1;
            if(this.title==1){
              this.axios.post('http://dongwu.siantest.com/san/Classify/ajax_add', {
                cate_name:this.ruleForm.name,
                orderby:this.ruleForm.order,
                status:this.ruleForm.show,
                cate_img:this.ruleForm.img
              }).then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/san_material_sort'})
                  },1000)
                }else{
                  _this.type=0
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
            if(this.title==2){
              this.axios.post(this.apis+'/san/Classify/ajax_edit', {
                cate_id:this.searchid,
                cate_name:this.ruleForm.name,
                orderby:this.ruleForm.order,
                status:this.ruleForm.show,
                cate_img:this.ruleForm.img
              }).then((res) => {
                if(res.data.code==10000){
                  this.$message({
                    duration:1000,
                    center: true,
                    message: '已保存',
                    type: 'success'
                  });
                  setTimeout(()=>{
                    _this.$router.push({path:'/san_material_sort'})
                  },1000)
                }else{
                  _this.type=0
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
          this.axios.post(this.apis+'/san/Classify/details', {
            cate_id:_this.searchid,
          }).then((res) => {
            _this.ruleForm.name=res.data.data.cate_name
            _this.ruleForm.img=res.data.data.cate_img
            _this.ruleForm.order=res.data.data.orderby
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
      document.title = '资料新增一级分类'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      if(this.$route.query.obj){
        this.searchid=this.$route.query.obj
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
      max-height: 100%;
      margin-left: 200px;
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
  .addimg{
    display: inline-block;
    width: 70px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -30px;
    margin-left: -35px;
  }
</style>
