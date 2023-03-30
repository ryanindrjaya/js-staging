import React from "react";

export default function TitleSkeleton({ titleText }) {
  return (
    <div className="mb-3 animate-pulse">
      <h5 className=" border-l-4 border-gray-400">
        <div className="ml-4 w-24 h-7 rounded-full bg-gray-200"></div>{" "}
      </h5>
    </div>
  );
}
