/**
 * Feature: Xử lý khi click ra bên ngoài
 * Author: Lê Minh Quang (20/06/2023)
 */
export const clickOutside = {
  // Trước khi element được mount
  inserted: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      // Nếu element là hoặc chứa target click và target click không có class được truyền trong argument thì thực hiện hàm truyền vào
      if (
        !(el == event.target || el.contains(event.target)) &&
        !event.target.classList.contains(binding.arg)
      ) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent, true);
  },
  // Xóa event khi unmount
  unbind: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent, true);
  },
};
