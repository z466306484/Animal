<template>
    <div class="container">
        <p>请选择或者拍摄视频上传</p>
        <input type="file" accept="video/avi,video/mp4,video/flv,video/3gp,video/swf" capture="camcorder" @change="onFileChange" style="display: none;">
          <video ref="video" controls="controls"></video>
            <div style="padding: 20px;text-align: center">
            </div>
          <div style="width: 30%;margin-left: 10%" bgcolor="#09c69c" color="#fff" shape="circle" @click="complete" action-type="button">确认上传</div>
    </div>
</template>

<script>
    export default {
      components:{},
      data() {
        return {}
      },
      props: {},
      methods:{
        onFileChange: function (e) {
          var files = e.target.files || e.dataTransfer.files;
          if (!files.length) return;
          //视频上传
          if(true){
            let _this = this;

            //视频预览
            var reader = new FileReader();
            this.file = files[0];
            reader.onload = function () {
              _this.$refs.video.src = this.result;
            };
            reader.readAsDataURL(this.file);
          }
        },
        complete(){
          let _this = this;
          if(true){
            let data = new FormData();
            data.append('file',this.file);
            data.append('arr_name',this.file.name);
          }

        }
      },
      created(){}

    }
</script>

<style scoped>
  .container{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

</style>
