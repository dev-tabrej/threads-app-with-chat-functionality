import React from "react";
import { Box, Flex, VStack, Text, Link } from "@chakra-ui/react";
import { Avatar, useToast } from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuItem, MenuList, MenuButton } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";
function Userheader({ userName, userImage }) {
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
  return (
    <VStack spacing={200} gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} variant="" fontWeight={"bold"}>
            {userName}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{`@${userName}`}</Text>
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
          <Avatar name="logo" src={userImage} size={"xl"} />
        </Box>
      </Flex>
      <Text variant="">Co-Founder of Instagram,CEO of meta</Text>
      <Flex justifyContent={"space-between"} width={"full"}>
        <Flex flexDirection={"row"} alignItems={"center"} gap={2}>
          <Text variant="" color={"gray.light"}>
            3.2K followers
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
