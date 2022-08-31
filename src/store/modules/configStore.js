import axios from '@/axios'

export default {
  namespaced: true,
  state: {
    imageConfigData: {}
  },
  mutations: {
    UPDATE_CONFIG_DATA: (state, imageConfigData) => state.imageConfigData = imageConfigData
  },
  actions: {
    async fetchConfigData({commit}) {
      try {
        const response = await axios
          .get('configuration')
        commit('UPDATE_CONFIG_DATA', response.data.images)
      } catch (error) {
        console.log(error, 'eroorrr')
      }
    }
  },
  getters: {
    getConfigData: (state) => state.imageConfigData
  }
}