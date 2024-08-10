<template>
  <div
    style="height: 100%; min-height: 0; display: flex; flex-direction: column"
  >
    <div class="main-content__header">
      <div class="main-content__header--left">
        <div @click="$router.replace('/rice-cooker')">
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
    <BaseInfoForm :recordInfo="recordInfo" tableName="RiceCooker" />
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
import { getRecordById, deleteRecordAsync } from "@/helpers/api";
import { handleError, showToast } from "@/helpers/constants";
import { mapState } from "vuex";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "RiceCookerDetailView",
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
    const recordInfo = await getRecordById(this.$route.params.id, "RiceCooker");
    document.title = `Thông tin sản phẩm ${recordInfo.ProductName}`;
    this.recordInfo = recordInfo;
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
        await deleteRecordAsync(id, "RiceCooker");
        this.$store.dispatch("toggleLoading");
        showToast(ACCOUNTING_TEXT.Message.DeleteEmployeeSuccess, "success");
        this.$store.dispatch("clearDialog");
        this.$router.replace(`/rice-cooker`);
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
      this.$router.replace(`/rice-cooker/rice-cooker-detail-action/${id}`);
    },
  },
};
</script>
