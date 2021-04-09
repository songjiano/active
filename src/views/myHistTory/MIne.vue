<template>
  <div class="re-swift">
    <div class="suc-box">
      <div>
        <div class="atr-tx">
          <img src="@/assets/poster5@2x.png" alt="">
        </div>
        <div>
          <div>
            <p>微信昵称</p>
            <p>137****7654  </p>
          </div>
        </div> 
        <div>
          <button @click="getCard()">领取奖励</button>
        </div>
      </div>
    </div>
    <div class="set-time">
      <div class="recoed">
        <div>15</div>
        <div>已推荐</div>
      </div>
      <div class="canget">
        <div>2</div>
        <div>可领取</div>
      </div>
      <div class="gered">
        <div>3</div>
        <div>已领取</div>
      </div>
    </div>
    <div class="set-time1">
      <van-tabs v-model:active="active">
        <van-tab title="推荐记录">
          <div class="rowd-data">
            <div class="row-list">
              <div>
                <img src="@/assets/poster5@2x.png" alt="">
              </div>
              <div>
                15155
              </div>
            </div>
            <div>
              2015年12月20日
            </div>
          </div>
          <div class="rowd-data">
            <div class="row-list">
              <div>
                <img src="@/assets/poster5@2x.png" alt="">
              </div>
              <div>
                15155
              </div>
            </div>
            <div>
              2015年12月20日
            </div>
          </div>
        </van-tab>
        <van-tab title="领取记录">
          <div class="rowd-data">
            <div class="row-list">
              15155
            </div>
            <div>
              2015年12月20日
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted} from 'vue'

import { getOpenIds, getUserInfo, getRecommends } from '@/service/user'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'

export default {
  setup() {
    const router= useRouter()
    const state = reactive({
      active: 2,
      datas:[],
      tallTos:undefined
    })
    const getCard = () =>{
      router.push({
        path:'/myHistTory/getCard'
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
      urlEncode+'myHistTory/mIne&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
    }
    onMounted(()=>{
      const { href } = window.location;
      const query = href.substring(href.indexOf('?') + 1);
      const infor = localStorage.getItem('infor3')
      const vars = query.split('&');
      const obj = {};
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        obj[pair[0]] = pair[1];
      }
      console.log(infor)
      if(!infor){
        if(obj.code&&obj.code.length>0){
          console.log('obj.code',obj.code)
          getUserInfo(obj.code).then((es)=>{
            if(es.data.ErrCode===0){
              localStorage.setItem('infor3', JSON.stringify(es));
              getOpenIds(es.data.Data.openid).then((res)=>{
                console.log('res', res)
                state.datas = res.data.Data.rows
              })
              getRecommends(es.data.Data.openid).then((res)=>{
                console.log('res', res)
                state.tallTos = res.data.Data.rows
              })
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
        getOpenIds(JSON.parse(infor).data.Data.openid).then((res)=>{
          state.datas = res.data.Data.rows
        })
      }
    })
    return {
      ...toRefs(state),
      getCard
    }
  }
}
</script>

<style lang="scss" scoped>
.re-swift{
  background-color: #f6f6f6;
  height: 100%;
  .suc-box{
    background: url('../../assets/my_header_bg.png');
    background-size: contain;
    height: 600px;
    background-repeat: no-repeat;
    display: flow-root;
    &>div{
      width: 680px;
      margin: 160px auto;
      margin-top: 140px;
      color: #fff;
      overflow: hidden;
      display: flex;
      &>div{
        float: left;
      }
      button{
        color: #fff;
        background-color: #C4A06C;
        border: #C4A06C;
        border-radius: 10px;
        padding: 14px 26px;
        font-size: 30px;
        float: right;
      }
      &>div:nth-child(2){
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 260px;
        p{
          width: 100%;
          line-height: 48px;
          font-size: 28px;
          margin-left: 40px;
        }
        
      }
       &>div:last-child{
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 260px;
       }
    }
    .atr-tx{
      width: 140px;
      height: 140px;
      overflow: hidden;
      border-radius: 200px;
      border: 6px solid  #7a7e9c;
      img{
        width: 100%;
      }
    }
  }
  .set-time{
    width: 550px;
    margin: 50px auto;
    margin-top: -200px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 80px;
    display: flex;
    justify-content: space-between;
    font-family: 'MicrosoftYaHeiLight';
    div{
      text-align: center;
      font-size: 24px;
      color:#666666;
    }
    .recoed{
      &>div:first-child{
        color: #1CA8E8;
        font-size: 60px;
        font-weight: bold;
        font-family: 'Impact';
        padding-bottom: 10px;
      }
    }
    .canget{
      &>div:first-child{
        color: #E1463C;
        font-size: 60px;
        font-weight: bold;
        font-family: 'Impact';
        padding-bottom: 10px;
      }
    }
    .gered{
      &>div:first-child{
        color: #43BA14;
        font-size: 60px;
        font-weight: bold;
        font-family: 'Impact';
        padding-bottom: 10px;
      }
    }
  }
  .set-time1{
    width: 708px;
    margin: 50px auto;
    margin-top: -20px;
    background-color: #fff;
    border-radius: 10px;
    // padding: 30px 80px;
    display: flex;
    justify-content: space-between;
    font-family: 'MicrosoftYaHeiLight';
    overflow: hidden;
    .rowd-data{
      width: 90%;
      margin: 50px auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      color: #666666;
    }
    .row-list{
      display: flex;
      align-items: center;
      &>div:first-child{
        width: 60px;
        height: 60px;
        border-radius: 80px;
        overflow: hidden;
        margin-right: 20px;
      }
    }
    .van-tabs{
      width: 100%;
    }
  }
}
</style>
