import { fetchReviews } from "../../helpers/axiosHelper";
import { setReviews } from "./reviewsSlice";

export const fetchReviewsAction = () => async (dispatch) => {
  const { status, reviews } = await fetchReviews();
  status === "success" && dispatch(setReviews(reviews));
};
