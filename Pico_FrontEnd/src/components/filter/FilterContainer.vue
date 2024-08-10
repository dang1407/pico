<template>
  <div class="filter-container" v-if="isFilterContainerOpened">
    <div class="filter-container__header">
      <div class="title">{{ ACCOUNTING_TEXT.words.Filter }}</div>
      <div @click="closeFilterContainer">
        <BaseButton icon="close" type="icon" />
      </div>
    </div>
    <div class="filter-container__body">
      <div
        class="row-content"
        :class="{ active: !!tempObj?.WorkStatus?.toString() }"
      >
        <div class="row-filter">
          <DxCheckBox
            :value="!!tempObj?.WorkStatus?.toString()"
            @value-changed="() => handleValueChange('WorkStatus')"
          />
          <div class="filter-label">{{ ACCOUNTING_TEXT.Label.WorkStatus }}</div>
        </div>
        <BaseRadioGroup
          v-if="!!tempObj?.WorkStatus?.toString()"
          type="default"
          :radioList="[
            { text: ACCOUNTING_TEXT.words.IsWorking, value: 1 },
            { text: ACCOUNTING_TEXT.words.NotWorking, value: 0 },
          ]"
          :defaultValue="tempObj?.WorkStatus"
          model="WorkStatus"
          @updateField="radioChange"
        />
      </div>
      <div
        class="row-content"
        :class="{ active: tempObj?.EmployeeType?.toString() }"
      >
        <div class="row-filter">
          <DxCheckBox
            :value="!!tempObj?.EmployeeType?.toString()"
            @value-changed="() => handleValueChange('EmployeeType')"
          />
          <div class="filter-label">
            {{ ACCOUNTING_TEXT.Label.EmployeeType }}
          </div>
        </div>
        <BaseRadioGroup
          v-if="!!tempObj?.EmployeeType?.toString()"
          type="default"
          :radioList="[
            { text: ACCOUNTING_TEXT.words.Employee, value: 1 },
            { text: ACCOUNTING_TEXT.words.Guest, value: 2 },
          ]"
          :defaultValue="tempObj?.EmployeeType"
          model="EmployeeType"
          @updateField="radioChange"
        />
      </div>
      <div
        class="row-content"
        :class="{ active: tempObj?.TaxCode?.toString() }"
      >
        <div class="row-filter">
          <DxCheckBox
            :value="!!tempObj?.TaxCode?.toString()"
            @value-changed="() => handleValueChange('TaxCode')"
          />
          <div class="filter-label">{{ ACCOUNTING_TEXT.Label.TaxCode }}</div>
        </div>
        <BaseRadioGroup
          v-if="!!tempObj?.TaxCode?.toString()"
          type="default"
          :radioList="[
            { text: ACCOUNTING_TEXT.words.HavingTaxCode, value: 1 },
            { text: ACCOUNTING_TEXT.words.NotHavingTaxCode, value: 0 },
          ]"
          :defaultValue="tempObj?.TaxCode"
          model="TaxCode"
          @updateField="radioChange"
        />
      </div>
      <div
        class="row-content"
        :class="{ active: !!shownDateValue?.toString() }"
      >
        <div class="row-filter">
          <DxCheckBox
            @value-changed="() => handleValueChange('Time')"
            :value="!!shownDateValue?.toString()"
          />
          <div class="filter-label">{{ ACCOUNTING_TEXT.words.Time }}</div>
        </div>

        <BaseRadioGroup
          v-if="!!shownDateValue?.toString()"
          model="Time"
          type="default"
          :radioList="[
            { text: ACCOUNTING_TEXT.Label.ProbationDate, value: 1 },
            { text: ACCOUNTING_TEXT.Label.OfficialDate, value: 0 },
          ]"
          :defaultValue="shownDateValue"
          @updateField="radioChange"
        />
        <div
          style="
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-bottom: 8px;
          "
          v-if="!!shownDateValue?.toString()"
        >
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.words.FromDate"
            :model="`${
              shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'
            }Start`"
            @updateField="radioChange"
            :defaultValue="
              tempObj?.[
                `${shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'}Start`
              ]
            "
            :max="
              tempObj?.[
                `${shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'}End`
              ]
                ? new Date(
                    tempObj?.[
                      `${
                        shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'
                      }End`
                    ]
                  )
                : null
            "
          />
          <BaseDatePicker
            :label="ACCOUNTING_TEXT.words.ToDate"
            :model="`${
              shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'
            }End`"
            @updateField="radioChange"
            :defaultValue="
              tempObj?.[
                `${shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'}End`
              ]
            "
            :min="
              tempObj?.[
                `${shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'}Start`
              ]
                ? new Date(
                    tempObj?.[
                      `${
                        shownDateValue == 1 ? 'ProbationDate' : 'OfficialDate'
                      }Start`
                    ]
                  )
                : null
            "
          />
        </div>
      </div>
    </div>
    <div class="filter-container__footer">
      <div class="filter-action__btn-group">
        <div @click="clearFilter">
          <BaseButton
            :text="ACCOUNTING_TEXT.words.ClearFilter"
            type="default"
          />
        </div>
        <div @click="applyFilter">
          <BaseButton
            :text="ACCOUNTING_TEXT.words.Apply"
            type="primary"
            :disabled="!isAllowed"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DxCheckBox } from "devextreme-vue";
import { mapState } from "vuex";
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "FilterContainer",
  components: { DxCheckBox },
  computed: {
    ...mapState(["isFilterContainerOpened", "filterObj"]),
    // Kiểm tra có cho lọc không
    isAllowed: function () {
      return Object.keys(this.tempObj).some(
        (item) => !!this.tempObj?.[item]?.toString()
      );
    },
  },
  data() {
    return {
      tempObj: {},
      shownDateValue: null,
      ACCOUNTING_TEXT,
    };
  },

  watch: {
    /**
     * Feature: Check thay đổi của bộ lọc
     * Author: Lê Minh Quang (20/08/2023)
     */
    filterObj: {
      immediate: true,
      handler(newVal) {
        this.tempObj = Object.assign({}, newVal);
        if (
          Object.keys(newVal).some(
            (item) => item.includes("Official") && newVal?.[item]
          )
        ) {
          this.shownDateValue = 0;
        } else if (
          Object.keys(newVal).some(
            (item) => item.includes("Probation") && newVal?.[item]
          )
        ) {
          this.shownDateValue = 1;
        }
      },
    },
  },

  methods: {
    /**
     * Feature: Đóng container lọc
     * Author: Lê Minh Quang (24/08/2023)
     */
    closeFilterContainer() {
      this.$store.dispatch("toggleFilterContainer");
    },

    /**
     * Feature: Xử lý khi ấn chọn checkbox
     * Author: Lê Minh Quang (24/08/2023)
     */

    handleValueChange(model) {
      if (model != "Time") {
        if (this.tempObj?.[model]?.toString()) {
          this.$set(this.tempObj, model, null);
        } else {
          this.$set(this.tempObj, model, 1);
        }
      } else {
        if (
          !this.tempObj?.OfficialDateStart &&
          !this.tempObj?.OfficialDateEnd &&
          !this.tempObj?.ProbationDateStart &&
          !this.tempObj?.ProbationDateEnd
        ) {
          this.shownDateValue = 1;
          this.$set(this.tempObj, "ProbationDateStart", null);
        } else {
          this.$set(this.tempObj, "OfficialDateStart", null);
          this.$set(this.tempObj, "OfficialDateEnd", null);
          this.$set(this.tempObj, "ProbationDateStart", null);
          this.$set(this.tempObj, "ProbationDateEnd", null);
          this.shownDateValue = null;
        }
      }
    },

    /**
     * Feature: Cập nhật dữ liệu khi chọn radio button
     * Author: Lê Minh Quang (24/08/2023)
     */

    radioChange(value) {
      if (Object.keys(value)[0] != "Time") {
        this.tempObj = { ...this.tempObj, ...value };
      } else {
        this.shownDateValue = value.Time;
        if (value.Time) {
          this.tempObj.ProbationDateStart = this.tempObj.OfficialDateStart;
          this.tempObj.ProbationDateEnd = this.tempObj.OfficialDateEnd;
          this.tempObj.OfficialDateStart = null;
          this.tempObj.OfficialDateEnd = null;
        } else {
          this.tempObj.OfficialDateStart = this.tempObj.ProbationDateStart;
          this.tempObj.OfficialDateEnd = this.tempObj.ProbationDateEnd;
          this.tempObj.ProbationDateStart = null;
          this.tempObj.ProbationDateEnd = null;
        }
      }
    },

    /**
     * Feature: Áp dụng bộ lọc
     * Author: Lê Minh Quang (24/08/2023)
     */

    applyFilter() {
      if (this.isAllowed) {
        this.$store.dispatch("updateFilterObj", this.tempObj);
        this.$store.dispatch("toggleFilterContainer");
      }
    },

    /**
     * Feature: Xóa bộ lọc
     * Author: Lê Minh Quang (24/08/2023)
     */

    clearFilter() {
      this.$store.dispatch("clearFilterObj");
      this.$store.dispatch("toggleFilterContainer");
      this.shownDateValue = null;
    },
  },
};
</script>
<style scoped>
.row-content {
  display: flex;
  flex-direction: column;
}

.row-filter {
  display: flex;
  gap: 10px;
}

.filter-label {
  display: flex;
  align-items: center;
}

.dx-widget {
  display: flex !important;
}

.dx-collection {
  display: flex !important;
  gap: 10px;
}

.row-content.active {
  background-color: #f5f6f8;
}
</style>
