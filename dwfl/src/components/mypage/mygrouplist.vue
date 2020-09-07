<template>
  <div class="useritem">
    <div class="userinfo" v-for="item in nowdata.list">
      <div class="userimg" @click="clickitem(item.community_id)"><img :src="item.community_pic"></div>
      <div class="usermsgbox" @click="clickitem(item.community_id,item.name)">
        <div class="username">{{item.name}}</div>
        <div class="userzw"><span v-if="nowdata.type ==1">加入</span><span v-if="nowdata.type ==2">创建</span>时间：{{item.ctime}}</div>
      </div>
      <div class="editebox" v-if="nowdata.type ==2">
        <div class="iconimg" @click="editefn(item.community_id)"><img src="/static/images/bianji.png"></div>
        <div class="icondel" @click="dlefn(item.community_id)"><img src="/static/images/shanchu.png"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {}
        },
        props: {
          nowdata:{}
        },
        methods: {
          editefn(id){
            this.$emit('editefn',{id:id})
          },
          dlefn(id){
            this.$emit('dlefn',{id:id})
          },
          clickitem(id,title){
            this.$emit('clickitem',{id:id,title:title})
          }
        },
        created() {
          console.log(this.nowdata,'nowdata')
        },
    }
</script>

<style scoped lang="less">
  .useritem{
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
  }
  .userinfo{
    width: 100%;
    padding: 15px 4%;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: row;
    .userimg{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .usermsgbox{
      flex: 1;
      margin-left: 15px;
      .username{
        height: 20px;
        line-height: 20px;
        font-size: 1.1em;
      }
      .userzw{
        height: 20px;
        line-height: 20px;
        font-size: 0.9em;
        margin-top: 5px;
        color: rgb(200,200,200);
      }
    }
    .editebox{
      height:20px;
      width: 60px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .iconimg,.icondel{
        width: 20px;
        height: 20px;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
