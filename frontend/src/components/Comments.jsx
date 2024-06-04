import React, { useState } from "react";
import { Flex, Text, Avatar, Box, Image, Divider } from "@chakra-ui/react";
import Actions from "./Actions";
import { BsThreeDots } from "react-icons/bs";

function Comments({ comment, user, likes, replies }) {
  const [liked, setLiked] = useState(false);
  const updatedLikes = liked ? likes + 1 : likes;

  return (
    <>
      <Flex w="full" justifyContent="flex-start" gap={2}>
        <Avatar name="" src="/zuck-avatar.png" h={10} w={10} />
        <Flex flexDirection="column" w="full">
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            py="4px"
            w="full"
          >
            <Flex alignItems="center" justifyContent="center" gap="3px">
              <Text fontSize="sm" fontWeight="bold">
                {user}
              </Text>
              <Image src="/verified.png" alt="" w=".7rem" />
            </Flex>
            <Flex gap={2} alignItems="center">
              <Text fontStyle="sm">1d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize="small">{comment}</Text>
          <Flex gap={2} mt={2} color="gray">
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems="center" color="gray" fontSize="sm">
            <Text fontStyle="sm">{`${replies} Replies`}</Text>
            <Box height={1} w={1} borderRadius="50%" bg="gray"></Box>
            <Text fontStyle="sm">{`${updatedLikes} Likes`}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </>
  );
}

export default Comments;
