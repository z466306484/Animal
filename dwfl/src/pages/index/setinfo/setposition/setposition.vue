<template>
  <div class="container" :style="'min-height:'+mincht">
    <div class="content">
      <div class="checkitem" v-for="item in checkarr">
        <div>{{item.val}}</div>
        <div class="checkbox" @click="checkfn(item.id)">
          <div class="setnone" v-if="!item.status"></div>
          <div class="setyes" v-if="item.status"><div></div></div>
        </div>
      </div>
      <div class="danwei1">
        <x-input id="tag" @on-focus="onfocus" @on-blur="onblur" :disabled="disabled" placeholder="请填写您的职位" v-model="inputval"></x-input>
      </div>
    </div>
    <div class="savebtn" @click="savefn">
      <savebtn :val="saveval"></savebtn>
    </div>
  </div>
</template>

<script>
  import { XInput } from 'vux'
  import savebtn from '@/components/btncompoment/savebtn'
    export default {
        components: {XInput,savebtn},
        data() {
            return {
              inputval:'',
              disabled:true,
              checkarr:[
                {val:'饲养员',status:true,id:1},
                {val:'营养师',status:false,id:2},
                {val:'兽医',status:false,id:3},
                {val:'以上都不是',status:false,id:4},
              ],
              checkval:'饲养员',
              saveval:'保存',
              dwval:'',
              mincht:'',
              clicktype:1,
            }
        },
        props: {},
        methods: {
          checkfn(id){
            for(let i =0;i<this.checkarr.length;i++){
              if(this.checkarr[i].id==id){
                this.checkarr[i].status = true
                if(id==4){
                  this.disabled = false
                  this.checkval = this.inputval
                }else {
                  this.disabled = true
                  this.checkval = this.checkarr[i].val
                }
              }else {
                this.checkarr[i].status = false
              }
            }
            this.clicktype = id
          },
          savefn(){
            if(this.clicktype == 4){
              this.checkval = this.inputval
            }
            window.location.href = '#/setinfo?val='+this.checkval+'&&dwval='+this.dwval
          },
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
          },//输入框失去焦点
        },
        created() {
          document.title = '职位'
          this.mincht = this.docheight+'px'
          if(this.$route.query.dwval){
            this.dwval = this.$route.query.dwval
          }
        },
    }
</script>

<style scoped lang="less">
.container{
  width: 100%;
  background-color: rgb(245,245,245);
  padding-top: 10px;
  box-sizing: border-box;
  .content{
    background-color: white;
    .checkitem{
      padding: 20px 0px;
      width: 96%;
      margin-left: 4%;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      div{
        height: 20px;
        line-height: 20px;
      }
      .setnone{
        width: 14px;
        height: 14px;
        margin-top: 2px;
        border: 1px solid #ccc;
        border-radius: 50%;
      }
      .checkbox{
        margin-right: 4%;
      }
      .setyes{
        width: 14px;
        height: 14px;
        margin-top: 2px;
        border-radius: 50%;
        border: 1px solid rgb(47,159,245);
        div{
          width: 10px;
          height: 10px;
          margin-top: 2px;
          margin-left: 2px;
          border-radius: 50%;
          background-color: rgb(47,159,245);
        }
      }
    }
    .danwei1 {
      padding: 5px 0;
      background-color: #fff;
      box-sizing: border-box;
      height: 60px;
      x-input {
      }
    }
  }
  .savebtn{
    width: 100%;
    padding: 0 4%;
    margin-top: 40px;
    box-sizing: border-box;
  }
}
</style>
