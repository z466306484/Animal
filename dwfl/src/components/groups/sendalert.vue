<template>
  <div class="sendalert">
    <div class="whitealert" v-if="sendobj.type == 1">
      <div class="titlebox">
        <div class="atitle">选择类型</div>
        <div class="aclose" @click="aclose">×</div>
      </div>
      <div class="acontent">
        <div class="senimgbox" @click="checktype(1)">
          <div class="imgbox"><img src="/static/images/tupian.png"></div>
          <div class="aval">发布图文</div>
        </div>
        <div class="senimgbox" @click="checktype(2)">
          <div class="imgbox"><img src="/static/images/video.png"></div>
          <div class="aval">发布视频</div>
        </div>
      </div>
    </div>
    <div class="whitealert2" v-if="sendobj.type == 2 || sendobj.type == 3">
      <div class="titlebox">
        <div class="aclose" @click="aclose">×</div>
        <div class="atitle">{{atitle}}</div>
        <div class="asure" @click="surefn">确定</div>
      </div>
      <div class="acontent">
        <div class="textra">
          <textarea class="ipttextra" @focus="onfocus" @blur="onblur" v-model="plcval" :placeholder="placeholder"></textarea>
        </div>
        <div class="sendinfoimg" v-if="sendobj.type == 2 && alldata!=undefined">
          <div class="infoimg" v-if="alldata.sel.picture.length>0"><img :src="alldata.sel.picture[0]"></div>
          <div class="infotext"><div class="fxname">{{alldata.sel.nickname}}:</div><div class="fxcontent">{{alldata.sel.content}}</div></div>
        </div>
      </div>
    </div>
    <toast v-model="toastshow" :type="toatype" :time="1000">{{toasttext}}</toast>
  </div>
</template>

<script>
  import { XTextarea,Toast } from 'vux'
    export default {
        components: {XTextarea,Toast},
        data() {
            return {
              plcval:'',
              placeholder:'转发理由',
              atitle:'转发动态',
              //toast提示
              toastshow:false,
              toasttext:'成功',
              toatype:'success',
            }
        },
        props: {
          sendobj:{},
          sendtype:{},
          alldata:{},
        },
        methods: {
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
          },
          aclose(){
            this.$emit('aclose')
          },
          checktype(type){
            this.$emit('checktype',{type:type})
          },
          surefn(){
            if(this.plcval==''){
              this.toastshow = true
              this.toasttext = '内容不能为空'
              this.toatype = 'cancel'
              return false
            }
            var obj = {
              plcval:this.plcval,
            }
            this.$emit('surefn',obj)
          },
        },
        created() {
          console.log(this.alldata)
          if(this.sendobj.type == 3){
            this.placeholder = '我要留言'
            this.atitle = '留言'
          }
          console.log(this.sendtype,'sendtype')
          if(this.sendtype!=undefined){
            this.placeholder = this.sendtype.plc
            this.atitle = this.sendtype.title
          }
        },
    }
</script>

<style scoped lang="less">
  .sendalert{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column-reverse;
    .whitealert{
      width: 100%;
      padding: 15px 4%;
      box-sizing: border-box;
      background-color: #fff;
      .titlebox{
        width: 100%;
        position: relative;
        .atitle{
          text-align: center;
          font-size: 1.1em;
        }
        .aclose{
          position: absolute;
          right: 4%;
          top: 0px;
          height: 21px;
          line-height: 21px;
          font-size: 1.5em;
        }
      }
      .acontent{
        width: 100%;
        padding: 25px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        .senimgbox{
          width: 60px;
          .imgbox{
            width: 100%;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .aval{
            width: 100%;
            text-align: center;
            font-size: 1em;
            margin-top: 10px;
          }
        }
      }
    }
    .whitealert2{
      width: 100%;
      background-color: #fff;
      .titlebox{
        width: 100%;
        position: relative;
        padding: 15px 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        .atitle{
          text-align: center;
          font-size: 1.1em;
        }
        .aclose{
          position: absolute;
          top: 15px;
          left: 0;
          height: 21px;
          line-height: 21px;
          font-size: 1.5em;
          width: 40px;
          text-align: center;
        }
        .asure{
          position: absolute;
          top: 15px;
          right: 0;
          height: 21px;
          line-height: 21px;
          font-size: 1em;
          width: 60px;
          text-align: center;
          color: rgb(47,157,245);
        }
      }
      .acontent{
        width: 100%;
        padding: 15px 4%;
        box-sizing: border-box;
        .sendinfoimg{
          width: 100%;
          background-color: rgb(242,242,242);
          padding: 10px;
          border-radius: 10px;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          .infoimg{
            width: 50px;
            height: 50px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .infotext{
            flex: 1;
            height: 50px;
            line-height: 50px;
            margin-left: 10px;
            font-size: 1em;
            color: rgb(150,150,150);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            overflow: hidden;
            .fxname{
              color: rgb(20,20,20);
            }
            .fxcontent{
              margin-left: 10px;
              flex: 1;
              overflow: hidden;
            }
          }
        }
        .textra{
          width: 100%;
          .ipttextra{
            width: 100%;
            font-size: 1.1rem;
            height: 100px;
            border: none;
            outline: none;
          }
        }
      }
    }
  }
</style>
<style>
  .textra>.weui-cell{
    padding: 0 !important;
  }
</style>
