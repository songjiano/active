<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="backs">回去</button>
    {{ns}}{{lst}}
  </div>
</template>
<script>
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default defineComponent({
  name: 'about',
  props: {

  },
  components:{

  },
  setup ( props, contex ){
    const ns = ref()
    const obj = ref()
    const lst = ref()
    const router = useRouter()
    console.log(1)
    const backs = () =>{
      router.go(-1)
    }
    onUnmounted(()=>{
      //清除定时器和闭包函数
      console.log('onUnmounted')
    })
    onMounted(()=>{
      const route = useRoute()
      ns.value = route.query.ns
      obj.value = route.query.obg
      lst.value = route.query.lst*1
      console.log(route.query)
    })
    console.log(2)
    return {
      backs,
      ns,
      obj,
      lst
    }
  },
})
</script>
