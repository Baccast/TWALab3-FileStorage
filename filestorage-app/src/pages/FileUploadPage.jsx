import React, { useState } from 'react';
import axios from 'axios';

import UploadStatusCard from './UploadStatusCard';
import './FileUploadPage.css';

const FileUploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileID, setFileID] = useState(null); // add state to store the file ID

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8080/upload', formData)
      .then((response) => {
        setUploadStatus({
          status: response.status,
          message: response.statusText,
        });
        setFileID(response.data); // set the file ID state with the value from response
      })
      .catch((error) => {
        setUploadStatus({
          status: error.response.status,
          message: error.response.data.message,
        });
      });
  };

  return (
    <div className="file-upload-page">
      <h1 className="file-upload-page__title">File Upload Page</h1>
      <form className="file-upload-form">
        <label htmlFor="file-input" className="file-upload-form__label">Choose File</label>
        <input 
          id="file-input" 
          type="file" 
          accept=".jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.zip,.rar,.7z,.mp3,.mp4"
          onChange={handleFileChange} 
          className="file-upload-form__input"
        />
        <button onClick={handleUpload} className="file-upload-form__button">Upload</button>
      </form>
      {uploadStatus && (
        <UploadStatusCard status={uploadStatus.status} message={uploadStatus.message} fileID={fileID} />
      )}
    </div>
  );
};

export default FileUploadPage;