<template>
  <div class="bannerbox">
    <swiper auto style="width:100%;margin:0 auto;" dots-class="custom-bottom" dots-position="center">
      <swiper-item class="swiper-demo-img" style="width: 100%" v-for="(item, index) in bannerlist" :key="index"><img style="width: 100%" @click="imgfn(item)" :src="item.img"></swiper-item>
    </swiper>
  </div>
</template>

<script>
  import { Swiper,SwiperItem } from 'vux'
    export default {
        components: {Swiper,SwiperItem},
        data() {
            return {

            }
        },
        props: {
          bannerlist:{},
          imgheight:{},
        },
        methods: {
          imgfn(obj){
            if(obj.link!=''){
              window.location.href = obj.link
            }
          }
        },
        created() {
          if(this.imgheight!=undefined){}

        },
    }
</script>

<style scoped lang="less">
.bannerbox{
  width: 100%;
}
</style>
