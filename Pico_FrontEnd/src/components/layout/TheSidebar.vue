<template>
  <div class="sidebar">
    <div class="sidebar__menu">
      <router-link v-for="item in menuList" :to="item.url" :key="item.text">
        <div
          class="sidebar__menu-items"
          :class="
            $route.path.includes(item.url)
              ? 'sidebar__menu-items--selected'
              : ''
          "
        >
          <div class="sidebar__menu-icon">
            <i :class="item.icon"></i>
          </div>
          <div style="flex-grow: 1; overflow-x: hidden">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="resize-button-container">
      <div class="resize-button">
        <span class="resize-button-text">{{
          ACCOUNTING_TEXT.sidebar.resize
        }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { ACCOUNTING_TEXT } from "@/helpers/resources";
export default {
  name: "TheSidebar",

  data() {
    return {
      ACCOUNTING_TEXT,
      menuList: [
        {
          icon: "sidebar__taxRegister-icon",
          text: ACCOUNTING_TEXT.sidebar.televisonManagement,
          url: "/televison",
        },
        {
          icon: "sidebar__taxRegister-icon",
          text: ACCOUNTING_TEXT.sidebar.conditonerManagement,
          url: "/air-conditioner",
        },
        {
          icon: "sidebar__taxRegister-icon",
          text: ACCOUNTING_TEXT.sidebar.washingMachineManagement,
          url: "/washing-machine",
        },
        {
          icon: "sidebar__taxRegister-icon",
          text: ACCOUNTING_TEXT.sidebar.riceCookerManagement,
          url: "/rice-cooker",
        },
      ],
    };
  },
};
</script>
