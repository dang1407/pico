<template>
  <div
    style="height: 100%; min-height: 0; display: flex; flex-direction: column"
  >
    <FilterContainer />
    <div class="main-content__header">
      <div class="main-content__header--left">
        <div class="main-content__title">
          {{ ACCOUNTING_TEXT.words.employeeViewTitle }}
        </div>
      </div>
      <div @click="showManagementView">
        <BaseButton
          :text="ACCOUNTING_TEXT.words.manageLicense"
          icon="manage-lisence-icon"
          type="default"
        />
      </div>
    </div>
    <BaseTable view="employee" />
  </div>
</template>
<script>
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import FilterContainer from "@/components/filter/FilterContainer.vue";
import { EMPLOYEE_VIEW_HEADERS } from "@/helpers/constants";
export default {
  name: "EmployeeView",
  components: { FilterContainer },

  data() {
    return {
      ACCOUNTING_TEXT,
    };
  },

  mounted() {
    document.title = ACCOUNTING_TEXT.words.EmployeeViewTitle;
    this.$store.dispatch("updateFilterObj", {
      isUsing: 1,
      Department: null,
      WorkStatus: null,
    });
    this.$store.dispatch("updateSetUpView", "employee");
    this.$store.dispatch(
      "updateTableHeaders",
      localStorage.getItem("tableHeaders")
        ? JSON.parse(localStorage.getItem("tableHeaders"))
        : EMPLOYEE_VIEW_HEADERS
    );
  },

  methods: {
    /**
     * Feature: Sang trang management
     * Author: Lê Minh Quang (16/08/2023)
     */
    showManagementView() {
      this.$router.push("/manage-license");
    },
  },
};
</script>
