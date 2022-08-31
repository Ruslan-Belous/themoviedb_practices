<template>
  <div class='wishlist'>
    <v-wishlist-item
      v-for='item in chosenWishlistItems'
      :key='item.id'
      :wishlist-item-data='item'
    >
      {{ item.title }}
    </v-wishlist-item>
    <p v-if='!wishlist.length' class='wishlist__empty'>
      There are no chosen items...
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VWishlistItem from '../components/v-wishlist-item.vue'

export default {
  components: {VWishlistItem},
  name: 'wishlist',
  computed: {
    ...mapState({
      wishlist: state => state.moviesStore.wishlist
    }),
    chosenWishlistItems() {
      return this.wishlist.filter((item) => item.title)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/styles/_mixin';
@import '@/assets/styles/_variabless';

.wishlist {
  @include flex-center;
  flex-direction: column;
  padding: 30px 10px;
  height: 100%;

  &__logo {
    padding-right: 5px;
    width: 30px;
    height: 20px;
    color: #fff;
  }

  &__empty {
    margin: 50px;
    text-align: center;
    color: $accent-color;
  }
}
</style>
<style lang='scss'>
@media (max-width: 767px) {
  #app .wishlist-item {
    flex-direction: column;
    align-items: center;

    &__poster {
      min-width: 220px;
      max-height: 340px;
      margin-top: 10px;

      img {
        border-radius: 0;
        object-fit: contain;
      }
    }
  }
}
</style>
