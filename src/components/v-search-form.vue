<template>
  <div class='search-box-wrapp'>
    <div class='search-box-wrapp__text'>
      <h2>Welcome.</h2>
      <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
    </div>
    <form class='search-form' @submit.prevent='searchMovies'>
      <input
        v-model='searchKey'
        placeholder='Search for a movie, tv show, person......'
        type='text'
      />
      <v-button
        :btnTitle="'Search'"
        :disabled='!canSearch'
        :primary='true'
        class='search-form__btn'
        type='submit'
      />
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import VButton from './v-button.vue'

export default {
  name: 'v-search-form',
  components: {VButton},
  data() {
    return {
      searchKey: ''
    }
  },
  computed: {
    canSearch() {
      return this.searchKey.trim()
    }
  },
  methods: {
    ...mapActions({
      fetchMoviesBySearchKey: 'moviesStore/fetchMoviesBySearchKey'
    }),
    ...mapMutations({
      SET_SEARCH_KEY: 'moviesStore/SET_SEARCH_KEY',
      CLEAR_MOVIES_LIST_BY_SEARCH_KEY: 'moviesStore/CLEAR_MOVIES_LIST_BY_SEARCH_KEY'
    }),
    async searchMovies() {
      if (this.searchKey) {
        this.CLEAR_MOVIES_LIST_BY_SEARCH_KEY()
      }
      if (this.searchKey !== '') {
        this.SET_SEARCH_KEY(this.searchKey)
        await this.fetchMoviesBySearchKey()
      }
      this.searchKey = ''
    }
  }
}
</script>

<style lang='scss'>
@import '@/assets/styles/_mixin';

.search-box-wrapp {
  @include flex-between;
  flex-direction: column;
  min-height: 300px;
  height: calc(100vh / 2.5);
  max-height: 360px;
  background-size: cover;
  padding: 30px 40px;
  transition: 0.3s;
  animation: change 18s infinite ease-in-out;

  &__text {
    text-align-last: left;
    color: #fff;
    margin-bottom: 35px;

    h2 {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
    }

    h3 {
      font-size: 32px;
      font-weight: 600;
    }
  }

  .search-form {
    width: 100%;
    position: relative;
    margin: 0 auto;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    @include flex-center;

    input {
      display: block;
      appearance: none;
      border: none;
      outline: none;
      background: none;

      &::placeholder {
        color: #aaa;
      }

      &[type='text'] {
        width: 100%;
        color: #aaa;
        background-color: #fff;
        font-size: 20px;
        text-align: left;
        border-radius: 30px;
        padding: 10px 20px;
        margin-bottom: 15px;
        transition: 0.4s;
      }

      &:focus {
        box-shadow: 0 3px 3px rgba($color: #aaa, $alpha: 0.2);
      }
    }

    &__btn {
      position: absolute;
      top: 0;
      right: 0;
      padding: 10px 26px;
      color: #fff;
      max-width: 100px;
      font-size: 20px;
      transition: 0.4s;
      border-radius: 30px;

      &:active,
      :hover,
      :focus {
        color: #000;
      }
    }
  }
}

@keyframes change {
  0% {
    background: url('../assets/images/background.jpeg') center center no-repeat;
  }
  25% {
    background: url('../assets/images/background2.jpeg') center center no-repeat;
  }
  50% {
    background: url('../assets/images/background3.jpeg') center center no-repeat;
  }
  75% {
    background: url('../assets/images/background4.jpeg') center center no-repeat;
  }
  100% {
    background: url('../assets/images/background4.jpeg') center center no-repeat;
  }
}
</style>
