import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vue-awesome/icons'
import './assets/styles/main.css'
import './assets/styles/media.scss'
import './assets/styles/reset.css'
import './assets/styles/_mixin.scss'
import './assets/styles/_variabless.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import 'material-design-icons-iconfont';
import Paginate from 'vuejs-paginate'




library.add(fas, far, fab,)
Vue.component('fa', FontAwesomeIcon)
Vue.component('custom-paginate', Paginate)


Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
