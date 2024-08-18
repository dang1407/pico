<template>
  <div class="form-wrapper" @keydown="handleClosePress">
    <form ref="form" class="form">
      <div class="form-header-title" style="padding-bottom: 24px">
        {{ ACCOUNTING_TEXT.words.GeneralInformation }}
      </div>
      <div class="row form-subtitle">
        {{ ACCOUNTING_TEXT.words.PersonalInformation }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.EmployeeType"
            model="EmployeeType"
            type="default"
            :dropdownList="EMPLOYEE_TYPES"
            :defaultValue="formData?.EmployeeType"
            @updateField="updateField"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.EmployeeCode"
            type="text"
            :required="true"
            :placeholder="ACCOUNTING_TEXT.Placeholder.EmployeeCode"
            :errorText="errorList?.EmployeeCode"
            model="EmployeeCode"
            @updateField="updateField"
            @clearErrorText="clearErrorText"
            @validateModel="validateModel"
            :defaultValue="formData?.EmployeeCode"
            :maxLength="20"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.FullName"
            type="text"
            :required="true"
            @clearErrorText="clearErrorText"
            @validateModel="validateModel"
            :placeholder="ACCOUNTING_TEXT.Placeholder.FullName"
            :errorText="errorList?.FullName"
            model="FullName"
            :defaultValue="formData?.FullName"
            @updateField="updateField"
            :maxLength="100"
          />
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.Label.DateOfBirth"
            @updateField="updateField"
            :defaultValue="formData?.DateOfBirth"
            model="DateOfBirth"
            :max="new Date()"
          />
          <BaseRadioGroup
            :label="ACCOUNTING_TEXT.Label.Gender"
            model="Gender"
            type="default"
            :radioList="[
              { value: 1, text: ACCOUNTING_TEXT.words.Male },
              { value: 0, text: ACCOUNTING_TEXT.words.Female },
            ]"
            :defaultValue="formData.Gender"
            @updateField="updateField"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.PhoneNumber"
            type="text"
            model="PhoneNumber"
            regex="[0-9]"
            :placeholder="ACCOUNTING_TEXT.Placeholder.PhoneNumber"
            @updateField="updateField"
            :defaultValue="formData?.PhoneNumber"
          />
          <BaseTextField
            model="Email"
            :label="ACCOUNTING_TEXT.Label.Email"
            :placeholder="ACCOUNTING_TEXT.Placeholder.Email"
            type="text"
            @updateField="updateField"
            :defaultValue="formData?.Email"
            @validateOnInput="validateOnInput('Email')"
            :errorText="errorList?.Email"
          />
        </div>
        <div class="col pl-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.TaxCode"
            type="field-with-info"
            :placeholder="ACCOUNTING_TEXT.Placeholder.TaxCode"
            model="TaxCode"
            @updateField="updateField"
            :defaultValue="formData?.TaxCode"
            :maxLength="10"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.DocumentType"
            model="DocumentType"
            type="default"
            :dropdownList="DOCUMENT_TYPES"
            :defaultValue="formData?.DocumentType"
            @updateField="updateField"
          />
          <BaseTextField
            :label="identityLabel"
            :required="!formData?.TaxCode"
            @clearErrorText="clearErrorText"
            :errorText="errorList?.IdentityNumber"
            @validateModel="validateModel"
            :placeholder="ACCOUNTING_TEXT.Placeholder.IdentityNumber"
            type="field-with-info"
            @validateOnInput="validateOnInput('IdentityNumber')"
            @updateField="updateField"
            model="IdentityNumber"
            :defaultValue="formData?.IdentityNumber"
            :maxLength="20"
          />
          <BaseDatePicker
            model="IdentityDate"
            :label="ACCOUNTING_TEXT.Label.IdentityDate"
            :required="!formData?.TaxCode"
            @validateModel="validateModel"
            :errorText="errorList?.IdentityDate"
            :defaultValue="formData?.IdentityDate"
            @updateField="updateField"
            :max="new Date()"
          />
          <BaseDropDown
            model="IdentityPlace"
            :label="ACCOUNTING_TEXT.Label.IdentityPlace"
            type="default"
            :placeholder="ACCOUNTING_TEXT.Placeholder.IdentityPlace"
            :errorText="errorList?.IdentityPlace"
            :dropdownList="PROVINCES"
            :required="!formData?.TaxCode"
            :defaultValue="formData?.IdentityPlace"
            @clearErrorText="clearErrorText"
            @validateModel="validateModel"
            @updateField="updateField"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Nationality"
            type="default"
            model="Nationality"
            :dropdownList="NATIONS"
            :defaultValue="formData?.Nationality"
            @updateField="updateField"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.ContractType"
            type="default"
            model="ContractType"
            :dropdownList="CONTRACT_TYPES"
            :required="true"
            @clearErrorText="clearErrorText"
            :errorText="errorList?.ContractType"
            @validateModel="validateModel"
            :defaultValue="formData?.ContractType"
            @updateField="updateField"
          />
        </div>
      </div>
      <div class="row form-subtitle">
        {{ ACCOUNTING_TEXT.words.NativePlace }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Nation"
            type="default"
            model="NativeCountry"
            :dropdownList="NATIONS"
            :defaultValue="formData?.NativeCountry"
            @updateField="updateField"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Province"
            :placeholder="ACCOUNTING_TEXT.Placeholder.Province"
            type="default"
            model="NativeProvince"
            :defaultValue="formData?.NativeProvince"
            :dropdownList="vueAssignedProvince(formData?.NativeCountry)"
            @updateField="updateField"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.District"
            :placeholder="ACCOUNTING_TEXT.Placeholder.District"
            type="default"
            model="NativeDistrict"
            :defaultValue="formData?.NativeDistrict"
            :dropdownList="vueAssignedDistrict(formData?.NativeProvince)"
            @updateField="updateField"
          />
        </div>
        <div class="col pl-16">
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Ward"
            :placeholder="ACCOUNTING_TEXT.Placeholder.Ward"
            type="default"
            model="NativeWard"
            :defaultValue="formData?.NativeWard"
            :dropdownList="vueAssignedWard(formData?.NativeDistrict)"
            @updateField="updateField"
          />
          <BaseTextField
            model="NativeStreetHouseNumber"
            :label="ACCOUNTING_TEXT.Label.StreetHouseNumber"
            type="text"
            :placeholder="ACCOUNTING_TEXT.Placeholder.StreetHouseNumber"
            :defaultValue="formData?.NativeStreetHouseNumber"
            @updateField="updateField"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Address"
            type="text"
            :disabled="true"
            :defaultValue="totalNativeAddress"
          />
        </div>
      </div>
      <div class="row form-subtitle">
        {{ ACCOUNTING_TEXT.words.CurrentPlace }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <div class="textfield">
            <label class="textfield__label">{{
              ACCOUNTING_TEXT.words.CurrentPlace
            }}</label>
            <DxCheckBox
              :value="!!formData.IsSame"
              @value-changed="handleIsSameCheckBox"
            />
          </div>
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Nation"
            type="default"
            model="CurrentCountry"
            :dropdownList="NATIONS"
            :disabled="!!formData?.IsSame"
            :defaultValue="formData?.CurrentCountry"
            @updateField="updateField"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Province"
            :placeholder="ACCOUNTING_TEXT.Placeholder.Province"
            type="default"
            model="CurrentProvince"
            :disabled="!!formData?.IsSame"
            :defaultValue="formData?.CurrentProvince"
            :dropdownList="vueAssignedProvince(formData?.CurrentCountry)"
            @updateField="updateField"
          />
          <BaseDropDown
            model="CurrentDistrict"
            :label="ACCOUNTING_TEXT.Label.District"
            :placeholder="ACCOUNTING_TEXT.Placeholder.District"
            type="default"
            :disabled="!!formData?.IsSame"
            :defaultValue="formData?.CurrentDistrict"
            :dropdownList="vueAssignedDistrict(formData?.CurrentProvince)"
            @updateField="updateField"
          />
        </div>
        <div class="col pl-16">
          <div class="textfield"></div>
          <BaseDropDown
            model="CurrentWard"
            :label="ACCOUNTING_TEXT.Label.Ward"
            :placeholder="ACCOUNTING_TEXT.Placeholder.Ward"
            :defaultValue="formData?.CurrentWard"
            :dropdownList="vueAssignedWard(formData?.CurrentDistrict)"
            type="default"
            :disabled="!!formData?.IsSame"
            @updateField="updateField"
          />
          <BaseTextField
            model="CurrentStreetHouseNumber"
            :label="ACCOUNTING_TEXT.Label.StreetHouseNumber"
            type="text"
            :defaultValue="formData?.CurrentStreetHouseNumber"
            :placeholder="ACCOUNTING_TEXT.Placeholder.StreetHouseNumber"
            :disabled="!!formData?.IsSame"
            @updateField="updateField"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Address"
            type="text"
            :disabled="true"
            :defaultValue="totalCurrentAddress"
          />
        </div>
      </div>
      <div class="form-header-title">
        {{ ACCOUNTING_TEXT.words.WorkInformation }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.Department"
            :required="true"
            @clearErrorText="clearErrorText"
            @validateModel="validateModel"
            :errorText="errorList?.Department"
            type="treeview"
            :dropdownList="DEPARTMENTS"
            model="Department"
            :defaultValue="formData?.Department"
            @updateField="updateField"
            :placeholder="ACCOUNTING_TEXT.Placeholder.Search"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.WorkPosition"
            :required="true"
            @clearErrorText="clearErrorText"
            @validateModel="validateModel"
            :errorText="errorList?.WorkPosition"
            :placeholder="ACCOUNTING_TEXT.Placeholder.WorkPosition"
            type="default"
            :dropdownList="vueAssignedPosition(formData?.Department)"
            @updateField="updateField"
            :defaultValue="formData?.WorkPosition"
            model="WorkPosition"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Title"
            :disabled="true"
            type="text"
          />
          <BaseDropDown
            :label="ACCOUNTING_TEXT.Label.WorkStatus"
            :dropdownList="WORK_STATUS"
            :defaultValue="formData?.WorkStatus"
            model="WorkStatus"
            type="default"
            @updateField="updateField"
          />
        </div>
        <div class="col pl-16">
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.Label.InternshipDate"
            model="InternshipDate"
            @updateField="updateField"
            :defaultValue="formData?.InternshipDate"
          />
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.Label.ProbationDate"
            model="ProbationDate"
            @updateField="updateField"
            :defaultValue="formData?.ProbationDate"
          />
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.Label.OfficialDate"
            model="OfficialDate"
            @updateField="updateField"
            :defaultValue="formData?.OfficialDate"
          />
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.Label.ResignDate"
            model="ResignDate"
            @updateField="updateField"
            :defaultValue="formData?.ResignDate"
          />
        </div>
      </div>

      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 24px;
        "
      >
        <div class="form-header-title">
          {{ ACCOUNTING_TEXT.words.FamilyInfomartion }}
        </div>
        <div @click="showAddPopUp" @keydown="handleKeyDown">
          <BaseButton
            icon="add__icon-blue"
            type="outline"
            :text="ACCOUNTING_TEXT.words.Add"
            ref="focusBtn1"
          />
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
import {
  assignedProvince,
  assignedDistrict,
  assignedPosition,
  assignedWard,
  EMPLOYEE_TYPES,
  POSITIONS,
  CONTRACT_TYPES,
  DOCUMENT_TYPES,
  WORK_STATUS,
  DEPARTMENTS,
  NATIONS,
  PROVINCES,
  showToast,
  cellFormatting,
  joinString,
  DEFAULT_FORM_VALUES,
} from "@/helpers/constants";
import { ENUMS } from "@/helpers/enums";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import {
  createEmployee,
  getNewID,
  getEmployeeByID,
  updateEmployee,
} from "@/helpers/api";
import { mapState } from "vuex";
import { DxCheckBox } from "devextreme-vue";
export default {
  name: "EmployeeForm",
  props: ["isSubmitted", "isSubmitted2", "formMode", "isClose"],
  components: { DxCheckBox },
  computed: {
    ...mapState(["familyInformations"]),
    identityLabel: function () {
      return this.formData?.DocumentType == 1
        ? ACCOUNTING_TEXT.Label.IdentityNumber
        : this.formData?.DocumentType == 2
        ? ACCOUNTING_TEXT.Label.CitizenCard
        : ACCOUNTING_TEXT.Label.Passport;
    },
    totalCurrentAddress: function () {
      let curString = "";
      curString = joinString(curString, this.formData.CurrentStreetHouseNumber);
      curString = joinString(
        curString,
        this.vueModelConversion(this.formData.CurrentWard, "CurrentWard")
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.formData.CurrentDistrict,
          "CurrentDistrict"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.formData.CurrentProvince,
          "CurrentProvince"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(this.formData.CurrentCountry, "CurrentCountry")
      );
      return curString.slice(0, -2);
    },
    totalNativeAddress: function () {
      let curString = "";
      curString = joinString(curString, this.formData.NativeStreetHouseNumber);
      curString = joinString(
        curString,
        this.vueModelConversion(this.formData.NativeWard, "NativeWard")
      );
      curString = joinString(
        curString,
        this.vueModelConversion(this.formData.NativeDistrict, "NativeDistrict")
      );
      curString = joinString(
        curString,
        this.vueModelConversion(this.formData.NativeProvince, "NativeProvince")
      );
      curString = joinString(
        curString,
        this.vueModelConversion(this.formData.NativeCountry, "NativeCountry")
      );
      return curString.slice(0, -2);
    },
  },
  data() {
    return {
      formData:
        this.$props.formMode == ENUMS.FORM_MODE.ADD ? DEFAULT_FORM_VALUES : {},
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
    };
  },

  /**
   * Feature: Lấy dữ liệu khi mounted
   * Author: Lê Minh Quang (20/08/2023)
   */
  async mounted() {
    this.$store.dispatch("clearFamilyState");
    if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
      this.isUpdatedChange = false;
      const employeeInfo = await getEmployeeByID(this.$route.params.id);
      this.formData = { ...this.formData, ...employeeInfo.EmployeeInfo };
      if (employeeInfo?.FamilyInformation.length > 0) {
        employeeInfo?.FamilyInformation?.forEach((item) => {
          this.$store.dispatch("createNewFamilyInformation", item);
        });
      }
      await this.$nextTick();
      this.flag = true;
      this.isUpdatedChange = false;
    }
    if (this.formMode == ENUMS.FORM_MODE.ADD) {
      this.flag = true;
      const newCode = await getNewID("Employee");
      this.formData = { ...this.formData, EmployeeCode: newCode };
    }
  },

  methods: {
    /**
     * Feature: Format dữ liệu
     * @param {*} value
     * @param {*} model
     */
    vueModelConversion(value, model) {
      return cellFormatting(value, model);
    },

    /**
     * Feature: Xử lý khi ấn checkbox
     * @param {*} param
     * Author: Lê Minh Quang (24/08/2023)
     */
    handleIsSameCheckBox({ value }) {
      if (value) {
        this.formData.CurrentCountry = this.formData.NativeCountry;
        this.formData.CurrentProvince = this.formData.NativeProvince;
        this.formData.CurrentDistrict = this.formData.NativeDistrict;
        this.formData.CurrentWard = this.formData.NativeWard;
        this.formData.CurrentStreetHouseNumber =
          this.formData.NativeStreetHouseNumber;
      }

      this.updateField({
        IsSame: value ? ENUMS.SAME.IS_SAME : ENUMS.SAME.NOT_SAME,
      });
    },

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
     * Feature: Gán list tỉnh
     * Author: Lê Minh Quang (24/08/2023)
     */
    vueAssignedProvince(code) {
      return assignedProvince(code);
    },

    /**
     * Feature: Gán list huyện
     * Author: Lê Minh Quang (24/08/2023)
     */
    vueAssignedDistrict(code) {
      return assignedDistrict(code);
    },

    /**
     * Feature: Gán list xã
     * Author: Lê Minh Quang (24/08/2023)
     */
    vueAssignedWard(code) {
      return assignedWard(code);
    },

    /**
     * Feature: Gán vị trí làm việc
     * Author: Lê Minh Quang (24/08/2023)
     */
    vueAssignedPosition(code) {
      return assignedPosition(code);
    },

    /**
     * Feature: Kiểm tra trường bắt buộc
     * Author: Lê Minh Quang (24/08/2023)
     */

    checkRequiredField(model, basedOnParent, parentValue) {
      if (!basedOnParent) {
        if (!this.formData?.[model]) {
          this.errorList = {
            ...this.errorList,
            [model]: ACCOUNTING_TEXT.errors?.[`required${model}Error`],
          };
        } else {
          delete this.errorList?.[model];
        }
      } else {
        if (!this.formData?.[model] && !parentValue) {
          this.errorList = {
            ...this.errorList,
            [model]: ACCOUNTING_TEXT.errors?.[`required${model}Error`],
          };
        } else {
          delete this.errorList?.[model];
        }
      }
    },

    /**
     * Feature: Validate dữ liệu khi nhập
     * @param {*} model
     */
    validateOnInput(model) {
      if (model == "Email") {
        if (
          this.formData.Email &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.Email)
        ) {
          this.errorList = {
            ...this.errorList,
            [model]: ACCOUNTING_TEXT.errors.InvalidEmail,
          };
        } else {
          this.clearErrorText("Email");
        }
      } else if (model == "IdentityNumber") {
        if (
          this.formData.IdentityNumber &&
          !/^[0-9]+$/.test(this.formData.IdentityNumber)
        ) {
          this.errorList = {
            ...this.errorList,
            [model]: ACCOUNTING_TEXT.errors.InvalidIdentityNumber,
          };
        } else {
          this.clearErrorText("IdentityNumber");
        }
      }
    },

    /**
     * Feature: Validate tất cả các trường
     * Author: Lê Minh Quang (24/08/2023)
     */

    fieldValidation() {
      this.checkRequiredField("EmployeeCode");
      this.checkRequiredField("FullName");
      this.checkRequiredField("WorkPosition");
      this.checkRequiredField("Department");
      if (!this.formData.TaxCode) {
        this.checkRequiredField("IdentityNumber");
        this.checkRequiredField("IdentityDate");
        this.checkRequiredField("IdentityPlace");
      }

      this.validateOnInput("Email");
      if (!this.errorList.IdentityNumber) {
        this.validateOnInput("IdentityNumber");
      }

      if (Object.keys(this.errorList).some((key) => this.errorList[key])) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * Feature: Validate 1 trường
     * @param {} field
     * Author: Lê Minh Quang (24/08/2023)
     */
    validateModel(field) {
      this.validateOnInput(field);
      if (
        field == "IdentityNumber" ||
        field == "IdentityPlace" ||
        field == "IdentityDate"
      ) {
        if (!this.formData.TaxCode) {
          this.checkRequiredField(field);
        }
      } else {
        this.checkRequiredField(field);
      }
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
     * Feature: Custom value cell
     * @param {*} cellInfo - cell object
     * @param {*} model - model
     * Author: Lê Minh Quang (19/08/2023)
     */
    cellFormat(cellInfo, model) {
      return cellFormatting(cellInfo.value, model) || cellInfo.valueText;
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
            const res = await createEmployee({
              EmployeeInfo: this.formData,
              FamilyInformations: this.familyInformations.map((item) => ({
                Information: item,
                Mode: item.FormMode,
              })),
            });
            this.$router.push(`/employee/employee-detail-view/${res.data}`);
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.CreateEmployeeSuccess, "success");
          } catch (error) {
            handleError(error);
          }
        } else if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          try {
            this.$store.dispatch("toggleLoading");
            await updateEmployee({
              EmployeeInfo: this.formData,
              FamilyInformations: this.familyInformations.map((item) => ({
                Information: item,
                Mode: item.FormMode,
              })),
            });
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
          delete originalForm?.["EmployeeCode"];
          if (
            JSON.stringify(originalForm) != JSON.stringify(DEFAULT_FORM_VALUES)
          ) {
            this.showChangeDialog();
          } else {
            this.$router.replace("/employee");
          }
        }
        if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          if (this.isUpdatedChange) {
            this.showChangeDialog();
          } else {
            this.$router.replace("/employee");
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
      if (this.fieldValidation()) {
        if (this.formMode == ENUMS.FORM_MODE.ADD) {
          try {
            this.$store.dispatch("toggleLoading");
            const res = await createEmployee({
              EmployeeInfo: this.formData,
              FamilyInformations: this.familyInformations.map((item) => ({
                Information: item,
                Mode: item.FormMode,
              })),
            });
            this.$router.push(`/employee/employee-detail-view/${res.data}`);
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.CreateEmployeeSuccess, "success");
          } catch (error) {
            handleError(error);
          }
        } else if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
          try {
            this.$store.dispatch("toggleLoading");
            await updateEmployee({
              EmployeeInfo: this.formData,
              FamilyInformations: this.familyInformations.map((item) => ({
                Information: item,
                Mode: item.FormMode,
              })),
            });
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
     * Feature: Thêm hoặc sửa và thêm mới
     * Author: Lê Minh Quang (19/08/2023)
     */
    isSubmitted2: async function () {
      if (this.fieldValidation()) {
        if (this.formMode == ENUMS.FORM_MODE.ADD) {
          try {
            this.$store.dispatch("toggleLoading");
            await createEmployee({
              EmployeeInfo: this.formData,
              FamilyInformations: this.familyInformations.map((item) => ({
                Information: item,
                Mode: item.FormMode,
              })),
            });
            this.flag = false;
            this.errorList = {};
            const newCode = await getNewID("Employee");
            this.formData = { ...DEFAULT_FORM_VALUES, EmployeeCode: newCode };
            this.$store.dispatch("clearFamilyState");
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
            await updateEmployee({
              EmployeeInfo: this.formData,
              FamilyInformations: this.familyInformations.map((item) => ({
                Information: item,
                Mode: item.FormMode,
              })),
            });
            this.flag = false;
            this.errorList = {};
            const newCode = await getNewID("Employee");
            this.formData = { ...DEFAULT_FORM_VALUES, EmployeeCode: newCode };
            this.$store.dispatch("clearFamilyState");
            await this.$nextTick();
            this.flag = true;
            this.$store.dispatch("toggleLoading");
            showToast(ACCOUNTING_TEXT.words.UpdateEmployeeSuccess, "success");
            this.$router.replace("/employee/employee-detail-action");
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
        delete originalForm?.["EmployeeCode"];
        if (
          JSON.stringify(originalForm) != JSON.stringify(DEFAULT_FORM_VALUES)
        ) {
          this.showChangeDialog();
        } else {
          this.$router.replace("/employee");
        }
      }
      if (this.formMode == ENUMS.FORM_MODE.UPDATE) {
        if (this.isUpdatedChange) {
          this.showChangeDialog();
        } else {
          this.$router.replace("/employee");
        }
      }
    },

    /**
     * Feature: Validate lại khi taxcode thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.TaxCode": function () {
      if (this.flag) {
        this.checkRequiredField("IdentityNumber", true, this.formData?.TaxCode);
        this.checkRequiredField("IdentityDate", true, this.formData?.TaxCode);
        this.checkRequiredField("IdentityPlace", true, this.formData?.TaxCode);
      }
    },
    /**
     * Feature: Validate lại khi NativeCountry thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.NativeCountry": function (newVal) {
      if (this.flag) {
        this.formData.NativeProvince = null;
      }
      if (this.formData.IsSame) {
        this.formData.CurrentCountry = newVal;
      }
    },
    /**
     * Feature: Validate lại khi NativeProvince thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.NativeProvince": function (newVal) {
      if (this.flag) {
        this.formData.NativeDistrict = null;
      }
      if (this.formData.IsSame) {
        this.formData.CurrentProvince = newVal;
      }
    },
    /**
     * Feature: Validate lại khi NativeDistrict thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.NativeDistrict": function (newVal) {
      if (this.flag) {
        this.formData.NativeWard = null;
      }
      if (this.formData.IsSame) {
        this.formData.CurrentDistrict = newVal;
      }
    },
    /**
     * Feature: Validate lại khi NativeWard thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.NativeWard": function (newVal) {
      if (this.formData.IsSame) {
        this.formData.CurrentWard = newVal;
      }
    },
    /**
     * Feature: Validate lại khi NativeStreetHouseNumber thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.NativeStreetHouseNumber": function (newVal) {
      if (this.formData.IsSame) {
        this.formData.CurrentStreetHouseNumber = newVal;
      }
    },
    /**
     * Feature: Validate lại khi CurrentCountry thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.CurrentCountry": function () {
      if (this.flag && !this.formData.IsSame) {
        this.formData.CurrentProvince = null;
      }
    },
    /**
     * Feature: Validate lại khi CurrentProvince thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.CurrentProvince": function () {
      if (this.flag && !this.formData.IsSame) {
        this.formData.CurrentDistrict = null;
      }
    },
    /**
     * Feature: Validate lại khi CurrentDistrict thay đổi
     * Author: Lê Minh Quang (19/08/2023)
     */
    "formData.CurrentDistrict": function () {
      if (this.flag && !this.formData.IsSame) {
        this.formData.CurrentWard = null;
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
