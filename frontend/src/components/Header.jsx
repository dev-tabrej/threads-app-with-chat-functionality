import React from "react";
import { Flex, Link } from "@chakra-ui/react";
import { Image, useColorMode } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link as RouterLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { AiFillHome } from "react-icons/ai";
import LogoutButton from "./LogoutButton";
function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  return (
    <Flex justifyContent={"space-evenly"} mb={12} mt={6}>
      {user && (
        <Link as={RouterLink} to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor="pointer"
        justifySelf={"center"}
        src={colorMode === "light" ? "/light-logo.svg" : "/dark-logo.svg"}
        alt="logo"
        w={6}
        onClick={toggleColorMode}
      />

      {user && (
        <Flex justifyContent={"flex-end"} alignItems={"center"} gap={2}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          {user && <LogoutButton />}
        </Flex>
      )}
    </Flex>
  );
}

export default Header;
