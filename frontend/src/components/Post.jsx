import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Text, Avatar, Box, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import useShowToast from "../hooks/useToast";
import { formatDistanceToNow } from "date-fns";
function Post({ post, postedBy }) {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/profile/${postedBy}`, // Ensure the URL is correct
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        // console.log("Fetched user profile:", data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [postedBy]);
  if (!user) return null;
  return (
    <Link
      to={`/${user.username}/post/${post._id}`}
      style={{ textDecoration: "none" }}
    >
      <Flex gap={3} mb={4} py={5}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar
            src={user.profilePic}
            name={user.name}
            bg={"white"}
            size={"md"}
            onClick={(e) => {
              e.preventDefault();
              navigate(`${user.username}`);
            }}
          />
          <Box w={"1px"} h={"full"} my={2} bg={"gray.light"}></Box>
          <Box position={"relative"} width={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>😒</Text>}
            {post.replies[0] && (
              <Avatar
                src={post.replies[0].userProfilePic}
                size={"xs"}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                border={"1px"}
                padding={"2px"}
              />
            )}
            {post.replies[1] && (
              <Avatar
                src={post.replies[1].userProfilePic}
                size={"xs"}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                border={"1px"}
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                src={post.replies[2].userProfilePic}
                size={"xs"}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                border={"1px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>
        <Flex flexDirection={"column"} w={"full"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"flex-start"}
            py={"4px"}
            w={"full"}
          >
            <Flex alignItems={"center"} justifyContent={"center"} gap={"3px"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`${user.username}`);
                }}
              >
                {user.username}
              </Text>
              <Image src={"/verified.png "} alt="" w={".7rem"} />
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <Text fontStyle={"xs"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} Ago
              </Text>
            </Flex>
          </Flex>
          <Text fontSize={"small"}>{post.postTitle}</Text>
          {post.img && <Image src={post.img} alt={"post"} />}
          <Flex gap={2} mt={2} color={"gray"}>
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default Post;
