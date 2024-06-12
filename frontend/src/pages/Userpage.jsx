import React, { useEffect, useState } from "react";
import Userheader from "../components/Userheader";
import Postpage from "../components/Userpost";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Userpost from "../components/Userpost";
import useShowToast from "../hooks/useToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
function Userpage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const ShowToast = useShowToast();
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
  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}></Spinner>;
      </Flex>
    );
  }
  if (!user) {
    return (
      <Text fontSize={"xl"} textAlign={"center"} fontStyle={"bolder"}>
        User not found
      </Text>
    );
  }
  return (
    <>
      {/* <Header /> */}
      <Userheader user={user} />
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
