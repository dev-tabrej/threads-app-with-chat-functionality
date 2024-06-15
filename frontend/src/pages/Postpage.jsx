import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  Box,
  Avatar,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comments from "../components/Comments";
import { useNavigate, useParams } from "react-router-dom";
import useShowToast from "../hooks/useToast";
import useGetUserProfile from "../hooks/useGetUserProfile.js";
import { DeleteIcon } from "@chakra-ui/icons";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import postAtom from "../atoms/postAtom.js";

function Postpage() {
  const { user, loading } = useGetUserProfile();
  const [posts, setPosts] = useRecoilState(postAtom);
  const showToast = useShowToast();
  const { pid } = useParams();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const currentPost = posts[0];
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/posts/getpost/${pid}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPosts([data]);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
    };
    getPost();
  }, [pid]);

  const handleDelete = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete")) return;
      const res = await fetch(
        `http://localhost:5000/api/posts/delete/${currentPost._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", data.message, "success");
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
      return;
    }
  };

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} mt={10}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!currentPost) return null;

  return (
    <Flex flexDirection={"column"} w={"full"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"flex-start"}
        py={"4px"}
        w={"full"}
      >
        <Flex alignItems={"center"} justifyContent={"center"} gap={"3px"}>
          <Avatar src={user.profilePic} mx={2} />
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          <Image src={"/verified.png "} alt="" w={".7rem"} />
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Text fontStyle={"xs"} color={"gray.light"}>
            {formatDistanceToNow(new Date(currentPost.createdAt))} Ago
          </Text>
          {user._id === currentUser?._id && (
            <DeleteIcon onClick={handleDelete} cursor={"pointer"} />
          )}
        </Flex>
      </Flex>

      <Text fontSize={"small"} fontWeight={"bold"} my={2}>
        {currentPost.postTitle}
      </Text>
      {currentPost.img && <Image src={currentPost.img} alt={"post"} />}
      <Flex gap={2} mt={2} color={"gray"}>
        <Actions post={currentPost} />
      </Flex>
      <Divider></Divider>
      {currentPost.replies.length > 0 ? (
        currentPost.replies.map((reply) => (
          <Comments
            key={reply._id}
            reply={reply}
            lastReply={
              reply._id ===
              currentPost.replies[currentPost.replies.length - 1]._id
            }
          />
        ))
      ) : (
        <Text>No replies yet</Text>
      )}
    </Flex>
  );
}

export default Postpage;
