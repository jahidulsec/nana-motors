import React from "react";

type VehicleTabProps = "in-stock" | "sold" | "in-emi";

const VehicleTag = ({ tagName }: { tagName: VehicleTabProps }) => {
  return (
    <>
      {tagName === "in-stock" ? (
        <span className="bg-teal-400 text-teal-950 py-0.5 px-4 text-[12px] font-medium rounded-sm">In Stock</span>
      ) : tagName === "in-emi" ? (
        <span className="bg-yellow-400 text-yellow-950 py-0.5 px-4 text-[12px] font-medium rounded-sm">In EMI</span>
      ) : (
        <span className="bg-red-400 text-red-950 py-0.5 px-4 text-[12px] font-medium rounded-sm">Sold</span>
      )}
    </>
  );
};

export default VehicleTag;
