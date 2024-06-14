import React, { useEffect, useState } from "react";
import Userheader from "../components/Userheader";
import Postpage from "../components/Userpost";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
// import Userpost from "../components/Userpost";
import useShowToast from "../hooks/useToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
function Userpage() {
  // const [user, setUser] = useState(null);
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  // const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const ShowToast = useShowToast();

  useEffect(() => {
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
        // console.log(data);
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
      {!fetchingPosts && posts.length === 0 && (
        <Text fontSize={"xl"} textAlign={"center"} mt={12}>
          User have no posts
        </Text>
      )}
      {fetchingPosts && (
        <Flex justifyContent={"center"} mt={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
}

export default Userpage;
