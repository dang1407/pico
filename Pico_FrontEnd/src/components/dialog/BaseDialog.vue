<template>
  <DxPopup
    content-template="dialog-content"
    :visible="isDialogShown && dialogID == id"
    :show-title="true"
    :width="435"
    :height="200"
    :title="dialogTitle"
    :onHidden="onHidden"
  >
    <template #dialog-content>
      <div style="padding: 0 24px; display: flex; flex-direction: column">
        <div class="dialog-body" v-html="dialogText"></div>
        <div class="dialog-footer">
          <div @click="cancelAction" v-if="dialogType != 'conflict'">
            <BaseButton type="default" :text="cancelText" />
          </div>
          <div v-if="dialogType == 'change'" @click="declineAction">
            <BaseButton type="default" :text="declineText" />
          </div>
          <div @click="acceptAction">
            <BaseButton
              :type="dialogType == 'change' ? 'primary' : 'warning'"
              :text="acceptText"
            />
          </div>
        </div>
      </div>
    </template>
  </DxPopup>
</template>
<script>
import { DxPopup } from "devextreme-vue";
import { mapState } from "vuex";
export default {
  name: "BaseDialog",
  components: { DxPopup },
  props: ["cancelText", "declineText", "acceptText", "id"],
  computed: {
    ...mapState([
      "isDialogShown",
      "dialogTitle",
      "dialogText",
      "dialogType",
      "dialogID",
    ]),
  },
  methods: {
    /**
     * Feature: Hành động khi ấn nút cancel
     * Author: Lê Minh Quang (29/08/2023)
     */
    cancelAction() {
      this.$emit("cancelAction");
    },
    /**
     * Feature: Hành động khi ấn nút decline
     * Author: Lê Minh Quang (29/08/2023)
     */
    declineAction() {
      this.$emit("declineAction");
    },
    /**
     * Feature: Hành động khi ấn nút accept
     * Author: Lê Minh Quang (29/08/2023)
     */
    acceptAction() {
      this.$emit("acceptAction");
    },
    /**
     * Feature: Đóng dialog
     * Author: Lê Minh Quang (29/08/2023)
     */
    onHidden() {
      this.$store.dispatch("clearDialog");
    },
  },
};
</script>
<style scoped>
.dx-popup-title {
  padding: 16px 20px 16px !important;
}
.dialog-body {
  flex-grow: 1;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 24px 0;
}
</style>
