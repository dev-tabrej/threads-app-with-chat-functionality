import { useState } from "react";
import useShowToast from "./useToast";

function useImgPreview() {
  const [imgUrl, setImgUrl] = useState(null);
  const showToast = useShowToast();
  const handleImgChange = (e) => {
    // console.log("this is your files object", e.target.files);
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file", "please select a user file", "error");
      setImgUrl(null);
    }
    console.log(file);
  };
  console.log(imgUrl);
  return { handleImgChange, imgUrl };
}

export default useImgPreview;
