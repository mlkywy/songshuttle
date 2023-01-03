const MAX_BASE64_SIZE = 260000; // 256 KB

const compressImage = (imageData) => {
  const image = new Image();
  image.src = imageData;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  let dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  while (dataUrl.length > MAX_BASE64_SIZE) {
    // Compress image while keeping the base64 size under the maximum limit
    canvas.width *= 0.9;
    canvas.height *= 0.9;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    dataUrl = canvas.toDataURL("image/jpeg", 0.92);
  }
  return dataUrl;
};

export default compressImage;
