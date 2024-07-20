import {
  Avatar,
  Button,
  Flex,
  Text,
  Image,
  useColorModeValue,
  SkeletonCircle,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useShowToast from "../hooks/useToast";
import SuggestedUser from "./SuggestedUser";
import baseUrl from "../hooks/url";

function SuggestedUsers() {
  const [loading, setLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  // const following = false;
  const updating = false;
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true);
      const token=localStorage.getItem('user-threads');
      try {
        const res = await fetch(`${baseUrl}/api/users/suggested`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setSuggestedUsers(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getSuggestedUsers();
  }, []);

  return (
    <>
      <Flex
        flexDirection={"column"}
        // m={"20px 0 20px 100px"}
        minH={"fit-content"}
        // border={"2px solid black"}
        background={useColorModeValue("transparent", "gray.dark")}
      >
        <Text
          fontSize={"large"}
          m={2}
          fontWeight={"bold"}
          textAlign={"center"}
          color={useColorModeValue("gray.800", "gray.200")}
        >
          Suggested Users
        </Text>
        {loading &&
          suggestedUsers.map((_, index) => (
            <Flex
              alignItems={"center"}
              p={2}
              borderRadius={"md"}
              gap={2}
              key={index}
            >
              <Box>
                <SkeletonCircle size={10} />
              </Box>
              <Flex w={"full"} flexDirection={"column"} gap={2}>
                <Text>{<Skeleton h={"8px"} w={"90px"} m={2} />}</Text>
                <Text>{<Skeleton h={"8px"} w={"90px"} />}</Text>
              </Flex>
              <Flex>
                <Skeleton h={"20px"} w={"40px"} />
              </Flex>
            </Flex>
          ))}
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
      </Flex>
    </>
  );
}

export default SuggestedUsers;
