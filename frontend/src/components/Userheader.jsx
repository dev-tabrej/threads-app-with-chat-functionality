import React, { useState } from "react";
import { Box, Flex, VStack, Text, Link, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import useShowToast from "../hooks/useToast.js"; // Import the custom hook
import { useNavigate } from "react-router-dom"; // Import useNavigate
import useFollowUnfollow from "../hooks/useFollowUnfollow.js";

function Userheader({ user }) {
  const [currentUser] = useRecoilState(userAtom);
  // const [loading, setLoading] = useState(false);
  const { handleFollowUnfollow, updating, following } = useFollowUnfollow(user);

  const showToast = useShowToast(); // Use the custom hook
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to copy the current URL to clipboard
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    showToast("Link Copied", "Link address copied to clipboard.", "success");
  };

  // Function to handle follow/unfollow button click

  // Function to handle update user button click
  const handleUpdateUser = () => {
    navigate("/updateUser");
  };

  return (
    <VStack spacing={200} gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{`@${user.username}`}</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              p={1}
              borderRadius={5}
              color={"#ffffff"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name={user.name} src={user.profilePic} size={"xl"} />
        </Box>
      </Flex>
      <Text>{user.bio}</Text>
      {user._id !== currentUser?._id ? (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      ) : (
        <Button size={"sm"} onClick={handleUpdateUser}>
          Update User
        </Button>
      )}
      <Flex justifyContent={"space-between"} width={"full"}>
        <Flex flexDirection={"row"} alignItems={"center"} gap={2}>
          <Text
            color={"gray.light"}
          >{`${user.followers.length} Followers`}</Text>
          <Box h={1} w={1} borderRadius={"100%"} bg={"gray.light"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList>
                  <MenuItem onClick={copyUrl}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex
        width={"full"}
        justifyContent={"space-evenly"}
        borderBottom={"1px solid grey"}
        fontWeight={"bold"}
      >
        <Text
          borderBottom={".5px solid white"}
          color={"grey.900"}
          w={"50%"}
          textAlign={"center"}
        >
          Threads
        </Text>
        <Text w={"50%"} textAlign={"center"} color={"darkgrey"}>
          Replies
        </Text>
      </Flex>
    </VStack>
  );
}

export default Userheader;
