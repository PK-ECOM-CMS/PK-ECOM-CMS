import {
  deleteAdminUser,
  getAdminUser,
  getAllAdminUsers,
  getNewAccessJWT
  loginAdminUser,
  postUser,
  updateAdminUser,
  updateAdminUserPassword,
} from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { setAdminUser, setAllAdminUsers } from "./userSlice";
export const logInUserAction = (data) => async (dispatch) => {
  const resultPromise = loginAdminUser(data);
  toast.promise(resultPromise, { pending: "please wait..." });
  const { status, message, user, refreshJWT, accessJWT } = await resultPromise;
  toast[status](message);
  if (status === "success") {
    sessionStorage.setItem("accessJWT", accessJWT);
    localStorage.setItem("refreshJWT", refreshJWT);
    dispatch(setAdminUser(user));
  }
};
// register new admin user
export const registerAdminUserAction = async (data) => {
  const promisePending = postUser(data);
  toast.promise(promisePending, { pending: "Please wait..." });
  const result = await promisePending;
  toast[result.status](result.message);
  // ==================  The following returned status and message is used to set up as a response on the top of the registration page to read for the user ===================
  return result;
};
export const logoutUserAction = () => (dispatch) => {
  dispatch(setAdminUser({}));
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
};
// fetch user and mount in the redux store
export const getAdminUserAction = (token) => async (dispatch) => {
  const { status, user } = await getAdminUser(token);
  status === "success" && dispatch(setAdminUser(user));
};

export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");
  // if accessJWT exist, fetch user and mount user in out redux store
  if (accessJWT) {
    dispatch(getAdminUserAction());
  }

  // if only refreshJWT exist , fetch new access JWT and fetch user using newly fetched accessJWT
  else if (refreshJWT) {
    const token = await getNewAccessJWT();
    token ? dispatch(getAdminUserAction(token)) : dispatch(logoutUserAction());
  } else {
    dispatch(logoutUserAction());
  }
};
export const updateAdminProfileAction = (data) => async (dispatch) => {
  const promisePending = updateAdminUser(data);
  toast.promise(promisePending, { pending: "Please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getAdminUserAction());
};

export const updateAdminPasswordAction = async (data) => {
  const promisePending = updateAdminUserPassword(data);
  toast.promise(promisePending, { pending: "Please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
};
//   fetch all adminUsers Action
export const fetchAdminUsersAction = () => async (dispatch) => {
  const { status, admins } = await getAllAdminUsers();
  status === "success" && dispatch(setAllAdminUsers(admins));
};
// delete admin user action
export const deleteAdminUserAction = (_id) => async (dispatch) => {
  const promisePending = deleteAdminUser(_id);
  toast.promise(promisePending, { pending: "Please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && fetchAdminUsersAction();
};
