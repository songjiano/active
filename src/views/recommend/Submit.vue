<template>
  <div class="re-swift">
    <div class="suc-box">
      <img src="@/assets/wancheng@2x.png" alt="">
      <p class="lev1">已成功提交</p>
      <p class="lev1">我们会尽快联系您</p>
      <p class="gzh">关注“爱贝共创平台服务公众号</p>
      <p>获得更多爱贝资讯</p>
    </div>
    <div class="set-time">
      页面将在<span>{{verify}}</span>秒钟后自动跳转  
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted} from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4ODkzOTQxMA==#wechat_redirect'
    const state = reactive({
      verify: 5,
    })
    onMounted(()=>{
      let setTim = setInterval(()=>{
        state.verify -= 1
        console.log(state.verify )
        if(state.verify <= 1){
          clearTimeout(setTim)
          window.location.href='https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4ODkzOTQxMA==#wechat_redirect'
        }
      },1000)
    })
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.re-swift{
  font-size: 24px;
  height: 100%;
  background-color: #F4F4F4;
  display: flow-root;
  text-align: center;
  .set-time{
    span{
      color: #C4A06C;
      padding: 5px;
    }
  }
  .suc-box{
    text-align: center;
    background-color: #fff;
    width: 600px;
    margin: 25px;
    padding: 50px;
    padding-bottom: 70px;
    img{
      width: 150px;
      margin-bottom: 40px;
    }
    .lev1{
      color: #C4A06C;
      font-size: 28px;
    }
    .gzh{
      margin-top: 30px;
    }
    p{
      width: 100%;
    }
  }
  .set-time{
    color: #666666;
    font-size: 22px;
  }
}
</style>
