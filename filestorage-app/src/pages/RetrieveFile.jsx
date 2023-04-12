import React, { useState } from "react";
import axios from "axios";

const RetrieveFile = () => {
  const [fileId, setFileId] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [status, setStatus] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileIdChange = (event) => {
    setFileId(event.target.value);
  };

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleRetrieveFile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/retrieve/${fileId}-${fileName}.${fileType}`,
        { responseType: "blob" }
      );
      const fileUrl = URL.createObjectURL(response.data);
      setFileUrl(fileUrl);
      setStatus(response.status);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setStatus(error.response.status);
    }
  };

  return (
    <>
      <h1 className="text-center mb-4">Retrieve File</h1>
      <div className="form-group">
        <label htmlFor="fileId">Enter file ID:</label>
        <input
          type="text"
          className="form-control"
          id="fileId"
          value={fileId}
          onChange={handleFileIdChange}
        />
        <label htmlFor="fileName">Enter file Name:</label>
        <input
          type="text"
          className="form-control"
          id="fileName"
          value={fileName}
          onChange={handleFileNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fileType">Select file type:</label>
        <select
          className="form-control"
          id="fileType"
          value={fileType}
          onChange={handleFileTypeChange}
        >
          <option value="">Select file type</option>
          <option value="jpg">.jpg</option>
          <option value="jpeg">.jpeg</option>
          <option value="png">.png</option>
          <option value="pdf">.pdf</option>
          <option value="txt">.txt</option>
          <option value="doc">.doc</option>
          <option value="docx">.docx</option>
          <option value="xls">.xls</option>
          <option value="xlsx">.xlsx</option>
          <option value="ppt">.ppt</option>
          <option value="pptx">.pptx</option>
          <option value="csv">.csv</option>
          <option value="zip">.zip</option>
          <option value="7z">.7z</option>
          <option value="mp3">.mp3</option>
          <option value="mp4">.mp4</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleRetrieveFile}>
        Retrieve File
      </button>
      {status && <div>Status: {status}</div>}
      {fileUrl && (
        <iframe
          src={fileUrl}
          title="file-preview"
          width="100%"
          height="100%"
        ></iframe>
      )}
    </>
  );
};

export default RetrieveFile;
