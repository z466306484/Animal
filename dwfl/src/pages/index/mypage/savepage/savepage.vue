<template>
  <div class="container" :style="'min-height:'+mincht" v-if="showdata">
    <tjlist @clickdetai="clickdetai" v-if="alldata.length" :alldata="alldata"></tjlist>
    <nodata :nodata="nodata"></nodata>
  </div>
</template>

<script>
  import tjlist from '@/components/tjlist/tjlist'

  import nodata from '@/components/homeinfo/nodata'
    export default {
        components: {tjlist,nodata},
        data() {
            return {
              nodata:'就这么多了~',
              alldata:'',
              mincht:'',
              showdata:false,
            }
        },
        props: {},
        mounted(){
          this.mincht = window.screen.height+'px'
        },
        methods: {
          clickdetai(obj){
            window.location.href = '#/Information_details?id='+obj.id
          },
          getdata(){
            let _this = this
            let url = this.apis+'/wx/my/collection'
            let data = {}
            this.axios.post(url,data).then(function (res) {
              console.log(res.data)
              if(res.data.code == 10000){
                _this.alldata = res.data.data
                _this.showdata = true
              }
            })
          }
        },
        created() {
          document.title = '收藏资料'
          this.getdata()
        },
    }
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    background-color: rgb(245, 245, 245);
  }
</style>
