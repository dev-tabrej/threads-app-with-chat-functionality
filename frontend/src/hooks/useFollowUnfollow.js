import React, { useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "./useToast";

function useFollowUnfollow(user) {
  const [currentUser] = useRecoilState(userAtom);
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  const [following, setFollowing] = useState(
    currentUser && user.followers.includes(currentUser._id)
  );
  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Not logged in", "Log in to follow someone.", "error");
      return;
    }
    if (updating) return;

    setUpdating(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/follow/${user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (following) {
        showToast("User Unfollowed", data.message, "success");
        user.followers = user.followers.filter(
          (follower) => follower !== currentUser._id
        );
      } else {
        showToast("User Followed", data.message, "success");
        user.followers.push(currentUser._id);
      }

      setFollowing(!following);
    } catch (error) {
      showToast("Error", error.toString(), "error");
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
}
export default useFollowUnfollow;
