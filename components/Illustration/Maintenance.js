import React from "react";
import Image from "next/image";

export default function Maintenance({ width, height }) {
  return (
    <Image
      src="/undraw/maintenance.svg"
      alt="maintenance"
      width={width}
      height={height}
    />
  );
}
