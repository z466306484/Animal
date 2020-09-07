<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <div class="listbox">
      <typecpn v-for="item in typearr" :typeobj="item" :key="item.cate_id" @cltype="cltype"></typecpn>
    </div>
  </div>
</template>

<script>
  import typecpn from '@/components/h5typecpn/typecpn'
    export default {
        components: {typecpn},
        data() {
            return {
              showdata:false,
              mincht:'',
              typearr:[],
            }
        },
        props: {},
        mounted(){
          this.mincht = window.screen.height+'px'
        },
        methods: {
          cltype(obj){
            window.location.href = '#/tjdetail?cate_id='+obj.type+'&&title='+obj.title
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/Classify/all'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              if(res.data.code == 10000){
                console.log(res.data)
                _this.typearr = res.data.data
                _this.showdata = true
                // _this.alldata = res.data.data
              }
            })
          }

        },
        created() {
          document.title ='全部分类'
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container{
    width: 100%;
    background-color: rgb(245,245,245);
    .listbox{
      padding-bottom: 20px;
      overflow: hidden;
      background-color: #fff;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
