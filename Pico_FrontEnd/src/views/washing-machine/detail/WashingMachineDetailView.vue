<template>
  <div
    style="height: 100%; min-height: 0; display: flex; flex-direction: column"
  >
    <div class="main-content__header">
      <div class="main-content__header--left">
        <div @click="$router.replace('/washing-machine')">
          <BaseButton icon="goback-icon" type="icon" />
        </div>
        <div class="main-content__title">Thông tin sản phẩm</div>
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
    <BaseInfoForm :recordInfo="recordInfo" tableName="WashingMachine" />
    <BaseDialog
      :id="3"
      @cancelAction="$store.dispatch('clearDialog')"
      @acceptAction="deleteRecord"
      :cancelText="ACCOUNTING_TEXT.words.Cancel"
      :acceptText="ACCOUNTING_TEXT.words.Accept"
    />
  </div>
</template>
<script>
import BaseInfoForm from "../../televison/detail/BaseInfoForm.vue";
import { getRecordById, deleteRecordAsync, getNewID } from "@/helpers/api";
import { handleError, showToast } from "@/helpers/constants";
import { mapState } from "vuex";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "WashingMachineDetailView",
  components: { BaseInfoForm },
  computed: {
    ...mapState(["tableHeaders", "filterObj"]),
  },
  data() {
    return {
      recordInfo: {},
      ACCOUNTING_TEXT,
    };
  },
  async mounted() {
    if (this.$route.params.id) {
      const recordInfo = await getRecordById(
        this.$route.params.id,
        "WashingMachine"
      );
      document.title = `Thông tin sản phẩm ${recordInfo.ProductName}`;
      this.recordInfo = recordInfo;
    } else {
      const newId = await getNewID(this.tableName);
      this.recordInfo.ID = newId;
    }
  },

  methods: {
    /**
     * Feature: Xóa nhân viên
     * Author: Lê Minh Quang (20/08/2023)
     */
    async deleteRecord() {
      try {
        var id = this.$route.params.id;
        this.$store.dispatch("toggleLoading");
        await deleteRecordAsync(id, "WashingMachine");
        this.$store.dispatch("toggleLoading");
        showToast(ACCOUNTING_TEXT.Message.DeleteEmployeeSuccess, "success");
        this.$store.dispatch("clearDialog");
        this.$router.replace(`/washing-machine`);
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
          this.recordInfo.ProductName
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
      this.$router.replace(
        `/washing-machine/washing-machine-detail-action/${id}`
      );
    },
  },
};
</script>
