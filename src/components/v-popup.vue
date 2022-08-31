<template>
  <div class="popup-wrapper" ref="popup-overlay">
    <div class="popup" :style="`background: ${popupBackground}`">
      <div class="popup__header">
        <span class="popup__title">{{ popupTitle }}</span>
        <fa class="popup__close-btn" icon="fa-xmark" @click="closePopup" />
      </div>
      <div class="popup__content">
        <slot></slot>
      </div>
      <div class="popup__footer">
        <button class="popup__right-btn" @click="rightBtnAction">
          {{ rightBtnTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-popup",
  props: {
    rightBtnTitle: {
      type: String,
      default: "Ok",
    },
    popupTitle: {
      type: String,
      default: "Popup name",
    },
    popupBackground: {
      type: String,
      default: "fff",
    },
  },
  methods: {
    closePopup() {
      this.$emit("close-popup");
    },
    rightBtnAction() {
      this.$emit("right-btn-action");
    },
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function (item) {
      if (item.target === vm.$refs["popup-overlay"]) {
        vm.closePopup();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.popup-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(101, 101, 101, 0.75);
  z-index: 999;
}
.popup {
  width: 360px;
  padding: 16px;
  box-shadow: 0 0 17px 0 #2c3d4e;
  background-color: #fff;
  &__title {
    font-size: 20px;
    font-weight: 900;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  &__footer {
    display: flex;
    justify-content: right;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__close-btn {
    font-size: 20px;
    transition: 0.2s;
    color: tomato;
  }
  &__close-btn:hover {
    color: red;
    cursor: pointer;
  }
  &__right-btn {
    background: linear-gradient(
      to right,
      rgba(30, 213, 169, 1) 0%,
      rgba(1, 180, 228, 1) 100%
    );
    padding: 12px;
    color: #fff;
    border-radius: 20px;
    cursor: pointer;
  }
}
</style>
