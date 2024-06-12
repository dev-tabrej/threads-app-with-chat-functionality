import React, { useEffect, useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useToast";
import Post from "./Post.jsx";

function Homepage() {
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("user-threads");
        console.log(token); // Debugging: Ensure the token is logged correctly
        if (!token) {
          throw new Error("No user-threads token found in localStorage");
        }

        // Send the token in the request and include credentials
        const res = await fetch("http://localhost:5000/api/posts/feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials to send cookies
        });
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        showToast("Success", "Posts loaded successfully", "success");
        setPosts(data);
      } catch (error) {
        showToast("Error", error.message || "An error occurred", "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPost();
  }, []);

  return (
    <>
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"}></Spinner>
        </Flex>
      )}
      {!loading && posts.length === 0 && (
        <Flex justifyContent={"center"}>
          <h1 size={"xl"}> Follow some users to see feed posts</h1>
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
}

export default Homepage;
