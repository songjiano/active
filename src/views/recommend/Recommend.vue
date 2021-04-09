<template>
  <div class="re-swift">
    <van-swipe :autoplay="3000" class="abie-swipe">
      <van-swipe-item>
        <img src='../../assets/poadpage_1@2x.png' />
      </van-swipe-item>
      <van-swipe-item>
        <img src='../../assets/poadpage_2@2x.png' />
      </van-swipe-item>
      <van-swipe-item>
        <img src='../../assets/poadpage_3@2x.png' />
      </van-swipe-item>
      <van-swipe-item>
        <img src='../../assets/poadpage_4@2x.png' />
      </van-swipe-item>
    </van-swipe>
    <img class="bot-bac" src="@/assets/button_bg@2x.png" alt="">
    <div class="bot-btn">
      <div @click="goDetai()">详细了解</div> 
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo,addRed } from '@/service/user'
import { Dialog } from 'vant'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const router= useRouter()
    const route = useRoute()
    const state = reactive({
      verify: 0,
    })
    state.type = route.query
    const goDetai = () =>{
      router.push({
        path:'/recommend/detail',
      })
    }
    const dialogs = (...rest) => {
      Dialog.confirm({
        title: '提示',
        message: rest?'请前往微信授权？':'授权失败，是否重新重新授权？',
      })
      .then(() => {
        rest?toggle():window.WeixinJSBridge.call('closeWindow')
      })
      .catch(() => {
        dialogs()
      });
    }
    const toggle = () => {
      let urlEncode=encodeURIComponent('http://172.18.10.221:8080/#/')
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0050255d27272980&redirect_uri='+
      urlEncode+'recommend/Recommend&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
    }
    onMounted(()=>{
      const { href } = window.location;
      const query = href.substring(href.indexOf('?') + 1);
      const infor = localStorage.getItem('infor1')
      
      const vars = query.split('&');
      const obj = {};
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        obj[pair[0]] = pair[1];
      }
      if(obj.infor){
        localStorage.setItem('inforOpenid', obj.infor)
        dialogs(1)
      }else{
        if(!infor){
          if(obj.code&&obj.code.length>0){
            console.log('obj.code',obj.code)
            getUserInfo(obj.code).then((es)=>{
              if(es.data.ErrCode===0){
                localStorage.setItem('infor1', JSON.stringify(es));
                addRed(es.data.Data.openid)
                Toast(es.data.Message)
              }else{
                dialogs()
              }
            }).catch((es1)=>{
              dialogs()
            })
          }else{
            dialogs(1)
          }
        }else{
          addRed(JSON.parse(infor).data.Data.openid)
        }
      }
    })

    return {
      ...toRefs(state),
      goDetai
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.abie-swipe{
  height: 1300px;
}
.bot-bac{
  width: 100%;
  margin-bottom: -160px;
}
.bot-btn{
  display: flex;
  justify-content: center;
  margin-top: 32px;
  div{
    padding: 18px 38px;
    font-size: 29px;
    background-color: #C39F6C;
    color: #fff;
    border-radius: 50px;
    width: 550px;
    text-align: center;
    margin-left: 20px
  }
}
</style>
