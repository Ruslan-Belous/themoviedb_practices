<template>
  <div id="app">
    <the-header />
    <main>
      <router-view />
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheFooter from "./components/the-footer.vue";
import TheHeader from "./components/the-header.vue";
export default {
  components: { TheHeader, TheFooter },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100%;
  font-family: "Apis", sans-serif;
}
main {
  flex: 1 1 auto;
}
</style>
