<template>
  <div
    class="draggable-container"
    :style="{ top: setUpPos.y + 'px', left: setUpPos.x + 'px' }"
    v-click-outside:dx-icon-setup-icon="() => $store.dispatch('closeSetup')"
  >
    <div class="draggable-header">
      <div class="draggable-title">
        {{ ACCOUNTING_TEXT.words.ModifyColumn }}
      </div>
      <BaseTextField
        :placeholder="ACCOUNTING_TEXT.Placeholder.Search"
        type="icon"
        icon="dx-icon dx-icon-search"
        model="searchTerm"
        :debounceTime="500"
        @updateField="updateField"
      />
    </div>
    <div class="draggable-body">
      <draggable
        handle=".draggable-icon"
        v-model="tempHeaders"
        filter=".noDrag"
        :move="checkMove"
      >
        <div
          class="draggable-item"
          group="draggingGroupName"
          :class="{ noDrag: header.isFixed }"
          style="
            display: flex;
            padding: 8px;
            background-color: white;
            align-items: center;
          "
          v-for="header in tempHeaders"
          :key="header.model"
        >
          <DxCheckBox
            :value="header.isDisplayed"
            @value-changed="
              ($event) => checkboxValueChange($event.value, header.model)
            "
          />
          <div style="flex-grow: 1; margin-left: 10px">{{ header.name }}</div>
          <div style="display: flex; align-items: center">
            <div
              v-if="header.isFixed"
              class="unpin__icon"
              style="margin-right: 5px"
            ></div>
            <div class="draggable-icon"></div>
          </div>
        </div>
      </draggable>
    </div>
    <div class="draggable-footer">
      <div @click="getDefaultHeaders">
        <BaseButton type="default" :text="ACCOUNTING_TEXT.words.Default" />
      </div>
      <div @click="updateTableHeaders">
        <BaseButton type="primary" :text="ACCOUNTING_TEXT.words.Save" />
      </div>
    </div>
  </div>
</template>
<script>
import { DxCheckBox } from "devextreme-vue";
import { mapState } from "vuex";
import draggable from "vuedraggable";
import {
  EMPLOYEE_VIEW_HEADERS,
  MANAGEMENT_VIEW_HEADERS,
} from "@/helpers/constants";
import { ACCOUNTING_TEXT } from "@/helpers/resources";

export default {
  name: "DraggableContainer",
  components: { DxCheckBox, draggable },
  computed: {
    ...mapState(["setUpPos", "tableHeaders", "setUpView"]),
  },
  data() {
    return {
      tempHeaders: [],
      keepHeaders: [],
      searchTerm: "",
      ACCOUNTING_TEXT,
    };
  },
  mounted() {
    this.tempHeaders = this.tableHeaders;
    this.keepHeaders = this.tableHeaders;
  },

  watch: {
    /**
     * Feature: Cập nhật khi tìm kiếm
     * @param {*} newVal
     * Author: Lê Minh Quang (20/08/2023)
     */
    searchTerm: function (newVal) {
      if (newVal) {
        this.tempHeaders = this.keepHeaders.filter((item) =>
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.tempHeaders = this.keepHeaders;
      }
    },
  },

  methods: {
    /**
     * Feature: Cập nhật cột
     * Author: Lê Minh Quang (20/08/2023)
     */
    updateTableHeaders() {
      this.$store.dispatch("toggleLoading");
      let newArr = [...this.keepHeaders];
      for (let i = 0; i < this.tempHeaders.length; i++) {
        let index = newArr.findIndex(
          (item) => item.id == this.tempHeaders[i].id
        );
        let temp = newArr[index];
        newArr[index] = newArr[i];
        newArr[i] = temp;
      }
      this.$store.dispatch("updateTableHeaders", newArr);
      this.$store.dispatch("closeSetup");
      this.$store.dispatch("toggleLoading");
    },
    /**
     * Feature: Cập nhật cột mac dijnh
     * Author: Lê Minh Quang (20/08/2023)
     */
    getDefaultHeaders() {
      this.$store.dispatch("toggleLoading");
      this.tempHeaders =
        this.setUpView == "management"
          ? MANAGEMENT_VIEW_HEADERS
          : EMPLOYEE_VIEW_HEADERS;
      this.$store.dispatch(
        "updateTableHeaders",
        this.setUpView == "management"
          ? MANAGEMENT_VIEW_HEADERS
          : EMPLOYEE_VIEW_HEADERS
      );
      this.$store.dispatch("closeSetup");
      this.$store.dispatch("toggleLoading");
    },

    /**
     * Feature: Xử lý khi checkbox thay đổi
     * @param {*} value
     * @param {*} model
     * Author: Lê Minh Quang (20/08/2023)
     */
    checkboxValueChange(value, model) {
      this.tempHeaders = this.tempHeaders.map((item) => {
        if (item.model == model) {
          return { ...item, isDisplayed: value };
        } else {
          return item;
        }
      });
      this.keepHeaders = this.keepHeaders.map((item) => {
        if (item.model == model) {
          return { ...item, isDisplayed: value };
        } else {
          return item;
        }
      });
    },

    /**
     * Feature: Xử lý khi kéo
     * @param {*} e
     * Author: Lê Minh Quang (24/08/2023)
     */

    checkMove(e) {
      if (this.isDraggable(e.draggedContext)) {
        const draggedEl = e.draggedContext.element;
        const toEl = e.relatedContext.element;
        let index1 = this.keepHeaders.findIndex(
          (obj) => obj.id === draggedEl.id
        );
        let index2 = this.keepHeaders.findIndex((obj) => obj.id === toEl.id);
        let newArr = [...this.keepHeaders];
        [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
        this.keepHeaders = newArr;
        return true;
      } else {
        return false;
      }
    },

    /**
     * Feature: Kiểm tra phần tử có kéo được không
     * Author: Lê Minh Quang (24/08/2023)
     */

    isDraggable(context) {
      const { index, futureIndex } = context;
      return !(
        this.tempHeaders[index].isFixed || this.tempHeaders[futureIndex].isFixed
      );
    },

    /**
     * Feature: Cập nhật từ khóa tìm kiếm
     * @param {*} e
     * Author: Lê Minh Quang (24/08/2023)
     */
    updateField(e) {
      this.searchTerm = e.searchTerm;
    },
  },
};
</script>
