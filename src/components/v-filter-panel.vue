<template>
  <div class="filter-panel">
    <div class="name" @click="showTab = !showTab">
      <h3>{{ filterTitle }}</h3>
      <fa
        icon="fa-solid fa-angle-right"
        class="icon-arrow"
        :class="{ rotate: showTab }"
      />
    </div>
    <div class="filter" v-if="showTab">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-panel",
  props: {
    filterTitle: {
      type: String,
      default: "Filter title",
    },
  },
  data() {
    return {
      showTab: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/_mixin";
@import "@/assets/styles/_variabless";
.filter-panel {
  min-width: 270px;
  width: 100%;
  border: 1px solid #e3e3e3;
  border-radius: 20px;
  .name {
    @include flex-between;
    padding: 14px 16px;
    cursor: pointer;
    .icon-arrow {
      height: 22px;
      width: 22px;
      transition: all 0.2s ease-out;
    }
    .rotate {
      transform: rotate(90deg);
      transition: all 0.2s ease-out;
    }
  }
  .filter {
    width: 100%;
    border-top: 1px solid #eee;
    padding: 14px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
}
</style>
