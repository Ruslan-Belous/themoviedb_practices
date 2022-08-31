<template>
  <div class='home'>
    <v-search-form/>
    <v-movie-list
      v-if='isMoviesBySearchKeyVisible'
      :movies-list='moviesBySearchKey'
      :title="'Movies on your request'"
      :total-pages-length='totalPagesBySearch'
      @click='changePaginationPageOnSearchRequest'
    />
    <v-loader v-if='isLoading'/>
    <v-movie-list
      v-else
      :movies-list='getPopularMovies'
      :title="'The most popular movies'"
      :total-pages-length='totalPagesLengthForPopularRequest'
      @click='changePaginationPageOnPopular'
    />
    <v-scroll-up/>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import VLoader from '../components/v-loader.vue'
import VMovieList from '../components/v-movie-list.vue'
import VScrollUp from '../components/v-scroll-up.vue'
import vSearchForm from '../components/v-search-form.vue'

export default {
  components: {vSearchForm, VScrollUp, VLoader, VMovieList},
  name: 'HomePage',
  data() {
    return {
      isLoading: true
    }
  },
  async mounted() {
    await this.fetchPopularMovies()
    this.isLoading = false
  },
  computed: {
    ...mapState({
      moviesBySearchKey: (state) => state.moviesStore.moviesBySearchKey,
      totalPagesBySearch: state => state.moviesStore.totalPagesBySearch
    }),
    ...mapGetters({
      getPopularMovies: 'moviesStore/getPopularMovies',
      getTotalPopularMoviesPages: 'moviesStore/getTotalPopularMoviesPages'
    }),
    isMoviesBySearchKeyVisible() {
      return this.moviesBySearchKey.length
    },
    totalPagesLengthForPopularRequest() {
      return this.getTotalPopularMoviesPages > 500
        ? 500
        : this.getTotalPopularMoviesPages
    }
  },
  methods: {
    ...mapActions({
      fetchMoviesBySearchKey: 'moviesStore/fetchMoviesBySearchKey'
    }),
    ...mapActions({
      fetchPopularMovies: 'moviesStore/fetchPopularMovies'
    }),
     changePaginationPageOnPopular(pageNum) {
      this.isLoading = true
       this.fetchPopularMovies(pageNum)
      this.isLoading = false
    },
    changePaginationPageOnSearchRequest(pageNum) {
      this.isLoading = true
      this.fetchMoviesBySearchKey(pageNum)
      this.isLoading = false
    }
  }
}
</script>

<style lang='scss' scoped></style>
