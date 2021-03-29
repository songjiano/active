<template>
  <div>
    <input placeholder="请输入内容" v-model="value" /> 
    <div @click="change">改变</div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from 'vue' 
export default defineComponent({
  name: '',
  setup () {
    const value = ref('ss')
    const datas = reactive({
      dat: '1222'
    })
    const change= ()=>{
      value.value=datas.dat
      console.log(datas.dat)
    }
    return {
      value,
      ...toRefs(datas),
      change
    }
  }
})
</script>

<style scoped>
  
</style>