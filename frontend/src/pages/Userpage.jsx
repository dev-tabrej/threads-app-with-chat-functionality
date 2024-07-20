import React, { useEffect, useState } from "react";
import Userheader from "../components/Userheader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useToast";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postAtom from "../atoms/postAtom";
import baseUrl from "../hooks/url.js";
function Userpage() {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const [posts, setPosts] = useRecoilState(postAtom);
  const [fetchingPosts, setFetchingPosts] = useState(false);
  const ShowToast = useShowToast();

  useEffect(() => {
    const getPosts = async () => {
      const token = localStorage.getItem("user-threads");
      setFetchingPosts(true);
      try {
        const res = await fetch(`${baseUrl}/api/posts/user/${username}`,{
          method:"GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        
        console.log(data); // Log the data to verify its structure
    
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          console.error("Expected an array but got:", data);
          ShowToast("Error", "Unexpected data format", "error");
          setPosts([]);
        }
      } catch (error) {
        ShowToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };
    

    getPosts();
  }, [username, setPosts]);
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
