import { apiConnector } from "../apiconnector";
import { complaintEndpoints } from "../apis";
import toast from "react-hot-toast";

const { 
  LIKE_COMMENT_API,
  DISLIKE_COMMENT_API,
} = complaintEndpoints;

export const likeComment = async (commentId, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      LIKE_COMMENT_API,
      { commentId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Like Comment API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Like Comment");
    }

    toast.success(response.data.message);
    success = true;
    result = response?.data;
  } catch (error) {
    success = false;
    console.log("Like Comment API ERROR............", error);
    toast.error(error.response.data.message);
    return success;
  }
  toast.dismiss(toastId);
  return result;
};

export const dislikeComment = async (commentId, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  let result = null;
  try {
    const response = await apiConnector(
      "PUT",
      DISLIKE_COMMENT_API,
      { commentId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Dislike Comment API RESPONSE............", response);

    if (!response?.data?.success) {
      throw new Error("Could Not Dislike Comment");
    }

    toast.success(response.data.message);
    success = true;
    result = response?.data;
  } catch (error) {
    success = false;
    console.log("Dislike Comment API ERROR............", error);
    toast.error(error.message);
    return success;
  }

  toast.dismiss(toastId);
  return result;
};