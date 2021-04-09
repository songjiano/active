<template>
  <div class="re-swift">
    <van-form validate-first @submit="onSubmit" @failed="onFailed">
      <div class="abie-card">
        <div class="abei-label"><span>*</span>请选择您想加盟的品牌</div>
        <van-field name="ProjectType" label="">
          <template #input>
            <van-radio-group v-model="radio" icon-size='16px'>
              <van-radio shape="square" name="1">爱贝英语（2-13岁线下高端英语）</van-radio>
              <van-radio shape="square" name="2">爱贝迪STEM+（3-18岁跨学科融合课堂）</van-radio>
              <van-radio shape="square" name="3">Winabc（3-13岁OMO融合英语）</van-radio>
              <van-radio shape="square" name="4">尚未确定，都可以了解</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div class="abie-card">
        <!-- <div class="abei-label"><span>*</span>城市</div> -->
        <div class="abie-citys">
          <van-field
            v-model="value"
            readonly
            clickable
            name="CityName"
            label="地区选择："
            placeholder="点击选择省市"
            @click="showArea = true"
            required
            :rules="[{ required: true, message: '点击选择省市' }]"
          />
        </div>
      </div>
      <div class="abie-card">
        <div class="abei-label"><span>*</span>您的联系方式</div>
        <div class="abie-users">
          <van-field
            v-model="value1"
            name="NickName"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请输入姓名' }]"
          />
        </div>
        <div class="abie-disabled abie-users">
          <van-field
            v-model="value2"
            name="Mobile"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="form-bot">
        <img class="bot-bac" src="@/assets/button_bg@2x.png" alt="">
        <!-- <van-button class="bot-btn" round block type="info" native-type="submit">提交</van-button> -->
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <van-popup v-model:show="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'

import { getCityList, subMite } from '@/service/user'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const state = reactive({
      verify: 0,
      value1: '',
      radio: '1',
      value: '',
      value2:'15000569020',
      showArea: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      areaList:{province_list: {},
          city_list: {},
          county_list: {}
      },
      myOpenid:'',
      openid:'',
    })

    const pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    const router= useRouter()
    const onFailed=(errorInfo)=>{
      console.log('failed', errorInfo);
    }
    const onConfirm = (value) => {
      state.verify = value[1].code.slice(2,4)
      state.showArea = false;
      state.value = value
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
    }
    const prefixZero = (num, n) => {
      return (Array(n).join(0) + num).slice(-n);
    }
    const onSubmit = (values) => {
      let datas = {...values,CityID:state.verify, ReferencesOpenId:state.myOpenid, OpenId: state.openid}
      console.log('submit', datas);
      subMite(datas).then((res)=>{
        console.log(res)
        if(res.statusText==="OK"){
          router.push({
            path:'/recommend/submit',
          })
        }else{
          Toast(res.statusText)
        }
      })

    }
    onMounted(()=>{
      const { href } = window.location;
      const query = href.substring(href.indexOf('?') + 1);
      const infor1 = localStorage.getItem('infor1')
      const infor = localStorage.getItem('inforOpenid')
      state.myOpenid= JSON.parse(infor1).data.Data.openid
      state.openid= infor
      const vars = query.split('&');
      const obj = {};
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        obj[pair[0]] = pair[1];
      }
      // getOpenId({code: obj.code})
      getCityList().then((res)=>{
        res.data.Data.map((item)=>{
          let provinceValeu = (prefixZero(Number(item.value)+10, 2)*10000).toFixed(0)
          let cityValeu = (Number(item.value)+10).toFixed(0)
          state.areaList.province_list[provinceValeu]=item.label
          item.children.map((citem)=>{
            state.areaList.city_list[cityValeu+(prefixZero(Number(citem.value)+10, 2)*100).toFixed(0)]=citem.label
          })
        })
        console.log(state.areaList)
        console.log('res', res)
      })
      // if(obj.code) alert(JSON.stringify(obj.code))
    })

    return {
      ...toRefs(state),
      onFailed,
      onConfirm,
      prefixZero,
      pattern,
      onSubmit
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.form-bot{
  position: fixed;
  bottom: 0px;
  display: grid;
  .bot-bac{
    width: 100%;
  }
  button{
    width: 80%;
    margin: 0px auto;
    margin-top: -124px;
    background: #C39F6C;
    border: #C39F6C;
    font-size: 24px;
    height: 68px;
  }
}

.abie-disabled{
  .van-cell{
    background-color: #F4F4F4;
  }
}
.abie-users{
  border: 1px solid #DDDDDD;
  width: 620px;
  margin: 16px auto;
  margin-bottom: 0px;
}
.abie-citys{
  display: flex;
}
.abei-label{
  font-size: 24px;
}
.abei-label span{
  color: #ee0a24;
  margin-left: 16px;
  float: left;
  margin-top: 14px;
  font-size: 14px;
}
.abie-card{
  background-color: #fff;
  width: 660px;
  margin: 20px auto;
  padding: 24px 12px;
  border-radius: 6px;
}
.re-swift{
  background-color: #f6f6f6;
  display: flow-root;
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
