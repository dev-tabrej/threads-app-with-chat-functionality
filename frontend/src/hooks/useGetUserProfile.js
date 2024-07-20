import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useshowToast from "./useToast";
import baseUrl from "./url.js";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useshowToast();

  useEffect(() => {
    const getUser = async () => {
      const token = await localStorage.getItem("user-threads")
      try {
        const res = await fetch(`${baseUrl}/api/users/profile/${username}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        // setUser(data);
        if (data.error) {
          console.log(data.error);
          showToast("something went wrong", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]);
  return { loading, user };
};
export default useGetUserProfile;
