<template>
  <div class="pagenav">
    <div @click="clickpage(1)">首页</div>
    <div v-bind:class="{disabled: parseInt(nowindex)-1<1}"  @click="clickpage(parseInt(nowindex)-1)">上一页</div>
    <div v-for="item in btnarr" :class="item==nowindex?'navnum':'navnum2'" @click="clickpage(item)">{{item}}</div>
    <input v-model="selectpage" type="text" name="goodsName" class="form-control" placeholder="" style=''>
    <div v-bind:class="{disabled: selectpage>Math.ceil(tabliearr.length/pagenum)||selectpage<1}"  @click="clickpage(selectpage)">跳转</div>
    <div v-bind:class="{disabled: parseInt(nowindex)+1>Math.ceil(tabliearr.length/pagenum)}"  @click="clickpage(parseInt(nowindex)+1)">下一页</div>
    <div @click="clickpage(Math.ceil(tabliearr.length/pagenum))">尾页</div>
    <span>共{{tabliearr.length}}条</span>
  </div>
</template>

<script>
  import bus from '@/assets/evnetBus'
    export default {
        components: {},
        data() {
            return {
              btnarr:[],
              pagenum:'',
              nowindex:'',
              tablearr:[],
              selectpage:''
            }
        },
        props: {
          tabliearr:{},
          pageobj:{},
        },
        methods: {
          clickpage(index){
            this.selectpage=''
            this.$emit('clickpage',index)
          },
          setdata(index,num,arr){
            this.btnarr = []
            if(index >=4){
              for(let i = index-3;i<Math.ceil(arr.length/num);i++){
                if(i<index+2 && i>=0){
                  if(this.btnarr.length<5){
                    this.btnarr.push(i+1)
                  }else {
                    return false
                  }
                }
              }
            }else {
              for(let i = 0;i<Math.ceil(arr.length/num);i++){
                if(i<5){
                  this.btnarr.push(i+1)
                }
              }
            }
          },
        },
        mounted(){
          let  _this = this
          bus.$on('checknav', target => {
            _this.nowindex = target.nowindex
            _this.tablearr = target.tabarr
            _this.setdata(_this.nowindex,_this.pagenum,target.tabarr)
          });
        },
        created() {
          this.pagenum = this.pageobj.pagenum
          this.nowindex = this.pageobj.nowindex
          this.tablearr = this.tabliearr
          this.setdata(this.nowindex,this.pagenum,this.tablearr)
        },
    }
</script>
<style scoped lang="less">
  .pagenav{
    display: flex;
    padding: 10px 0;
    align-items: center;
    text-align: center;
    font-size: 14px;
    padding-bottom: 20px;
    margin: auto;
    .navnum{
      color: rgb(47,157,245);
      border: 1px solid rgb(47,157,245);
    }
    .navnum2{
      border: 1px solid rgba(204, 204, 204, 1);
      color: #2E2D3C;
    }
  }
  .pagenav>div{
    height:27px;
    border: 1px solid rgba(204, 204, 204, 1);
    padding: 0 10px;
    line-height: 27px;
    margin-right: 10px;
    color: #2E2D3C;
  }
  .pagenav>div:hover{
    cursor: pointer;
    color: white;
    background-color: rgb(49,141,235);
    border: 1px solid rgb(49,141,235);
  }
  .form-control{
    padding-left: 20px;
  }
  .pagenav>input{
    width: 40px;
    margin-right: 10px;
    height:28px;
    outline: none;
    border: 1px solid rgba(204, 204, 204, 1);
  }
  .pagenav>span{
    line-height: 30px;
  }
  .disabled{
    pointer-events: none;
  }
</style>
