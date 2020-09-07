<template>
  <div class="container" v-if="showpage" :style="'min-height:'+ mincht">
    <leftnav></leftnav>
    <div class="rightbox">
      <div class="topbox">
        <topnav></topnav>
      </div>
      <!--首页内容-->
      <div class="content" >
        <div class="listbox">
          <div class="listbox_title">
            系统信息
          </div>
          <div class="add_manager">
            <div class="list">
              <div class="list_title"><p>联系电话</p></div>
              <div class="list_content">
                <el-input style="width: 100%;"  v-model="yourphone" placeholder="请填写联系方式，方便使用咨询"></el-input>
              </div>
            </div>
            <div class="list">
              <div class="list_title"><p>咨询微信</p></div>
              <div class="list_content">
                <el-input style="width: 100%;"  v-model="yourwx" placeholder="请填写咨询微信"></el-input>
              </div>
            </div>
            <div class="list">
              <div class="list_title"><p>联系邮箱</p></div>
              <div class="list_content">
                <el-input style="width: 100%;"  v-model="youremail" placeholder="请填写联系邮箱"></el-input>
              </div>
            </div>
            <!--编辑器-->
            <div class="list">
              <div class="list_title"><p>关于我们</p></div>
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
              </div>
            </div>
            <div  class="list">
              <el-button style="margin-left:18%" class="add_btn" type="primary" size="small" @click="submitForm()">保存</el-button>
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
        showpage:false,
        mincht:'',
        yourphone:'',
        yourwx:'',
        youremail:'',
        // 编辑器
        content:' ',
        editorOption: {
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'], //加粗，斜体，下划线，删除线
              [{ 'header': 1 }, { 'header': 2 }],  // 标题，键值对的形式；1、2表示字体大小
              [{ 'indent': '-1'}, { 'indent': '+1' }],  // 缩进
              [{ 'direction': 'rtl' }],    // 文本方向
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'align': [] }], //对齐方式
              ['code','code-block'],
              ['clean'], //清除字体样式
              ['image','video'] //上传图片、上传视频
            ]
          }
        }
      }
    },
    props: {},
    methods: {
      // 点击按钮
      submitForm() {
              //  发起请求
        let _this=this
        this.axios.post(this.apis+'/san/about/add', {
          mobile:this.yourphone,
          email:this.youremail,
          aboutme:this.content,
          wx:this.yourwx,
        }).then((res) => {
          if(res.data.code==10000){
            this.$message({
              duration:1000,
              center: true,
              message: '保存成功',
              type: 'success'
            });
            setTimeout(()=>{
              _this.initdata()
            },1000)
          }else{
            this.$message({
              duration:2000,
              center: true,
              message:res.data.msg,
              type: 'error'
            });
          }
          _this.showpage=true
        })
          .catch(function (err) {
          })

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
        this.axios.post(this.apis+"/san/about/indexshow")
          .then((res)=> {
           if(res.data.code==10000){
               _this.showpage = true
               _this.yourwx=res.data.data.wx
               _this.youremail=res.data.data.email
               _this.yourphone=res.data.data.mobile
               _this.content=res.data.data.aboutme
           }
            if(res.data.code==10008){
              _this.$router.push({path:'/san_login'})
            }
          })
          .catch(function (err) {

          })
      },
    },
    mounted(){
      this.mincht = (this.docheight )+'px'
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    created() {
      document.title = '关于我们'
      this.initdata()
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
          min-height:500px;
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
  }

</style>
