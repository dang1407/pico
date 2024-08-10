<template>
  <div
    style="height: 100%; min-height: 0; display: flex; flex-direction: column"
  >
    <FilterContainer />
    <div class="main-content__header">
      <div class="main-content__header--left">
        <div class="main-content__title">
          {{ ACCOUNTING_TEXT.words.TelevisonViewTitle }}
        </div>
      </div>
    </div>
    <BaseTable
      detailRoute="/televison/televison-detail-action"
      detailViewRoute="/televison/televison-detail-view"
      tableName="Televison"
      placeholder="Tìm kiếm theo mã, tên sản phẩm"
      keyExpr="ID"
    />
  </div>
</template>
<script>
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import FilterContainer from "@/components/filter/FilterContainer.vue";
import { TELEVISON_TABLE_HEADERS } from "@/helpers/constants";
export default {
  name: "TelevisonView",
  components: { FilterContainer },

  data() {
    return {
      ACCOUNTING_TEXT,
    };
  },

  mounted() {
    document.title = ACCOUNTING_TEXT.words.TelevisonViewTitle;
    this.$store.dispatch(
      "updateTableHeaders",
      localStorage.getItem("tableHeaders")
        ? JSON.parse(localStorage.getItem("tableHeaders"))
        : TELEVISON_TABLE_HEADERS
    );
  },

  methods: {},
};
</script>
