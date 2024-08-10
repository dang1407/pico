<template>
  <div
    style="
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      position: relative;
    "
  >
    <div class="main-content__header">
      <div class="main-content__header--left">
        <div class="main-content__title">
          {{
            $route.params.id
              ? ACCOUNTING_TEXT.words.UpdateEmployee
              : ACCOUNTING_TEXT.words.CreateEmployee
          }}
        </div>
      </div>
      <div class="main-content__header--right">
        <div @click="closeForm">
          <BaseButton type="default" :text="ACCOUNTING_TEXT.words.Cancel" />
        </div>

        <div @click="createAndContinue">
          <BaseButton
            type="default"
            :text="ACCOUNTING_TEXT.words.SaveAndContinue"
          />
        </div>
        <div @click="createAndRedirect">
          <BaseButton
            type="primary"
            :text="ACCOUNTING_TEXT.words.Save"
            :isSubmit="true"
          />
        </div>
      </div>
    </div>
    <EmployeeForm
      :formMode="
        $route.params.id ? ENUMS.FORM_MODE.UPDATE : ENUMS.FORM_MODE.ADD
      "
      :isSubmitted="isSubmitted"
      :isSubmitted2="isSubmitted2"
      :isClose="isClose"
    />
  </div>
</template>
<script>
import EmployeeForm from "@/views/employee/detail/EmployeeForm.vue";
import { ENUMS } from "@/helpers/enums";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "EmployeeCreateView",
  components: { EmployeeForm },
  data() {
    return {
      ENUMS,
      isSubmitted: false,
      isSubmitted2: false,
      isClose: false,
      ACCOUNTING_TEXT,
    };
  },

  mounted() {
    document.title = ACCOUNTING_TEXT.words.EmployeeViewTitle;
  },

  methods: {
    /**
     * Feature: Tạo hoặc cập nhật
     * Author: Lê Minh Quang (20/08/2023)
     */
    createAndRedirect() {
      this.isSubmitted = !this.isSubmitted;
    },
    /**
     * Feature: Tạo hoặc cập nhật và tiếp tục tạo mới
     * Author: Lê Minh Quang (20/08/2023)
     */
    createAndContinue() {
      this.isSubmitted2 = !this.isSubmitted2;
    },

    /**
     * Feature: Đóng form
     * Author: Lê Minh Quang (20/08/2023)
     */
    closeForm() {
      this.isClose = !this.isClose;
    },
  },
};
</script>
