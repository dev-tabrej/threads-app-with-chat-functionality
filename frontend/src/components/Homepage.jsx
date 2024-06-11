import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Flex } from "@chakra-ui/react";
import useShowToast from "../hooks/useToast";

function Homepage() {
  const showToast = useShowToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

        // Send the token in the request
        const res = await fetch("http://localhost:5000/api/posts/feed", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
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
    <Link to={"/markzukerberg"}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button>Hello</Button>
      </Flex>
    </Link>
  );
}

export default Homepage;
