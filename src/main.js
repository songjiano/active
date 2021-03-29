import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Button, Toast, Field } from 'vant';

const app = createApp(App) // 创建实例


// 全局过滤器

console.log('url:',app.config)

app.use(Button)
  .use(Toast)
  .use(Field)

app.use(store)
app.use(router)
app.mount('#app')
