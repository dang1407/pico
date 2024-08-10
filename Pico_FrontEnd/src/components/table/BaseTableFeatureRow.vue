<template>
  <div class="table__feature-row">
    <div class="table__feature-row--left">
      <div style="display: flex; gap: 8px" v-if="selectedIds.length == 0">
        <BaseTextField
          :placeholder="placeholder"
          :width="280"
          type="icon"
          icon="search-icon"
          model="search"
          @updateField="updateSearch"
          :debounceTime="500"
          :tooltip="placeholder"
        />
        <!-- <div @click="vueExportExcel">
          <BaseButton
            :text="ACCOUNTING_TEXT.words.export"
            icon="export-icon"
            type="default"
          />
        </div> -->
      </div>

      <div v-if="selectedIds.length != 0" style="display: flex; gap: 10px">
        <div style="display: flex; align-items: center; gap: 10px">
          <span
            >Đã chọn <b>{{ selectedIds.length }}</b></span
          >
          <div>|</div>
          <span style="color: red; cursor: pointer" @click="deselectAll"
            >Bỏ chọn</span
          >
        </div>
        <!-- <div @click="vueExportExcel">
          <BaseButton
            :text="ACCOUNTING_TEXT.words.export"
            icon="export-icon"
            type="default"
          />
        </div> -->
        <div @click="deleteSelectedRows">
          <BaseButton
            type="default"
            icon="row-delete__icon"
            :text="ACCOUNTING_TEXT.words.Delete"
          />
        </div>
      </div>
    </div>
    <div class="table__feature-row--right">
      <div class="btn__group">
        <div @click="$router.push(detailRoute)">
          <BaseButton
            icon="add__icon"
            type="primary"
            :text="ACCOUNTING_TEXT.words.addNew"
          />
        </div>
        <DxDropDownButton
          width="40"
          icon="chevrondown"
          :items="[{ id: 1, text: ACCOUNTING_TEXT.words.Import }]"
          :drop-down-options="{
            width: 150,
            left: 1,
          }"
          :showArrowIcon="false"
        />
      </div>
      <!-- <div @click="openFilterContainer">
        <BaseButton icon="filter-icon" type="default" :width="40" />
      </div> -->
      <div
        class="setup_btn"
        @click="(event) => $store.dispatch('toggleShowingSetup', event)"
      >
        <BaseButton
          icon="setup-icon"
          type="default"
          :width="40"
          :hint="ACCOUNTING_TEXT.words.ModifyColumn"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { DxDropDownButton } from "devextreme-vue";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import { DEPARTMENTS, handleError, cellFormatting } from "@/helpers/constants";
import { exportExcel } from "@/helpers/api";
import { mapState } from "vuex";

export default {
  name: "BaseTableFeatureRow",
  components: { DxDropDownButton },
  props: ["searchDepartment", "selectedIds", "detailRoute", "placeholder"],
  computed: {
    ...mapState(["filterObj", "setUpView"]),
  },
  data() {
    return {
      ACCOUNTING_TEXT,
      DEPARTMENTS,
    };
  },

  methods: {
    /**
     * Feature: Format dữ liệu
     * @param {*} value
     * @param {*} model
     * Author: Lê Minh Quang (19/08/2023)
     */
    vueDataFormatting(value, model) {
      return cellFormatting(value, model);
    },

    /**
     * Feature: Export excel
     * Author: Lê Minh  Quang (19/08/2023)
     */
    async vueExportExcel() {
      try {
        this.$store.dispatch("toggleLoading");
        await exportExcel("", this.filterObj);
        this.$store.dispatch("toggleLoading");
      } catch (error) {
        handleError(error);
      }
    },
    /**
     * Feature: Bỏ chọn tất cả
     * Author: Lê Minh  Quang (19/08/2023)
     */
    deselectAll() {
      this.$emit("deselectAll");
    },
    /**
     * Feature: Mở container lọc
     * Author: Lê Minh Quang (19/08/2023)
     */
    openFilterContainer() {
      this.$store.dispatch("toggleFilterContainer");
    },
    /**
     * Feature: Cập nhật giá trị tìm kiếm
     * @param {*} value - giá trị mới
     * Author: Lê Minh Quang (19/08/2023)
     */
    updateSearch(value) {
      this.$emit("updateSearch", value.search);
    },

    /**
     * Feature: Hiển thị dialog xóa nhiều
     * @param {*} value - giá trị mới
     * Author: Lê Minh Quang (19/08/2023)
     */
    deleteSelectedRows() {
      this.$emit("showDeleteMultipleDialog");
    },

    /**
     * Feature: Cập nhật lọc theo phòng ban
     * @param {*} value
     * Author: Lê Minh Quang (19/08/2023)
     */
    updateDepartmentSearch(value) {
      if (this.filterObj.Department == value.Department) {
        this.$emit("updateFilter", { Department: null });
      } else {
        this.$emit("updateFilter", value);
      }
    },
  },
};
</script>
