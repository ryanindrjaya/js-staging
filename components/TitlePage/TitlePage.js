import React from "react";

export default function TitlePage({ titleText }) {
  return (
    <div className="mb-3">
      <h5 className=" border-l-4 border-blue-900">
        <span className="ml-4">{titleText}</span>{" "}
      </h5>
    </div>
  );
}
