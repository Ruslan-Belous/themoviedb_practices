<template>
  <div class="wishlist-item">
    <div class="wishlist-item__poster">
      <img
        v-if="!(wishlistItemData.poster_path === null)"
        :src="pathToImg(wishlistItemData.poster_path)"
        alt="Movie poster"
      />
      <img v-else alt="Movie poster" src="@/assets/images/empty.jpeg" />
    </div>
    <div class="wishlist-item__details">
      <p class="title">{{ wishlistItemData.title }}</p>
      <h2>Overview</h2>
      <p>
        {{ wishlistItemData.overview }}
      </p>
    </div>
    <v-button
      :btnTitle="'Delete'"
      :prependBtnIcon="'fa-trash-can'"
      :primary="true"
      class="wishlist-item__btn-delete"
      @click="deleteWishlistItem"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import vButton from "./v-button.vue";

export default {
  components: { vButton },
  name: "v-wishlist-item",
  props: {
    wishlistItemData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapState({
      imageConfigData: (state) => state.configStore.imageConfigData,
    }),
  },
  methods: {
    ...mapMutations({
      DELETE_WISHLIST_ITEM: "moviesStore/DELETE_WISHLIST_ITEM",
    }),
    deleteWishlistItem() {
      this.DELETE_WISHLIST_ITEM(this.wishlistItemData.title);
    },
    pathToImg(imgPath) {
      if (!!this.imageConfigData && !!this.imageConfigData.poster_sizes) {
        return (
          this.imageConfigData.base_url +
          this.imageConfigData.poster_sizes[3] +
          imgPath
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wishlist-item {
  width: 90%;
  position: relative;
  display: flex;
  background-color: #496583;
  margin-bottom: 30px;
  border-radius: 20px;
  border: 1px solid #496583;
  max-height: fit-content;

  &__poster {
    overflow: hidden;
    min-width: 200px;
    max-width: 340px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 20px 0 0 20px;
    }
  }

  &__btn-delete {
    position: absolute;
    bottom: -20px;
    right: 20px;
    border-radius: 20px;
    max-width: 100px;
  }

  &__details {
    margin: 0 auto;
    padding: 20px;
    color: #eee;

    .title {
      font-size: 26px;
      color: #fff;
      text-align: center;
      font-weight: 800;
      margin-bottom: 15px;
    }
  }
}
</style>
