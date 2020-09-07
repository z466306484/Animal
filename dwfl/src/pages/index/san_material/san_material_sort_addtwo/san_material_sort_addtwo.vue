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
            新增子级分类
            <router-link to="/san_material_sort">
            <a href="" class="return_list"><el-button size="small">返回列表</el-button></a>
            </router-link>
          </div>
          <div class="add_manager">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="上级分类"  v-if="this.title==1">
                {{topname}}
              </el-form-item>
              <el-form-item label="上级分类" prop="player" v-if="this.title==2">
                <div class="list_content">
                  <!--选择框-->
                  <div class="choose_role" @click="myMenu">
                    <p id="scanMy">请选择资料所属分类</p>
                    <span class="role_img"><i :class="icon"></i></span>
                    <div class="menu">
                      <div class="tr" @click="selectvalue(0,'选择上级分类')">请选择上级分类</div>
                      <div class=""  v-for="(item, index) in this.select">
                        <!--一级-->
                        <div style="display: flex" class="tr">
                          <div  style="width: 100%" @click="selectvalue(item.cate_id,item.cate_name)">{{item.cate_name}}</div>
                        </div>
                        <!--二级-->
                        <div   v-for="(index1,index) in item.son">
                          <div style="display: flex;" class="tr" >
                            <div style="width:100%" @click="selectvalue(index1.cate_id,index1.cate_name)">——{{index1.cate_name}}</div>
                          </div>
                          <!--三级-->
                          <div   v-for="index2 in index1.son">
                            <div style="display: flex" class="tr">
                              <div style="width: 100%;" @click="selectvalue(index2.cate_id,index2.cate_name)">———{{index2.cate_name}}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请填写分类名称"></el-input>
              </el-form-item>
              <el-form-item label="分类图标" prop="img">
                <label for="file" class='btn'>上传图片</label>
                <input type="file"name="file" id="file" style=" display: none;" accept="image/*" @change="changepic(this)" />
                <input type="hidden" id="showinput" />
                <!--<div style="margin-top: 20px">
                  <img id="show" style="width:100px;height: 100px"  src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1970925988,2758215166&fm=111&gp=0.jpg" alt="">
                </div>-->
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
              <el-form-item class="addtwobtn">
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
        mincht:'',
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
        title:'',
        nowid:'',
        preid:'',
        topname:'',
        select:'',
        sort:'',
        type:0,
        icon:'el-icon-arrow-down',
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
          _this.ruleForm.img=this.result
        };
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this=this
            if(_this.type==1){
              return false;
            }
            _this.type=1;
            if(this.title==1){
              this.axios.post('http://dongwu.siantest.com/san/Classify/ajax_cadd', {
                cate_name:this.ruleForm.name,
                orderby:this.ruleForm.order,
                parent_cate_id:this.nowid,
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
                cate_id:this.nowid,
                cate_name:this.ruleForm.name,
                parent_cate_id:this.sort,
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
          this.axios.post(this.apis+'/san/Classify/details', {
            cate_id:_this.nowid,
          }).then((res) => {
            _this.topname=res.data.data.cate_name
            if(_this.title==2){
              _this.ruleForm.show=String(res.data.data.status)
              _this.ruleForm.order=res.data.data.orderby
              _this.ruleForm.name=res.data.data.cate_name
              _this.ruleForm.img=res.data.data.cate_img
              _this.sort=res.data.data.parent_cate_id
              $("#scanMy").html(res.data.data.parent_cate_name);
            }

          })
            .catch(function (err) {
            })
        // 请求当前页面数据
        if(_this.title==2){
          this.axios.post(this.apis+"/san/Material/act_cate")
            .then((res)=> {
              this.select=res.data.data
            })
            .catch(function (err) {
            })
        }
      },
      //  选择
      selectvalue(mynum,name){
        this.sort=mynum
        $("#scanMy").html(name);
      },
      myMenu() {
        if(this.accTouch==0){
          $(".menu").slideDown(200);
          this.icon='el-icon-arrow-up'
          this.accTouch=1;
          $(".choose_role").eq(0).addClass("blue");
        }else {
          $(".menu").slideUp(200);
          this.icon='el-icon-arrow-down'
          this.accTouch=0;
          $(".choose_role").eq(0).removeClass("blue");
        }
      }
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '资料新增子级分类'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      if(this.$route.query.obj){
        this.nowid=this.$route.query.obj
      }
      if(this.$route.query.data){
        this.preid=this.$route.query.data
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
          min-height: 530px;
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
  .role_img{
    float: right;
    margin-right: 10px;
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

  .menu{
    width:100%;
    max-height:240px;
    overflow-x: hidden;
    overflow-y: scroll;
    border: solid 1px #cccccc;
    text-align: left;
    cursor: pointer;
    position: absolute;
    top: 47px;
    background-color: white;
    display: none;
  }
  .menu::-webkit-scrollbar {
    display: none;
  }
  .tr{
    font-size: 14px;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    text-indent: 20px;
  }
  .tr :hover{
    background-color: #f5f7fa;
  }
  .menu>div>p{
    margin: 0px;
    margin-left: 20px;
    font-size:14px;
    color: #76838f;
    font-family: "微软雅黑";
    float: left;
    line-height: 40px;
  }
  .menu_list1{
    width: 350px;
    height: 40px;
    border-bottom: solid 1px #cccccc;
    transition: all.2s Linear;
  }
  .menu_list2{
    width: 350px;
    height: 40px;
    transition: all.2s Linear;
  }
  .menu_list1:hover{
    background-color: rgba(71, 186, 193,0.5);
  }
  .menu_list2:hover{
    background-color: rgba(71, 186, 193,0.5);
  }
  .menu_list1:hover p{
    color: white;
  }
  .menu_list2:hover p{
    color: white;
  }
  .choose_role{
    height: 40px;
    width: 80%;
    border: solid 1px #cccccc;
    border-radius: 5px;
    margin-right: auto;
    text-align: left;
    cursor: pointer;
    position: relative;
    z-index: 1000;
  }
  .choose_role>p{
    margin: 0px;
    margin-left: 20px;
    font-size:14px;
    color: #76838f;
    font-family: "微软雅黑";
    float: left;
    line-height: 40px;
  }
  .addtwobtn{
    padding-bottom: 30px;
  }
  .blue{
    border: solid 1px #409EFF;
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
