<template>
  <section class='popular-section-container'>
    <div v-if='title.length' class='popular-section-container__headline'>
      <h3>{{ title }}</h3>
    </div>
    <div class='popular-section-container__list'>
      <v-movie-card
        v-for='movie in moviesList'
        :key='movie.id'
        :config-img-data='imageConfigData'
        :movie-data='movie'
      />
      <custom-paginate
        :click-handler='changePaginationPage'
        :container-class="'pagination'"
        :hide-prev-next='true'
        :margin-pages='2'
        :page-class="'page-item'"
        :page-count='totalPagesLength'
        :page-range='3'
        class='popular-section-container__pagination'
        next-link-class='paginate-link'
        next-text='Next'
        prev-link-class='paginate-link'
        prev-text='Prev'
      >
      </custom-paginate>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import vMovieCard from './v-movie-card.vue'

export default {
  components: {vMovieCard},
  name: 'movie-list',
  props: {
    title: {
      type: String,
      default: ''
    },
    moviesList: {
      type: Array,
      default: null
    },
    totalPagesLength: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      configImgData: {},
      // currentPage: 3,
      totalPages: 10
    }
  },
  async mounted() {
    await this.fetchConfigData()
  },
  computed: {
    ...mapState({
      imageConfigData: state => state.configStore.imageConfigData
    })
  },
  methods: {
    ...mapActions('configStore', ['fetchConfigData']),
    changePaginationPage(currentPage) {
      this.$emit('click', currentPage)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/styles/_variabless';
@import '@/assets/styles/_mixin';

.popular-section-container {
  width: 90%;
  margin: 0 auto;
  justify-content: center;

  &__headline {
    @include flex-center;
    padding: 30px 40px 20px;
    color: $accent-color;
    font-size: 26px;
    font-weight: 700;

    h3 {
      border-bottom: 1px solid #032541;
      width: 100%;
      text-align: center;
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    width: 100%;
    margin: 0 auto;
    padding: 30px 0;
  }

  &__pagination {
    @include flex-center;
    gap: 15px;
    width: 100%;

    &:deep(.page-item) {
      background-color: $accent-color;
      color: #fff;
      border-radius: 10px;
      @include transition;
      cursor: pointer;

      a {
        color: #fff;
        padding: 2px 10px;
        @include flex-center;
      }

      // &:deep(.active) {
      //   background: linear-gradient(
      //     to right,
      //     rgba(30, 213, 169, 1) 0%,
      //     rgba(1, 180, 228, 1) 100%
      //   );
      //   a {
      //     color: $accent-color;
      //   }
      // }
    }

    &:deep(.paginate-link) {
      color: $accent-color;
    }

    &:deep(.page-item:hover) {
      background: linear-gradient(
          to right,
          rgba(1, 180, 228, 1) 0%,
          rgba(30, 213, 169, 1) 100%
      );
    }

    &:deep(.active) {
      background: linear-gradient(
          to right,
          rgba(30, 213, 169, 1) 0%,
          rgba(1, 180, 228, 1) 100%
      );

      a {
        color: $accent-color;
      }
    }

    &:deep(.disabled) {
      pointer-events: none;
    }
  }
}

// .active {
//   background: linear-gradient(
//     to right,
//     rgba(30, 213, 169, 1) 0%,
//     rgba(1, 180, 228, 1) 100%
//   );
//   a {
//     color: $accent-color;
//   }
// }
</style>
