<template>
  <div class="genres">
    <div
      @click="selectGenre(genre.id)"
      class="genres__item"
      v-for="(genre, i) in genres"
      :key="i"
      :class="{ selected: genre.isSelected }"
    >
      {{ genre.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "genres-list-for-sort",
  props: {
    genres: {
      type: Array,
      default: () => [
        {
          id: 28,
          name: "Action",
          isSelected: false,
        },
      ],
    },
  },
  methods: {
    selectGenre(genreId) {
      this.$emit("click", genreId);
    },
  },
};
</script>

<style lang="scss" scoped>
.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 7px 9px;
  margin: 5px 0;
  &__item {
    border: 1px solid #9e9e9e;
    border-radius: 14px;
    padding: 4px 12px;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    transition: 0.2s;
  }
  &__item:hover,
  .selected {
    background: rgba(1, 180, 228, $alpha: 1);
    border-color: rgba(1, 180, 228, $alpha: 1);
    color: #fff;
  }
}
</style>
