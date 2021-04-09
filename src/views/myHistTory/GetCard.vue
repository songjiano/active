<template>
  <div class="re-swift">
    <div class="suc-box">
      <div >
         <img src="@/assets/reward@2x.png" alt="" @click="conSure()">
      </div>
      <div >
         <img src="@/assets/reward@2x.png" alt="">
      </div>
      <p>卡券详情见商城小程序</p>
    </div>
    <van-dialog v-model:show="show" class="mall" title="">
      <img src="@/assets/wancheng@2x.png" alt="" />
      <p>领取奖励</p>
      <p class="tes">您可以在爱贝商城使用</p>
      <!-- <wx-open-launch-weapp
        id="launch-btn"
        username="gh_df8c0e784800"
        path="pages/Home/Home"
      >
        <template>
          <button class="btn"><div class="gosc">前往使用</div></button>
        </template>
      </wx-open-launch-weapp> -->
      <div class="gosc">前往使用</div>
      <img class="closed" src="@/assets/popup_close@2x.png" alt="" @click="closeds()" />
    </van-dialog>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted} from 'vue'
import { getcards, getOpenIds } from '@/service/user'

export default {
  setup() {
    const infor = localStorage.getItem('infor3')
    const state = reactive({
      show : false,
      cardList: undefined,

    })
    const conSure = () => {
      if(infor){
        state.show = true
        getcards()
      }else{
        Toast('暂无openid,请重新授权')
      }
    }
    const closeds = () =>{
      state.show = false
    }
    onMounted(()=>{
      if(infor){
        getOpenIds(JSON.parse(infor).data.Data.openid).then((res)=>{
          state.cardList=res.data
        })
      }else{
        Toast('暂无openid,请重新授权')
      }
    })
    
    return {
      ...toRefs(state),
      conSure,
      closeds
    }
  }
}
</script>

<style lang="scss" scoped>
.re-swift{
  font-size: 24px;
  height: 100%;
  background-color: #fff;
  display: flow-root;
  text-align: center;
  .suc-box{
    width: 700px;
    margin: 20px auto;
  }
  p{
    color:#666666;
    text-align: center;
    line-height: 100px;
  }
  .tes{
    color:rgb(72 72 72) !important;
    font-size:24px !important
  }
  .gosc{
    padding: 18px 38px;
    font-size: 29px;
    background-color: #C39F6C;
    color: #fff;
    border-radius: 50px 50px 0px 50px;
    width: 150px;
    text-align: center;
    margin: 40px auto;
    margin-bottom: 50px;
  }
  .mall{
    width: 600px;
    img{
      width: 160px;
      padding-top: 50px;
      margin-bottom: 40px;
    }
    .closed{
      margin-bottom: -130px;
      width: 66px;
    }
    p{
      color: #c39f6c;
      font-size: 28px;
      font-weight: 700;
      line-height: 50px;
    }
  }
}
</style>
