import { useState } from "react";
import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Postpage from "./pages/Postpage";
import Userpage from "./pages/Userpage";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import AuthPage from "./pages/AuthPage";
function App() {
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<AuthPage />} />
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
    </Container>
  );
}

export default App;
