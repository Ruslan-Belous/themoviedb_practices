<template>
  <nav :style='{ background }' class='nav-b'>
    <div class='nav-b__menu'>
      <fa
        v-if='!showBMenu'
        key='menu'
        class=''
        icon='fa-solid fa-bars'
        @click='showBMenu = !showBMenu'
      />
      <fa
        v-else
        key='clear'
        class=''
        icon='fa-solid fa-xmark'
        @click='showBMenu = !showBMenu'
      />
    </div>

    <div :class='{ show: showBMenu }' class='nav'>
      <router-link :to="{ name: 'Home' }" class='nav__logo'>
        <figure @click='showBMenu = !showBMenu'>
          <img :src='imgPath' alt='Logo' @click='goHome'/>
        </figure>
      </router-link>
      <div class='nav__list'>
        <ul class='nav__left'>
          <li
            v-for='(item, i) in leftLinks'
            :key='i'
            @click='showBMenu = !showBMenu'
            @mouseenter='
              $event.currentTarget.style.background = hoverBackground
            '
            @mouseleave='$event.currentTarget.style.background = background'
          >
            <router-link :to='{ name: item.routeName }'>
              {{ item.name }}
              <fa v-if='!!item.icon && item.icon.length' :icon='item.icon'/>
            </router-link>
          </li>
        </ul>
        <ul class='nav__right'>
          <li
            v-for='(item, i) in rightLinks'
            :key='i'
            @click='showBMenu = !showBMenu'
            @mouseenter='
              $event.currentTarget.style.background = hoverBackground
            '
            @mouseleave='$event.currentTarget.style.background = background'
          >
            <router-link :to='{ name: item.routeName }'>
              {{ item.name }}
              <span
                v-if="
                  item.routeName === 'Wishlist' && isQuantityWishlistVisible
                "
                class='qunatity-in-wishlist'
              >
                {{ wishlist.length }}
              </span>
              <fa v-if='!!item.icon && item.icon.length' :icon='item.icon'/>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import logo from '../assets/images/logo.svg'

export default {
  name: 'v-nav',
  props: {
    background: {
      type: String,
      default: '#032541'
    },
    hoverBackground: {
      type: String,
      default: '#999'
    },
    imgPath: {
      type: String,
      default: logo
    },
    leftLinks: {
      type: Array,
      default: () => [
        {
          name: 'Movies',
          routeName: 'Movies'
        },
        {
          name: 'TV Shows',
          routeName: ''
        },
        {
          name: 'People',
          routeName: ''
        },
        {
          name: 'More',
          routeName: ''
        }
      ]
    },
    rightLinks: {
      type: Array,
      default: () => [
        {
          text: 'Add smth',
          icon: 'fa-solid fa-plus',
          routeName: ''
        },
        {
          text: 'Choose lang',
          name: 'EN',
          icon: '',
          routeName: ''
        },
        {
          text: 'Wishlist',
          icon: 'fa-solid fa-list',
          routeName: 'Wishlist'
        },
        {
          text: 'Notifications',
          icon: 'fa-solid fa-bell',
          routeName: ''
        },
        {
          text: 'Search',
          icon: 'fa-solid fa-magnifying-glass',
          routeName: ''
        }
      ]
    }
  },
  data() {
    return {
      logo,
      showBMenu: false
    }
  },
  computed: {
    ...mapState({
      wishlist: (state) => state.moviesStore.wishlist
    }),
    isQuantityWishlistVisible() {
      return this.wishlist.length
    }
  },
  methods: {
    ...mapMutations({
      CLEAR_MOVIES_LIST_BY_SEARCH_KEY:
        'moviesStore/CLEAR_MOVIES_LIST_BY_SEARCH_KEY'
    }),
    goHome() {
      this.CLEAR_MOVIES_LIST_BY_SEARCH_KEY()
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/assets/styles/_mixin';
@import '@/assets/styles/_variabless';
.nav-b {
  &__menu {
    display: none;
  }

  .nav {
    width: 100%;
    @include flex-between;
    transition: all 0.3s ease;

    &__logo {
      width: 154px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    &__list {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &__left {
      margin-left: 14px;
    }

    &__left,
    &__right {
      color: #fff;
      list-style: none;
      display: flex;
      gap: 14px;
      align-items: center;

      li {
        font-weight: 700;
        padding: 8px;
        text-align: center;

        a {
          color: #fff;
        }
      }

      li:hover {
        cursor: pointer;
      }
    }

    &__right {
      gap: 30px;

      li {
        font-weight: 700;
        padding: 0.5rem 0.5rem;
        position: relative;
      }

      li:hover {
        cursor: pointer;
      }
    }
  }

  .show {
    display: flex !important;
  }

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }

  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
  }

  .qunatity-in-wishlist {
    position: absolute;
    top: 0px;
    right: -4px;
    width: 18px;
    height: 18px;
    background: $accent-gradient;
    border-radius: 50%;
    font-size: 12px;
    @include flex-center;
    color: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
