import React, { useState } from "react";
import { Flex, Text, Image, Box, Avatar, Divider } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
// import { Image } from '@chakra-ui/react';
import Actions from "../components/Actions";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";

function Postpage({ likes, replies, userImage }) {
  const [liked, setLiked] = useState(false);
  const { username } = useParams();
  return (
    <>
      <Flex flexDirection={"column"} w={"full"}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          py={"4px"}
          w={"full"}
        >
          <Avatar src={userImage} bg={"white"} size={"md"} />
          <Flex alignItems={"center"} justifyContent={"center"} gap={"3px"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {username}
            </Text>
            <Image src={"/verified.png"} alt="" w={".7rem"} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text fontStyle={"sm"}>1d</Text>
            <BsThreeDots />
          </Flex>
        </Flex>
        <Text fontSize={"small"}>This is my first post</Text>
        <Image src={"/post1.png"} alt={"post"} />
        <Flex gap={2} mt={2} color={"gray"}>
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={"center"} color={"gray"} fontSize={"sm"}>
          <Text fontStyle={"sm"}>{` ${replies} Replies`}</Text>
          <Box height={1} w={1} borderRadius={"50%"} bg={"gray"}></Box>
          <Text fontStyle={"sm"}>{`${likes} Likes`}</Text>
        </Flex>
        <Divider></Divider>
        <Comments
          comment={`You are doing great man`}
          user={"Tabrej"}
          likes={9301}
          replies={12}
        />
        <Comments
          comment={`You are doing great man`}
          user={"Johaib"}
          likes={100}
          replies={124}
        />
        <Comments
          comment={`You are doing great man`}
          user={"Motasim"}
          likes={172}
          replies={203}
        />
        <Comments
          comment={`You are doing great man`}
          user={"Arbaz"}
          likes={342}
          replies={223}
        />
      </Flex>
    </>
  );
}

export default Postpage;
