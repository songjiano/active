<template>
  <div class="login indexs">
    <div class="top-step">
      <img src="@/assets/process@2x.png" alt="">
    </div>
    <div class="banner-box">
      <div class="banner-top">
        <div class="banner-rul" @click="goActive">活动规则</div>
        <div class="banner-tilte">
          <div>选择海报</div>
          <div class="line"></div>
        </div>
      </div>
      <van-swipe class="my-swipe" @change="onChange" >
        <van-swipe-item v-for="ite in 4" :class="verify===ite-1&&'active'" :key="ite">
          <img style="width:96%;margin-left:2%" :src="require('../assets/poster'+ite+'@2x.png')" alt="">
          <div class="tilted">
            {{tilted.tilte}}
          </div>
          <div class="scav-box">
            <qrcode-vue 
              value='https://blog.csdn.net/weixin_43857345/article/details/107916860' 
              logoSrc="@/assets/logo.png"
              id="canvsed"
              class="canSan"
            ></qrcode-vue>
            <div>
              <img src="@/assets/buddy7@2x.png" alt="">
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="prs-win">
      晒专属海报赢代金券
    </div>
    <div class="bot-box">
      <img class="bot-bac" src="@/assets/button_bg@2x.png" alt="">
      <div class="bot-btn">
        <div @click="changeLange()">更改推荐语</div>
        <div @click="gotMake()">一键生成</div> 
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" class="popt-box">
      <img @click="changeLange(1)" src="@/assets/close@2x.png" alt="">
      <div class="select-lange">
        <div v-for="ite in tiltes" class="activs" :key='ite.id' @click="changeTile(ite)">
          {{ite.tilte}}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { addRef, getUserInfo } from '@/service/user'
import { Dialog } from 'vant'
import QrcodeVue from 'qrcode.vue'
import { Toast } from 'vant'
export default {
  setup() {
    const tilted = ref({ id:1, tilte:'#1000+教育创业者的起点首选' })
    const router= useRouter()
    const route = useRoute()
    const state = reactive({
      type: 'login',
      imgCode: 0,
      verify: 0,
      show: false,
      tiltes:[
        {id: 0, tilte: '#助力教育从业者成功创业'},
        {id: 1, tilte: '#1000+教育创业者的起点首选'},
        {id: 2, tilte: '#我推荐的教育投资项目'},
        {id: 3, tilte: '#我发现的好项目'},
      ]
    })
    state.type = route.query
    const onChange = (e) =>{
      tilted.value.id=e+1
      state.verify = e
    }
    const goActive = () => {
      router.push({
        path:'./active'
      })
    }
    const toggle = () => {
      let urlEncode=encodeURIComponent('http://172.18.10.221:8080/#/')
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0050255d27272980&redirect_uri='+
      urlEncode+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
    }
    const changeLange = (e) => {
      if(e){state.show = false}else{state.show = true}
    }
    const changeTile = (res) =>{
      tilted.value.tilte = res.tilte
    }
    const gotMake=()=>{
      router.push({
        path:'/markImag',
        query: {value:JSON.stringify(tilted.value)}
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
        window.WeixinJSBridge.call('closeWindow')
      });
    }
    onMounted(()=>{
      // const { href } = window.location;
      // const query = href.substring(href.indexOf('?') + 1);
      // const infor = localStorage.getItem('infor')
      // const vars = query.split('&');
      // const obj = {};
      // for (let i = 0; i < vars.length; i++) {
      //   const pair = vars[i].split('=');
      //   obj[pair[0]] = pair[1];
      // }
      // if(!infor){
      //   if(obj.code&&obj.code.length>0){
      //     console.log('obj.code',obj.code)
      //     getUserInfo(obj.code).then((es)=>{
      //       if(es.data.ErrCode===0){
      //         localStorage.setItem('infor', JSON.stringify(es));
      //         addRef({ReferencesOpenId:es.data.Data.openid,Mobile:'15665155',NickName:es.data.Data.nickname})
      //         Toast(es.data.Message)
      //       }else{
      //         dialogs()
      //       }
      //     }).catch((es1)=>{
      //       dialogs()
      //     })
      //   }else{
      //     dialogs(1)
      //   }
      // }
    })

    return {
      ...toRefs(state),
      tilted,
      toggle,
      onChange,
      goActive,
      changeLange,
      changeTile,
      gotMake
    }
  },
  components: {
    QrcodeVue
  }
}
</script>

<style lang="scss" scoped>
.bot-box{
  position: fixed;
  bottom: 40px;
}
.popt-box{
  height: 400px;
  img{
    width: 100px;
  }
}
.scav-box{
  position: absolute;
  bottom: 86px;
  right: 50px;
  padding: 12px;
  padding-bottom: 6px;
  width: 100px;
  border-radius: 4px;
  background-color: #fff;
  height: 106px;
  canvas{
    width: 100px !important;
    height: 100px !important;
  }
  &>div{
    width: 30px;
    position: absolute;
    top: 44px;
    left: 44px;
    padding: 2px 2px 0px 2px;
    background-color: #fbfbfb;
    border-radius: 60px;
    height: 33px;
    img{
      width: 100%;
      display: block;
    }
  }
}
.van-popup{
  img{
    float: right;
    margin-top: -40px;
    margin-right: 50px;
  }
}
.select-lange{
  padding: 40px;
  &>div{
    border-radius: 50px;
    border: 1px solid #B5B5B5;
    padding: 16px 24px;
    margin: 18px 0px;
    font-size: 24px;
    width: fit-content;
  }
  // &>div:hover{
    
  // }
  .activs:hover{
    background-color: #C4A06C;
    color: #fff;
  }
}
.bot-bac{
  width: 100%;
}
.bot-btn{
  display: flex;
  justify-content: center;
  margin-top: -132px;
  &>div{
    padding: 18px 38px;
    font-size: 29px;
    color: #fff;
    text-align: center;
    width: 150px;
  }
  & :first-child{
    background-color: #1A1E47;
    border-radius: 50px 50px 50px 18px;
    width: 150px;
    margin-right: 20px;
  }
  & :last-child{
    background-color: #C39F6C;
    border-radius: 50px 50px 18px 50px;
    width: 150px;
  }
}
.prs-win{
  text-align: center;
  color: #1A1E47;
  font-size: 30px;
  line-height: 90px;
  margin-bottom: 26px;
  padding-bottom: 90px;
}
.van-swipe__track{
  & .van-swipe-item:first-child{
    margin-left: 80px;

  }
 .active{
    width: 600px !important;
    height: 807px !important;
 }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  display: flex;
  height: 780px;
  transition: height 0.6s;
  position: relative;
  .tilted{
    position: absolute;
    bottom: -34px;
    width: 100%;
    text-align: left;
    padding-left: 40px;
    font-size: 36px; 
  }
}
.van-swipe{
  margin-top: 50px;
  height: 890px;
  img{
    width: 580px
  }
}
.top-step{
  background-color: #C4A06C;
  border-radius: 40px 40px 0px 0px;
  height: 198px;
  display: flow-root;
  img{
    width: 650px;
    display: block;
    margin: 28px auto;
  }
}
.banner-box{
  border-radius: 40px 40px 0px 0px;
  background-color: #fff;
  margin-top: -40px;
  overflow: hidden;
  min-height: 600px;
  .banner-top{
    position: relative;
    width: 100%;
  }
  .banner-rul{
    position: absolute;
    right: 0px;
    top: 0px;
    border-bottom-left-radius: 40px;
    background-color: #f3ece2;
    font-size: 24px;
    color: #C4A06C;
    padding: 20px;
  }
  .banner-tilte{
    display: flex;
    justify-content: center;
    color: #1A1E47;
    font-weight: bold;
    font-size: 32px;
    flex-wrap: wrap;
    padding-top: 40px;
    & .line{
      width: 64px;
      height: 4px;
      margin-top: 10px;
      background: #C39F6C;
    }
    & :first-child{
      width: 100%;
      text-align: center;
    }
    
  }
}
.sss{
  width: 50px;
}
</style>
