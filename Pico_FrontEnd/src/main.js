import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "devextreme/dist/css/dx.light.css";
import BaseButton from "@/components/button/BaseButton.vue";
import BaseCard from "@/components/card/BaseCard.vue";
import BaseTextField from "@/components/input/BaseTextField.vue";
import BaseDropDown from "@/components/dropdown/BaseDropDown.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import BaseRadioGroup from "@/components/radio/BaseRadioGroup.vue";
import BaseDatePicker from "@/components/datepicker/BaseDatePicker.vue";
import BaseDialog from "@/components/dialog/BaseDialog.vue";
import { clickOutside } from "./directives";
import FloatingVue from "floating-vue";
import { VTooltip } from "floating-vue";
import "floating-vue/dist/style.css";
Vue.config.productionTip = false;
Vue.use(FloatingVue);
Vue.component("BaseButton", BaseButton);
Vue.component("BaseCard", BaseCard);
Vue.component("BaseTextField", BaseTextField);
Vue.component("BaseTable", BaseTable);
Vue.component("BaseDropDown", BaseDropDown);
Vue.component("BaseRadioGroup", BaseRadioGroup);
Vue.component("BaseDatePicker", BaseDatePicker);
Vue.component("BaseDialog", BaseDialog);
Vue.directive("click-outside", clickOutside);
Vue.directive("tooltip", VTooltip);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
