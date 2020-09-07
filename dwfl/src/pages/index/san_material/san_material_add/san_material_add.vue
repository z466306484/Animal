<template>
  <div class="container" v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content">
        <div class="listbox">
          <div class="listbox_title">
            新增资料
            <router-link to="/san_material_list">
            <a href="" class="return_list"><el-button size="small">返回列表</el-button></a>
            </router-link>
          </div>
          <div class="add_manager">
                <div class="list">
                     <div class="list_title"><p> <span>*</span>资料名称</p></div>
                     <div class="list_content">
                       <el-input style="width:100%;"  v-model="materialname" placeholder="请填写资料名称"></el-input>
                     </div>
                </div>
                <div class="list">
                     <div class="list_title"><p> <span>*</span>所属分类</p></div>
                     <div class="list_content">
                       <!--选择框-->
                         <div class="choose_role" @click="myMenu">
                         <p id="scanMy">请选择资料所属分类</p>
                         <span class="role_img"><i :class="icon"></i></span>
                         <div class="menu">
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
                </div>
                <div class="list">
                     <div class="list_title"><p> <span>*</span>资料封面</p></div>
                     <div class="list_content">
                       <label for="file" class='btn'>上传图片</label>
                       <input type="file"name="file2" id="file" style="display: none;" accept="image/*" @change="changepic(this)" />
                       <input type="hidden" id="showinput" />npm
                       <div v-if="showimg==''" style=" display: table-cell;vertical-align: middle;text-align: center;outline: 1px solid #dcdfe6;width: 160px;height: 120px">
                         <img  class="addimg" src="../../../../../static/img/system.png" alt="">
                       </div>
                       <div v-if="showimg!=''" style="width: 160px;height: 120px">
                         <img  style="width: 100%;height: 100%" id="show" :src="showimg" alt="">
                       </div>
                       <p  style="padding-top: 15px;margin: 0px;font-size: 12px;color: #606266">建议尺寸：640*240px</p>
                     </div>
                </div>
                <!--编辑器-->
                <div class="list">
                  <div class="list_title"><p> <span>*</span>内容</p></div>
                  <div class="list_content">
                    <!--编辑器-->
                    <div class="edit_container">
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                      </quill-editor>
                    </div>
                    <p style="font-size: 12px;color: #606266">可上传小于50mb的视频文件，或链接腾讯视频</p>
                  </div>
                </div>
                 <!--上传文档-->
                <div class="list">
              <div class="list_title"><p>其他文档</p></div>
              <div class="list_content">
                <label class='btn'>上传文档</label>
                <input  type="file" ref="file1" style=" opacity: 0;width:120px;outline: 1px solid red;position: relative;right: 130px"  accept=".doc,.pdf,.docx" @change="changedoc($event)" /><span style="position: relative;right: 100px" v-if="filename" v-model="filename">{{filename}}</span>
                <input type="hidden"  id="showfile"/>
                <p  style="margin: 0px;margin-top:10px;font-size: 12px;color: #606266">可上传.pdf  .docx .excel 格式的文档</p>
              </div>
            </div>
                <div class="list">
              <div class="list_title"><p>是否推荐</p></div>
              <div class="list_content">
                <el-radio  style="line-height: 3"  v-model="tj" label="1">推荐</el-radio>
                <el-radio style="line-height: 3" v-model="tj" label="0">不推荐</el-radio>
              </div>
            </div>
                <div class="list">
              <div class="list_title"><p>状态</p></div>
              <div class="list_content">
                <el-radio  style="line-height: 3"  v-model="status" label="1">显示</el-radio>
                <el-radio style="line-height: 3" v-model="status" label="2">隐藏</el-radio>
              </div>
            </div>
                <div class="list">
              <div class="list_title"><p>排序</p></div>
              <div class="list_content">
                <el-input style="width:100%;"  v-model="order" placeholder="数字越大，排序越靠前"></el-input>
              </div>
            </div>
                <div  class="list materialbtn">
              <el-button style="margin-left:18%" class="add_btn" type="primary" size="small" @click="submitForm()">保存</el-button>
              <router-link to="/san_material_list">
              <el-button size="small">返回列表</el-button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import topnav from '@/components/sannav/top'
  import leftnav from  '@/components/sannav/left'
  export default {
    components: {leftnav,topnav,quillEditor},
    data() {
      return {
        mincht:'',
        showpage:false,
        icon:'el-icon-arrow-down',
        // 下拉列表选项
        options: [
          {
          value: '1',
          label: '科普类'
        }, {
          value: '2',
          label: '饲养类'
        }],
        sort:'',
        materialname:'',
        tj:'1',
        status:'1',
        order:'',
        select:'',
        file:'',
        filename:'',
        // 编辑器
        content:'',
        editorOption: {
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
              [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
              [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
              [{ 'direction': 'rtl' }],    // 文本方向
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'align': [] }], //对齐方式
              ['clean'], //清除字体样式
              ['image','video'] //上传图片、上传视频
            ]
          }
        },
        accTouch:0,
        searchid:'',
        title:'',
        type:0,
        edittype:0,
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
          _this.showimg=this.result
        };
      },
      changedoc(e) {
        let _this=this
        // 利用fileReader对象获取file
        var file = e.target.files[0];
        var filesize = file.size;
        var filename = file.name;
        // 2,621,440   2M
        if (filesize <=0) {
          this.$message({
            duration:1000,
            center: true,
            message: '文件不能为空，请重新上传文件',
            type: 'error'
          });
          return false
        }
        if(file.type!='application/pdf'&& file.type!='application/vnd.openxmlformats-officedocument.wordprocessingml.document' && file.type!='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.$message({
            duration:1000,
            center: true,
            message: '文件类型错误，请重新上传文件',
            type: 'error'
          });
          return false
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        _this.filename=filename
        reader.onload = function (e) {
          var imgcode = e.target.result;
          _this.file=imgcode
        }
      },
      // 点击按钮
      submitForm() {
        let _this=this
        if(_this.materialname==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请填写资料名称',
            type: 'error'
          });
          return false
        }
        if(_this.sort==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请选择资料所属分类',
            type: 'error'
          });
          return false
        }
        if(_this.showimg==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请上传资料封面',
            type: 'error'
          });
          return false
        }
        if(_this.content==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请填写资料内容',
            type: 'error'
          });
          return false
        }
        if(this.title==1){
          //  发请求
          if(_this.type==1){
            return false;
          }
          _this.type=1;
          this.axios.post(this.apis+'/san/Material/ajax_add',
            {
            name:this.materialname,
            cate_id:this.sort,
            covers_pic:this.showimg,
            content:this.content,
            file:this.file,
            file_name:this.filename,
            is_top:this.tj,
            status:this.status,
            sort:this.order,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:2000,
                center: true,
                message: '已保存',
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_material_list'})
              },1000)
            }else {
              this.$message({
                duration:1000,
                center: true,
                message:res.data.msg,
                type: 'error'
              });
              _this.type=0
            }
          })
            .catch(function (err) {
            })
        }
        if(this.title==2){
          //  发请求
          if(_this.edittype==1){
            return false;
          }
          _this.edittype=1;
          this.axios.post(this.apis+'/san/Material/ajax_edit',
            {
              article_id:this.searchid,
              name:this.materialname,
              cate_id:this.sort,
              covers_pic:this.showimg,
              content:this.content,
              file:this.file,
              file_name:this.filename,
              is_top:this.tj,
              status:this.status,
              sort:this.order,
            }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:2000,
                center: true,
                message: '已保存',
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_material_list'})
              },1000)
            }else{
              this.$message({
                duration:1000,
                center: true,
                message:res.data.msg,
                type: 'error'
              });
              _this.edittype=0
            }
          })
            .catch(function (err) {
            })
        }
      },
      // 编辑器
      onEditorReady(editor) { // 准备编辑器
      },
      onEditorBlur(){}, // 失去焦点事件
      onEditorFocus(){
      }, // 获得焦点事件
      onEditorChange(){}, // 内容改变事件
      initdata(){
        let _this=this
        this.axios.post("http://dongwu.siantest.com/san/Material/act_cate")
          .then((res)=> {
            if(res.data.code==10000){
              _this.showpage=true
              _this.select=res.data.data
            }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
          .catch(function (err) {
          })
      },
      getinfo(){
        var _this=this
        if(_this.title==2){
          _this.searchid=this.$route.query.id
        }
        // 请求当前页面数据
        if(_this.title==2){
          this.axios.post('http://dongwu.siantest.com/san/Material/ajax_details', {
            article_id:this.searchid,
          }).then((res) => {
            _this.materialname=res.data.data.name
            _this.showimg=res.data.data.covers_pic
            _this.content=res.data.data.content
            _this.file=res.data.data.file
            _this.tj=String(res.data.data.is_top)
            _this.order=res.data.data.sort
            $("#scanMy").html(res.data.data.cate_name);
            _this.status=String(res.data.data.status)
            _this.sort=res.data.data.cate_id
            _this.filename=res.data.data.file_name
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
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    mounted(){
      this.mincht = (this.docheight )  +'px'
    },
    created() {
      document.title = '资料新增'
      if(this.$route.query.type){
        this.title=this.$route.query.type
      }
      this.initdata()
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
          margin-left: 1.5%;
          min-height: 500px;
          margin-bottom: 30px;
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
          .list_content{
            width: 80%;
          }
          .add_manager{
            width: 60%;
            margin-left:8%;
            min-height: 500px;
            margin-top: 60px;
            .list{
              display: flex;
              margin-bottom: 20px;
              .list_title{
                margin-right: 20px;
                width:15%;
                text-align: right;
               p{
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
          }
        }
      }
    }
  }
  .role_img{
     float: right;
     margin-right: 10px;
     margin-top: 10px;
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
    font-size: 14px;
    margin-bottom: 20px;
    cursor: pointer;
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
  .menu{
    width:100%;
    max-height:230px;
    border: solid 1px #cccccc;
    text-align: left;
    overflow-x: hidden;
    overflow-y: scroll;
    cursor: pointer;
    position: absolute;
    top: 47px;
    background-color: white;
    display: none;
    z-index: 1000;
  }
  .menu::-webkit-scrollbar {
    display: none;
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
    border:1px solid #DCDFE6;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
    cursor: pointer;
    position: relative;
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
  .materialbtn{
    padding-bottom: 30px;
  }
  .blue{
    border: solid 1px #409EFF;
  }
  .addimg{
    display: inline-block;
    width: 50%;
  }
</style>
