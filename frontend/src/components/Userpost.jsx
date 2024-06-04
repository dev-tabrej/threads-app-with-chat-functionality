import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Avatar, Box, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

function Userpost({ likes, replies, postTitle, postImage }) {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={"/markzuckerberg/posts/1"} style={{ textDecoration: "none" }}>
      <Flex gap={3} mb={4} py={5}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Avatar src="/zuck-avatar.png" bg={"white"} size={"md"} />
          <Box w={"1px"} h={"full"} my={2} bg={"gray.light"}></Box>
          <Box position={"relative"} width={"full"}>
            <Avatar
              src="/light.svg"
              size={"xs"}
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              border={"1px"}
              padding={"2px"}
            />
            <Avatar
              src="/Dark.svg"
              size={"xs"}
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              border={"1px"}
              padding={"2px"}
            />
            <Avatar
              src="/vite.svg"
              size={"xs"}
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              border={"1px"}
              padding={"2px"}
            />
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
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzuckerberg
              </Text>
              <Image src={"/verified.png "} alt="" w={".7rem"} />
            </Flex>
            <Flex gap={2} alignItems={"center"}>
              <Text fontStyle={"sm"}>1d</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"small"}>{postTitle}</Text>
          {postImage && <Image src={postImage} alt={"post"} />}
          <Flex gap={2} mt={2} color={"gray"}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"} color={"gray"} fontSize={"sm"}>
            <Text fontStyle={"sm"}>{`${replies} Replies`}</Text>
            <Box height={1} w={1} borderRadius={"50%"} bg={"gray"}></Box>
            <Text fontStyle={"sm"}>{`${likes} Likes`}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default Userpost;
