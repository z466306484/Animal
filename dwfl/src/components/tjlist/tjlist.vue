<template>
  <div class="itembox">
    <div class="listitem" v-for="item in alldata" @click="clickdetai(item.article_id,item.name)">
      <div class="itemimg"><img :src="item.covers_pic"></div>
      <div class="iteminfo">
        <div class="itemtitle">{{item.name}}</div>
        <div class="itemcontent fix_line" v-html="item.contents"></div>
        <tjcz :views="item.views" :dz="item.dz" :pl="item.pl"></tjcz>
      </div>
    </div>
  </div>
</template>

<script>
    import tjcz from '@/components/tjlist/tjcz'
    export default {
        components: {tjcz},
        data() {
            return {
              listarr:[
                {id:1,img:'/static/images/banner5.jpg',title:'黑熊护理三十二式',content:'黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式'},
                {id:1,img:'/static/images/banner5.jpg',title:'黑熊护理三十二式',content:'黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式'},
                {id:1,img:'/static/images/banner5.jpg',title:'黑熊护理三十二式',content:'黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式'},
                {id:1,img:'/static/images/banner5.jpg',title:'黑熊护理三十二式',content:'黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式黑熊护理三十二式'},
              ],
            }
        },
        props: {
          alldata:{}
        },
        methods: {
          clickdetai(id,title){
            this.$emit('clickdetai',{id:id,title:title})
          }
        },
        mounted(){
          // this.fixLine()
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .itembox{
    width: 100%;
    background-color: #fff;
    overflow: hidden;
    padding-bottom: 20px;
    .listitem{
      background-color: #fff;
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 0 4%;
      box-sizing: border-box;
      .itemimg{
        width: 30%;
        height: 75px;
        font-size: 0;
        overflow-x: hidden;
        img{
          width: 100%;
          font-size: 0;
          height: 100%;
          border-radius: 5px;
        }
      }
      .iteminfo{
        width: 67%;
        margin-left: 3%;
        height: 100%;
        .itemtitle{
          width: 100%;
          height: 20px;
          line-height:20px;
          font-size: 1.3em;
          overflow-x: hidden;
        }
        .itemcontent{
          width: 100%;
          height: 25px;
          line-height: 25px;
          margin-bottom: 5px;
          font-size: 1em;
          color: rgb(150,150,150);
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
        }
      }
    }
  }
</style>
