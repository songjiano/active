<template>
  <div class="active">
    <img style="width: 100%" src="@/assets/rule@2x.png" alt="">
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { getOpenId } from '@/service/user'
import { Toast } from 'vant'
export default {
  setup() {
    const verifyRef = ref(null)
    const route = useRoute()
    const state = reactive({
      verify: 0,
    })
    state.type = route.query
    const onChange = (e) =>{
      state.verify = e
    }
    onMounted(()=>{
      const { href } = window.location;
      const query = href.substring(href.indexOf('?') + 1);
      const vars = query.split('&');
      const obj = {};
      for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        obj[pair[0]] = pair[1];
      }
      // getOpenId({code: obj.code})
      // if(obj.code) alert(JSON.stringify(obj.code))
    })

    return {
      ...toRefs(state),
      verifyRef,
      onChange
    }
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>

</style>
