import { toast } from "react-toastify";
import {
  deletePaymentMethods,
  fetchPaymentMethods,
  postPaymentMethods,
  updatePaymentMethod,
} from "../../helpers/axiosHelper";
import { setPaymentMethods } from "./paymentmethodSlice";
import { setModalShow } from "../system-state/systemSlice";

export const getpaymentMethodsAction = () => async (dispatch) => {
  const { status, paymentMethods } = await fetchPaymentMethods();
  status === "success" && dispatch(setPaymentMethods(paymentMethods));
};
export const postpaymentMethodsAction = (data) => async (dispatch) => {
  const promisePending = postPaymentMethods(data);
  toast.promise(promisePending, { pending: "Please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" &&
    dispatch(setModalShow()) &&
    dispatch(getpaymentMethodsAction());
};

export const deletepaymentMethodsAction = (_id) => async (dispatch) => {
  const promisePending = deletePaymentMethods(_id);
  toast.promise(promisePending, { pending: "Please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getpaymentMethodsAction());
};

export const updatepaymentMethodsAction = (data) => async (dispatch) => {
  const promisePending = updatePaymentMethod(data);
  toast.promise(promisePending, { pending: "Please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" &&
    dispatch(setModalShow()) &&
    dispatch(getpaymentMethodsAction());
};
