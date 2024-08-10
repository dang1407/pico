<template>
  <div class="textfield" :class="{ error: errorText }">
    <label class="textfield__label" :required="required" v-if="label">{{
      label
    }}</label>
    <div class="textfield__content" v-tooltip="tooltip">
      <DxSelectBox
        :search-enabled="true"
        :disabled="disabled"
        :search-mode="'contains'"
        :items="dropdownList"
        :value="defaultValue"
        displayExpr="Name"
        valueExpr="ID"
        :placeholder="placeholder"
        @value-changed="onValueChanged"
        :onFocusIn="handleFocus"
        :onFocusOut="handleFocusOut"
        :noDataText="ACCOUNTING_TEXT.words.NoDataText"
      />
      <div class="error-text" v-if="errorText">{{ errorText }}</div>
    </div>
  </div>
</template>
<script>
import { DxSelectBox } from "devextreme-vue";
import { flattenArray } from "@/helpers/constants";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "BaseDropDown",
  components: {
    DxSelectBox,
  },
  props: [
    "label",
    "placeholder",
    "defaultValue",
    "dropdownList",
    "required",
    "type",
    "model",
    "errorText",
    "disabled",
    "width",
    "tooltip",
  ],
  data() {
    return { isTreeBoxOpened: false, ACCOUNTING_TEXT };
  },
  methods: {
    /**
     * Feature: Thay đổi giá trị
     * Author: Lê Minh Quang (19/06/2023)
     */
    onValueChanged({ value }) {
      this.$emit("updateField", {
        [this.$props.model]: value,
      });
    },
    /**
     * Feature: Chọn option
     * Author: Lê Minh Quang (19/06/2023)
     */
    selectOption(e) {
      this.$emit("updateField", {
        [this.$props.model]: e.itemData.id,
      });
    },
    /**
     * Feature: Làm phẳng array object
     * @param {*} list
     * Author: Lê Minh Quang (19/06/2023)
     */
    flt(list) {
      return flattenArray(list);
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
    /**
     * Feature: Khi ấn vào element trong tree
     * Author: Lê Minh Quang (19/08/2023)
     */
    onTreeItemClick() {
      this.isTreeBoxOpened = false;
    },
    /**
     * Feature: Mo dropdown treeview
     * Author: Lê Minh Quang (19/08/2023)
     */
    openDropDown() {
      this.isTreeBoxOpened = true;
    },
  },
};
</script>
<style scoped>
.dx-state-disabled {
  background-color: #e5e5e5;
  color: #666;
}
.dx-state-focused.dx-editor-outlined {
  border-color: #007aff;
}
</style>
