import { useState } from "react";
import { Container } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
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
import UpdateUser from "./components/UpdateUser";
import CreatePost from "./components/CreatePost";

function App() {
  const user = useRecoilValue(userAtom);
  // console.log(user);
  const { pathname } = useLocation();
  return (
    <Container
      maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
    >
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
        <Route
          path="/updateUser"
          element={user ? <UpdateUser /> : <Navigate to="/auth" />}
        />
        <Route path="/:username" element={<Userpage />} />
        <Route path="/:username/post/:pid" element={<Postpage />} />
      </Routes>

      {user && <CreatePost />}
    </Container>
  );
}

export default App;
