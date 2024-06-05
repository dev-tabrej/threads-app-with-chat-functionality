import React from "react";
import Login from "../components/Login";
import SignupPage from "../components/SignupPage";

import { useState } from "react";
function AuthPage() {
  const [isloggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      {isloggedIn ? (
        <Login isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <SignupPage isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  );
}

export default AuthPage;
