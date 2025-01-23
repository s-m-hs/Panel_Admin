// components/ImageResizer.js

import { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useDropzone } from 'react-dropzone';
import ChangeUplode from './ChangeUplode'; // Import the ChangeUplode function

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null); // Store the uploaded image ID
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);

    // Upload the image using the ChangeUplode function
    ChangeUplode(file, handleUploadSuccess, handleUploadError);
  };

  const handleUploadSuccess = (id) => {
    setImageId(id);
    console.log('Image uploaded successfully with ID:', id);
  };

  const handleUploadError = () => {
    console.log('Image upload failed');
  };

  const handleSave = () => {
    if (image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'resized-image.png';
        a.click();
      };
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select one</p>
      </div>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <ResizableBox
            width={dimensions.width}
            height={dimensions.height}
            minConstraints={[100, 100]}
            maxConstraints={[600, 600]}
            onResizeStop={(e, data) => setDimensions({ width: data.size.width, height: data.size.height })}
          >
            <img src={imageUrl} alt="Selected" style={{ width: '100%', height: '100%' }} />
          </ResizableBox>
          <div>
            <button onClick={handleSave} style={{ marginTop: '10px' }}>
              Save Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
