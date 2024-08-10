<template>
  <DxButton
    :text="text"
    :type="type"
    :icon="icon"
    stylingMode="outlined"
    :hint="hint"
    :use-submit-behavior="isSubmit"
    :width="width"
    :disabled="disabled"
    :class="{ noBorder }"
    :tabIndex="tabIndex"
  />
</template>
<script>
import DxButton from "devextreme-vue/button";
export default {
  name: "BaseButton",
  components: {
    DxButton,
  },
  props: [
    "text",
    "type",
    "icon",
    "hint",
    "isSubmit",
    "width",
    "noBorder",
    "disabled",
    "tabIndex",
    "shortcut",
  ],
  methods: {
    actionOnKeyPress() {
      console.log("rn");
    },
  },
};
</script>

<style scoped>
.dx-button:focus {
  filter: brightness(0.9);
}
.dx-button {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  border: 1px solid #e6e6e6;
  position: relative;
  height: 36px;
  min-width: 80px;
  transition: 0.3s;
}

.dx-button-default {
  background-color: white;
  color: black !important;
}

.dx-button-default:hover {
  color: #1d88fe !important;
  border: 1px solid #1d88fe;
  background-color: white;
}

.dx-button-primary {
  background-color: #007aff;
  color: white !important;
}

.dx-button-primary:hover {
  filter: brightness(1.1);
}

.dx-button-icon {
  border: none;
  padding: 0 16px;
  min-width: unset;
}

.dx-button-action {
  border-radius: 50%;
  background-color: white;
  flex-shrink: 0;
  transition: 0.28s cubic-bezier(0.4, 0, 0.6, 1);
  width: 36px;
  height: 36px;
  min-width: unset;
}

.dx-button-has-icon {
  min-width: unset;
}

.dx-button-action:hover {
  border-color: #1d88fe;
  cursor: pointer;
}

.dx-button-outline {
  border: 1px solid #007aff;
  color: #007aff;
  background-color: #fff;
  font-weight: 700;
}

.dx-button-warning {
  background-color: red;
  color: white;
}

.noBorder {
  border: none;
}

/* :not(.dx-button-warning).dx-state-focused {
  background-color: rgba(0, 122, 255, 0.6);
} */

.dx-button-warning:hover {
  filter: brightness(0.9);
}
</style>
