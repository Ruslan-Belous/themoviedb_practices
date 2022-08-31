<template>
  <div class="movie-detail-page-wrapp">
    <v-loader v-if="isLoading" class="movie-detail-page__loader" />
    <div v-else class="movie-detail-page">
      <section
        :style="` background: url(${pathToBG(
          movieDataById.backdrop_path
        )}) center center no-repeat; background-size: cover; height: 100%;`"
      >
        <div class="movie-detail-page__single_column">
          <div class="movie-detail-page__poster" @click="openPopupInfo">
            <img
              v-if="!(movieDataById.poster_path === null)"
              :src="pathToImg(movieDataById.poster_path)"
              alt="Movie poster"
            />
            <img v-else alt="Movie poster" src="@/assets/images/empty.jpeg" />
            <div class="zoom">
              <span class="zoom__more">
                <fa icon="fa-up-right-and-down-left-from-center" /> More details
              </span>
            </div>
          </div>
          <div class="right-side">
            <div class="right-side-column">
              <div>
                <h2 class="right-side-column__title">
                  {{ movieDataById.title }}
                </h2>
                <div class="statistics">
                  <div class="statistics__raiting-wrapp">
                    <p class="statistics__raiting-wrapp__rating">
                      {{ (movieDataById.vote_average * 10).toFixed()
                      }}<sup>%</sup>
                    </p>
                    <p class="statistics__raiting-wrapp__label">
                      User<br />Score
                    </p>
                  </div>
                  <p
                    v-for="(item, i) in genres"
                    :key="i"
                    class="statistics__genres"
                  >
                    {{ item }}
                  </p>
                </div>
                <div class="right-side__details">
                  <p>
                    <strong>Country:</strong>
                    {{ movieDataById.production_countries[0].name }}
                  </p>
                  <p>
                    <strong>Released:</strong>
                    {{ movieDataById.release_date }}
                  </p>
                  <p v-if="movieDataById.runtime">
                    <strong>Runtime:</strong>
                    {{ movieDataById.runtime | getTimeFromMins }}
                  </p>
                  <p v-if="movieDataById.budget">
                    <strong>Revenue:</strong>
                    $ {{ movieDataById.revenue | formattedNumber }}
                  </p>
                  <p v-if="movieDataById.budget">
                    <strong>Budget:</strong>
                    $ {{ movieDataById.budget | formattedNumber }}
                  </p>
                  <v-button
                    :appendBtnIcon="'fa-list'"
                    :btnTitle="'Add to wishlist'"
                    :primary="true"
                    class="movie-detail-page__btn-add"
                    @click="addToWishList"
                  />
                </div>
              </div>
              <div
                v-if="movieDataById.runtime"
                class="right-side-column__desciption"
              >
                <h3>Overview</h3>
                <p>
                  {{ movieDataById.overview }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <v-popup
        v-if="isPopupIsnfoVisible"
        :popup-title="movieDataById.title"
        right-btn-title="Add to wishlist"
        @close-popup="closeInfoPopup"
        @right-btn-action="addToWishList"
      >
        <div class="right-side__details">
          <p>
            <strong>Country:</strong>
            {{ movieDataById.production_countries[0].name }}
          </p>
          <p>
            <strong>Released:</strong>
            {{ movieDataById.release_date }}
          </p>
          <p>
            <strong>Runtime:</strong>
            {{ movieDataById.runtime | getTimeFromMins }}
          </p>
          <p>
            <strong>Revenue:</strong>
            $ {{ movieDataById.revenue | formattedNumber }}
          </p>
          <p>
            <strong>Budget:</strong>
            $ {{ movieDataById.budget | formattedNumber }}
          </p>
        </div>
      </v-popup>
      <v-push-notification
        :background="'#032541'"
        :messages="notificationsMessages"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import VLoader from "../components/v-loader.vue";
import vPopup from "../components/v-popup.vue";
import getTimeFromMins from "../utils/getTimeFromMins";
import formattedNumber from "../utils/formattedNumber";
import VButton from "../components/v-button.vue";
import VPushNotification from "../components/notifications/v-push-notification.vue";

export default {
  components: { vPopup, VLoader, VButton, VPushNotification },
  name: "movie-detail-page",
  data() {
    return {
      configImgData: {},
      isPopupIsnfoVisible: false,
      isLoading: true,
      genres: [],
      notificationsMessages: [],
    };
  },
  filters: {
    getTimeFromMins,
    formattedNumber,
  },
  async mounted() {

    await this.fetchConfigData();
    this.configImgData = this.imageConfigData;
    this.isLoading = false;
    await this.fetchGenres();
    return (this.genres = this.movieDataById.genres.map((el) => el.name));
  },
  computed: {
    ...mapState({
      imageConfigData: (state) => state.configStore.imageConfigData,
      movieDataById: (state) => state.moviesStore.movieDataById,
    }),
  },
  methods: {
    ...mapActions({
      fetchGenres: "genresStore/fetchGenres",
      fetchConfigData: "configStore/fetchConfigData",
    }),
    ...mapMutations({
      SET_WISHLIST: "moviesStore/SET_WISHLIST",
    }),
    openPopupInfo() {
      this.isPopupIsnfoVisible = true;
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
    },
    closeInfoPopup() {
      this.isPopupIsnfoVisible = false;
      document.body.style.position = "";
      document.body.style.overflow = "";
    },
    addToWishList() {
      this.SET_WISHLIST(this.movieDataById);
      // localStorage.setItem("test", JSON.stringify(this.movieDataById));
      const addNotification = () => {
        let isThereCurrentTitle = this.notificationsMessages.some(
          (el) => el.id === this.movieDataById.title
        );
        if (!isThereCurrentTitle) {
          this.notificationsMessages.unshift({
            id: this.movieDataById.title,
            name: "Item has been added",
          });
        }
      };
      addNotification();
      this.closeInfoPopup();
    },
    pathToImg(imgPath) {
      if (!!this.configImgData && !!this.configImgData.poster_sizes) {
        return (
          this.configImgData.base_url +
          this.configImgData.poster_sizes[3] +
          imgPath
        );
      }
    },
    pathToBG(imgPath) {
      if (!!this.configImgData && !!this.configImgData.profile_sizes) {
        return (
          this.configImgData.base_url +
          this.configImgData.profile_sizes[2] +
          imgPath
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin";
@import "@/assets/styles/_variabless";

.movie-detail-page-wrapp {
  height: 100%;

  .movie-detail-page {
    height: 100%;

    &__loader {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &__single_column {
      padding: 30px 40px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      background-image: linear-gradient(
        to right,
        rgba(73.5, 52.5, 115.5, 1) 150px,
        rgba(73.5, 52.5, 115.5, 0.84) 100%
      );
    }

    &__poster {
      position: relative;
      min-width: 220px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }

    .right-side {
      width: 80%;

      .right-side-column {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        align-content: center;
        padding-left: 40px;

        &__title {
          color: #fff;
          font-size: 40px;
        }

        &__desciption {
          color: #aaa;

          p {
            color: #fff;
          }
        }

        .statistics {
          display: flex;
          align-content: center;
          margin: 10px 0;
          flex-wrap: wrap;
          gap: 15px;

          &__raiting-wrapp {
            @include flex-center;

            &__rating {
              width: 60px;
              height: 60px;
              @include flex-center;
              background-color: $accent-color;
              color: #fff;
              font-size: 26px;
              border-radius: 50%;

              &::before {
                content: "";
                position: absolute;
                width: 54px;
                height: 54px;
                border-radius: 50%;
                border: 2px solid #20d07a;
              }

              sup {
                font-size: 60%;
              }
            }

            &__label {
              color: #fff;
              margin-left: 5px;
              font-weight: 600;
            }
          }

          &__genres {
            height: fit-content;
            @include flex-center;
            background: rgba($color: #05b3e2, $alpha: 0.7);
            padding: 6px 12px;
            border-radius: 20px;
            color: #fff;
            align-self: center;
            text-align: center;
          }
        }
      }

      &__details {
        margin: 10px 0;

        p {
          color: #fff;

          strong {
            color: #aaa;
          }
        }
      }
    }

    :deep(.popup) {
      p {
        color: #032541;
      }
    }

    &__btn-add {
      max-width: 300px;
      margin: 8px auto;
    }
  }
}

.zoom {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  opacity: 0;
  transition: 0.25s ease;
  backdrop-filter: blur(10px);
  border-top: 32px solid rgba(0, 0, 0, 0.99);
  border-bottom: 32px solid rgba(0, 0, 0, 0.99);

  &:hover {
    opacity: 1;
    cursor: pointer;
    color: #fff;
  }
}
</style>

<style lang="scss">
@media (max-width: 767px) {
  .movie-detail-page {
    &__single_column {
      flex-direction: column;
      align-items: center;

      .right-side-column {
        &__title {
          text-align: center;
        }
      }
    }

    &__poster {
      max-height: 500px;
      max-width: 340px;
    }
  }
}
</style>
