import { useState } from "react";
import useShowToast from "./useToast.js"; // Make sure the import path is correct

function useImgPreview() {
  const [imgUrl, setImgUrl] = useState(null); // State to store the image URL
  const showToast = useShowToast(); // Custom hook to show toast notifications

  // Function to handle image file selection
  const handleImgChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file

    if (file && file.type.startsWith("image/")) {
      // Check if the file is an image
      const reader = new FileReader(); // Create a new FileReader instance
      reader.onloadend = () => {
        setImgUrl(reader.result); // Set the image URL state to the file's data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    } else {
      // Show a toast notification if the selected file is not an image
      showToast("Invalid file", "Please select an image file", "error");
      setImgUrl(null); // Reset the image URL state
    }
  };

  return { handleImgChange, imgUrl, setImgUrl }; // Return the handler and state
}

export default useImgPreview;
