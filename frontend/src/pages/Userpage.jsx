import React from "react";
import Userheader from "../components/Userheader";
import Postpage from "../components/Userpost";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Userpost from "../components/Userpost";
function Userpage() {
  const { username } = useParams();
  return (
    <>
      {/* <Header /> */}
      <Userheader userName={username} userImage={`/zuck-avatar.png`} />
      <Userpost
        likes={1200}
        replies={107}
        userImage={`/zuck-avatar.png`}
        postImage={"/post1.png"}
        postTitle={"This is my first post"}
      />
      <Userpost
        likes={12390}
        replies={512}
        postImage={"/post3.png"}
        postTitle={"hey i m posting this"}
      />
      <Userpost
        likes={653}
        replies={822}
        postImage={"/post-2.png"}
        postTitle={"last post"}
      />
      <Userpost likes={1200} replies={3102} postTitle={"Toast is ready"} />
    </>
  );
}

export default Userpage;
