<template>
  <div>
    <nav-header/>
    <nav-main :msg='nub'/>
    <nav-footer />
    {{nub}}{{name}}{{ns}}
    <div>
      {{arr}}
    </div>
    <div>
      {{obj.bsd}}
    </div>
    <div>
      {{nub}}和{{nuc}}总和为{{addNubs}}
      <button @click="addNub">add</button>
      <div>{{Lists}}</div>
      <button @click="gotod">跳转att</button>
    </div>
    <van-button round class="save-btn" color="#1baeae" type="primary"  block>保存</van-button>
  </div>
</template>

<script>
import { defineComponent, reactive ,ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import NavHeader from '@/components/navHeader/NavHeader'
import NavMain from '@/components/navMain/NavMain'
import NavFooter from '@/components/navFooter/NavFooter'

export default defineComponent({
  name: '',
  props: {

  },
  components: {
    NavHeader,
    NavMain,
    NavFooter
  },
  setup ( props, contex ) {
    const store = useStore()
    const router = useRouter()

    console.log('Store', router)

    const Lists = store.state.List
    const nub = ref(10)
    const name = ref('psd')
    const nuc = ref(6)
    const checked = ref(true)
    const activeIcon = ref('https://img.yzcdn.cn/vant/user-active.png')
    const inactiveIcon = ref('https://img.yzcdn.cn/vant/user-inactive.png')
    const addNubs = computed(()  => {
      return nub.value + nuc.value
    })
    const bods = reactive({
      lst: 1,
      ns: '这是bods',
      arr: ['321','123','sda'],
      obj: {bsd:'sdadw999999'}
    })
    const addNub = () => {
      nub.value++;
      nuc.value++
    }
    const gotod = () =>{
      // router.push('/about')
      router.push({
        path: '/about',
        query: {
          obg:JSON.stringify(Lists),
          ns:bods.ns,
          lst: bods.lst
        }
      })
    }
    // const send = (val) => {
    //   console.log(val)
    //   bods.ns = val
    // }
    return {
      nub,
      name,
      ...toRefs(bods),
      addNubs,
      nuc,
      addNub,
      Lists,
      gotod,

      checked,
      activeIcon,
      inactiveIcon
    }
  }
})
</script>

<style scoped>

</style>