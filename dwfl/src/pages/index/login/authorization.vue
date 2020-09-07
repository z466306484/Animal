<template>
  <authorization @clicksure="clicksure"></authorization>
</template>

<script>
  import authorization from '@/components/authorization/authorization'
    export default {
      components: {authorization
      },
      data() {
        return {

        }
      },
      props: {
      },
      methods: {
        clicksure(){
          console.log(22232)
          let _this = this
          let url = '/api/wx/Improve/infor'
          let data = {
            user_company:"",
            user_occupation:"",
          }
          this.axios.post(url,data).then(function (response) {
              if(response.data.code == 10004){
                _this.$router.push({path:'/setinfo'})
              }
            })
        }
      },
      created() {
        let _this = this
        this.axios.post('http://dongwu.siantest.com/wx/Accredit/auth', {})
          .then(function (response) {
            console.log(response);
                if(response.data.code == 10003){
                  _this.$router.push({path:'/index'})
                }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
    }
</script>

<style scoped lang="less">

</style>
