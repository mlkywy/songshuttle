const compressImage = (file, size) => {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      let aspectRatio = img.width / img.height;
      let newWidth = Math.sqrt(size * aspectRatio);
      let newHeight = newWidth / aspectRatio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, { type: "image/jpeg" }));
      }, "image/jpeg", 0.8);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
};
export default compressImage;
