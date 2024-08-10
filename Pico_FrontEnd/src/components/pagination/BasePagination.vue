<template>
  <div class="pagination">
    <div class="pagination__rowsPerPage">
      <span>Số bản ghi/trang</span>
      <DxSelectBox
        class="pagination__select-box"
        :data-source="PAGING_OPTIONS"
        value-expr="value"
        display-expr="text"
        width="100px"
        :value="currentPaging"
        drop-down-button-template="imageIcon"
        @value-changed="changeRowsPerPage"
      >
        <template #imageIcon="{}">
          <div style="height: 100%; display: flex; align-items: center">
            <div class="exp__icon"></div>
          </div>
        </template>
      </DxSelectBox>
    </div>
    <div class="pagination__current-records">
      <b>
        {{ totalRecord == 0 ? 0 : (pageNumber - 1) * pageSize + 1 }} -
        {{ pageNumber < totalPage ? pageNumber * pageSize : totalRecord }}
      </b>
      bản ghi
    </div>
    <div class="pagination__navigation">
      <div
        role="button"
        class="nav-prev"
        :class="{ deactive: pageNumber <= 1 }"
        @click="prevPage"
      >
        <BaseButton icon="arrow-back" type="icon" />
      </div>
      <div
        role="button"
        class="nav-next"
        :class="{ deactive: pageNumber >= totalPage }"
        @click="nextPage"
      >
        <BaseButton icon="arrow-next" type="icon" />
      </div>
    </div>
  </div>
</template>
<script>
import { DxSelectBox } from "devextreme-vue";
import { PAGING_OPTIONS } from "@/helpers/constants";
export default {
  name: "BasePagination",
  components: { DxSelectBox },
  props: ["pageSize", "pageNumber", "totalPage", "totalRecord"],
  data() {
    return {
      PAGING_OPTIONS,
      currentPaging: PAGING_OPTIONS[0].value,
    };
  },
  methods: {
    /**
     * Feature: Thay đổi số dòng trên trang
     * Author: Lê Minh Quang (19/08/2023)
     */
    changeRowsPerPage(option) {
      this.$emit("changeRowsPerPage", option.value);
    },
    /**
     * Feature: Quay về trang trước
     * Author: Lê Minh Quang (19/08/2023)
     */
    prevPage() {
      this.$emit("prevPage");
    },
    /**
     * Feature: Sang trang trước
     * Author: Lê Minh Quang (19/08/2023)
     */
    nextPage() {
      this.$emit("nextPage");
    },
  },
};
</script>
