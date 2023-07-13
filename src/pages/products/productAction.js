import { toast } from "react-toastify";
import {
  deleteProduct,
  fetchProducts,
  postProduct,
  updateProduct,
} from "../../helpers/axiosHelper";
import { setProducts } from "./productsSlice";

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await fetchProducts();
  status === "success" && dispatch(setProducts(products));
};

export const postProductsAction = (data) => async (dispatch) => {
  const promisePending = postProduct(data);
  toast.promise(promisePending, { pending: "Please wait" });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getProductsAction());
};
// update product
export const updateProductAction = (data) => async (dispatch) => {
  const promisePending = updateProduct(data);
  toast.promise(promisePending, { pending: "Please wait" });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getProductsAction());
};
// delete product
export const deleteProdcutAction = (_id) => async (dispatch) => {
  const promisePending = deleteProduct(_id);
  toast.promise(promisePending, { pending: "Please wait...." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getProductsAction());
};
