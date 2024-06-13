import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "./../atoms/userAtom";
import useShowToast from "../hooks/useToast";

function Actions({ post }) {
  const user = useRecoilValue(userAtom);
  const showToast = useShowToast();

  const [liked, setLiked] = useState(post.likes.includes(user?._id));
  const [isLiking, setIsLiking] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const handleLikeUnlike = async () => {
    if (!user) showToast("Error", "User not valid to like", "error");
    return;
    if (isLiking) return;
    setIsLiking(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/like/${post._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      console.log(data);
      if (!liked) {
        post.likes.push(user._id);
        setLiked(!liked);
      } else {
        post.likes = post.likes.filter((like) => like !== user._id);
        setLiked(!liked);
      }
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async () => {
    if (!user) showToast("Error", "User not valid to comment", "error");
    if (isReplying) return;
    setIsReplying(true);
    try {
      const commentText = prompt("Enter your comment");
      if (commentText === null) {
        // User clicked cancel, do nothing
        return;
      }

      if (commentText.trim() === "") {
        showToast("Error", "Comment cannot be empty", "error");
        return;
      }
      const res = await fetch(
        `http://localhost:5000/api/posts/reply/${post._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            text: commentText.trim(),
          }),
        }
      );
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      console.log(data);
      showToast("Success", data.message, "success");
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setIsReplying(false);
    }
  };
  return (
    <Flex flexDirection={"column"}>
      <Flex
        h={"40px"}
        w={"full"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        gap={2}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <LikeSVG handleLikeUnlike={handleLikeUnlike} liked={liked} />
        <CommentSVG handleComment={handleComment} />
        <RepostSVG />
        <ShareSVG />
      </Flex>
      <Flex gap={2} alignItems={"center"} color={"gray"} fontSize={"sm"}>
        <Text fontStyle={"sm"}>{`${post.replies.length} Replies`}</Text>
        <Box height={1} w={1} borderRadius={"50%"} bg={"gray"}></Box>
        <Text fontStyle={"sm"}>{`${post.likes.length} Likes`}</Text>
      </Flex>
    </Flex>
  );
}

export default Actions;

const LikeSVG = ({ handleLikeUnlike, liked }) => {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleLikeUnlike}
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={liked ? "rgb(237,73,86)" : "none"}
        stroke={liked ? "rgb(237,73,86)" : "currentColor"}
      />
    </svg>
  );
};

const CommentSVG = ({ handleComment, isReplying }) => {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="0 0 32 32"
      version="1.1"
      onClick={handleComment}
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
        sketch:type="MSPage"
      >
        <g
          id="Icon-Set"
          sketch:type="MSLayerGroup"
          transform="translate(-100.000000, -255.000000)"
          fill="currentColor"
        >
          <path
            d="M116,281 C114.832,281 113.704,280.864 112.62,280.633 L107.912,283.463 L107.975,278.824 C104.366,276.654 102,273.066 102,269 C102,262.373 108.268,257 116,257 C123.732,257 130,262.373 130,269 C130,275.628 123.732,281 116,281 L116,281 Z M116,255 C107.164,255 100,261.269 100,269 C100,273.419 102.345,277.354 106,279.919 L106,287 L113.009,282.747 C113.979,282.907 114.977,283 116,283 C124.836,283 132,276.732 132,269 C132,261.269 124.836,255 116,255 L116,255 Z"
            id="comment-1"
            sketch:type="MSShapeGroup"
          ></path>
        </g>
      </g>
    </svg>
  );
};

const RepostSVG = () => {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 7.343C10.4142 7.343 10.75 7.00721 10.75 6.593C10.75 6.17879 10.4142 5.843 10 5.843V7.343ZM9.808 6.593L9.79453 7.343H9.808V6.593ZM5 11.227L4.25013 11.2128C4.25004 11.2176 4.25 11.2223 4.25 11.227H5ZM5 12.772L4.24987 12.772L4.25013 12.786L5 12.772ZM9.808 17.407V16.6569L9.79453 16.6571L9.808 17.407ZM11.988 18.157C12.4022 18.157 12.738 17.8212 12.738 17.407C12.738 16.9928 12.4022 16.657 11.988 16.657V18.157ZM10.8752 15.2787C10.5784 14.9897 10.1036 14.996 9.81465 15.2928C9.52569 15.5896 9.53201 16.0644 9.82878 16.3533L10.8752 15.2787ZM11.4638 17.9453C11.7606 18.2343 12.2354 18.228 12.5243 17.9312C12.8133 17.6344 12.807 17.1596 12.5102 16.8707L11.4638 17.9453ZM12.5102 17.9453C12.807 17.6564 12.8133 17.1816 12.5243 16.8848C12.2354 16.588 11.7606 16.5817 11.4638 16.8707L12.5102 17.9453ZM9.82878 18.4627C9.53201 18.7516 9.52569 19.2264 9.81465 19.5232C10.1036 19.82 10.5784 19.8263 10.8752 19.5373L9.82878 18.4627ZM14 16.657C13.5858 16.657 13.25 16.9928 13.25 17.407C13.25 17.8212 13.5858 18.157 14 18.157V16.657ZM14.192 17.407L14.2055 16.657H14.192V17.407ZM19 12.773L19.7499 12.7872C19.75 12.7824 19.75 12.7777 19.75 12.773H19ZM19 11.228H19.7501L19.7499 11.214L19 11.228ZM14.192 6.593V7.34312L14.2055 7.34288L14.192 6.593ZM12.013 5.843C11.5988 5.843 11.263 6.17879 11.263 6.593C11.263 7.00721 11.5988 7.343 12.013 7.343V5.843ZM13.1248 8.72135C13.4216 9.01031 13.8964 9.00399 14.1853 8.70722C14.4743 8.41045 14.468 7.93562 14.1712 7.64665L13.1248 8.72135ZM12.5362 6.05465C12.2394 5.76569 11.7646 5.77201 11.4757 6.06878C11.1867 6.36555 11.193 6.84038 11.4898 7.12935L12.5362 6.05465ZM11.4898 6.05465C11.193 6.34362 11.1867 6.81845 11.4757 7.11522C11.7646 7.41199 12.2394 7.41831 12.5362 7.12935L11.4898 6.05465ZM14.1712 5.53735C14.468 5.24838 14.4743 4.77355 14.1853 4.47678C13.8964 4.18001 13.4216 4.17369 13.1248 4.46265L14.1712 5.53735ZM10 5.843H9.808V7.343H10V5.843ZM9.82147 5.84312C6.80074 5.78886 4.30721 8.19215 4.25013 11.2128L5.74987 11.2412C5.7913 9.04822 7.60155 7.30349 9.79453 7.34288L9.82147 5.84312ZM4.25 11.227V12.772H5.75V11.227H4.25ZM4.25013 12.786C4.30657 15.8071 6.80029 18.2111 9.82147 18.1569L9.79453 16.6571C7.60123 16.6965 5.79084 14.9513 5.74987 12.758L4.25013 12.786ZM9.808 18.157H11.988V16.657H9.808V18.157ZM9.82878 16.3533L11.4638 17.9453L12.5102 16.8707L10.8752 15.2787L9.82878 16.3533ZM11.4638 16.8707L9.82878 18.4627L10.8752 19.5373L12.5102 17.9453L11.4638 16.8707ZM14 18.157H14.192V16.657H14V18.157ZM14.1785 18.1569C17.1993 18.2111 19.6928 15.8078 19.7499 12.7872L18.2501 12.7588C18.2087 14.9518 16.3985 16.6965 14.2055 16.6571L14.1785 18.1569ZM19.75 12.773V11.228H18.25V12.773H19.75ZM19.7499 11.214C19.6934 8.19286 17.1997 5.78886 14.1785 5.84312L14.2055 7.34288C16.3988 7.30349 18.2092 9.04873 18.2501 11.242L19.7499 11.214ZM14.192 5.843H12.013V7.343H14.192V5.843ZM14.1712 7.64665L12.5362 6.05465L11.4898 7.12935L13.1248 8.72135L14.1712 7.64665ZM12.5362 7.12935L14.1712 5.53735L13.1248 4.46265L11.4898 6.05465L12.5362 7.12935Z"
        fill="currentColor"
      />
    </svg>
  );
};

const ShareSVG = () => {
  return (
    <svg
      width="18px"
      height="18px"
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.47 4.13998C12.74 4.35998 12.28 5.96 12.09 7.91C6.77997 7.91 2 13.4802 2 20.0802C4.19 14.0802 8.99995 12.45 12.14 12.45C12.34 14.21 12.79 15.6202 13.47 15.8202C15.57 16.4302 22 12.4401 22 9.98006C22 7.52006 15.57 3.52998 13.47 4.13998Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
