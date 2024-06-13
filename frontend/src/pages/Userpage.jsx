import React, { useEffect, useState } from "react";
import Userheader from "../components/Userheader";
import Postpage from "../components/Userpost";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
// import Userpost from "../components/Userpost";
import useShowToast from "../hooks/useToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
function Userpage() {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);
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
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/user/${username}`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data);
        if (data.error) {
          ShowToast("Eror", data.error, "error");
        }
        setPosts(data);
      } catch (error) {
        ShowToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    getUser();
    getPosts();
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
    </>
  );
}

export default Userpage;
