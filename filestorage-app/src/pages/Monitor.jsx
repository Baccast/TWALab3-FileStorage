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
    <div className="bg-light" style={{ height: "90vh" }}>
      <h1 className="text-center">Monitor Storage Space</h1>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleMonitorClick}>
        Monitor Storage Space
      </button>
      </div>
      {monitorData.numOfFiles && (
        <div>
          <h2>Monitor Data</h2>
          <ul>
            <li>StatusCode: {status}</li>
            <li>Number of Files: {monitorData.numOfFiles}</li>
            <li>Maximum Space Allowed: {monitorData.maxSpaceAllowed / 1e+6
 + " mb"} </li>
            <li>
              Current Space Allocated: {(monitorData.currentSpaceAllocated / 1e+6).toFixed(3) +" mb"}
            </li>
            <li>
              Percentage of Space Left:{" "}
              {monitorData.percentageOfSpaceLeft.toFixed(2) + "%"}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MonitorCard;
