import React, { useState } from "react";
import axios from "axios";

const DeleteFile = () => {
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

  const handleDeleteFile = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/clear/${fileId}-${fileName}.${fileType}`,
        { responseType: "blob" }
      );
      const fileUrl = URL.createObjectURL(response.data);
      setStatus(response.status);
      setFileUrl(fileUrl);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);

      setStatus(error.response.status);
    }
  };

  const handleDeleteAllFile = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/clear/all`, {
        responseType: "blob",
      });
      const fileUrl = URL.createObjectURL(response.data);
      setStatus(response.status);
      setFileUrl(fileUrl);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);

      setStatus(error.response.status);
    }
  };

  return (
    <>
      <div className="bg-light" style={{ height: "90vh" }}>
        <h1 className="text-center mb-4">Delete File</h1>
        <div className="container text-center">
          <div className="form-group">
            <div className="row">
              <div className="col">
                <label htmlFor="fileId">Enter file ID:</label>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    id="fileId"
                    value={fileId}
                    onChange={handleFileIdChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label htmlFor="fileName">Enter file Name:</label>
                </div>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="fileName"
                      value={fileName}
                      onChange={handleFileNameChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>
        <div className="container text-center">
          <div className="form-group">
            <div className="row">
              <div className="col"></div>
            </div>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 text-end">
                <label htmlFor="fileType">Select file type:</label>
              </div>
              <div className="col-4">
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
            </div>
          </div>
        </div>

        <div className="form-group"></div>
        <button
          className="btn btn-primary me-5 ms-2"
          onClick={handleDeleteFile}
        >
          Delete File
        </button>
        <button className="btn btn-danger" onClick={handleDeleteAllFile}>
          Clear All Files
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
      </div>
    </>
  );
};

export default DeleteFile;
