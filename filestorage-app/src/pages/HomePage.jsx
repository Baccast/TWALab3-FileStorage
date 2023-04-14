import React from "react";

const HomePage = () => {
  return (
    <body className="bg-light">
      <div style={{ height: "94vh" }}>
        <h2 className="text-center">Home Page</h2>
        <p className="ms-2">Welcome to my file storage web server you will find below the instructions for using my web server</p>
        <ul className="ms-3">
          <h4>Upload</h4>
          <li>
            The first step will be to head to the Upload page (http://localhost:3000/upload) and upoad the file. <b>When uploading a file make sure to remeber the file name, file type and file ID (this will be displayed on the upload page after the file has been uploaded) as for security reasons you will need to to find your file later on. Also make sure your file is one of the following types .jpg,.jpeg,.png,.pdf,.txt,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.mp3,.mp4. I also put test files to upload in the TestFiles folder.</b>
          </li>
          <h4>Retrieve</h4>
          <li>
              Once your file is uploaded to view the file you just uploaded head to the retrieve page (http://localhost:3000/retrieve) and enter the file ID, file name and file type. <b>Make sure to enter the file name and file type exactly as you did when you uploaded the file. You should than get a response of your file content</b>
          </li>
          <h4>Delete</h4>
          <li>
              If you want to delete a file head to the delete page (http://localhost:3000/delete) and enter the file ID, file name and file type. <b>Make sure to enter the file name and file type exactly as you did when you uploaded the file.</b>
          </li>
          <h4>Monitor</h4>
          <li>
              If you want to monitor the files that are currently stored on the server head to the monitor page (http://localhost:3000/monitor) and you will get a list of all the information you need about the server. <b></b>
          </li>
        </ul>
      </div>
    </body>
  );
};

export default HomePage;
