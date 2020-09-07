<template>
  <div class="serchcpn">
    <form action="#" @submit.prevent="serchenter" class="serchform">
      <div class="serchicon el-icon-search"></div>
      <input type="text" v-model="keyword" :show-clear="false" :placeholder="serchobj.placher" class="serchcpm" @focus="onfocus" @blur="onblur" @input="changefn(keyword)" ></input>
    </form>
  </div>
</template>

<script>
  import { Search } from 'vux'
  import bus from '@/assets/evnetBus'
    export default {
        components: {Search},
        data() {
            return {
              keyword:'',
            }
        },
        props: {
          serchobj:{}
        },
        mounted(){
          let _this  = this
          bus.$on('clearval',function () {
            _this.keyword = ''
          })
        },
        methods: {
          onfocus(){
            this.$emit('onfocus',{val:this.keyword})
          },
          onblur(){
            this.$emit('onblur',{val:this.keyword})
          },
          changefn(){
            this.$emit('changefn',{val:this.keyword})
          },
        },
        created() {
        },
    }
</script>

<style scoped lang="less">
  .serchcpn{
    width: 100%;
    box-sizing: border-box;
    border-radius: 16px;
    width: 92%;
    margin-left: 4%;
    overflow-x: hidden;
    .serchform{
      width: 100%;
      position: relative;
      .serchicon{
        position: absolute;
        height: 36px;
        line-height: 36px;
        left: 10px;
        font-size: 1.2rem;
        color: rgb(150,150,150);
      }
      .serchcpm{
        width: 100%;
        height: 32px;
        border: none;
        outline: none;
        text-indent: 35px;
        border-radius: 16px;
        font-size: 0.9rem;
        color: #1d2f49;
        background-color: rgb(242,242,242);
        box-sizing: border-box;
      }
      input::-webkit-input-placeholder {
        color: #a4acb6;
        font-size: 0.9rem;
      }
    }
  }
</style>
