import { useState } from "react";
import convertImage from "./utilis/ConvertImage.tsx"; 

const App = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageDetails, setImageDetails] = useState<{ name: string; size: string; dimensions: string } | null>(null);
  const [format, setFormat] = useState<string>("jpg");
  const [convertedImage, setConvertedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));

      // Extract Image Details
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageDetails({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          dimensions: `${img.width} x ${img.height}px`,
        });
      };
    }
  };

  const handleConvert = async () => {
    if (image) {
      const converted = await convertImage(image, format);
      setConvertedImage(converted);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden absolute inset-0 -z-10  items-center px-5 py-10 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
       <div className=" flex flex-col items-center justify-center bg-transparent py-10 px-4">
        <div className="bg-neutral-100/10 p-6 sm:p-8 rounded-2xl shadow-md shadow-transparent-100/40 max-w-md w-full">
         <h1 className="text-2xl font-semibold text-neutral-100 text-center mb-6">Image Converter</h1>
       <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full border border-gray-300 bg-neutral-100 rounded-md p-2"
        />

        {imagePreview && (
          <div className="mb-4">
            <h2 className="text-lg text-white font-semibold mb-2">Image Preview</h2>
            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-xl shadow-md" />
            <div className="mt-3 text-gray-600 text-sm text-neutral-100">
              <p><strong>Name:</strong> {imageDetails?.name}</p>
              <p><strong>Size:</strong> {imageDetails?.size}</p>
              <p><strong>Dimensions:</strong> {imageDetails?.dimensions}</p>
            </div>
          </div>
        )}

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="mb-4 w-full px-3 py-2 border rounded-md bg-transparent "
        >
          <option value="jpg">JPG</option>
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WEBP</option>
        </select>

        <button
          onClick={handleConvert}
          className="w-full bg-violet-500 text-white py-2 rounded-md text-neutral-100 hover:bg-blue-600 transition ease-in-out delay-150"
        >
          Convert
        </button>

        {convertedImage && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Download the Converted Image</h2>
            <a
              href={convertedImage}
              download={`converted.${format}`}
              className="text-blue-600 underline mt-2 block text-center"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
    </div>
    
  );
};

export default App;
