<template>
  <div class="groupitem" @click="jionfn(iteminfo.community_id,iteminfo.name)">
    <div class="grouptop">
      <div class="grouplog"><img :src="iteminfo.community_pic"></div>
      <div class="groupinfo">
        <div class="groupname">{{iteminfo.name}}</div>
        <div class="groupval">{{iteminfo.introduction}}</div>
        <div class="joinbtn">进群</div>
      </div>
    </div>
    <div class="groupperson">
      <div class="pseronbox">
        <div class="imgicon"><img src="/static/images/persons.png"></div>
        <div class="groupnum">{{iteminfo.user_number}}人</div>
      </div>
      <div class="pseronbox">
        <div class="imgicon"><img src="/static/images/feibiao.png"></div>
        <div class="groupnum">{{iteminfo.dynamic_number}}</div>
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
          iteminfo:{}
        },
        methods: {
          jionfn(id,title){
            this.$emit('jionfn',{id:id,title:title})
          }
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .groupitem{
    width: 100%;
    padding: 0 4%;
    box-sizing: border-box;
    background-color: #fff;
    .grouptop{
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 10px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      .grouplog{
        height: 75px;
        width: 75px;
        border-radius: 50%;
        overflow: hidden;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .groupinfo{
        width: 67%;
        flex: 1;
        margin-left: 3%;
        .groupname{
          font-size: 1.1em;
          height: 1em;
          line-height: 1em;
        }
        .groupval{
          width: 100%;
          height: 25px;
          margin-top: 5px;
          font-size: 1rem;
          margin-bottom: 3px;
          overflow:hidden;
          white-space:nowrap;
          text-overflow:ellipsis;
          color: rgb(150,150,150);
        }
        .joinbtn{
          width: 65px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border-radius: 14px;
          font-size: 1rem;
          color: white;
          background-color: rgb(47,159,245);
          position: relative;
          float: right;
        }
      }
    }
    .groupperson{
      width: 100%;
      display: flex;
      .pseronbox{
        width: 100/2%;
        display: flex;
        padding: 10px 45px;
        box-sizing: border-box;
        .imgicon{
          width: 20px;
          height: 20px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .groupnum{
          height: 20px;
          margin-left: 5%;
          line-height: 20px;
          font-size: 1rem;
          color: rgb(150,150,150);
        }
      }
    }
  }
</style>
