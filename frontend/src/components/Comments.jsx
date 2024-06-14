import React, { useState } from "react";
import { Flex, Text, Avatar, Box, Image, Divider } from "@chakra-ui/react";
import Actions from "./Actions";
import { BsThreeDots } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

function Comments({ reply }) {
  // const user = useRecoilValue(userAtom);
  return (
    <>
      <Flex w="full" justifyContent="flex-start" gap={2} my={4}>
        <Avatar name="" src={reply.userProfilePic} h={10} w={10} />
        <Flex flexDirection="column" w="full">
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            py="4px"
            w="full"
          >
            <Flex alignItems="center" justifyContent="center" gap="3px">
              <Text fontSize="sm" fontWeight="bold">
                {reply.username}
              </Text>
              <Image src="/verified.png" alt="" w=".7rem" />
            </Flex>
          </Flex>
          <Text fontSize="small">{reply.text}</Text>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}

export default Comments;
