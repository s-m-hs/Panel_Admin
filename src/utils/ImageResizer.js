import { useContext, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useDropzone } from 'react-dropzone';
import ChangeUplode from './ChangeUplode'; // Import the ChangeUplode function
import { CmsContext, EdiContext } from '../context/CmsContext';
import ChangeUplodeB from './ChangeUplodeB';
import apiUrl from './ApiConfig';

const ImageResizer = ({handleImageUpload,}) => {
  let { setIsolaEdiImg } = useContext(CmsContext);
  // let { setIsolaFlag } = useContext(EdiContext);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null); // Store the uploaded image ID
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);

    // Upload the original image
    ChangeUplodeB(file, handleUploadSuccess, handleUploadError);
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
      img.src = imageUrl; // آدرس اولیه تصویر
  
      img.onload = () => {
        // تنظیم ابعاد canvas به اندازه‌های جدید
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
  
        // رندر تصویر با ابعاد جدید روی canvas
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
  
        // تبدیل تصویر ریسایز شده به Blob
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // ساخت URL از Blob برای استفاده به عنوان src
              const resizedImageSrc = URL.createObjectURL(blob);
              console.log('Final Resized Image src:', resizedImageSrc);
  
              // تبدیل Blob به File برای آپلود
              const resizedFile = new File([blob], 'resized-image.png', { type: 'image/png' });
  
              // آپلود تصویر ریسایز شده با ChangeUplode
              ChangeUplodeB(
                resizedFile,
                (id) => {
                  console.log('Resized image uploaded successfully with ID:', id);
                  // setIsolaEdiImg()
                  handleImageUpload(`${apiUrl}/${id}`)
                },
                (error) => {
                  console.error('Failed to upload resized image:', error);
                }
              );
            }
          },
          'image/png' // نوع فایل خروجی
        );
      };
    }
    // setIsolaFlag(prev=>!prev)
  };
  
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <p>عکس را انتخاب کنید یا یه اینجا بکشید</p>
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
              ذخیره عکس
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
