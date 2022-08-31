<template>
  <button class="btn" @click="btnAction" :class="className">
    <fa :icon="prependBtnIcon" v-if="prependBtnIcon" class="btn__icon" />
    {{ btnTitle }}
    <fa :icon="appendBtnIcon" v-if="appendBtnIcon" class="btn__icon" />
  </button>
</template>

<script>
export default {
  name: "custom-btn",
  props: {
    btnTitle: {
      type: String,
      default: "press",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    secondary: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    appendBtnIcon: {
      type: String,
      default: "",
    },
    prependBtnIcon: {
      type: String,
      default: "",
    },
  },
  computed: {
    className() {
      return {
        btn__disabled: this.disabled,
        btn__primary: this.primary,
        btn__secondary: this.secondary,
      };
    },
  },
  methods: {
    btnAction() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss">
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-weight: 700;
  color: #fff;
  background: lightcoral;
  padding: 10px 15px;
  border-radius: 10px;
  transition: 0.4s;
  cursor: pointer;
  &__primary {
    background: linear-gradient(
      to right,
      rgba(30, 213, 169, 1) 0%,
      rgba(1, 180, 228, 1) 100%
    );
    &:hover {
      color: #000;
    }
  }
  &__secondary {
    background: #496583;
  }
  &__disabled {
    pointer-events: none;
    background: #cccccc !important;
    color: #666666;
    cursor: not-allowed;
  }
  &__disabled:hover {
    color: #666666 !important;
  }
  &__icon {
    margin: 0 8px;
    font-size: 16px;
  }
}
</style>
