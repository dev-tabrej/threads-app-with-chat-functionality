import React from "react";
import Login from "../components/Login";
import SignupPage from "../components/SignupPage";

import { useState } from "react";
function AuthPage() {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <>
      {haveAccount ? (
        <Login haveAccount={haveAccount} setHaveAccount={setHaveAccount} />
      ) : (
        <SignupPage haveAccount={haveAccount} setHaveAccount={setHaveAccount} />
      )}
    </>
  );
}

export default AuthPage;
