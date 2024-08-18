<template>
  <div class="form-wrapper" @keydown="handleClosePress">
    <form ref="form" class="form">
      <div v-for="group in SAMPLE_GROUPS" :key="group.GroupID">
        <div class="form-header-title">
          {{ group.GroupName }}
        </div>
        <div v-if="group.GroupType == 1" class="row mb-6"></div>
        <div v-if="group.GroupType == 2" class="row mb-6">
          <div class="col pr-16">
            <template v-for="groupField in group.GroupFields">
              <BaseTextField
                v-if="groupField.FieldType == 1 && groupField.Column == 1"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                type="text"
                :required="groupField.IsRequired"
                :placeholder="groupField.Placeholder"
                :errorText="errorList?.[groupField.FieldName]"
                :model="groupField.FieldName"
                @updateField="updateField"
                @clearErrorText="clearErrorText"
                :defaultValue="formData?.[groupField.FieldName]"
                :maxLength="groupField.MaxLength"
              />
              <BaseDropDown
                v-if="groupField.FieldType == 2 && groupField.Column == 1"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                :model="groupField.FieldName"
                type="default"
                :dropdownList="
                  groupField.DropdownList.filter(
                    (item) => item.DropdownListID == groupField.DropdownListID
                  )
                "
                :defaultValue="formData?.[groupField.FieldName]"
                @updateField="updateField"
              />
            </template>
          </div>
          <div class="col pr-16">
            <template v-for="groupField in group.GroupFields">
              <BaseTextField
                v-if="groupField.FieldType == 1 && groupField.Column == 2"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                type="text"
                :required="groupField.IsRequired"
                :placeholder="groupField.Placeholder"
                :errorText="errorList?.[groupField.FieldName]"
                :model="groupField.FieldName"
                @updateField="updateField"
                @clearErrorText="clearErrorText"
                :defaultValue="formData?.[groupField.FieldName]"
                :maxLength="groupField.MaxLength"
              />
              <BaseDropDown
                v-if="groupField.FieldType == 2 && groupField.Column == 2"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                :model="groupField.FieldName"
                type="default"
                :dropdownList="
                  groupField.DropdownList.filter(
                    (item) => item.DropdownListID == groupField.DropdownListID
                  )
                "
                :defaultValue="formData?.[groupField.FieldName]"
                @updateField="updateField"
              />
            </template>
          </div>
        </div>
      </div>
    </form>
    <BaseDialog
      :id="99"
      :acceptText="ACCOUNTING_TEXT.words.Close"
      @acceptAction="$store.dispatch('clearDialog')"
    />
    <BaseDialog
      :id="3312"
      :cancelText="ACCOUNTING_TEXT.words.Cancel"
      :declineText="ACCOUNTING_TEXT.words.NotSave"
      :acceptText="ACCOUNTING_TEXT.words.Save"
      @cancelAction="$store.dispatch('clearDialog')"
      @declineAction="handleDeclineAction"
      @acceptAction="handleAcceptionAction"
    />
  </div>
</template>
<script>
import { handleError } from "@/helpers/constants";
import { SAMPLE_GROUPS } from "@/helpers/sampleGroup";
import {
  EMPLOYEE_TYPES,
  POSITIONS,
  CONTRACT_TYPES,
  DOCUMENT_TYPES,
  WORK_STATUS,
  DEPARTMENTS,
  NATIONS,
  PROVINCES,
  showToast,
} from "@/helpers/constants";
import { ENUMS } from "@/helpers/enums";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import {
  createRecord,
  getNewID,
  getRecordById,
  updateRecord,
} from "@/helpers/api";

export default {
  name: "BaseForm",
  props: [
    "isSubmitted",
    "isSubmitted2",
    "formMode",
    "isClose",
    "tableName",
    "modelRoute",
  ],
  components: {},
  data() {
    return {
      formData: {},
      ENUMS,
      EMPLOYEE_TYPES,
      POSITIONS,
      CONTRACT_TYPES,
      DOCUMENT_TYPES,
      WORK_STATUS,
      DEPARTMENTS,
      NATIONS,
      PROVINCES,
      errorList: {},
      fixedObject: {},
      ACCOUNTING_TEXT,
      flag: false,
      isUpdatedChange: false,
      SAMPLE_GROUPS,
    };
  },

  /**
   * Feature: Lấy dữ liệu khi mounted
   * Author: Lê Minh Quang (20/08/2023)
   */
  async mounted() {
    if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
      this.isUpdatedChange = false;
      const recordInfo = await getRecordById(
        this.$route.params.id,
        this.tableName
      );
      this.formData = recordInfo;
      await this.$nextTick();
      this.flag = true;
      this.isUpdatedChange = false;
    }
    if (this.formMode == ENUMS.FORM_MODE.ADD) {
      this.flag = true;
      const newCode = await getNewID(this.tableName);
      this.formData = { ...this.formData, ID: newCode };
    }
  },

  methods: {
    /**
     * Feature: Hiển thị popup
     * Author: Lê Minh Quang (24/08/2023)
     */
    showAddPopUp() {
      this.$store.dispatch("showPopUp", {
        popUpMode: ENUMS.POPUP.ADD,
        popUpData: {},
      });
    },

    /**
     * Feature: Cập nhập trường
     * Author: Lê Minh Quang (24/08/2023)
     */
    updateField(value) {
      this.isUpdatedChange = true;
      this.formData = { ...this.formData, ...value };
    },

    /**
     * Feature: Kiểm tra trường bắt buộc
     * Author: Lê Minh Quang (24/08/2023)
     */

    checkRequiredField() {
      this.SAMPLE_GROUPS.forEach((group) => {
        group.GroupFields.forEach((field) => {
          if (!this.formData?.[field.FieldName] && field.IsRequired) {
            this.errorList = {
              ...this.errorList,
              [field.FieldName]: field.ErrorText,
            };
          } else {
            delete this.errorList?.[field.FieldName];
          }
        });
      });
      return !(Object.keys(this.errorList).length > 0);
    },

    /**
     * Feature: Xóa text hiển thị của model
     * @param {*} model
     * Author: Lê Minh Quang (24/08/2023)
     */
    clearErrorText(model) {
      delete this.errorList?.[model];
      const newObj = Object.assign({}, this.errorList);
      this.errorList = newObj;
    },

    /**
     * Feature: Hiển thị dialog thay đổi
     * Author: Lê Minh Quang (23/08/2023)
     */
    showChangeDialog() {
      this.$store.dispatch("showDialog", {
        dialogID: 3312,
        dialogText: ACCOUNTING_TEXT.words.SaveChanges,
        dialogTitle: ACCOUNTING_TEXT.WarningTitle.SaveChanges,
        dialogType: "change",
      });
    },

    /**
     * Feature: Hành động khi ấn nút decline
     * Author: Lê Minh Quang (23/08/2023)
     */
    handleDeclineAction() {
      this.$store.dispatch("clearDialog");
      this.$router.replace("/employee");
    },
    /**
     * Feature: Hành động ấn nút chấp nhận
     * Author: Lê Minh Quang (23/08/2023)
     */
    async handleAcceptionAction() {
      this.$store.dispatch("clearDialog");
      if (this.fieldValidation()) {
        if (this.formMode == ENUMS.FORM_MODE.ADD) {
          try {
            this.$store.dispatch("toggleLoading");
            const res = await createRecord(this.formData);
            this.$router.push(`/employee/employee-detail-view/${res.data}`);
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.CreateEmployeeSuccess, "success");
          } catch (error) {
            handleError(error);
          }
        } else if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          try {
            this.$store.dispatch("toggleLoading");
            await updateRecord(
              this.formData,
              this.tableName,
              this.$route.params.id
            );
            this.$router.replace(
              `/employee/employee-detail-view/${this.formData.EmployeeID}`
            );
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.UpdateEmployeeSuccess, "success");
          } catch (error) {
            handleError(error);
          }
        }
      }
    },

    /**
     * Feature: Hành động khi ấn nút
     * Author: Lê Minh Quang (23/08/2023)
     */
    handleKeyDown(event) {
      if (event.code == "Space" || event.code == "Enter") {
        this.showAddPopUp();
      }
    },

    /**
     * Feature: Đóng khi ấn nút ESC
     * Author: Lê Minh Quang (20/08/2023)
     */
    handleClosePress(event) {
      if (event.code == "Escape") {
        if (this.formMode == ENUMS.FORM_MODE.ADD) {
          var originalForm = Object.assign({}, this.formData);
          delete originalForm?.["ID"];
          if (JSON.stringify(originalForm) != JSON.stringify({})) {
            this.showChangeDialog();
          } else {
            this.$router.replace(`/${this.tableName.toLowerCase()}`);
          }
        }
        if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          if (this.isUpdatedChange) {
            this.showChangeDialog();
          } else {
            this.$router.replace(`/${this.tableName.toLowerCase()}`);
          }
        }
      }
    },
  },
  watch: {
    /**
     * Feature: Thêm hoặc sửa
     * Author: Lê Minh Quang (19/08/2023)
     */
    isSubmitted: async function () {
      if (this.checkRequiredField()) {
        if (this.formMode == ENUMS.FORM_MODE.ADD) {
          try {
            this.$store.dispatch("toggleLoading");
            await createRecord(this.formData, this.tableName);
            this.$router.push(
              `/${this.modelRoute.toLowerCase()}/${this.modelRoute.toLowerCase()}-detail-view/${
                this.formData.ID
              }`
            );
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.CreateEmployeeSuccess, "success");
          } catch (error) {
            handleError(error);
          }
        } else if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          try {
            this.$store.dispatch("toggleLoading");
            await updateRecord(
              this.formData,
              this.tableName,
              this.$route.params.id
            );
            this.$router.replace(
              `/${this.modelRoute.toLowerCase()}/${this.modelRoute.toLowerCase()}-detail-view/${
                this.formData.ID
              }`
            );
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.UpdateEmployeeSuccess, "success");
          } catch (error) {
            handleError(error);
          }
        }
      }
    },

    /**
     * Feature: Thêm hoặc sửa và thêm mới
     * Author: Lê Minh Quang (19/08/2023)
     */
    isSubmitted2: async function () {
      if (this.checkRequiredField()) {
        if (this.formMode == ENUMS.FORM_MODE.ADD) {
          try {
            this.$store.dispatch("toggleLoading");
            await createRecord(this.formData, this.tableName);
            this.flag = false;
            this.errorList = {};
            const newCode = await getNewID(this.tableName);
            this.formData = { ...{}, ID: newCode };
            await this.$nextTick();
            this.flag = true;
            showToast(ACCOUNTING_TEXT.words.CreateEmployeeSuccess, "success");

            this.$store.dispatch("toggleLoading");
          } catch (error) {
            handleError(error);
          }
        } else if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          try {
            this.$store.dispatch("toggleLoading");
            await updateRecord(
              this.formData,
              this.tableName,
              this.$route.params.id
            );
            this.flag = false;
            this.errorList = {};
            const newCode = await getNewID(this.tableName);
            this.formData = { ...{}, ID: newCode };
            await this.$nextTick();
            this.flag = true;
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.UpdateEmployeeSuccess, "success");
            this.$router.replace(
              `/${this.modelRoute.toLowerCase()}/${this.modelRoute.toLowerCase()}-detail-action`
            );
          } catch (error) {
            handleError(error);
          }
        }
      }
    },

    /**
     * Feature: Đóng form
     * Author: Lê Minh Quang (19/08/2023)
     */
    isClose: function () {
      if (this.formMode == ENUMS.FORM_MODE.ADD) {
        var originalForm = Object.assign({}, this.formData);
        delete originalForm?.["ID"];
        if (JSON.stringify(originalForm) != JSON.stringify({})) {
          this.showChangeDialog();
        } else {
          this.$router.replace(`/${this.modelRoute.toLowerCase()}`);
        }
      }
      if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
        if (this.isUpdatedChange) {
          this.showChangeDialog();
        } else {
          this.$router.replace(`/${this.modelRoute.toLowerCase()}`);
        }
      }
    },
  },
};
</script>
<style scoped>
.dx-header-row > td {
  background-color: gray !important;
}
</style>
