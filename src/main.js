import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import Styles from 'uikit/src/less/uikit.less'

UIkit.use(Icons) && Styles

createApp(App).use(router).mount('#app')
