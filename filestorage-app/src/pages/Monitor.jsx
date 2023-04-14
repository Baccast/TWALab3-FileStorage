import React, { useState } from "react";
import axios from "axios";

function MonitorCard() {
  const [monitorData, setMonitorData] = useState({});
  const [status, setStatus] = useState("");

  const handleMonitorClick = () => {
    axios
      .get("http://localhost:8080/monitor")
      .then((response) => {
        setMonitorData(response.data);
        setStatus(response.status);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-center">Monitor Storage Space</h1>
      <button className="btn btn-primary" onClick={handleMonitorClick}>
        Monitor Storage Space
      </button>
      {monitorData.numOfFiles && (
        <div>
          <h2>Monitor Data</h2>
          <ul>
            <li>StatusCode: {status}</li>
            <li>Number of Files: {monitorData.numOfFiles}</li>
            <li>Maximum Space Allowed: {monitorData.maxSpaceAllowed}</li>
            <li>
              Current Space Allocated: {monitorData.currentSpaceAllocated}
            </li>
            <li>
              Percentage of Space Left:{" "}
              {monitorData.percentageOfSpaceLeft + "%"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MonitorCard;
