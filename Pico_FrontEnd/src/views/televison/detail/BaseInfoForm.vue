<template>
  <div class="form-wrapper">
    <div class="form">
      <div v-for="group in groupConfigs" :key="group.GroupID">
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
                type="settled"
                :placeholder="groupField.Placeholder"
                :errorText="errorList?.[groupField.FieldName]"
                :model="groupField.FieldName"
                :defaultValue="recordInfo?.[groupField.FieldName]"
                :maxLength="groupField.MaxLength"
              />
              <BaseTextField
                v-if="groupField.FieldType == 2 && groupField.Column == 1"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                :model="groupField.FieldName"
                type="settled"
                :defaultValue="
                  SAMPLE_DROPDOWN_OPTIONS.filter(
                    (x) => x.ID == recordInfo?.[groupField.FieldName]
                  )?.[0]?.Name
                "
              />
            </template>
          </div>
          <div class="col pr-16">
            <template v-for="groupField in group.GroupFields">
              <BaseTextField
                v-if="groupField.FieldType == 1 && groupField.Column == 2"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                type="settled"
                :placeholder="groupField.Placeholder"
                :errorText="errorList?.[groupField.FieldName]"
                :model="groupField.FieldName"
                :defaultValue="recordInfo?.[groupField.FieldName]"
              />
              <BaseTextField
                v-if="groupField.FieldType == 2 && groupField.Column == 2"
                :key="groupField.GroupFieldID"
                :label="groupField.Label"
                :model="groupField.FieldName"
                type="settled"
                :defaultValue="
                  SAMPLE_DROPDOWN_OPTIONS.filter(
                    (x) => x.ID == recordInfo?.[groupField.FieldName]
                  )?.[0]?.Name
                "
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { cellFormatting } from "@/helpers/constants";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import { SAMPLE_DROPDOWN_OPTIONS } from "@/helpers/sampleDropdownListOptions";
import { getGroupConfigs, getRecordById } from "@/helpers/api";
import { ENUMS } from "@/helpers/enums";
export default {
  name: "BaseInfoForm",
  props: ["tableName"],
  data() {
    return {
      isPopupVisible: false,
      currentSection: "general-info",
      ACCOUNTING_TEXT,
      groupConfigs: [],
      recordInfo: {},
      SAMPLE_DROPDOWN_OPTIONS,
    };
  },

  async mounted() {
    const groupConfigs = await getGroupConfigs();
    this.groupConfigs = groupConfigs;
    const recordInfo = await getRecordById(
      this.$route.params.id,
      this.tableName
    );
    this.recordInfo = recordInfo;
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
