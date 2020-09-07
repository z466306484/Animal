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
            新增广告
            <router-link to="/san_advert_list">
              <a href="" class="return_list"><el-button size="small">返回列表</el-button></a>
            </router-link>
          </div>
          <div class="add_manager">
            <div class="list">
              <div class="list_title"><p> <span>*</span>广告名称</p></div>
              <div class="list_content">
                <el-input style="width: 100%;"  v-model="advertname" placeholder="请输入广告名称"></el-input>
              </div>
            </div>
            <div class="list">
              <div class="list_title"><p> <span>*</span>位置</p></div>
              <div class="list_content">
                <el-select style="width:100%;" v-model="address" placeholder="选择广告所在位置">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="list">
              <div class="list_title"><p> <span>*</span>封面</p></div>
              <div class="list_content">
                <label for="file" class='btn'><i class="el-icon-plus"></i>上传图片</label>
                <input type="file"name="file" id="file" style="display: none;" accept="image/*" @change="changepic(this)" />
                <input type="hidden" id="showinput" />
                <div v-if="showimg==''" style=" display: table-cell;vertical-align: middle;text-align: center;outline: 1px solid #dcdfe6;width: 160px;height: 120px">
                  <img  class="addimg" src="../../../../../static/img/system.png" alt="">
                </div>
                <div v-if="showimg!=''" style="width: 160px;height: 120px">
                  <img  style="width: 100%;height: 100%" id="show" :src="showimg" alt="">
                </div>
              </div>
            </div>
            <div class="list">
              <div class="list_title"><p>链接</p></div>
              <div class="list_content">
                <el-input style="width: 100%;"  v-model="lianjie" placeholder="请输入链接地址，填写后将不访问下方内容"></el-input>
              </div>
            </div>
            <!--编辑器-->
            <div class="list">
              <div class="list_title"><p>内容</p></div>
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
                <el-input style="width: 100%;"  v-model="order" placeholder="数字越大，排序越靠前"></el-input>
              </div>
            </div>
            <div  class="list addadvert">
              <el-button style="margin-left:18%" class="add_btn" type="primary" size="small" @click="submitForm()">保存</el-button>
              <router-link to="/san_advert_list">
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
        // 下拉列表选项
        options: [
          {
            value: '0',
            label: '首页banner'
          }, {
            value: '1',
            label: '社群banner'
          }],
        address:'',
        advertname:'',
        lianjie:'',
        status:'1',
        order:'',
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
        },
        title:'',
        searchid:'',
        mincht:'',
        type:0,
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
      // 点击按钮
      submitForm() {
        if(this.advertname==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请输入广告名称',
            type: 'error'
          });
          return false
        }
        if(this.address==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请选择广告所在位置',
            type: 'error'
          });
          return false
        }
        if(this.showimg==''){
          this.$message({
            duration:1000,
            center: true,
            message: '请上传封面图片',
            type: 'error'
          });
          return false
        }
            //  发起请求
        let _this=this
        if(_this.type==1){
          return false;
        }
        _this.type=1;
        if(this.title==1){
          this.axios.post(this.apis+'/san/Advertisement/ajax_add', {
            name:this.advertname,
            position:this.address,
            covers_pic:this.showimg,
            link:this.lianjie,
            content:this.content,
            status:this.status,
            sort:this.order,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                message: '已保存',
                center: true,
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_advert_list'})
              },1000)
            }else{
              _this.type=0;
            }
          })
            .catch(function (err) {
            })
        }
        if(this.title==2){
          this.axios.post(this.apis+'/san/Advertisement/ajax_edit', {
            ad_id:this.searchid,
            name:this.advertname,
            position:this.address,
            covers_pic:this.showimg,
            link:this.lianjie,
            content:this.content,
            status:this.status,
            sort:this.order,
          }).then((res) => {
            if(res.data.code==10000){
              this.$message({
                duration:1000,
                message: '已保存',
                center: true,
                type: 'success'
              });
              setTimeout(()=>{
                _this.$router.push({path:'/san_advert_list'})
              },1000)
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
      getinfo(){
        var _this=this
        // 请求当前页面数据
        if(_this.title==2){
          this.axios.post(this.apis+'/san/Advertisement/ajax_sel', {
            ad_id:this.searchid,
          })
            .then((res) => {
            _this.advertname=res.data.data.name
            _this.address=res.data.data.position
            _this.showimg=res.data.data.covers_pic
            _this.lianjie=res.data.data.link
            _this.content=res.data.data.content
            _this.status=String(res.data.data.status)
            _this.order=res.data.data.sort
          })
            .catch(function (err) {
            })
        }
      }
    },
    mounted(){
      this.mincht = (this.docheight)  +'px'
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
    },
    created() {
      document.title = '新增广告'
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
  .ql-container{
    min-height: 100px !important;
  }
  .ql-container.ql-snow{
    min-height: 100px !important;
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
  }
.addadvert{
  padding-bottom: 30px;
}
  .addimg{
    display: inline-block;
    width: 50%;
  }
</style>
