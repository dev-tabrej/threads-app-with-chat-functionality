import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Center,
  Avatar,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useImgPreview from "../hooks/useImgPreview";
import useShowToast from "../hooks/useToast";
import baseUrl from "../hooks/url";

export default function UpdateUser() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePic: user.profilePic,
    password: "",
  });

  const fileRef = useRef(null);
  const showToast = useShowToast();
  const { handleImgChange, imgUrl } = useImgPreview();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("user-threads");

      const updatedData = {
        ...inputs,
        profilePic: imgUrl || inputs.profilePic, // Ensure profilePic is handled correctly
      };

      const res = await fetch(`${baseUrl}/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure the token is added in this format
        },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error updating user");
      }

      // Update the local state with the new user data
      setUser(data.user);

      showToast("Success", "Profile updated successfully", "success");
    } catch (error) {
      console.error("Update Error:", error);
      showToast("Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userIcon">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || inputs.profilePic}></Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Icon
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImgChange}
                ></Input>
              </Center>
            </Stack>
          </FormControl>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="tabrej930"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="your bio here"
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="password"
              autoComplete="current-password" // Add autocomplete attribute to suppress warning
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
