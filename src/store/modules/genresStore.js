import axios from '@/axios'

export default {
  namespaced: true,
  state: {
    genres: []
  },
  mutations: {
    SET_GENRES: (state, genres) => state.genres = genres.map((el) => {
      return {
        ...el, isSelected: false
      }
    }),
    SELECT_GENRE: (state, id) => state.genres.forEach(genre => (genre.id === id) && (genre.isSelected = !genre.isSelected)),
    RESET_SELECTED_GENRES: (state) => state.genres.forEach((genre) => genre.isSelected = false)
  },
  actions: {
    async fetchGenres({ commit }) {
      try {
        const response = await axios
          .get('genre/movie/list')
        commit('SET_GENRES', response.data.genres)
      } catch (error) {
        console.log(error, 'eroorrr')
      }
    }
  },
}