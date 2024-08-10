<template>
  <div class="layout" id="container">
    <div class="loading-container" v-if="isLoading">
      <div class="loading-layer"></div>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <DraggableContainer v-if="isSetupContainerShown" />
    <DxToast
      :visible="isToastShown"
      :displayTime="1000000000"
      content-template="custom-template"
    >
      <template #custom-template>
        <div
          class="toast-custom-content"
          :class="`${toastType == 'error' ? 'error' : 'success'}`"
        >
          <div class="toast-header">
            <div class="toast-icon"></div>
          </div>
          <div class="toast-content">{{ toastMessage }}</div>
          <div class="toast-end" @click="$store.commit('hideToast')"></div>
        </div>
      </template>
    </DxToast>
    <TheNavbar v-if="!$route.path.includes('login')" />
    <div class="content-container" v-if="!$route.path.includes('login')">
      <TheSidebar />

      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
    <div v-else style="position: relative; height: 100%">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import TheNavbar from "@/components/layout/TheNavbar.vue";
import TheSidebar from "@/components/layout/TheSidebar.vue";
import { DxToast } from "devextreme-vue";
import { mapState } from "vuex";
import DraggableContainer from "./components/draggable/DraggableContainer.vue";
import router from "./router";
export default {
  components: {
    TheSidebar,
    TheNavbar,
    DxToast,
    DraggableContainer,
  },
  computed: {
    ...mapState([
      "isToastShown",
      "toastMessage",
      "toastType",
      "isSetupContainerShown",
      "isLoading",
      "toastType",
    ]),
  },
  beforeCreate() {
    const isLogged = localStorage.getItem("isLogged");
    if (!isLogged) {
      if (router.currentRoute.name != "login") {
        router.push("/login");
      }
    } else {
      console.log("logged");
      if (router.currentRoute.name == "login") {
        router.push("/home");
      }
    }
  },
};
</script>

<style>
@import url("./assets/css/main.scss");
</style>
