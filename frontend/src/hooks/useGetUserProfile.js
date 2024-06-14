import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useToast";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/profile/${username}`,
          {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        // setUser(data);
        if (data.error) {
          console.log(data.error);
          ShowToast("something went wrong", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        ShowToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username]);
  return { loading, user };
};
export default useGetUserProfile;
