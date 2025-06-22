import axios from "axios";
const rootUrl = process.env.REACT_APP_SERVER_ENDPOINT + "api/v1/admin";
const adminUserEp = rootUrl + "/admin-user";
const categoriesEp = rootUrl + "/categories";
const paymentMethodsEp = rootUrl + "/payment-methods";
const itemsEp = rootUrl + "/items";
const ordersEp = rootUrl + "/orders";
const usersEp = rootUrl + "/users";
const reviewsEp = rootUrl + "/reviews";
const productsEp = rootUrl + "/products";

const apiProcessor = async ({ method, url, data, isPrivate, token }) => {
  try {
    const headers = isPrivate
      ? { Authorization: token || sessionStorage.getItem("accessJWT") }
      : null;
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    let message = error.message;
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
    }
    if (error.response && error.response.data) {
      message = error.response.data.message;
    }
    if (message === "jwt expired") {
      // call the api to get new access jwt and store in the session and re-call the api processor
      const accessJWT = await getNewAccessJWT();
      if (accessJWT) {
        return apiProcessor({ method, url, data, isPrivate, token });
      }
    }
    return {
      status: "error",
      message,
    };
  }
};

// =============================================================  Admin users APIs
// post new admin user
export const postUser = (data) => {
  const option = {
    method: "post",
    url: adminUserEp,
    data,
    isPrivate: true,
  };
  return apiProcessor(option);
};
// verify admin user account
export const emailVerifyAdminUser = (data) => {
  const option = {
    method: "patch",
    url: adminUserEp + "/verify-email",
    data,
  };
  return apiProcessor(option);
};
// login admin user
export const loginAdminUser = (data) => {
  const option = {
    method: "post",
    url: adminUserEp + "/login",
    data,
  };
  return apiProcessor(option);
};
// fetch admin user account
export const getAdminUser = (token) => {
  const option = {
    method: "get",
    url: adminUserEp,
    isPrivate: true,
    token,
  };
  return apiProcessor(option);
};
// fetch all admin user account
export const getAllAdminUsers = () => {
  const option = {
    method: "get",
    url: adminUserEp + "/all-admins",
    isPrivate: true,
  };
  return apiProcessor(option);
};
// update admin user
export const updateAdminUser = (data) => {
  const option = {
    method: "put",
    url: adminUserEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

// update admin password
export const updateAdminUserPassword = (data) => {
  const option = {
    method: "patch",
    url: adminUserEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};
// delete admin password
export const deleteAdminUser = (_id) => {
  const option = {
    method: "delete",
    url: adminUserEp + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};
// request OTP for resetting admin password
export const requestOTPResetAdminUserPassword = (data) => {
  const option = {
    method: "post",
    url: adminUserEp + "/request-pw-reset-otp",
    data,
  };
  return apiProcessor(option);
};

// Reset admin user password
export const ResetAdminUserPassword = (data) => {
  const option = {
    method: "patch",
    url: adminUserEp + "/reset-pw",
    data,
  };
  return apiProcessor(option);
};
// fetch new accessJWT
export const getNewAccessJWT = async () => {
  const option = {
    method: "get",
    url: adminUserEp + "/accessjwt",
    isPrivate: true,
    token: localStorage.getItem("refreshJWT"),
  };
  const { status, accessJWT } = await apiProcessor(option);
  status === "success" && sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};

// =============================================================== category api calls

// fetch categories
export const fetchCategories = (_id) => {
  const option = {
    method: "get",
    url: _id ? categoriesEp + "/" + _id : categoriesEp,
    isPrivate: true,
  };
  return apiProcessor(option);
};
// post new category
export const postCategories = (data) => {
  const option = {
    method: "post",
    url: categoriesEp,
    data,
    isPrivate: true,
  };
  return apiProcessor(option);
};

// update category
export const updateCategory = (data) => {
  const option = {
    method: "put",
    url: categoriesEp,
    data,
    isPrivate: true,
  };
  return apiProcessor(option);
};

// delete category

export const deleteCategory = (_id) => {
  const option = {
    method: "delete",
    url: categoriesEp + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};
//================================================================== Products Api calls

export const fetchProducts = (_id) => {
  const url = _id ? productsEp + "/" + _id : productsEp;
  const option = {
    method: "get",
    url,
    isPrivate: true,
  };
  return apiProcessor(option);
};

export const postProduct = (data) => {
  const option = {
    method: "post",
    url: productsEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

export const updateProduct = (data) => {
  const option = {
    method: "put",
    url: productsEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

export const deleteProduct = (_id) => {
  const option = {
    method: "delete",
    url: productsEp + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};

// =======================================================================  Items apis

export const fetchItems = (_id) => {
  const url = _id ? itemsEp + "/" + _id : itemsEp;
  const option = {
    method: "get",
    url,
    isPrivate: true,
  };
  return apiProcessor(option);
};

export const postItem = (data) => {
  const option = {
    method: "post",
    url: itemsEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

export const updateItem = (data) => {
  const option = {
    method: "put",
    url: itemsEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

export const deleteItem = (_id) => {
  const option = {
    method: "delete",
    url: itemsEp + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};
// ===========================================================    Payment Methods  APIs
export const fetchPaymentMethods = () => {
  const option = {
    method: "get",
    url: paymentMethodsEp,
    isPrivate: true,
  };
  return apiProcessor(option);
};

export const postPaymentMethods = (data) => {
  const option = {
    method: "post",
    url: paymentMethodsEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

export const deletePaymentMethods = (_id) => {
  const option = {
    method: "delete",
    url: paymentMethodsEp + "/" + _id,
    isPrivate: true,
  };
  return apiProcessor(option);
};

export const updatePaymentMethod = (data) => {
  const option = {
    method: "put",
    url: paymentMethodsEp,
    isPrivate: true,
    data,
  };
  return apiProcessor(option);
};

// ========================================================================= ORDERS APIs

export const fetchOrders = (_id) => {
  const option = {
    method: "get",
    url: _id ? ordersEp + "/" + _id : ordersEp,
    isPrivate: true,
  };
  return apiProcessor(option);
};

// ========================================================================= Users APIs

export const fetchusers = (_id) => {
  const option = {
    method: "get",
    url: _id ? usersEp + "/" + _id : usersEp,
    isPrivate: true,
  };
  return apiProcessor(option);
};

// ========================================================================== Reviews APIs

export const fetchReviews = (_id) => {
  const option = {
    method: "get",
    url: _id ? reviewsEp + "/" + _id : reviewsEp,
    isPrivate: true,
  };
  return apiProcessor(option);
};
