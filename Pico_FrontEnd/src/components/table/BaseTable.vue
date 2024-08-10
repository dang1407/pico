<template>
  <div class="table" :style="{ minHeight: 0 }">
    <BaseDialog
      :id="1"
      @cancelAction="$store.dispatch('clearDialog')"
      @acceptAction="deleteRecord"
      :cancelText="ACCOUNTING_TEXT.words.Cancel"
      :acceptText="ACCOUNTING_TEXT.words.Yes"
    />
    <BaseDialog
      :id="2"
      @cancelAction="$store.dispatch('clearDialog')"
      @acceptAction="deleteSelectedRows"
      :cancelText="ACCOUNTING_TEXT.words.Cancel"
      :acceptText="ACCOUNTING_TEXT.words.Yes"
    />

    <BaseTableFeatureRow
      :detailRoute="detailRoute"
      :searchDepartment="filterObj?.Department"
      :selectedIds="selectedIds"
      :placeholder="placeholder"
      @deselectAll="deselectAll"
      @showDeleteMultipleDialog="showDeleteMultipleDialog"
      @updateSearch="updateSearch"
      @updateFilter="updateFilter"
      @forceRefresh="forceRefresh"
    />
    <div class="table-content-wrapper">
      <DxDataGrid
        :data-source="dataSource"
        :keyExpr="keyExpr"
        :selected-row-keys="selectedIds"
        :allow-column-resizing="true"
        :hoverStateEnabled="true"
        :showRowLines="true"
        :showColumnLines="false"
        :wordWrapEnabled="true"
        :noDataText="ACCOUNTING_TEXT.words.NoDataText"
        @selection-changed="onSelectionChanged"
        :onCellDblClick="cellDblClick"
        :pager="{ visible: false }"
        class="table__content"
      >
        <DxSelection
          mode="multiple"
          select-all-mode="all"
          :show-check-boxes-mode="'always'"
        />
        <DxColumn
          v-for="(header, index) in displayHeaders"
          :key="index"
          :data-field="header.model"
          :header-cell-template="`${header.model}`"
          :columnAutoWidth="false"
          :width="header.width"
          :allow-column-reordering="true"
          :fixed="header.isFixed"
          :allow-fixing="true"
          :css-class="`${header.model}-cell align-${header.alignment}`"
          :cell-template="`${header.model}-cell`"
        />
        <template
          v-for="header in displayHeaders"
          #[`${header.model}-cell`]="{ data }"
        >
          <div :style="{ textAlignment: header.alignment }" :key="header.model">
            <span>{{
              cellFormat(data.value, header.model, header.FieldType)
            }}</span>
          </div>
        </template>

        <template v-for="(header, index) in displayHeaders" #[header.model]>
          <div
            style="width: 100%"
            :key="header.model"
            :class="{ isFixed: header.isFixed && index == showPinIcon }"
            :style="{ textAlignment: header.alignment }"
            v-tooltip="header.tooltip"
          >
            <div
              :class="`${
                header.isFixed && index == showPinIcon
                  ? 'unpin__icon'
                  : header.isFixed && index < showPinIcon
                  ? ''
                  : 'pin__icon'
              }`"
              @click="() => fixColumn(header.model)"
            ></div>
            <span>{{ header?.name }}</span>
          </div>
        </template>

        <DxColumn
          css-class="action-cell"
          cell-template="action-button-cell"
          :width="0"
        />
        <template #action-button-cell="{ data }">
          <div style="display: flex; justify-content: center; gap: 10px">
            <div @click="cellDblClick(data)">
              <BaseButton
                icon="show-info__icon"
                type="action"
                :hint="ACCOUNTING_TEXT.words.OpenInNewTab"
              />
            </div>

            <div @click="handleEditClick(data)">
              <BaseButton
                icon="row-edit__icon"
                type="action"
                :hint="ACCOUNTING_TEXT.words.Modify"
              />
            </div>
            <div @click="handleDeleteClick(data)">
              <BaseButton
                icon="row-delete__icon"
                type="action"
                :hint="ACCOUNTING_TEXT.words.Delete"
              />
            </div>
          </div>
        </template>
        <DxPager :allowed-page-sizes="[1000]" />
        <DxPaging :page-size="1000" />
      </DxDataGrid>
    </div>

    <div class="table__footer">
      <span v-html="ACCOUNTING_TEXT.words.TotalRecord(totalRecord)"></span>
      <BasePagination
        :pageNumber="pageNumber"
        :pageSize="pageSize"
        :totalPage="totalPage"
        :totalRecord="totalRecord"
        @changeRowsPerPage="changeRowsPerPage"
        @nextPage="nextPage"
        @prevPage="prevPage"
      />
    </div>
  </div>
</template>
<script>
import BaseTableFeatureRow from "@/components/table/BaseTableFeatureRow.vue";
import {
  DxDataGrid,
  DxColumn,
  DxSelection,
  DxPager,
  DxPaging,
} from "devextreme-vue/data-grid";
import BasePagination from "@/components/pagination/BasePagination.vue";
import {
  deleteRecordAsync,
  getPagingRecord,
  deleteManyRecordAsync,
} from "@/helpers/api";
import { cellFormatting, showToast } from "@/helpers/constants";
import { mapState } from "vuex";
import { handleError } from "@/helpers/constants";
import { ACCOUNTING_TEXT } from "@/helpers/resources";

export default {
  name: "EmployeeTable",
  components: {
    BaseTableFeatureRow,
    DxDataGrid,
    DxColumn,
    DxSelection,
    BasePagination,
    DxPager,
    DxPaging,
  },
  computed: {
    ...mapState(["tableHeaders", "filterObj"]),
    displayHeaders: function () {
      return this.tableHeaders?.filter((item) => item.isDisplayed);
    },
    showPinIcon: function () {
      const index = [...this.displayHeaders]
        .reverse()
        .findIndex((item) => item.isFixed);
      var count = this.displayHeaders.length - 1;
      var finalIndex = index >= 0 ? count - index : index;
      return finalIndex;
    },
  },
  props: [
    "detailRoute",
    "tableName",
    "placeholder",
    "keyExpr",
    "detailViewRoute",
  ],
  data() {
    return {
      dataSource: [],
      selectedIds: [],
      pageNumber: 1,
      pageSize: 25,
      totalRecord: 0,
      totalPage: 0,
      searchString: "",
      targetID: "",
      updatedRowIndex: null,
      ACCOUNTING_TEXT,
    };
  },

  mounted() {
    this.refreshTable();
  },

  watch: {
    filterObj: function () {
      this.page = 1;
      this.refreshTable();
    },
    /**
     * Feature: Refresh trang khi thay đổi số dòng trên trang
     * Author: Lê Minh Quang (16/08/2023)
     */
    pageSize: async function () {
      this.refreshTable();
    },
    /**
     * Feature: Refresh trang khi thay đổi trang
     * Author: Lê Minh Quang (16/08/2023)
     */
    pageNumber: async function () {
      this.refreshTable();
    },
    /**
     * Feature: Refresh trang khi thay đổi từ khóa tìm kiếm
     * Author: Lê Minh Quang (16/08/2023)
     */
    searchString: async function () {
      this.pageNumber = 1;
      this.refreshTable();
    },
  },

  methods: {
    /**
     * Feature: Lấy dữ liệu
     * Author: Lê Minh Quang (19/08/2022)
     */
    async refreshTable() {
      try {
        this.$store.dispatch("toggleLoading");
        const res = await getPagingRecord(
          this.tableName,
          this.searchString,
          this.pageSize,
          this.pageNumber,
          this.filterObj
        );
        this.dataSource = res.Data;
        this.totalRecord = res.TotalRecord;
        this.totalPage = Math.ceil(this.totalRecord / this.pageSize);
        this.$store.dispatch("toggleLoading");
      } catch (error) {
        handleError(error);
      }
    },

    /**
     * Feature: Bỏ chọn tất cả
     * Author: Lê Minh Quang (16/08/2023)
     */
    deselectAll() {
      this.selectedIds = [];
    },
    /**
     * Feature: Cập nhật các dòng được chọn
     * Author: Lê Minh Quang (16/08/2023)
     */
    onSelectionChanged({ selectedRowKeys }) {
      this.selectedIds = [...selectedRowKeys];
    },
    /**
     * Feature: Cố định dòng
     * Author: Lê Minh Quang (16/08/2023)
     */
    fixColumn(model) {
      var targetHeader = this.displayHeaders.filter(
        (item) => item.model == model
      )[0];
      var targetIndex = this.displayHeaders.findIndex(
        (item) => item.model == model
      );
      var updated = this.displayHeaders;
      if (!targetHeader.isFixed) {
        updated = updated.map((item, index) => {
          if (item.model == model) {
            return { ...item, isFixed: true };
          }
          if (index < targetIndex) {
            return { ...item, isFixed: true };
          }

          return item;
        });
      } else {
        updated = updated.map((item, index) => {
          if (item.model == model) {
            return { ...item, isFixed: false };
          }
          if (index < targetIndex) {
            return { ...item, isFixed: false };
          }

          return item;
        });
      }
      this.$store.dispatch("updateTableHeaders", updated);
    },
    /**
     * Feature: Dblclick vào dòng
     * @param {*} e : dòng
     * Author: Lê Minh Quang (16/08/2023)
     */
    cellDblClick(e) {
      if (e.data?.[this.keyExpr]) {
        this.$router.push(`${this.detailViewRoute}/${e.data?.[this.keyExpr]}`);
      }
    },
    /**
     * Feature: Custom value cell
     * @param {*} cellInfo - cell object
     * @param {*} model - model
     * Author: Lê Minh Quang (19/08/2023)
     */
    cellFormat(cellInfo, model, type) {
      return cellFormatting(cellInfo, model, type) || cellInfo;
    },
    /**
     * Feature: Thay đổi số dòng trên trang
     * Author: Lê Minh Quang (19/08/2023)
     */
    changeRowsPerPage(value) {
      this.pageSize = value;
    },
    /**
     * Feature: Về trang trước
     * Author: Lê Minh Quang (19/08/2023)
     */
    prevPage() {
      if (this.pageNumber > 1) {
        this.pageNumber--;
      }
    },
    /**
     * Feature: Sang trang sau
     * Author: Lê Minh Quang (19/08/2023)
     */
    nextPage() {
      if (this.pageNumber < this.totalPage) {
        this.pageNumber++;
      }
    },

    /**
     * Feature: Cập nhật giá trị tìm kiếm
     * Author: Lê Minh Quang (19/08/2023)
     */
    updateSearch(value) {
      this.searchString = value;
    },

    /**
     * Feature: Hiển thị xóa nhân viên
     * Author: Lê Minh Quang (19/08/2023)
     */
    showDialog(data) {
      this.$store.dispatch("showDialog", {
        dialogText: ACCOUNTING_TEXT.Warning.DeleteEmployee(
          data.data.ProductName
        ),
        dialogTitle: ACCOUNTING_TEXT.WarningTitle.DeleteEmployee,
        dialogType: "warning",
        dialogID: 1,
      });
      this.targetID = data.key;
    },
    /**
     * Feature: Hiển thị dialog xóa nhiều nhân viên
     * Author: Lê Minh Quang (19/08/2023)
     */
    showDeleteMultipleDialog() {
      this.$store.dispatch("showDialog", {
        dialogText: ACCOUNTING_TEXT.Warning.DeleteManyEmployee(
          this.selectedIds.length``
        ),
        dialogTitle: ACCOUNTING_TEXT.WarningTitle.DeleteEmployee,
        dialogType: "warning",
        dialogID: 2,
      });
    },

    /**
     * Feature: Xóa bản ghi
     * Author: Lê Minh Quang (19/08/2023)
     */
    async deleteRecord() {
      try {
        this.$store.dispatch("clearDialog");
        this.$store.dispatch("toggleLoading");
        await deleteRecordAsync(this.targetID, this.tableName);
        showToast(ACCOUNTING_TEXT.Message.DeleteEmployeeSuccess, "success");
        await this.refreshTable();
        this.$store.dispatch("toggleLoading");
      } catch (error) {
        handleError(error);
      }
    },

    /**
     * Feature: Xóa các bản ghi được chọn
     * Author: Lê Minh Quang (19/08/2023)
     */
    async deleteSelectedRows() {
      try {
        this.$store.dispatch("clearDialog");
        this.$store.dispatch("toggleLoading");
        await deleteManyRecordAsync(this.selectedIds, this.tableName);
        await this.refreshTable();
        showToast(ACCOUNTING_TEXT.Message.DeleteEmployeeSuccess, "success");
        this.$store.dispatch("toggleLoading");
      } catch (error) {
        handleError(error);
      }
    },

    /**
     * Feature: Xử lý khi ấn nút xóa
     * @param {*} data
     * Author: Lê Minh Quang (19/08/2023)
     */

    handleDeleteClick(data) {
      this.showDialog(data);
    },

    /**
     * Feature: Xử lý khi ấn nút edit
     * @param {*} data
     * Author: Lê Minh Quang (19/08/2023)
     */
    handleEditClick(data) {
      if (data.key) {
        const pathRef = this.$router.resolve({
          path: `${this.detailRoute}/${data.key}`,
        });
        window.open(pathRef.href);
      }
    },

    /**
     * Feature: Cập nhật bộ lọc
     * @param {*} value
     * Author: Lê Minh Quang (19/08/2022)
     */

    updateFilter(value) {
      this.$store.dispatch("toggleLoading");
      this.$store.dispatch("updateFilterObj", value);
      this.$store.dispatch("toggleLoading");
    },

    /**
     * Feature: Refresh sau khi xử lý chuyển đổi trạng thái sử dụng
     * Author: Lê Minh Quang (28/08/2023)
     */
    forceRefresh() {
      this.selectedIds = [];
      this.refreshTable();
    },
  },
};
</script>
