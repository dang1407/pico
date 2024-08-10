<template>
  <div class="card" :class="`card__${type}`" @click="executeAction">
    <div class="card__content">
      <div class="card__number">{{ total }}</div>
      <div class="card__title">{{ title }}</div>
      <div class="card__subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseCard",
  props: ["type", "total", "title", "subtitle"],
  methods: {
    /**
     * Feature: Hành động khi ấn vào thẻ
     * Author: Lê Minh Quang (20/08/2023)
     */
    executeAction() {
      this.$emit("executeAction");
    },
  },
};
</script>
