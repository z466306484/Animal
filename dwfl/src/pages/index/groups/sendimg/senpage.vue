<template>
  <div class="container">
    <div class="textra">
      <textarea class="ipttextra" @focus="onfocus" @blur="onblur" v-model="textarea" :placeholder="placeholder"></textarea>
      <!--<x-textarea class="ipttextra" @on-focus="onfocus" @on-blur="onblur" :placeholder="placeholder" v-model="textarea" :height="100"></x-textarea>-->
    </div>
    <div class="upimgbox" v-if="type ==1">
      <input id="upimage" type="file" @change="handleChange" multiple accept="image/jpg,image/jpeg,image/png,image/gif">
      <img src="/static/images/senadd.jpg">
    </div>
    <div class="upimgbox" v-if="videourl==''&&type ==2 && isios==true">
      <el-upload v-if="type ==2"
                 class="avatar-uploader videobox"
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :show-file-list="false"
                 accept=".mp4"
                 :before-upload="beforeAvatarUpload">
        <el-button class="video-btn"
                   id="videobtn"
                   slot="trigger"
                   size="small"
                   type="primary">选取文件</el-button>
      </el-upload>
      <img src="/static/images/senvideo.jpg">
    </div>
    <div class="upvideoboox" v-if="videourl==''&&type ==2 && isios==false">
      <img @click="showpopup = true" src="/static/images/senvideo.jpg">
    </div>

    <video v-if="type ==2 && videourl!=''" class="showvideo" :src="videourl" width="50%" controls="controls"></video>
    <div class="imgbox" v-if="itemimgarr.length>0 &&type ==1">
      <div class="itemimg" v-for="item in itemimgarr"><img :src="item.src"><div class="closeimg el-icon-circle-close" @click="closeimg(item.id)"></div></div>
    </div>
    <div class="flxbtn">
      <savebtn :btntype="1" btnval="发布" @savefn="savefn"></savebtn>
    </div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
    <loading :show="showload" :text="loadval"></loading>
    <popup v-model="showpopup">
      <div class="popup0">
        <div class="popupitem">
          <div>拍照</div>
          <input type="file" accept="video/*" @change="beforeAvatarUpload" capture="camcorder">
        </div>
        <div class="popupitem">
          <div>相册</div>
          <input type="file" accept="" @change="beforeAvatarUpload" capture="camcorder">
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import { XTextarea,Toast,Loading,Popup  } from 'vux'
  import savebtn from '@/components/comcpn/savebtn'
  export default {
    components: {XTextarea,savebtn,Toast,Loading,Popup },
    data() {
      return {
        loadval:'发布中',
        showload:false,
        showpopup:false,
        iswxweb:false,
        isios:false,
        isShowUploadVideo:true,
        itemimgarr:[],
        placeholder:'有什么要分享的呢',
        imgid:0,
        textarea:'',
        videourl:'',
        community_id:'',
        type:1,
        //toas
        toastshow:false,
        toasttext:'成功',
        toatype:'success',
      }
    },
    props: {},
    methods: {
      onfocus(e){
        console.log(2222)
        let _this = this
        var dom=document.getElementById('tag')
        setTimeout(function(){
          dom.scrollIntoView(true);
          dom.scrollIntoViewIfNeeded();
        },100);
      },//输入框获取焦点
      onblur(){
        var dom=document.getElementById('tag')
        setTimeout(function(){
          dom.scrollIntoView(true);
          dom.scrollIntoViewIfNeeded();
        },100);
      },
      beforeAvatarUpload(file){
        this.showpopup = false
        console.log(file)
        console.log(this.isios)
        let _this = this
        if(!this.isios){
          var files = []
          files = file.target.files || file.dataTransfer.files;
          if(!files&&!files.length){
            return false
          }
          var filetype = files[0].name.split('.')[1]
          let isvideo = false
          if(filetype=='mp4'||filetype=='rm'||filetype=='rmvb'||filetype=='mov'||filetype=='avi'||filetype=='WAV'||filetype=='flv'){
            isvideo = true
          }
          if(!isvideo){
            _this.toastshow = true
            _this.toasttext = '请选择正确的视频格式'
            _this.toatype = 'cancel'
            return false
          }
          var reads= new FileReader();
          reads.readAsDataURL(files[0]);
          reads.onload=function (event) {
            _this.videourl = event.target.result
          };
        }else {
          var reads= new FileReader();
          // this.userimg = window.URL.createObjectURL(f),
          reads.readAsDataURL(file);
          reads.onload=function (event) {
            _this.videourl = event.target.result
          };
        }
      },
      savefn(){
        let _this = this
        let url = this.apis+'/wx/Community/release'
        var basearr = []
        if(_this.itemimgarr.length>0){
          for(let i = 0;i<_this.itemimgarr.length;i++){
            basearr.push(_this.itemimgarr[i].base)
          }
        }
        let data = {
          state:this.type,
          community_id:this.community_id,
          content:this.textarea,
          picture:basearr,
          video:this.videourl,
        }
        _this.showload = true
        this.axios.post(url,data).then(function (res) {
          if(res.data.code == 10000){
            window.location.href = '#/group_detail?id='+_this.community_id
          }else {
            _this.toastshow = true
            _this.toasttext = res.data.msg
            _this.toatype = 'cancel'
          }
          _this.showload = false
        }).catch(function (err) {
          _this.showload = false
        })
      },
      closeimg(id){
        for(let i = 0;i<this.itemimgarr.length;i++){
          if(id == this.itemimgarr[i].id){
            this.itemimgarr.splice(i,1)
          }
        }
      },
      handleChange(e){
        // this.itemimgarr = []
        let _this = this
        var f = e.target.files
        if(_this.itemimgarr.length+f.length>9){
          _this.toastshow = true
          _this.toasttext = '图片上传不能超过9张'
          _this.toatype = 'cancel'
          return false
        }
        var reads= new FileReader();
        for(let i =0;i<f.length;i++){
          var reads= new FileReader();
          reads.readAsDataURL(f[i]);
          reads.onload=function (event) {
            _this.itemimgarr.push({
              src:window.URL.createObjectURL(f[i]),
              base:event.target.result,
              id:_this.imgid,
            })
            _this.imgid+=1
          };
        }
      },
      isWeixinBrowser(ua) {
        return (/micromessenger/.test(ua)) ? true : false;
      }
    },
    created() {
      let ua = navigator.userAgent.toLowerCase();
      let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1;
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (this.isWeixinBrowser(ua)) {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          this.isios = true
          this.iswxweb = true
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          this.isios = false
          this.iswxweb = true
        }
      } else {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          //Ios
          this.isios = true
        } else if (/(Android)/i.test(navigator.userAgent)) {
          //Android终端
          this.isios = false
        }
      }


      if(this.$route.query.type){
        this.type = this.$route.query.type
        if(this.type == 1){
          document.title = '发布图文'
        }else {
          document.title = '发布视频'
        }
      }
      if(this.$route.query.id){
        this.community_id = this.$route.query.id
      }
    },
  }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    padding: 20px 4%;
    box-sizing: border-box;
    .upimgbox{
      margin-top: 10px;
      width: 80px;
      height: 80px;
      position: relative;
      .videobox{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 100;
        #videobtn{
          width: 80px;
          height: 80px;
        }
      }
      #upimage{
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 100;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .showvideo{
      margin-top: 20px;
    }
    .imgbox{
      width: 100%;
      display: flex;
      overflow: hidden;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      .itemimg{
        width: 80px;
        margin-right: 10px;
        height: 80px;
        margin-top: 20px;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .closeimg{
          position: absolute;
          top: -10px;
          right: -10px;
          width: 20px;
          font-size: 20px;
          height: 20px;
          line-height: 20px;
          text-align: right;
          color: red;
        }
      }
    }
    .flxbtn{
      width: 92%;
      margin-top: 60px;
    }
    .textra{
      width: 100%;
      .ipttextra{
        width: 100%;
        font-size: 1.1rem;
        height: 100px;
        border: none;
        outline: none;
      }
    }
    .popupitem{
      width: 100%;
      text-align: center;
      height: 50px;
      line-height: 50px;
      border-top: 1px solid #ccc;
      position: relative;
      input{
        position: absolute;
        width: 100%;
        height: 50px;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
</style>
<style>
  .textra>.weui-cell{
    padding: 0 !important;
  }
</style>
