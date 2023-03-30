import React from "react";

export default function TitlePage({ titleText }) {
  return (
    <div className="mb-3">
      <div className="font-medium text-lg border-l-4 uppercase border-[#036B82] pl-4">
        {titleText}
      </div>
    </div>
  );
}
