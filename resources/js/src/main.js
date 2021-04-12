/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'


// Vuesax Component Framework
import Vuesax from 'vuesax'

Vue.use(Vuesax)

// Lowdash
import * as _ from 'lodash';

// axios
import axios from './axios.js'
Vue.prototype.$http = axios

// Constants
import constants from './constants'
Vue.prototype.$constants = constants;

// Filters
import './filters/filters.js'


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)

//Vue perfect scrollbar
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
Vue.component('vuePerfectScrollbar', VuePerfectScrollbar)

//VeeValidate
// import VeeValidate from 'vee-validate'
// Vue.use(VeeValidate)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

import errorHandler from './mixin/errorHandle'
Vue.use(errorHandler);

import VCalendar from 'v-calendar';
Vue.use(VCalendar);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    _,
    render: h => h(App)
}).$mount('#app')
