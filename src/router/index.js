import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MovieDetailPage from '../views/MovieDetailPage.vue'
import WishlistPage from '../views/WishlistPage.vue'
import MoviesPage from '../views/MoviesPage.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: MovieDetailPage
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: WishlistPage
  },
  {
    path: '/movies',
    name: 'Movies',
    component: MoviesPage
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
