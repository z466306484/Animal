<template>
  <div class="fdpitem">
    <div class="fdpimg"><img :src="fileimg"></div>
    <div class="fdpname" @click="filefn">{{fdfile.file_name}}</div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
              fileimg:'',
            }
        },
        props: {
          fdfile:{}
        },
        methods: {
          filefn(){
            window.location.href = this.fdfile.file
          }
        },
        created() {
          console.log()
          var filename = this.fdfile.file_name.split('.')[1]
          console.log(filename,'filename')
          if(filename == 'pdf'){
            this.fileimg = '/static/images/pdf.png'
          }else if(filename == 'excel'){
            this.fileimg = '/static/images/lvx.png'
          }else{
            this.fileimg = '/static/images/lan_w.png'
          }
        },
    }
</script>

<style scoped lang="less">
  .fdpitem{
    width: 100%;
    height: 20px;
    padding: 5px 0;
    display: flex;
    .fdpimg{
      width: 20px;
      height: 20px;
      overflow: hidden;
      flex-direction: row;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .fdpname{
      margin-left: 10px;
      flex: 1;
      height: 20px;
      font-size: 1em;
      color: #2e9ff4;
      line-height: 20px;
    }
  }
</style>
