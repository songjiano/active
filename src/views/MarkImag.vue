<template>
  <div class="login">
    <div class="top-step">
      <div>你的推荐海报已生成！</div>
      <div>保存图片，分享至朋友圈或转发好友。一键复制推荐语，传播效果更佳。</div>
    </div>
    <div class="banner-box">
      <div class="banner-top">
        <div class="buddy-good">
          <img src="@/assets/buddys@2x.png" alt="">
        </div>
      </div>
      <van-swipe class="my-swipe" width="600" @change="onChange" >
        <van-swipe-item v-for="ite in tiltes" class="active" :key="ite">
          <!-- <img :src="require('../assets/poster'+ite.id+'@2x.png')" alt=""> -->
          <img src="" id='avatar' alt="">
          <div class="tilted">
            <!-- {{tilted.tilte}} -->
            <qrcode-vue 
              :value="htppUrl+'recommend/Recommend?infor='+infor" 
              logoSrc="@/assets/logo.png"
              id="canvsed"
              class="canSan"
            ></qrcode-vue>
            <!-- <div class="scav-box">
              <qrcode-vue 
                value='https://blog.csdn.net/weixin_43857345/article/details/107916860' 
                logoSrc="@/assets/logo.png"
                id="canvsed"
                class="canSan"
              ></qrcode-vue>
              <div>
                <img src="@/assets/buddy7@2x.png" alt="">
              </div>
            </div> -->
            </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="prsBox">
      <div class="prs-win">
        <p>{{changeDetail[imgCode]}}</p>
        <button @click="getOther">换一个</button>
      </div>
    </div>
    <img class="bot-bac" src="@/assets/button_bg@2x.png" alt="">
    <div class="bot-btn">
      <div @click="changeLange()">预览保存</div>
      <div @click="copyJSON()">复制文案</div> 
    </div>
    <div ref="imageTofile" >
  　　<!-- 这里放需要截图的元素,自定义组件元素也可以 -->
  </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onBeforeMount, getCurrentInstance } from 'vue'
import { ImagePreview  } from 'vant';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import QrcodeVue from 'qrcode.vue'

import { Toast } from 'vant'
export default {
  setup() {
    const tilted = ref({ id:1, tilte:'#1000+教育创业者的起点首选' })
    const router= useRouter()
    const route = useRoute()
    const {ctx } = getCurrentInstance();
    const infor = localStorage.getItem('infor')?JSON.parse(localStorage.getItem('infor')):undefined;
    console.log('infor', infor)
    const state = reactive({
      type: 'login',
      imgCode: 0,
      verify: 0,
      show: false,
      changeDetail:[
        '截止XXXXXX，全国XXX家中心，覆盖XXX城市。正在选教育项目的朋友们，我推荐爱贝教育，助您轻松创业!',
        '每月都有项目说明会和体验日，还会推出运营专家分享会。想去了解的朋友可以扫码预约。',
        '爱贝英语，爱贝迪STEM+，winabc 线上线下融合，爱贝教育旗下的项目都值得了解，与爱贝携手，以优质教育创造美好生活！',
      ],
      tiltes:[],
      imgUrls:'',
      htppUrl:'',
      infor:''
    })
    state.tiltes = [JSON.parse(route.query.value)]
    tilted.value.tilte=JSON.parse(route.query.value).tilte
    const onChange = (e) =>{
      state.verify = e
    }
    const goActive = () => {
      router.push({
        path:'./active'
      })
    }
    const getOther = () => {
      if(state.imgCode<2){
        state.imgCode+=1
      }else{
        state.imgCode=0
      }
      console.log(state.imgCode)
    }
    const copyJSON = async() => {
      let target = document.createElement('input') //创建input节点
      target.value = state.changeDetail[state.imgCode] // 给input的value赋值
      target.classList = ['lisCls']
      document.body.appendChild(target) // 向页面插入input节点
      // target.select() // 选中input
      try {
        await document.execCommand('Copy') // 执行浏览器复制命令
        Toast('复制成功')
      } catch {
        Toast('复制失败')
      }
    }
    const changeLange = (e) => {
      // router.push({
      //   path:'/recommend/Recommend',
      //   query: {openId:'1561615646156486465468'}
      // })
      ImagePreview([
        state.imgUrls
      ]);
      // let link = document.createElement('a');
      // link.setAttribute("href",state.imgUrls)
      // link.setAttribute("download",'abie.jpg')
      // link.setAttribute("target","_blank")
      // let clickEvent = document.createEvent("MouseEvents");
      // clickEvent.initEvent("click", true, true);  
      // link.dispatchEvent(clickEvent);
    }
    const drawAndShareImage = () => {
      let canvas = document.createElement("canvas");
      let canvsed = document.getElementById("canvsed")

      canvas.width = 870;
      canvas.height = 1209;
      let context = canvas.getContext("2d");

      let based64 = canvsed.toDataURL("image/png")
      context.rect(0 , 0 , canvas.width , canvas.height);
      context.fillStyle = "#fff";
      context.fill();
      let myImage = new Image();
      myImage.src = require("../assets/poster"+[JSON.parse(route.query.value)][0].id+"@2x.png");  //背景图片 你自己本地的图片或者在线图片
      myImage.crossOrigin = 'Anonymous';
      myImage.onload = function(){
        context.drawImage(myImage , 0 , 0 , 870 , 1209);
        context.fillStyle = "#fff";
        context.font = "50px Arial";
        context.fillText(tilted.value.tilte,56,1160);
        context.fillStyle = '#fff';
        context.fillRect(630 , 876 , 214 , 218);
        let myImage2 = new Image();
        myImage2.src = based64;  //你自己本地的图片或者在线图片
        myImage2.crossOrigin = 'Anonymous';
        myImage2.onload = function(){
          context.drawImage(myImage2 , 650 , 900 , 170 , 170);
          let myImage3 = new Image();
          myImage3.src = require("../assets/kans.png");  //你自己本地的图片或者在线图片
          myImage3.crossOrigin = 'Anonymous';
          myImage3.onload = function(){
            context.drawImage(myImage3 , 716 , 966 , 40 , 40);
            let base64 = canvas.toDataURL("image/png"); //"image/png" 这里注意一下
            let img = document.getElementById('avatar');
            // document.getElementById('avatar').src = base64;
            img.setAttribute('src' , base64);
            state.imgUrls = base64
          }
        }
      }
    }
    onBeforeMount(()=>{
      state.htppUrl = ctx.keycloak
      state.infor = infor.data.Data.openid
    })
    onMounted(()=>{
      drawAndShareImage()
    })

    return {
      ...toRefs(state),
      tilted,
      getOther,
      onChange,
      goActive,
      changeLange,
      copyJSON,
    }
  },
  components: {
    QrcodeVue
  }
}
</script>

<style lang="scss" scoped>
.canSan{
  display: none;
}
.scav-box{
  position: absolute;
  bottom: 120px;
  right: 86px;
  padding: 12px;
  padding-bottom: 6px;
  width: 100px;
  border-radius: 4px;
  background-color: #fff;
  height: 106px;
  canvas{
    width: 100px;
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
  .activs{
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
  & :first-child{
    padding: 18px 38px;
    font-size: 29px;
    background-color: #1A1E47;
    color: #fff;
    border-radius: 50px 50px 50px 0px;
    width: 150px;
    text-align: center;
    margin-right: 20px;
  }
  & :last-child{
    padding: 18px 38px;
    font-size: 29px;
    background-color: #C39F6C;
    color: #fff;
    border-radius: 50px 50px 0px 50px;
    width: 150px;
    text-align: center;
    margin-left: 20px
  }
}
.prsBox{
  width: 100%;
  background-image: url('../assets/text_bg@2x.png');
  background-repeat: no-repeat;
  background-position: bottom;
  padding-bottom: 40px;
  background-size: contain;
  margin-bottom: 40px;
}
.prs-win{
  color: #666666;
  font-size: 30px;
  line-height: 120px;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  width: 560px;
  margin: 10px auto;
  font-size: 20px;
  margin-top: -50px;
  p{
    line-height: 38px;
  }
  button{
    width: 300px;
    height: 50px;
    text-align: center;
    line-height: 20px;
    padding-top: 8px;
    font-size: 24px;
    background-color: #3ACA32;
    color: #fff;
    border: none;
    border-radius: 6px;
    margin-left: 20px;
  }
}
.van-swipe__track{
  & .van-swipe-item:first-child{
    margin-left: 90px;

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
  height: 690px;
  transition: height 0.2s;
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
  height: 240px;
  text-align: center;
  color: #fff;
  font-size: 20px;
  &>div:first-child{
    font-size: 35px;
    font-weight: bold;
    padding: 50px 0px 10px 0px;
  }
}
.banner-box{
  border-radius: 40px 40px 0px 0px;
  background-color: #fff;
  margin-top: -40px;
  min-height: 600px;
  .banner-top{
    position: relative;
    width: 100%;
  }
  .buddy-good{
    display: flex;
    justify-content: center;
    img{
      width: 150px;
      height: 227px;
      margin-top: -50px;
      margin-bottom: -156px;
    }
  }
}
.sss{
  width: 50px;
}
</style>
