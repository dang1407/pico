import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    isToastShown: false,
    toastMessage: "",
    toastType: "",
    isSetupContainerShown: false,
    setUpPos: { x: 0, y: 0 },
    tableHeaders: [],
    isDialogShown: false,
    dialogText: "",
    dialogType: "",
    dialogTitle: "",
    familyInformations: [],
    dialogID: null,
    filterObj: {},
    isFilterContainerOpened: false,
    popUpMode: null,
    isPopUpVisible: false,
    popUpData: {},
    popUpSelectRow: null,
    familyModeImmidiate: false,
    curID: null,
    setUpView: null,
  },
  getters: {},
  mutations: {
    /**
     * Feature: Hiển thị toast
     * @param {*} state
     * @param {*} payload
     * Author: Lê Minh Quang (20/08/2023)
     */
    showToast(state, payload) {
      state.isToastShown = payload.isToastShown;
      state.toastMessage = payload.toastMessage;
      state.toastType = payload.toastType;
    },
    /**
     * Feature: Ẩn toast
     * @param {*} state
     * Author: Lê Minh Quang (20/08/2023)
     */
    hideToast(state) {
      state.isToastShown = false;
    },
    /**
     * Feature: Cập nhật cột bảng
     * @param {*} state
     * @param {*} updatedTableHeaders
     * Author: Lê Minh Quang (20/08/2023)
     */
    updateTableHeaders(state, updatedTableHeaders) {
      state.tableHeaders = updatedTableHeaders;
    },
  },
  actions: {
    /**
     * Feature: Toggle loading
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    toggleLoading({ state }) {
      state.isLoading = !state.isLoading;
    },
    /**
     * Feature: Tắt loading
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    hideLoading({ state }) {
      state.isLoading = false;
    },
    /**
     *
     * @param {*} param0
     * @param {*} payload
     */
    updateSetUpView({ state }, payload) {
      state.setUpView = payload;
    },

    /**
     * Feature: Cập nhật trạng thái thêm luôn nhân viên hay cùng lúc
     * @param {*} param0
     * @param {*} payload
     * Author: Lê Minh Quang (20/08/2023)
     */
    updateFamilyMode({ state }, payload) {
      state.familyModeImmidiate = payload.value;
      state.curID = payload.id;
    },

    /**
     * Feature: Bật tắc container lọc
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    toggleFilterContainer({ state }) {
      state.isFilterContainerOpened = !state.isFilterContainerOpened;
    },

    /**
     * Feature: Cập nhật bộ lọc
     * @param {*} param0
     * @param {*} value
     * Author: Lê Minh Quang (20/08/2023)
     */
    updateFilterObj({ state }, value) {
      state.filterObj = { ...state.filterObj, ...value };
    },

    /**
     * Feature: Reset bộ lọc
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    clearFilterObj({ state }) {
      if (state.setUpView == "management") {
        state.filterObj = { IsUsing: null };
      } else {
        state.filterObj = { IsUsing: 1 };
      }
    },
    /**
     * Feature: Bật tắt điều chỉnh container điều chỉnh giao diện
     * @param {*} param0
     * @param {*} setUpPos
     * Author: Lê Minh Quang (20/08/2023)
     */
    toggleShowingSetup({ state }, setUpPos) {
      state.isSetupContainerShown = !state.isSetupContainerShown;
      state.setUpPos = {
        x: setUpPos.x - 300,
        y: setUpPos.y + (state.setUpView == "management" ? -100 : 40),
      };
    },
    /**
     * Feature: Tắt container tùy chỉnh giao diện
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    closeSetup({ state }) {
      state.isSetupContainerShown = false;
    },
    /**
     * Feature: Update cột trong bảng
     * @param {*} param0
     * @param {*} updatedTableHeaders
     * Author: Lê Minh Quang (20/08/2023)
     */
    updateTableHeaders({ state }, updatedTableHeaders) {
      this.commit("updateTableHeaders", updatedTableHeaders);
      state.isSetupContainerShown = false;
      if (state.setUpView == "management") {
        localStorage.setItem(
          "tableHeaders_management",
          JSON.stringify(updatedTableHeaders)
        );
      } else {
        localStorage.setItem(
          "tableHeaders",
          JSON.stringify(updatedTableHeaders)
        );
      }
    },
    /**
     * Feature: Hiển thị dialog
     * @param {*} param0
     * @param {*} payload
     * Author: Lê Minh Quang (20/08/2023)
     */
    showDialog({ state }, payload) {
      state.isDialogShown = true;
      state.dialogText = payload.dialogText;
      state.dialogTitle = payload.dialogTitle;
      state.dialogType = payload.dialogType;
      state.dialogID = payload.dialogID;
    },
    /**
     * Feature: Tắt dialog
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    clearDialog({ state }) {
      state.isDialogShown = false;
      state.dialogID = null;
    },

    /**
     * Feature: Hiển thị popup
     * @param {*} param0
     * @param {*} payload
     * Author: Lê Minh Quang (20/08/2023)
     */
    showPopUp({ state }, payload) {
      state.isPopUpVisible = true;
      state.popUpMode = payload.popUpMode;
      state.popUpData = payload.popUpData;
      state.popUpSelectRow = payload.popUpSelectRow;
    },
    /**
     * Feature: Đóng popup
     * @param {*} param0
     * Author: Lê Minh Quang (20/08/2023)
     */
    closePopUp({ state }) {
      state.isPopUpVisible = false;
      state.popUpData = {};
      state.popUpMode = null;
    },
    /**
     * Feature: Đổi popup mode
     * @param {*} param0
     * @param {*} mode
     * Author: Lê Minh Quang (20/08/2023)
     */
    changePopUpMode({ state }, mode) {
      state.popUpMode = mode;
    },
  },

  modules: {},
});
