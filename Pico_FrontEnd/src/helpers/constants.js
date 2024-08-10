import store from "@/store";
import { ACCOUNTING_TEXT } from "./resources";
import { SAMPLE_DROPDOWN_OPTIONS } from "./sampleDropdownListOptions";

export const EMPLOYEE_VIEW_HEADERS = [
  {
    id: 1,
    model: "ID",
    name: "Mã sản phẩm",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 100,
  },
  {
    id: 2,
    model: "ProductName",
    name: "Tên sản phẩm",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 3,
    model: "ProductBrand",
    name: "Hãng sản phẩm",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
    FieldType: 2,
  },
  {
    id: 4,
    model: "ProductPrice",
    name: "Giá",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 5,
    model: "ProductSize",
    name: "Kích thước",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 100,
  },
  {
    id: 6,
    model: "ProductOrigin",
    name: "Xuất xứ",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
    FieldType: 2,
  },
  {
    id: 7,
    model: "ProductMaterial",
    name: "Vật liệu",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 200,
  },
  {
    id: 8,
    model: "ProductYear",
    name: "Ngày sản xuất",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 9,
    model: "ProductQuantity",
    name: "Số lượng",
    alignment: "center",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 10,
    model: "ProductImage",
    name: "Hình ảnh",
    alignment: "center",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
];

export const TELEVISON_TABLE_HEADERS = [
  {
    id: 1,
    model: "ID",
    name: "Mã sản phẩm",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 100,
  },
  {
    id: 2,
    model: "ProductName",
    name: "Tên sản phẩm",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 3,
    model: "ProductBrand",
    name: "Hãng sản phẩm",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
    FieldType: 2,
  },
  {
    id: 4,
    model: "ProductPrice",
    name: "Giá",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 5,
    model: "ProductSize",
    name: "Kích thước",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 100,
  },
  {
    id: 6,
    model: "ProductOrigin",
    name: "Xuất xứ",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
    FieldType: 2,
  },
  {
    id: 7,
    model: "ProductMaterial",
    name: "Vật liệu",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 200,
  },
  {
    id: 8,
    model: "ProductYear",
    name: "Ngày sản xuất",
    alignment: "left",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 9,
    model: "ProductQuantity",
    name: "Số lượng",
    alignment: "center",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
  {
    id: 10,
    model: "ProductImage",
    name: "Hình ảnh",
    alignment: "center",
    isFixed: false,
    isDisplayed: true,
    width: 150,
  },
];

export const PAGING_OPTIONS = [
  {
    value: 25,
    text: "25",
  },
  {
    value: 50,
    text: "50",
  },
  {
    value: 100,
    text: "100",
  },
];

/**
 * Feature: Format cell dữ liệu
 * @param {*} value
 * @param {*} model
 * @returns
 * Author: Lê Minh Quang (19/08/2022)
 */

export const cellFormatting = (value, model, fieldType = null) => {
  if (model == "ProductPrice") {
    return modelConversion(value, model);
  } else if (fieldType != null) {
    return (
      SAMPLE_DROPDOWN_OPTIONS.filter((x) => x.ID == value)?.[0]?.Name || ""
    );
  } else {
    return null;
  }
};

/**
 * Feature: Làm phẳng array object
 * @param {*} arr
 * @returns
 * Author: Lê Minh Quang (19/08/2022)
 */

export function flattenArray(arr) {
  const result = [];

  function flatten(obj) {
    result.push({ id: obj.id, name: obj.name });

    if (Array.isArray(obj.items)) {
      obj.items.forEach((item) => {
        flatten(item);
      });
    }
  }

  arr.forEach((obj) => {
    flatten(obj);
  });

  return result;
}

/**
 * Feature: Format dữ liệu trả về
 * @param {*} value
 * @param {*} model
 * @param {*} list
 * @returns
 * Author: Lê Minh Quang (19/08/2022)
 */

const modelConversion = (value, model, list) => {
  if (value != null) {
    if (model.toLowerCase().includes("date")) {
      return new Date(value).toLocaleDateString("en-GB");
    } else if (model.toLowerCase().includes("deduction")) {
      return new Date(value).toLocaleDateString("en-GB").substring(3);
    } else if (model == "Gender") {
      return value == 0 ? "Nữ" : value == 1 ? "Nam" : null;
    } else if (model == "ProductPrice") {
      return value.toLocaleString("en-US", { useGrouping: true }) + " VND";
    } else {
      return list.filter((item) => item.ID == value)?.[0]?.Name || null;
    }
  }

  return null;
};

/**
 * Feature: Hiển thị toast
 * @param {*} message
 * @param {*} type
 * Author: Lê Minh Quang (19/08/2022)
 */

export const showToast = (message, type) => {
  store.commit("showToast", {
    isToastShown: true,
    toastMessage: message,
    toastType: type,
  });
  setTimeout(() => {
    store.commit("hideToast");
  }, 2000);
};

/**
 * Feature: Xử lý lỗi từ be
 * @param {*} error
 * Author: Lê Minh Quang (19/08/2022)
 */
export const handleError = (error) => {
  if (error?.response) {
    if (error?.response?.status != 500) {
      store.dispatch("hideLoading");
      store.dispatch("showDialog", {
        dialogID: 99,
        dialogText: `${error?.response?.data?.UserMessage}`,
        dialogTitle: ACCOUNTING_TEXT.words.Warning,
        dialogType: "conflict",
      });
    } else {
      store.dispatch("hideLoading");
      showToast(
        error.response?.data?.UserMessage ||
          ACCOUNTING_TEXT.Message.SystemError,
        "error"
      );
    }
  } else {
    store.dispatch("hideLoading");
    showToast(ACCOUNTING_TEXT.Message.SystemError, "error");
  }
};

export const DEFAULT_UPDATE_FAMILY_FORM_VALUES = {
  Gender: 1,
  DocumentType: 1,
  Nation: 1,
  FormMode: 2,
};

export const DEFAULT_CREATE_FORM_VALUES = {
  Gender: 1,
  DocumentType: 1,
  Nation: 1,
  FormMode: 1,
};
