import React from 'react';
import './UploadStatusCard.css';

const UploadStatusCard = (props) => {
  const { status, message, fileID } = props;

  return (
    <div className="upload-status-card">
      <h2 className="upload-status-card__title">Upload Status</h2>
      <div className={`upload-status-card__status ${status === 200 ? 'success' : 'error'}`}>
        {status}
      </div>
      <div className="upload-status-card__message">{message}</div>
      {fileID && (
        <div className="upload-status-card__fileID">
          File ID: {fileID}
        </div>
      )}
    </div>
  );
}

export default UploadStatusCard;