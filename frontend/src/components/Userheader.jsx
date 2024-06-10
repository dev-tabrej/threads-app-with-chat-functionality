import { React, useState } from "react";
import { Box, Flex, VStack, Text, Link, Button } from "@chakra-ui/react";
import { Avatar, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
function Userheader({ user }) {
  // console.log("User header", user);
  const [follow, setFollow] = useState(false);
  const [currentUser] = useRecoilState(userAtom);
  console.log("Current user", currentUser);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );
  console.log(following);
  const toast = useToast();
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: "Account created.",
      description: "Link address copied.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  console.log("user: from userheader", user);

  const handleFollowUnfollow = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/users/follow/${user._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        console.log(data.error);
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        return;
      }
      if (following) {
        toast({
          title: "User Unfollowed",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        user.followers.pop();
      } else {
        toast({
          title: "User Followed",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
  };
  return (
    <VStack spacing={200} gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} variant="" fontWeight={"bold"}>
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
      <Text variant="">{user.bio}</Text>
      {currentUser._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex justifyContent={"space-between"} width={"full"}>
        <Flex flexDirection={"row"} alignItems={"center"} gap={2}>
          <Text variant="" color={"gray.light"}>
            {`${user.followers.length} Followers`}
          </Text>
          <Box h={1} w={1} borderRadius={"100%"} bg={"gray.light"}></Box>
          <Link variant="" color={"gray.light"}>
            instagram.com
          </Link>
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
          variant=""
          borderBottom={".5px solid white"}
          color={"grey.900"}
          w={"50%"}
          textAlign={"center"}
        >
          Threads
        </Text>
        <Text variant="" w={"50%"} textAlign={"center"} color={"darkgrey"}>
          Replies
        </Text>
      </Flex>
    </VStack>
  );
}

export default Userheader;
