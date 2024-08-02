import React from "react";

const ConditionTag = ({ tagName }: { tagName: string }) => {
  return (
    <>
      {tagName === "new" ? (
        <span className="bg-teal-200 text-teal-950 py-1 px-4 text-[11px] font-medium rounded-full">
          New
        </span>
      ) : tagName === "used" ? (
        <span className="bg-yellow-200 text-yellow-950 py-1 px-4 text-[11px] font-medium rounded-full">
          Used
        </span>
      ) : null}
    </>
  );
};

export default ConditionTag;
