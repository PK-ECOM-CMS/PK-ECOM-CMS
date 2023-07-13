import { fetchOrders } from "../../helpers/axiosHelper";
import { setOrders, setSelectedOrder } from "./orderSlice";
export const getOrders = () => async (dispatch) => {
  const { status, orders } = await fetchOrders();
  status === "success" && dispatch(setOrders(orders));
};

export const getSingleOrder = (_id) => async (dispatch) => {
  const { status, orders } = await fetchOrders(_id);
  status === "success" && dispatch(setSelectedOrder(orders));
};
