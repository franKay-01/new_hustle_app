const useUploadFunction = () => {

  const handleImageUploads = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    formData.append('folder', `${process.env.REACT_APP_CLOUDINARY_FOLDER}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = await response.json();
    return data.url
  }

  const dataURItoBlob = (dataURI) => {
    // Split the data URI to get the content type and base64 data
    const [contentType, base64Data] = dataURI.split(';base64,');
    
    // Convert the base64 data to a Uint8Array
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    
    // Create a Blob from the Uint8Array
    return new Blob([byteArray], { type: contentType });
  }

  const handleImageBlobsUpload = async (file) => {
    const formData = new FormData();
    const blob = dataURItoBlob(file)

    formData.append('file', blob);
    formData.append('upload_preset', `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`);
    formData.append('folder', `${process.env.REACT_APP_CLOUDINARY_FOLDER}`);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = await response.json();
    return data.url
  }

  return { handleImageUploads, handleImageBlobsUpload }
}

export default useUploadFunction

