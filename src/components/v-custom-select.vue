<template>
  <div
    class="select"
    :style="`background: ${background}; border-radius: ${borderRadius}px`"
  >
    <div class="select__title" @click="areOptionsVisible = !areOptionsVisible">
      <p :style="`color: ${titleColor}`">
        {{ selected || options[0].name }}
      </p>
      <fa icon="fa-solid fa-angle-down" class="icon-arrow" />
    </div>
    <div
      class="select__options"
      v-show="areOptionsVisible"
      :style="`border-radius: ${borderRadius}px`"
    >
      <p
        v-for="(option, i) in options"
        :key="i"
        @click="selectOption(option)"
        :style="`color: ${optionsColor}; border-radius: ${borderRadius}px`"
        @mouseenter="$event.currentTarget.style.background = hoverBackground"
        @mouseleave="$event.currentTarget.style.background = background"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-select",
  props: {
    background: {
      type: String,
      default: "#000",
    },
    titleColor: {
      type: String,
      default: "#fff",
    },
    optionsColor: {
      type: String,
      default: "#fff",
    },
    hoverBackground: {
      type: String,
      default: "#aaa",
    },
    borderRadius: {
      type: String,
      default: "0",
    },
    options: {
      type: Array,
      default() {
        return [
          {
            name: "Option 1",
          },
          {
            name: "Option 2",
          },
          {
            name: "Option 3",
          },
        ];
      },
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  },
  beforeDestroy() {
    document.addEventListener("click", this.hideSelect);
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  width: 100%;
  cursor: pointer;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // padding: 8px 16px;
  &__title {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    align-items: center;
    justify-content: space-between;
  }
  svg {
    color: #fff;
  }
  p {
    margin: 0;
  }
  &__options {
    position: absolute;
    top: 31px;
    right: 0;
    width: 100%;
    background: inherit;
    z-index: 1;
    // border-radius: 0 0 6px 6px;
    padding-top: 5px;
    p {
      padding: 8px 16px;
      user-select: none;
    }
    // p:last-of-type {
    //   border-radius: 0 0 6px 6px;
    // }
    // p:last-of-type:hover {
    //   border-radius: 0 0 6px 6px;
    // }
  }
}
</style>
