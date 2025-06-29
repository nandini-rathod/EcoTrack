import React from "react";
import Updates from "../Updates/Updates";
import "./RightSide.css";
import Table from "../Table/Table";
const RightSide = () => {
  return (
    <div className="RightSide">
      <div>
        <Updates />
      </div>
      <Table/>
      <div>
      </div>
    </div>
  );
};

export default RightSide;
