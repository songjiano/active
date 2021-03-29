<template>
  <div>
    已完成{{iread}}/全部{{all}}
  </div>
  <button>清除已完成</button>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup () {
    const datas = reactive({
      iread: 10,
      all: 1000
    })
    return {
      ...toRefs(datas)
    }
  }
})
</script>

<style scoped>

</style>