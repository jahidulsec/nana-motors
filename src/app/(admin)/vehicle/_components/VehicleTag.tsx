import React from "react";


const VehicleTag = ({ tagName }: { tagName: string }) => {
  return (
    <>
      {tagName === "available" ? (
        <span className="border border-teal-400 text-teal-950 py-0.5 px-4 text-[11px] font-medium rounded-full">In Stock</span>
      ) : tagName === "in-emi" ? (
        <span className="border border-yellow-400 text-yellow-950 py-0.5 px-4 text-[11px] font-medium rounded-full">In EMI</span>
      ) : (
        <span className="border border-red-400 text-red-950 py-0.5 px-4 text-[11px] font-medium rounded-full">Sold</span>
      )}
    </>
  );
};

export default VehicleTag;
