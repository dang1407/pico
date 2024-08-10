<template>
  <div class="login-form">
    <div
      style="
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      "
    >
      Đăng nhập
    </div>
    <div style="margin-bottom: 10px">
      <BaseTextField
        :label="'Tên đăng nhập'"
        type="text"
        :required="true"
        :placeholder="'Nhập tên đăng nhập'"
        :errorText="errorList?.['UserName']"
        model="UserName"
        @updateField="updateField"
        @clearErrorText="clearErrorText"
      />
    </div>
    <div style="margin-bottom: 10px">
      <BaseTextField
        :label="'Mật khẩu'"
        type="password"
        :required="true"
        :placeholder="'Nhập mật khẩu'"
        :errorText="errorList?.['Password']"
        model="Password"
        @updateField="updateField"
        @clearErrorText="clearErrorText"
      />
    </div>
    <div>
      <div style="display: flex; justify-content: center; margin-top: 10px">
        <div @click="login" style="margin-right: 10px">
          <BaseButton text="Đăng nhập" />
        </div>
        <div @click="register">
          <BaseButton text="Đăng ký" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseButton from "@/components/button/BaseButton.vue";
import BaseTextField from "@/components/input/BaseTextField.vue";
import router from "@/router";
import { loginAsync, registerAsync } from "@/helpers/api";
import { showToast } from "@/helpers/constants";

export default {
  name: "LoginView",
  components: { BaseTextField, BaseButton },
  data() {
    return {
      errorList: {},
      loginFormData: {},
      formMode: 0,
    };
  },
  beforeCreate() {
    const isLogged = localStorage.getItem("isLogged");
    if (isLogged) {
      if (router.currentRoute.name == "login") {
        router.push("/home");
      }
    }
  },
  methods: {
    updateField(value) {
      this.loginFormData = { ...this.loginFormData, ...value };
    },
    clearErrorText(model) {
      delete this.errorList?.[model];
      const newObj = Object.assign({}, this.errorList);
      this.errorList = newObj;
    },
    async login() {
      const res = await loginAsync(this.loginFormData);
      console.log(res.data);
      if (res.data != -1) {
        localStorage.setItem("isLogged", true);
        router.push("/home");
      } else {
        showToast("Tên đăng nhập hoặc mật khẩu không đúng!", "error");
      }
    },
    async register() {
      const res = await registerAsync(this.loginFormData);
      if (res.data != 0) {
        showToast("Đăng ký thành công!", "success");
        localStorage.setItem("isLogged", true);
        router.push("/home");
      } else {
        showToast("Tài khoản đã tồn tại", "error");
      }
    },
  },
};
</script>
<style scoped>
.login-form {
  width: 400px;
  background-color: white;
  border: 1px solid black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
}
</style>
