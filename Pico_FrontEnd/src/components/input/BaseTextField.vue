<template>
  <div class="textfield" :class="{ error: errorText }">
    <label class="textfield__label" :required="required" v-if="label">{{
      label
    }}</label>
    <div
      class="textfield__content"
      :class="{ 'textfield__content-settled': type == 'settled' }"
      v-tooltip="tooltip"
    >
      <DxTextBox
        v-if="type != 'settled' && type != 'password'"
        :placeholder="placeholder"
        :width="width"
        :disabled="disabled"
        :onInput="onValueChanged"
        :value="defaultValue"
        :onFocusIn="handleFocus"
        :onFocusOut="handleFocusOut"
        :max-length="maxLength"
        :showClearButton="true"
      />

      <div class="textfield--settled" v-if="type == 'settled'">
        {{ defaultValue == null ? "-" : defaultValue }}
      </div>

      <DxTextBox
        v-if="type == 'password'"
        :placeholder="placeholder"
        :width="width"
        :disabled="disabled"
        :onInput="onValueChanged"
        :value="defaultValue"
        :onFocusIn="handleFocus"
        :onFocusOut="handleFocusOut"
        :max-length="maxLength"
        type="password"
        :showClearButton="true"
        mode="password"
      />

      <div class="error-text" v-if="errorText">{{ errorText }}</div>
    </div>
  </div>
</template>
<script>
import { DxTextBox } from "devextreme-vue";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "BaseTextField",
  props: [
    "type",
    "placeholder",
    "icon",
    "width",
    "label",
    "dropdownList",
    "disabled",
    "defaultValue",
    "required",
    "model",
    "errorText",
    "debounceTime",
    "regex",
    "maxLength",
    "tooltip",
  ],
  components: {
    DxTextBox,
  },
  data() {
    return {
      ACCOUNTING_TEXT,
      timeout: null,
    };
  },

  methods: {
    /**
     * Feature: Thay đổi giá trị
     * Author: Lê Minh Quang (19/08/2023)
     */
    onValueChanged(event) {
      if (this.debounceTime) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.$emit("updateField", {
            [this.$props.model]: event.event.currentTarget.value?.trim() || "",
          });
        }, this.debounceTime);
      } else {
        this.$emit("updateField", {
          [this.$props.model]: event.event.currentTarget.value?.trim() || "",
        });
      }
      this.$emit("validateOnInput");
    },

    /**
     * Feature: Xử lý khi focus và ô input
     * Author: Lê Minh Quang (19/08/2023)
     */
    handleFocus() {
      this.$emit("clearErrorText", this.$props.model);
    },
    /**
     * Feature: Xử lý khi focus ra ngoài ô input
     * Author: Lê Minh Quang (19/08/2023)
     */
    handleFocusOut() {
      this.$emit("validateModel", this.$props.model);
    },
  },
};
</script>

<style scoped>
.dx-state-hover {
  border-color: #007aff !important;
}

.textbox-with-icon:hover {
  border-color: #007aff !important;
}

.field-with-info {
  display: flex;
  gap: 10px;
}

.field-with-info > .dx-textbox {
  flex-grow: 1;
}

.dx-state-disabled {
  background-color: #e5e5e5;
  color: #666;
}

.error-text {
  color: #e61d1d;
  margin-top: 8px;
  text-align: left;
}

.textfield.error .textfield__content .dx-texteditor.dx-editor-outlined {
  border-color: #e61d1d;
}

.textfield.error .dx-state-hover {
  border-color: #ec1616 !important;
}

.dx-state-focused.dx-editor-outlined {
  border-color: #007aff;
}
</style>
