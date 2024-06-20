import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useFollowUnfollow from "../hooks/useFollowUnfollow";
import { Link } from "react-router-dom";

function SuggestedUser({ user }) {
  const { handleFollowUnfollow, updating, following } = useFollowUnfollow(user);
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      borderRadius={5}
      gap={2}
      key={user}
    >
      <Flex gap={2} as={Link} to={`${user.username}`} alignItems={"center"}>
        <Avatar size={"sm"} src={user.profilePic} />
        <Box>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {user.username}
          </Text>
          {/* <Image src="/verified.png" alt="Verified" w={".7rem"} /> */}
          <Text fontSize={"sm"} color={"gray.light"}>
            {user.name}
          </Text>
        </Box>
      </Flex>
      <Button
        size={"sm"}
        bg={following ? "white" : "skyblue"}
        color={following ? "black" : "white"}
        isLoading={updating}
        onClick={handleFollowUnfollow}
        _hover={{
          color: following ? "black" : "white",
          opacity: 0.8,
        }}
      >
        {following ? "unfollow" : "Follow"}
      </Button>
    </Flex>
  );
}

export default SuggestedUser;
