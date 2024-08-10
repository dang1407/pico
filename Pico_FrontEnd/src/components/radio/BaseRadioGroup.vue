<template>
  <div class="textfield">
    <label class="textfield__label" :required="required" v-if="label">{{
      label
    }}</label>
    <div class="textfield__content">
      <DxRadioGroup
        v-if="type == 'default'"
        :items="radioList"
        displayExpr="text"
        valueExpr="value"
        :value="defaultValue"
        @valueChanged="onValueChanged"
      />
      <div class="radio--settled" v-if="type == 'settled'">
        <DxRadioGroup
          :items="radioList"
          displayExpr="text"
          valueExpr="value"
          :value="defaultValue"
          :readonly="true"
          :disabled="true"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { DxRadioGroup } from "devextreme-vue";
export default {
  name: "BaseRadioGroup",
  props: ["label", "type", "radioList", "defaultValue", "required", "model"],
  components: { DxRadioGroup },
  data() {
    return { currentValue: null };
  },
  methods: {
    /**
     * Feature: Thay đổi giá trị
     * Author: Lê Minh Quang (19/08/2023)
     */
    onValueChanged({ value }) {
      this.$emit("updateField", { [this.$props.model]: value });
    },
  },
};
</script>
<style scoped></style>
