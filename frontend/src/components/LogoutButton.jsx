import { Button } from "@chakra-ui/react";
import React from "react";
import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
import useShowToast from "../hooks/useToast";
import { MdOutlineLogout } from "react-icons/md";

function LogoutButton() {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/logoutUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("Error: ", data.error, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error: ", error, "error");
    }
  };
  return (
    <Button size={"sm"} onClick={handleLogout}>
      <MdOutlineLogout />
      Logout
    </Button>
  );
}

export default LogoutButton;
