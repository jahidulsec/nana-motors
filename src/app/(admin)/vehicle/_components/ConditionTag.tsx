import React from "react";

const ConditionTag = ({ tagName }: { tagName: string }) => {
  return (
    <>
      {tagName === "new" ? (
        <span className="bg-teal-400 text-teal-950 py-0.5 px-4 text-[11px] font-medium rounded-full">
          New
        </span>
      ) : tagName === "used" ? (
        <span className="bg-yellow-400 text-yellow-950 py-0.5 px-4 text-[11px] font-medium rounded-full">
          Used
        </span>
      ) : null}
    </>
  );
};

export default ConditionTag;
