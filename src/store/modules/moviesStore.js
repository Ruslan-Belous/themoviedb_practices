import axios from '@/axios'

export default {
  namespaced: true,
  state: {
    popularMoviesObj: {},
    searchKey: '',
    moviesBySearchKey: [],
    movieDataById: {},
    totalPagesBySearch: 1,
    wishlist: [],
    sortedMovies: []
  },
  mutations: {
    UPDATE_POPULAR_MOVIES: (state, popularMoviesObj) => state.popularMoviesObj = popularMoviesObj,
    SET_SEARCH_KEY: (state, key) => state.searchKey = key,
    UPDATE_MOVIES_BY_SEARCH_KEY: (state, moviesBySearchKey) => state.moviesBySearchKey = moviesBySearchKey,
    CLEAR_MOVIES_LIST_BY_SEARCH_KEY: (state) => state.moviesBySearchKey = [],
    UPDATE_MOVIE_OBJ_BY_ID: (state, movieDataById) => state.movieDataById = movieDataById,
    SET_WISHLIST: (state, movieDataById) => {
      if (!state.wishlist.some(el => el.title === movieDataById.title)) state.wishlist.push(movieDataById)
    },
    UPDATE_TOTAL_PAGES_BY_SEARCH: (state, totalPagesBySearch) => state.totalPagesBySearch = totalPagesBySearch,
    DELETE_WISHLIST_ITEM: (state, id) => state.wishlist = state.wishlist.filter(el => el.title !== id),
    UPDATE_MOVIES_BY_SORT: (state, sortedMovies) => state.sortedMovies = sortedMovies,
    RESET_SORTED_MOVIES: (state) => state.sortedMovies = []
  },
  actions: {
    async fetchPopularMovies({ commit, dispatch }, payload) {
      const params = {
        sort_by: 'popularity.desc',
        page: payload
      }
      try {
        const response = await axios
          .get('discover/movie', { params })
        commit('UPDATE_POPULAR_MOVIES', response.data)
        await dispatch('genresStore/fetchGenres', {}, { root: true })
      } catch (error) {
        console.log(error, 'eroorrr')
      }
    },
    async fetchMoviesBySearchKey({ state, commit }, payload) {
      const params = {
        page: payload,
        query: state.searchKey
      }
      try {
        const response = await axios
          .get('search/movie', { params: params })
        commit('UPDATE_MOVIES_BY_SEARCH_KEY', response.data.results)
        commit('UPDATE_TOTAL_PAGES_BY_SEARCH', response.data.total_pages)
      } catch (error) {
        console.log(error, 'eroorrr')
      }
    },
    async fetchMoviesBySort({ commit }, params) {
      try {
        const response = await axios
          .get('discover/movie', { params })
        commit('UPDATE_MOVIES_BY_SORT', response.data.results)
      } catch (error) {
        console.log(error, 'eroorrr')
      }
    },
    async fetchMovieByMovieId({ commit }, payload) {
      try {
        const response = await axios
          .get('movie/' + payload)
        commit('UPDATE_MOVIE_OBJ_BY_ID', response.data)
      } catch (error) {
        console.log(error, 'eroorrr')
      }
    }
  },
  getters: {
    getPopularMovies: (state) => state.popularMoviesObj.results,
    getTotalPopularMoviesPages: (state) => state.popularMoviesObj.total_pages
  }
}