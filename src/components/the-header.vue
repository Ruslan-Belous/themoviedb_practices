<template>
  <header class="header">
    <div class="container">
      <v-nav />
    </div>
  </header>
</template>

<script>
import vNav from "./v-nav.vue";

export default {
  components: { vNav },
  name: "the-header",
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_variabless";
.header {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $accent-color;
  padding: 12px 30px;
  .container {
    width: 100%;
  }
}
</style>
