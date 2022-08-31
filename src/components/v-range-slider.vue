<template>
  <div class="range-slider">
    <input
      class="range"
      type="range"
      :min="minRuntime"
      :max="maxRuntime"
      step="5"
      v-model.number="rangeValues.min"
      @change="setRangeSlide"
    />
    <input
      class="range"
      type="range"
      :min="minRuntime"
      :max="maxRuntime"
      step="5"
      v-model.number="rangeValues.max"
      @change="setRangeSlide"
    />
    <div class="range-slider__values">
      <p>{{ rangeValues.min }}</p>
      <p>{{ rangeValues.max }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-range-slider",
  props: {
    minRuntime: {
      type: Number,
      default: 0,
    },
    maxRuntime: {
      type: Number,
      default: 400,
    },
  },
  data() {
    return {
      rangeValues: {
        min: this.minRuntime,
        max: this.maxRuntime,
      },
    };
  },
  methods: {
    setRangeSlide() {
      if (this.rangeValues.min > this.rangeValues.max) {
        let tmp = this.rangeValues.max;
        this.rangeValues.max = this.rangeValues.min;
        this.rangeValues.min = tmp;
      }
      this.$emit("range-changed", this.rangeValues);
    },
  },
};
</script>

<style lang="scss" scoped>
.range-slider {
  width: 100%;
  text-align: center;
  position: relative;
  svg,
  input[type="range"] {
    width: 100%;
    left: 0;
    bottom: 10px;
    position: absolute;
    -webkit-appearance: none;
    height: 2px;
    background: rgba(1, 180, 228, 1);
    border-radius: 20px;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
  }
  input[type="range"]::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: rgba(1, 180, 228, 1);
    cursor: pointer;
    z-index: 100;
  }
  input[type="range"]:active::-webkit-slider-thumb {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
    border: 1px solid #005cbf;
  }
  input::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 50%;
    height: 10px;
    width: 1px;
    background: #aaa;
  }
  &__values {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    top: 20px;
    margin-bottom: 20px;
    p {
      font-weight: 300;
      width: 21px;
      text-align: center;
      font-size: 12px;
      color: #aaa;
      position: relative;
    }
  }
}
</style>
