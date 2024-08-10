<template>
  <div class="textfield" :class="{ error: errorText }">
    <label class="textfield__label" :required="required" v-if="label">{{
      label
    }}</label>
    <div class="textfield__content">
      <DxDateBox
        placeholder="__/__/____"
        pickerType="calendar"
        :displayFormat="displayFormat || 'dd/MM/yyyy'"
        :calendarOptions="calendarOptions"
        @value-changed="onValueChanged"
        :onFocusIn="handleFocus"
        :onFocusOut="handleFocusOut"
        :value="defaultValue"
        :showClearButton="true"
        :max="max"
        :min="min"
      />
      <div class="error-text" v-if="errorText">{{ errorText }}</div>
    </div>
  </div>
</template>
<script>
import { DxDateBox } from "devextreme-vue";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import { locale } from "devextreme/localization";
import { formatDate } from "devextreme/localization";

export default {
  name: "BaseDatePicker",
  components: { DxDateBox },
  props: [
    "label",
    "required",
    "model",
    "defaultValue",
    "errorText",
    "max",
    "min",
    "zoomLevel",
    "displayFormat",
  ],
  data() {
    return {
      calendarOptions: {
        firstDayOfWeek: 1,
        zoomLevel: this.$props.zoomLevel,
        maxZoomLevel: this.$props.zoomLevel,
      },
      ACCOUNTING_TEXT,
    };
  },
  created() {
    locale("vi");
  },
  methods: {
    /**
     * Feature: Thay đổi giá trị
     * @param {*} param
     * Author: Lê Minh Quang (28/08/2023)
     */
    onValueChanged({ value }) {
      this.$emit("updateField", {
        [this.$props.model]: formatDate(new Date(value), "yyyy-MM-dd"),
      });
    },
    /**
     * Feature: Xử lý khi focus vào ô input
     * Author: Lê Minh Quang (28/08/2023)
     */
    handleFocus() {
      this.$emit("clearErrorText", this.$props.model);
    },

    /**
     * Feature: Xử lý khi focus ra ngoài
     * Author: Lê Minh Quang (28/08/2023)
     */
    handleFocusOut() {
      this.$emit("validateModel", this.$props.model);
    },
  },
};
</script>

<style scoped>
.custom-disabled-date {
  color: red; /* Customize the appearance of disabled dates */
}
.error-text {
  color: #e61d1d;
  margin-top: 8px;
}
.dx-state-focused.dx-editor-outlined {
  border-color: #007aff !important;
}
</style>
