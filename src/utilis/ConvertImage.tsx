// utils/convertImage.ts
const convertImage = (image: File, format: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob); 
              resolve(url); 
            } else {
              reject(new Error("Image conversion failed"));
            }
          }, `image/${format}`);
        }
      };
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(image);
  });
};

export default convertImage;