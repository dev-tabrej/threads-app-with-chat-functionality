import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../hooks/useToast";
import userAtom from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";
export default function Login({ haveAccount, setHaveAccount }) {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);
  const handelLogin = async () => {
    setLoading(true);

    try {
      if (!inputs.username || !inputs.password) {
        showToast("Error", "Enter a valid username and Password", "error");
        return;
      }
      const res = await fetch("http://localhost:5000/api/users/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Stack minH={"500px"} direction={{ base: "column", md: "row" }}>
      <Flex
        p={8}
        flex={1}
        borderRadius={"10px"}
        boxShadow={useColorModeValue("0 0  20px ", "0px 0px 10px black")}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              onChange={(e) => {
                setInputs((inputs) => ({
                  ...inputs,
                  username: e.target.value,
                }));
              }}
              value={inputs.username}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => {
                setInputs((inputs) => ({
                  ...inputs,
                  password: e.target.value,
                }));
              }}
              value={inputs.password}
            />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.500"}>Forgot password?</Link>
            </Stack>
            <Button
              colorScheme={"blue"}
              loadingText="Logging in."
              variant={"solid"}
              color={useColorModeValue("white", "gray.800")}
              onClick={handelLogin}
              isLoading={loading}
            >
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Don't have an Account?{" "}
              <Link
                color={"blue.400"}
                onClick={() => {
                  setHaveAccount(!haveAccount);
                }}
              >
                SignUp
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
