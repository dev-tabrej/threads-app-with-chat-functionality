import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorIcon,
  Input,
  Modal,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useImgPreview from "../hooks/useImgPreview.js";
import { BsFillImageFill } from "react-icons/bs";
import useShowToast from "../hooks/useToast.js";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import postAtom from "../atoms/postAtom.js";
import baseUrl from "../hooks/url";

const MAX_CHAR = 500;
function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const imageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [remainingText, setRemainingText] = useState(MAX_CHAR);
  const { handleImgChange, imgUrl, setImgUrl } = useImgPreview();
  const ShowToast = useShowToast();
  const user = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postAtom);
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    // setPostText(e.target.value);
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingText(0);
    } else {
      setPostText(inputText);
      setRemainingText(MAX_CHAR - inputText.length);
    }
  };
  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/posts/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postedBy: user._id,
          postTitle: postText,
          img: imgUrl,
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.error) {
        ShowToast("Error creating post", data.error, "error");
        return;
      }
      ShowToast("Success", "Post created successfully", "success");
      onClose();
      setPostText("");
      setImgUrl("");
      setPosts([data, ...posts]);
    } catch (error) {
      ShowToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        bg={useColorModeValue("gray.300", "gray.800")}
        size={"sm"}
        bg_hover={useColorModeValue("gray.100", "gray.800")}
        onClick={onOpen}
      >
        + Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Your content here"
                onChange={handleTextChange}
                value={postText}
              ></Textarea>
              <Text
                fontSize={"xs"}
                fontWeight={"bold"}
                m={"1"}
                textAlign={"right"}
                color={"grey.800"}
              >
                {remainingText}/500
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImgChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                onClick={() => {
                  imageRef.current.click();
                }}
                size={16}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="selected Img" />
                <CloseButton
                  onClick={() => {
                    setImgUrl("");
                  }}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
