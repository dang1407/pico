<template>
  <div
    style="height: 100%; min-height: 0; display: flex; flex-direction: column"
  >
    <div class="main-content__header">
      <div class="main-content__header--left">
        <div @click="$router.replace('/employee')">
          <BaseButton icon="goback-icon" type="icon" />
        </div>
        <div class="main-content__title">
          {{ ACCOUNTING_TEXT.words.EmployeeInformation }}
        </div>
      </div>
      <div class="main-content__header--right">
        <div @click="showDialog">
          <BaseButton icon="row-delete__icon" type="default" text="Xóa" />
        </div>
        <div @click="goToEdit()">
          <BaseButton
            icon="row-edit__icon-white"
            type="primary"
            :text="ACCOUNTING_TEXT.words.Modify"
          />
        </div>
      </div>
    </div>
    <EmployeeInfoForm :employeeInfo="employeeInfo" :familyInfo="familyInfo" />
    <BaseDialog
      :id="3"
      @cancelAction="$store.dispatch('clearDialog')"
      @acceptAction="deleteEmployee"
      :cancelText="ACCOUNTING_TEXT.words.Cancel"
      :acceptText="ACCOUNTING_TEXT.words.Accept"
    />
  </div>
</template>
<script>
import EmployeeInfoForm from "@/views/employee/detail/EmployeeInfoForm.vue";
import { getEmployeeByID, deleteEmployeeAsync } from "@/helpers/api";
import { handleError, showToast } from "@/helpers/constants";
import { mapState } from "vuex";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "EmployeeInfoView",
  components: { EmployeeInfoForm },
  computed: {
    ...mapState(["tableHeaders", "familyInformations", "filterObj"]),
  },
  data() {
    return {
      employeeInfo: {},
      familyInfo: [],
      ACCOUNTING_TEXT,
    };
  },
  async mounted() {
    document.title = ACCOUNTING_TEXT.words.EmployeeViewTitle;
    this.$store.dispatch("clearFamilyState");
    const employeeInfo = await getEmployeeByID(this.$route.params.id);
    this.employeeInfo = employeeInfo.EmployeeInfo;
    this.familyInfo = employeeInfo.FamilyInformation;
    this.$store.dispatch("appendFamilyInformation", this.familyInfo);
    this.$store.dispatch("updateFamilyMode", {
      value: true,
      id: this.$route.params.id,
    });
  },
  destroyed() {
    this.$store.dispatch("clearFamilyState");
    this.$store.dispatch("updateFamilyMode", { value: false, id: null });
  },

  watch: {
    familyInformations: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.familyInfo = newVal;
      },
    },
  },

  methods: {
    /**
     * Feature: Xóa nhân viên
     * Author: Lê Minh Quang (20/08/2023)
     */
    async deleteEmployee() {
      try {
        var id = this.$route.params.id;
        this.$store.dispatch("toggleLoading");
        await deleteEmployeeAsync(id);
        this.$store.dispatch("toggleLoading");
        showToast(ACCOUNTING_TEXT.Message.DeleteEmployeeSuccess, "success");
        this.$store.dispatch("clearDialog");
        this.$router.replace("/employee");
      } catch (error) {
        handleError(error);
      }
    },
    /**
     * Feature: Hiển thị dialog xóa
     * Author: Lê Minh QUang (20/08/2023)
     */
    showDialog() {
      this.$store.dispatch("showDialog", {
        dialogText: ACCOUNTING_TEXT.Warning.DeleteEmployee(
          this.employeeInfo.FullName
        ),
        dialogTitle: ACCOUNTING_TEXT.WarningTitle.DeleteEmployee,
        dialogType: "warning",
        dialogID: 3,
      });
    },
    /**
     * Feature: Mở cửa sổ edit
       Author: Lê Minh QUang (20/08/2023)
     */
    goToEdit() {
      var id = this.$route.params.id;
      this.$router.replace(`/employee/employee-detail-action/${id}`);
    },
  },
};
</script>
