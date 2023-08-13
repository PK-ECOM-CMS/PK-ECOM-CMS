import { toast } from "react-toastify";
import {
  deleteItem,
  fetchItems,
  postItem,
  updateItem,
} from "../../helpers/axiosHelper";
import { setItems, setSelectedItem } from "./itemSlice";
export const getItemsAction = () => async (dispatch) => {
  const { status, items } = await fetchItems();
  status === "success" && dispatch(setItems(items));
};
export const getSingleItemAction = (_id) => async (dispatch) => {
  const { status, items } = await fetchItems(_id);
  status === "success" && dispatch(setSelectedItem(items));
};

export const postItemAction = (data) => async (dispatch) => {
  const responsePending = postItem(data);
  toast.promise(responsePending, { pending: "please wait..." });
  const { status, message } = await responsePending;
  toast[status](message);
};

export const updateItemAction = (data) => async (dispatch) => {
  const responsePending = updateItem(data);
  toast.promise(responsePending, { pending: "please wait..." });
  const { status, message } = await responsePending;
  toast[status](message);
  status === "success" && dispatch(getSingleItemAction(data._id));
};

export const deleteItemAction = (_id) => async (dispatch) => {
  const responsePending = deleteItem(_id);
  toast.promise(responsePending, { pending: "please wait..." });
  const { status, message } = await responsePending;
  toast[status](message);
};

