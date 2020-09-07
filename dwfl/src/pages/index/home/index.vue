<template>
    <div class="container" :style="'min-height:'+mincht" v-if="showdata">
      <banner v-if="bannerlist.length" :bannerlist="bannerlist"></banner>
      <div class="typelist">
        <typecpn v-for="item in typearr" :typeobj="item" :key="item.type" @cltype="cltype"></typecpn>
      </div>
      <div class="tjdata">
        <div class="infotitle">
          <div class="infotype">推荐资料</div>
          <div class="infomore" @click="clickmore(1)"><div>更多推荐</div><div class="el-icon-arrow-right ricon"></div></div>
        </div>
        <div class="ifcontent" v-if="tjdata.length">
          <infoitem :infoarr="tjdata" infotype="1" @clickitem="clickitem"></infoitem>
        </div>
      </div>
      <div class="tjdata">
        <div class="infotitle">
          <div class="infotype">热门社群</div>
          <div class="infomore" @click="clickmore(2)"><div>更多社群</div><div class="el-icon-arrow-right ricon"></div></div>
        </div>
        <div class="ifcontent" v-if="hotdata.length">
          <infoitem :infoarr="hotdata" infotype="2" @clickitem="clickitem"></infoitem>
        </div>
      </div>
      <div class="replydata">
        <div class="infotitle">
          <div class="infotype">最新动态</div>
          <div class="infomore" @click="clickmore(3)"><div>查看更多</div><div class="el-icon-arrow-right ricon"></div></div>
        </div>
        <div class="newbox" v-if="updatedata.length">
          <reply :updatedata="updatedata" :updatetype="updatetype" @cnew="cnew"></reply>
        </div>
      </div>
      <nodata :nodata="nodata"></nodata>
      <bottomnav :navarr="navarr" @checknav="checknav"></bottomnav>
    </div>
</template>

<script>
  import banner from '@/components/h5banner/banner'
  import bottomnav from '@/components/h5nav/bottomnav'
  import typecpn from '@/components/h5typecpn/typecpn'
  import homeinfo from '@/components/homeinfo/homeinfo'
  import nodata from '@/components/homeinfo/nodata'
  import infoitem from '@/components/homeinfo/infoitem'
  import reply from '@/components/homeinfo/reply'
  export default {
    components: {bottomnav,banner,typecpn,homeinfo,nodata,infoitem,reply},
    data() {
      return {
        mincht:'',
        navarr:[
          {img:'/static/images/home2.png',val:'首页',click:true,type:1},
          {img:'/static/images/shequn1.png',val:'社群',click:false,type:2},
          {img:'/static/images/wode1.png',val:'我的',click:false,type:3},
        ],
        tjdata:[],
        hotdata:[],
        updatedata:[],
        updatetype:1,
        typearr:[],
        bannerlist:[],
        nodata:'底线可不能逾越哦~~',
        alldata:'',
        showdata:false,
      }
    },
    props: {},
    methods: {
      checknav(obj){
      },
      cltype(obj){
        console.log(obj,'obj')
        if(obj.type ==-1){
          window.location.href = '#/typepage'
        }else {
          window.location.href = '#/tjdetail?cate_id='+obj.type+'&&title='+obj.title
        }
      },
      clicksure(obj){
        if(obj.type  == 1){
          window.location.href = '#/tjdetail'
        }
      },
      setlist(obj){
        let _this = this
        //设置banner
        for (let i =0;i<obj.banner.length;i++){
          var newarr = {url: 'javascript:', img: obj.banner[i].covers_pic,link:obj.banner[i].link,title: '送你一朵fua'}
          _this.bannerlist.push(newarr)
        }
        //设置分类
        obj.classify.forEach((val,item)=>{
          _this.typearr.push(val)
        })
        _this.typearr.push({
          cate_id: -1,
          cate_img: "/static/images/type_quanbu.png",
          cate_name: "全部"
        })
        //设置推荐资料
        _this.tjdata = obj.act
        //设置热门社群
        _this.hotdata = obj.community
        //设置新动态
        _this.updatedata = obj.new
      },
      clickcz(obj){
        console.log(obj)
      },
      cnew(obj){
        window.location.href = '#/dt_detail?id='+obj.id
      },
      clickmore(type){
        if(type == 1){
          window.location.href = '#/tjdetail'
        }
        else if(type == 2 ||type == 3){
          window.location.href = '#/group'
        }
      },
      clickitem(obj){
        if(obj.type == 1){
          window.location.href = '#/Information_details?id='+obj.id+'&&title='+obj.title
        }else {
          window.location.href = '#/group'
          window.location.href = '#/group_detail?cate_id='+obj.id
        }
      },
      getdata(){
        let _this = this
        let url = this.apis+'/wx/Index/index'
        let data = {}
        this.axios.post(url,data).then(function (res) {
          if(res.data.code == 10000){
            console.log(res.data)
            _this.alldata = res.data.data
            _this.setlist(_this.alldata)
            _this.showdata = true
          }else if(res.data.code == 10009){
            alert(res.data.msg)
          }
        })
      }
    },
    mounted(){
      this.mincht = this.docheight+'px'
    },
    created() {
      document.title = '动物福利在线图书馆'
      this.getdata()
    },
  }
</script>

<style scoped lang="less">
.container{
  width: 100%;
  background-color: rgb(245,245,245);
  padding-bottom: 60px;
  .typelist{
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    padding:20px 4%;
    padding-top: 0;
    box-sizing: border-box;
  }
  .infotitle{
    padding: 0 4%;
    box-sizing: border-box;
    height: 25px;
    line-height: 25px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .infotype{
      font-size: 1.1rem;
      font-weight: bold;
    }
    .infomore{
      font-size: 1em;
      display: flex;
      color: rgb(150,150,150);
      div{
        height: 25px;
        line-height: 25px;
        margin-left:5px;
      }
      .ricon{
        position: relative;
        top: 1px;
      }
    }
  }
  .tjdata,.replydata{
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    .ifcontent{
      width: 100%;
      padding: 0 4%;
      box-sizing: border-box;
    }
  }
  .replydata{
    padding-bottom: 0;
    .newbox{
      width: 100%;
    }
  }
}
</style>
