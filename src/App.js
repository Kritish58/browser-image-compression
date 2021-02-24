import React from 'react';
import ImageCompression from 'browser-image-compression';

import './App.css';

function App() {
   const [imageFile, setImageFile] = React.useState(null);

   const imageCompressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: 0.4,
   };

   const handleFileChange = (e) => {
      setImageFile(e.target.files[0]);
   };

   const handleFormSubmit = async (e) => {
      e.preventDefault();
      const compressedImage = await ImageCompression(imageFile, imageCompressionOptions);
      console.log(compressedImage);
      console.log(compressedImage.size / (1024 * 1024) + 'MB');

      const formData = new FormData();
      formData.append('thumbnail', compressedImage);
      // const res = await axios.post('http://localhost:5000/api/tasks/create', formData);
      // console.log('RESPONSE', res);

      const blobUrl = URL.createObjectURL(compressedImage);

      // Create a link element
      const link = document.createElement('a');

      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = 'name';

      // Append link to the body
      document.body.appendChild(link);

      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
         new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
         })
      );
   };

   return (
      <>
         <form
            onSubmit={(e) => {
               handleFormSubmit(e);
            }}>
            <div>
               <input type="file" onChange={(e) => handleFileChange(e)} />
            </div>
            <div>
               <button>upload</button>
            </div>
         </form>
      </>
   );
}

export default App;
