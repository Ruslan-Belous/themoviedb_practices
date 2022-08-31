import Vue from 'vue'
import Vuex from 'vuex'

import configStore from './modules/configStore'
import moviesStore from '@/store/modules/moviesStore'
import genresStore from '@/store/modules/genresStore'


Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    configStore,
    moviesStore,
    genresStore
  }
})



