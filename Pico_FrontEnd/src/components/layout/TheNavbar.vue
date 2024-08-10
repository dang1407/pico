<template>
  <div class="navbar">
    <div class="navbar--left">
      <!-- <div class="navbar__menu-icon"></div> -->
      <div
        class="navbar__app-container"
        @click="$router.replace('/employee')"
        style="cursor: pointer"
      >
        <!-- <div class="app-logo"></div> -->
        <div class="app-name">Pico Admin</div>
      </div>
    </div>
    <div class="navbar--right">
      <!-- <div
        class="navbar__notification"
        v-tooltip="ACCOUNTING_TEXT.words.Notification"
      ></div>
      <div class="navbar__help" v-tooltip="ACCOUNTING_TEXT.words.Help"></div>
      <div
        class="navbar__other"
        v-tooltip="ACCOUNTING_TEXT.words.OtherFeature"
      ></div> -->
      <div class="navbar__avatar" @click="showOptionList">
        <div v-if="isOptionListShown" class="option-list">
          <div @click="logout">Đăng xuất</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ACCOUNTING_TEXT } from "@/helpers/resources";
import router from "@/router";
export default {
  name: "TheNavbar",
  data() {
    return { ACCOUNTING_TEXT, isOptionListShown: false };
  },
  methods: {
    logout() {
      localStorage.removeItem("isLogged");
      router.push("/login");
    },
    showOptionList() {
      this.isOptionListShown = !this.isOptionListShown;
    },
  },
};
</script>
<style scoped>
.navbar__avatar {
  position: relative;
}

.option-list {
  position: absolute;
  top: 100%;
  right: 20%;
  background-color: white;
  border-radius: 5px;
  white-space: nowrap;
  height: 150px;
  width: 150px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgb(209, 208, 208);
  z-index: 10;
}

.option-list > div {
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
}

.option-list > div:hover {
  background-color: rgb(210, 210, 210);
}
</style>
