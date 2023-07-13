import { fetchusers } from "../../helpers/axiosHelper";
import { setUsers } from "./usersSlice";

export const fetchUsersAction = () => async (dispatch) => {
  const { status, users } = await fetchusers();
  status === "success" && dispatch(setUsers(users));
};
