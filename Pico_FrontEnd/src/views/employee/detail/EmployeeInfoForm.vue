<template>
  <div class="form-wrapper">
    <div class="tablist">
      <div
        class="tab-item"
        :class="{ activated: currentSection == 'general-info' }"
        @click="scrollToSection('general-info')"
      >
        {{ ACCOUNTING_TEXT.words.GeneralInformation }}
      </div>
      <div
        class="tab-item"
        :class="{ activated: currentSection == 'work-info' }"
        @click="scrollToSection('work-info')"
      >
        {{ ACCOUNTING_TEXT.words.WorkInformation }}
      </div>
      <div
        class="tab-item"
        :class="{ activated: currentSection == 'family-info' }"
        @click="scrollToSection('family-info')"
      >
        {{ ACCOUNTING_TEXT.words.FamilyInfomartion }}
      </div>
    </div>
    <div class="form">
      <div
        class="form-header-title"
        id="general-info"
        style="padding-bottom: 24px"
      >
        {{ ACCOUNTING_TEXT.words.GeneralInformation }}
      </div>
      <div class="row form-subtitle">
        {{ ACCOUNTING_TEXT.words.PersonalInformation }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.EmployeeType"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.EmployeeType, 'EmployeeType')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.EmployeeCode"
            type="settled"
            :defaultValue="employeeInfo?.EmployeeCode"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.FullName"
            type="settled"
            :defaultValue="employeeInfo?.FullName"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.DateOfBirth"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.DateOfBirth, 'DateOfBirth')
            "
          />
          <BaseRadioGroup
            :label="ACCOUNTING_TEXT.Label.Gender"
            type="settled"
            :radioList="[
              { value: 1, text: 'Nam' },
              { value: 0, text: 'Nữ' },
            ]"
            :defaultValue="employeeInfo?.Gender"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.PhoneNumber"
            type="settled"
            :defaultValue="employeeInfo?.PhoneNumber"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Email"
            type="settled"
            :defaultValue="employeeInfo?.Email"
          />
        </div>
        <div class="col pl-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.TaxCode"
            type="settled"
            :defaultValue="employeeInfo?.TaxCode"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.DocumentType"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.DocumentType, 'DocumentType')
            "
          />
          <BaseTextField
            :label="identityLabel"
            type="settled"
            :defaultValue="employeeInfo?.IdentityNumber"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.IdentityDate"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.IdentityDate, 'IdentityDate')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.IdentityPlace"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.IdentityPlace, 'IdentityPlace')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Nationality"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.Nationality, 'Nationality')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.ContractType"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.ContractType, 'ContractType')
            "
          />
        </div>
      </div>
      <div class="row form-subtitle">
        {{ ACCOUNTING_TEXT.words.NativePlace }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Nation"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.NativeCountry, 'NativeCountry')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Province"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.NativeProvince, 'NativeProvince')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.District"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.NativeDistrict, 'NativeDistrict')
            "
          />
        </div>
        <div class="col pl-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Ward"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.NativeDistrict, 'NativeWard')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.StreetHouseNumber"
            type="settled"
            :defaultValue="employeeInfo?.NativeStreetHouseNumber"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Address"
            type="settled"
            :defaultValue="totalNativeAddress"
          />
        </div>
      </div>
      <div class="row form-subtitle">
        {{ ACCOUNTING_TEXT.words.CurrentPlace }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Nation"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.CurrentCountry, 'CurrentCountry')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Province"
            type="settled"
            :defaultValue="
              vueModelConversion(
                employeeInfo?.CurrentProvince,
                'CurrentProvince'
              )
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.District"
            type="settled"
            :defaultValue="
              vueModelConversion(
                employeeInfo?.CurrentDistrict,
                'CurrentDistrict'
              )
            "
          />
        </div>
        <div class="col pl-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Ward"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.CurrentWard, 'CurrentWard')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.StreetHouseNumber"
            type="settled"
            :defaultValue="employeeInfo?.CurrentStreetHouseNumber"
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Address"
            type="settled"
            :defaultValue="totalCurrentAddress"
          />
        </div>
      </div>
      <div class="form-header-title" id="work-info">
        {{ ACCOUNTING_TEXT.words.WorkInformation }}
      </div>
      <div class="row mb-6">
        <div class="col pr-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.Department"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.Department, 'Department')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.WorkPosition"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.WorkPosition, 'WorkPosition')
            "
          />
          <BaseTextField :label="ACCOUNTING_TEXT.Label.Title" type="settled" />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.WorkStatus"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.WorkStatus, 'WorkStatus')
            "
          />
        </div>
        <div class="col pl-16">
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.InternshipDate"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.InternshipDate, 'InternshipDate')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.ProbationDate"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.ProbationDate, 'ProbationDate')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.OfficialDate"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.OfficialDate, 'OfficialDate')
            "
          />
          <BaseTextField
            :label="ACCOUNTING_TEXT.Label.ResignDate"
            type="settled"
            :defaultValue="
              vueModelConversion(employeeInfo?.ResignDate, 'ResignDate')
            "
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
        <div
          class="form-header-title"
          id="family-info"
          style="display: flex; align-items: center"
        >
          {{ ACCOUNTING_TEXT.words.FamilyInfomartion }}
        </div>
        <div @click="showPopUp">
          <BaseButton
            icon="add__icon-blue"
            type="outline"
            :text="ACCOUNTING_TEXT.words.Add"
          />
        </div>
      </div>
      <BaseTable v-if="familyInfo?.length > 0" :data="familyInfo" view="form" />
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 65px;
          border-radius: 5px;
          border: 1px dashed #e9ebee;
          background-color: #f5f6f8;
        "
        v-else
      >
        {{ ACCOUNTING_TEXT.words.NoFamilyInformation }}
      </div>
    </div>
  </div>
</template>
<script>
import { cellFormatting, joinString } from "@/helpers/constants";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import { ENUMS } from "@/helpers/enums";
export default {
  name: "EmployeeInfoView",
  components: {},
  props: ["employeeInfo", "familyInfo"],
  computed: {
    identityLabel: function () {
      return this.$props.employeeInfo?.DocumentType == 1
        ? ACCOUNTING_TEXT.Label.IdentityNumber
        : this.$props.employeeInfo?.DocumentType == 2
        ? ACCOUNTING_TEXT.Label.CitizenCard
        : ACCOUNTING_TEXT.Label.Passport;
    },
    // Biến địa chỉ thường trú
    totalCurrentAddress: function () {
      let curString = "";
      curString = joinString(
        curString,
        this.$props.employeeInfo.CurrentStreetHouseNumber
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.CurrentWard,
          "CurrentWard"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.CurrentDistrict,
          "CurrentDistrict"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.CurrentProvince,
          "CurrentProvince"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.CurrentCountry,
          "CurrentCountry"
        )
      );
      return curString.slice(0, -2);
    },
    // Biến địa chỉ hiện tại
    totalNativeAddress: function () {
      let curString = "";
      curString = joinString(
        curString,
        this.$props.employeeInfo.NativeStreetHouseNumber
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.NativeWard,
          "NativeWard"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.NativeDistrict,
          "NativeDistrict"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.NativeProvince,
          "NativeProvince"
        )
      );
      curString = joinString(
        curString,
        this.vueModelConversion(
          this.$props.employeeInfo.NativeCountry,
          "NativeCountry"
        )
      );
      return curString.slice(0, -2);
    },
  },
  data() {
    return {
      isPopupVisible: false,
      currentSection: "general-info",
      ACCOUNTING_TEXT,
    };
  },
  methods: {
    /**
     * Feature: Scroll tới đoạn được chọn
     * Author: Lê Minh Quang (16/08/2023)
     */
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        this.currentSection = sectionId;
      }
    },
    /**
     * Feature: Format giá trị
     * @param {*} value
     * @param {*} model
     * Author: Lê Minh Quang (16/08/2023)
     */
    vueModelConversion(value, model) {
      return cellFormatting(value, model);
    },
    /**
     * Feature: Hiển thị popup thêm gia đình
     * Author: Lê Minh Quang (16/08/2023)
     */
    showPopUp() {
      this.$store.dispatch("showPopUp", {
        popUpMode: ENUMS.POPUP.ADD,
        popUpData: {},
      });
    },
  },
};
</script>
<style scoped>
.form-wrapper {
  display: flex;
}

.tablist {
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-right: 1px solid #e6e6e6 !important;
  flex-basis: calc(100% / 6);
}

.tab-item {
  width: 100%;
  padding: 16px 12px;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
}

.tab-item.activated {
  background-color: #d8ebff;
  color: #007aff !important;
  font-weight: 700 !important;
}

.tab-item:hover {
  background-color: #eff1fb;
}
</style>
