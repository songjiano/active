<template>
  <div v-for="(item, index) in list " :key="index">
    <div>
      <input type="checkbox" v-model="item.complent">{{item.title}}
      <button @click="send">删除</button>
    </div>
  </div>
</template>

<script>
import { defineComponent ,onMounted,ref} from 'vue'
import { useStore } from 'vuex'

import { getCart } from '@/service/cart'

export default defineComponent({
  name:'navMain',
  props: {
    msg:{
      //数据校验
      type: Number,
      // require: true,
      default: 55555555
    }
  },
  setup (props, ctx) {
    console.log('props：',props.msg)
    const mesrs = ref('我是自主卷sss')
    const list= ref([
      {
        title:'吃饭',
        complent: true
      },
      {
        title:'碎觉',
        complent: false
      },
      {
        title:'撸代码',
        complent: false
      },
      {
        title:'。。。。',
        complent: false
      },
    ])
    const store = useStore()
    onMounted(()=>{
       const { href } = window.location;
        const query = href.substring(href.indexOf('?') + 1);
        const vars = query.split('&');
        const obj = {};
        for (let i = 0; i < vars.length; i++) {
          const pair = vars[i].split('=');
          obj[pair[0]] = pair[1];
        }
    })
    const send = async () => {
      let urlEncode=encodeURIComponent('http://172.18.10.221:8080/#/')
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0050255d27272980&redirect_uri='+urlEncode+'?response_type=code&scope=snsapi_userinfo'
      const { resultCode } = await getCart({ pageSize: 10,pageIndex:1 })
      if (resultCode == 200 ) Toast.success('添加成功')
      store.dispatch('updateCart')
    }
    return{
      list,
      mesrs,
      send
    }
  }
})
</script>

<style scoped>

</style>