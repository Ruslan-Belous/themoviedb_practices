<template>
  <div>
    <div class='movie-card' @click='goToMovieDetail(movieData.id)'>
      <div class='movie-card__detail'>
        <h3 class='movie-card__detail__title'>{{ movieData.title }}</h3>
        <p class='movie-card__detail__year'>{{ movieData.release_date }}</p>
        <p class='movie-card__detail__average'>
          {{ movieData.vote_average * 10 }}<sup>%</sup>
        </p>
        <div class='movie-card__detail__genres'>
          <p v-for='(item, i) in genresByMovie' :key='i'>
            {{ item }}
          </p>
        </div>
      </div>
      <div class='movie-card__poster'>
        <img
          v-if='!(movieData.poster_path === null)'
          :src='pathToImg(movieData.poster_path)'
          alt='Movie poster'
        />
        <img v-else alt='Movie poster' src='@/assets/images/empty.jpeg'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'movie-card',
  props: {
    movieData: {
      type: Object,
      default() {
        return {}
      }
    },
    configImgData: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      genres: state => state.genresStore.genres
    }),
    genresByMovie() {
      return this.genres
        .filter((el) => this.movieData.genre_ids.includes(el.id))
        .map((el) => el.name)
    }
  },
  methods: {
    ...mapActions({
      fetchMovieByMovieId: 'moviesStore/fetchMovieByMovieId'
    }),
    async goToMovieDetail(movieID) {
      await this.fetchMovieByMovieId(movieID)
      await this.$router.push({
        name: 'MovieDetail',
        params: {
          id: movieID
        }
      })
    },
    pathToImg(imgPath) {
      if (!!this.configImgData && !!this.configImgData.poster_sizes) {
        return (
          this.configImgData.base_url +
          this.configImgData.poster_sizes[3] +
          imgPath
        )
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/styles/_mixin';
@import '@/assets/styles/_variabless';

.movie-card {
  width: 310px;
  position: relative;
  height: fit-content;
  @include hover-pointer;

  &__detail {
    background-color: $accent-color;
    padding: 10px 8px;
    height: 139px;
    border-radius: 8px 8px 0 0;
    min-height: 28%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__title {
      color: #fff;
      font-size: 18px;
      font-weight: 600;
    }

    &__year {
      color: #aaa;
      font-size: 14px;
    }

    &__average {
      position: absolute;
      top: -18px;
      right: 20px;
      width: 38px;
      height: 38px;
      @include flex-center;
      background-color: $accent-color;
      color: #fff;
      border-radius: 50%;

      &::before {
        content: '';
        position: absolute;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 1px solid #20d07a;
      }

      sup {
        font-size: 60%;
      }
    }

    &__genres {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin: 5px 0;

      p {
        background: $accent-gradient;
        padding: 2px 8px;
        border-radius: 20px;
        color: #fff;
      }
    }
  }

  &__poster {
    display: block;

    img {
      width: 100%;
      max-height: 340px;
      object-fit: cover;
      border-radius: 0 0 8px 8px;
    }
  }
}
</style>
