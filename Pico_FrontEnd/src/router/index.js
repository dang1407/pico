import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },

  //noicom

  {
    path: "/rice-cooker",
    name: "rice-cooker",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NoiComView.vue"),
  },

  {
    path: "/rice-cooker/rice-cooker-detail-action",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/rice-cooker/action/NoiComActionView.vue"
      ),
  },
  {
    path: "/rice-cooker/rice-cooker-detail-action/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/rice-cooker/action/NoiComActionView.vue"
      ),
  },
  {
    path: "/rice-cooker/rice-cooker-detail-view/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/rice-cooker/detail/RiceCookerDetailView.vue"
      ),
  },

  //matgiat

  {
    path: "/washing-machine",
    name: "washing-machine",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MayGiatView.vue"),
  },

  {
    path: "/washing-machine/washing-machine-detail-action",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/washing-machine/action/MayGiatActionView.vue"
      ),
  },
  {
    path: "/washing-machine/washing-machine-detail-action/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/washing-machine/action/MayGiatActionView.vue"
      ),
  },
  {
    path: "/washing-machine/washing-machine-detail-view/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/washing-machine/detail/WashingMachineDetailView.vue"
      ),
  },
  //dieuhoa

  {
    path: "/air-conditioner",
    name: "air-conditioner",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DieuHoaView.vue"),
  },

  {
    path: "/air-conditioner/air-conditioner-detail-action",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/air-conditioner/action/DieuHoaActionView.vue"
      ),
  },
  {
    path: "/air-conditioner/air-conditioner-detail-action/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/air-conditioner/action/DieuHoaActionView.vue"
      ),
  },
  {
    path: "/air-conditioner/air-conditioner-detail-view/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/air-conditioner/detail/AirConditionerDetailView.vue"
      ),
  },
  //televison
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/televison",
    name: "televison",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TelevisonView.vue"),
  },
  {
    path: "/televison/televison-detail-action",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/televison/action/TelevisonActionView.vue"
      ),
  },
  {
    path: "/televison/televison-detail-action/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/televison/action/TelevisonActionView.vue"
      ),
  },
  {
    path: "/televison/televison-detail-view/:id",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/televison/detail/TelevisonDetailView.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
