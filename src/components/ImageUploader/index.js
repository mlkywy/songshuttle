import React, { useState, useEffect } from "react";
import convertToBase64 from "../../utils/convertToBase64";
import addCustomPlaylistCover from "../../api/addCustomPlaylistCover";
import useUser from "../../hooks/useUser";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const { token } = useUser();

  useEffect(() => {
    console.log(image);
  }, [image]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let base64 = await convertToBase64(file);
    base64 = base64.split("base64,")[1];
    setImage(base64);
  };

  const handleUpload = async () => {
    // upload image
    console.log(token);
    let playlistId = "5BombckvYFNSi6zCgrmaCt";
    const data = await addCustomPlaylistCover(token, playlistId, image);
    console.log(data);
  };

  https: return (
    <>
      <input type="file" name="file" onChange={(e) => handleImage(e)} />
      <button onClick={handleUpload}>click me!</button>
    </>
  );
};

export default ImageUploader;
