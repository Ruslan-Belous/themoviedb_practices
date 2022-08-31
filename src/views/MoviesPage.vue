<template>
  <div class='movies-page'>
    <div class='movies-page__container'>
      <h3 class='movies-page__container__title'>{{ titleSection }}</h3>
      <div class='movies-page__content'>
        <div class='movies-page__content__filter-section'>
          <v-filter-panel :filter-title="'Sort'" class='card'>
            <div class='card__sort-by-contaier'>
              <h3>Sort Results By</h3>
              <v-custom-select
                :background="'#032541'"
                :border-radius="'6'"
                :hover-background="'#aaa'"
                :options='options'
                :options-color="'#fff'"
                :selected='selected'
                :title-color="'#fff'"
                @select='selectSortBy'
              />
            </div>
          </v-filter-panel>
          <v-filter-panel :filter-title="'Filter'" class='card'>
            <div class='card__genres-container'>
              <h3>Genres</h3>
              <v-genres-list-for-sort :genres='genres' @click='selectGenre'/>
            </div>
            <div class='card__runtime-container'>
              <h3>Runtime</h3>
              <v-range-slider @range-changed='setRangeSlider'/>
            </div>
          </v-filter-panel>
          <v-button
            v-if='isResetBtnVisible'
            :btnTitle="'Reset filters'"
            :prependBtnIcon="'fa-trash-can'"
            :primary='true'
            class='movies-page__content__filter-section__btn-reset-filters'
            @click='resetFilters'
          />
          <v-button
            :btnTitle="'Search'"
            :disabled='!isResetBtnVisible'
            :prependBtnIcon="'fa-magnifying-glass'"
            :primary='true'
            class='movies-page__content__filter-section__btn-search'
            @click='searchBySort'
          />
        </div>
        <div v-if='isLoading' class='movies-page__loader'>
          <v-loader/>
        </div>
        <v-movie-list
          v-else
          :movies-list='listMoviesFromApi'
          :total-pages-length='totalPagesLengthForPopularRequest'
          class='movies-page__content__list-section'
          @click='changePaginationPage'
        />
      </div>
    </div>
  </div>
</template>

<script>
import vMovieList from '../components/v-movie-list.vue'
import VLoader from '../components/v-loader.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import VButton from '../components/v-button.vue'
import VFilterPanel from '../components/v-filter-panel.vue'
import VCustomSelect from '../components/v-custom-select.vue'
import VGenresListForSort from '../components/v-genres-list-for-sort.vue'
import VRangeSlider from '../components/v-range-slider.vue'

export default {
  components: {
    vMovieList,
    VLoader,
    VButton,
    VFilterPanel,
    VCustomSelect,
    VGenresListForSort,
    VRangeSlider
  },
  name: 'MoviesPage',
  props: {
    titleSection: {
      type: String,
      default: 'Title section'
    }
  },
  data() {
    return {
      isLoading: true,
      showTab: false,
      selected: '',
      options: [
        {
          id: Date.now(),
          name: 'Popularity Descending',
          type: 'popularity.desc'
        },
        {
          id: Date.now(),
          name: 'Popularity Ascending',
          type: 'popularity.asc'
        },
        {
          id: Date.now(),
          name: 'Rating Descending',
          type: 'vote_average.desc'
        },
        {
          id: Date.now(),
          name: 'Rating Ascending',
          type: 'vote_average.asc'
        },
        {
          id: Date.now(),
          name: 'Release Date Descending',
          type: 'primary_release_date.desc'
        },
        {
          id: Date.now(),
          name: 'Release Date Ascending',
          type: 'primary_release_date.asc'
        }
      ],
      filtersForSort: {},
      arrParamsWithGenres: []
    }
  },
  async mounted() {
    await this.fetchPopularMovies()
    this.isLoading = false
  },
  computed: {
    ...mapGetters({
      getPopularMovies: 'moviesStore/getPopularMovies',
      getTotalPopularMoviesPages: 'moviesStore/getTotalPopularMoviesPages'
    }),
    ...mapState({
      genres: state => state.genresStore.genres,
      sortedMovies: state => state.moviesStore.sortedMovies
    }),
    totalPagesLengthForPopularRequest() {
      return this.getTotalPopularMoviesPages > 500
        ? 500
        : this.getTotalPopularMoviesPages
    },
    listMoviesFromApi() {
      return !this.sortedMovies.length
        ? this.getPopularMovies
        : this.sortedMovies
    },
    isResetBtnVisible() {
      return !!Object.keys(this.filtersForSort).length
    }
  },
  methods: {
    ...mapActions({
      fetchPopularMovies: 'moviesStore/fetchPopularMovies',
      fetchMoviesBySort: 'moviesStore/fetchMoviesBySort'
    }),
    ...mapMutations({
      SELECT_GENRE: 'genresStore/SELECT_GENRE',
      RESET_SELECTED_GENRES: 'genresStore/RESET_SELECTED_GENRES',
      RESET_SORTED_MOVIES: 'moviesStore/RESET_SORTED_MOVIES'
    }),
    changePaginationPage(pageNum) {
      this.isLoading = true
      !this.sortedMovies.length
        ? this.fetchPopularMovies(pageNum)
        : (this.filtersForSort.page = pageNum) &&
        this.fetchMoviesBySort(this.filtersForSort)
      this.isLoading = false
    },
    selectSortBy({type, name}) {
      this.$set(this.filtersForSort, 'sortBy', type)
      this.selected = name
    },
    selectGenre(genreId) {
      this.SELECT_GENRE(genreId)
      let dublicates = false
      if (this.arrParamsWithGenres.length) {
        this.arrParamsWithGenres.forEach((item, index) => {
          if (item === genreId) {
            dublicates = true
            this.arrParamsWithGenres.splice(index, 1)
          }
        })
      }
      if (!dublicates) {
        this.arrParamsWithGenres.push(genreId)
      }
      let params = this.arrParamsWithGenres.join(',')
      this.$set(this.filtersForSort, 'with_genres', params)
    },
    setRangeSlider({min, max}) {
      this.filtersForSort = Object.assign({}, this.filtersForSort, {
        'with_runtime.gte': min,
        'with_runtime.lte': max
      })
    },
    async searchBySort() {
      this.isLoading = true
      await this.fetchMoviesBySort(this.filtersForSort)
      this.isLoading = false
    },
    async resetFilters() {
      this.RESET_SELECTED_GENRES()
      this.minRuntime = 0
      this.maxRuntime = 400
      this.arrParamsWithGenres = []
      this.filtersForSort = {}
      this.RESET_SORTED_MOVIES()
      await this.fetchPopularMovies()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/styles/_mixin';
@import '@/assets/styles/_variabless';

.movies-page {
  padding: 20px 30px;

  &__loader {
    width: 100%;
    height: 100%;
    background: rgba($color: #032541, $alpha: 0.8);
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    &__title {
      padding: 10px 0;
      font-size: 26px;
      color: $accent-color;
      margin-bottom: 15px;
    }
  }

  &__content {
    display: flex;

    &__filter-section {
      width: 30%;
      padding-right: 10px;

      .card {
        box-shadow: 0 2px 8px rgba($color: #000000, $alpha: 0.1);
        background-color: #fff;

        h3 {
          display: inline-flex;
          align-items: center;
          width: 100%;
          font-size: 1em;
          font-weight: 300;
          margin-bottom: 10px;
        }

        &__sort-by-contaier {
          padding: 6px 16px 16px 16px;
        }

        &__genres-container {
          padding: 6px 16px;
        }

        &__runtime-container {
          border-top: 1px solid #eee;
          padding: 6px 16px;
        }

        :deep(.filter) {
          padding: 0;
        }
      }

      .card + div {
        margin-top: 15px;
      }

      &__btn-search,
      &__btn-reset-filters {
        margin-top: 15px;
        background: rgba(1, 180, 228, $alpha: 1);
      }

      &__btn-reset-filters {
        background: linear-gradient(to right, #1ed5a9 0%, #01b4e4 100%);
      }

      &__btn-search:hover {
        background: rgba(3, 37, 65, $alpha: 1);
        color: #fff;
      }

      &__btn-reset-filters:hover {
        color: #000;
      }
    }

    &__list-section {
      :deep(.popular-section-container__list) {
        padding: 0;
        margin: 0;
      }
    }
  }
}
</style>

<style lang='scss'>
@media (max-width: 767px) {
  #app .movies-page {
    &__content {
      flex-direction: column;
      align-items: center;

      &__filter-section {
        width: 90%;
        padding: 0;
        margin-bottom: 25px;
      }
    }
  }
}
</style>
