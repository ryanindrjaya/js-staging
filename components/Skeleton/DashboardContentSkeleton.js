import React from "react";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import TitlePage from "../TitlePage/TitlePage";
import LayoutContent from "@iso/components/utility/layoutContent";
import TitleSkeleton from "./TitleSkeleton";

function DashboardContentSkeleton() {
  return (
    <LayoutWrapper style={{}}>
      <TitleSkeleton />
      <LayoutContent>
        <div className="bg-gray-200 animate-pulse w-40 h-9 rounded px-5 py-2 shadow-sm flex float-right mb-5"></div>

        <div className="bg-gray-100 animate-pulse h-64 mt-20 w-full rounded"></div>
      </LayoutContent>
    </LayoutWrapper>
  );
}

export default DashboardContentSkeleton;
