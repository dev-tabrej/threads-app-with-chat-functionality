import { useState } from "react";
import { Container } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import Postpage from "./pages/Postpage";
import Userpage from "./pages/Userpage";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton";

function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<Userpage />} />
        <Route
          path="/:username/posts/:pid"
          element={
            <Postpage
              likes={103}
              replies={264}
              userImage={"/zuck-avatar.png"}
            />
          }
        />
      </Routes>
      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
