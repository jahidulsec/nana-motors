"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#2563eb"
        options={{ showSpinner: false }}
        shallowRouting
        startPosition={1}
      />
      {children}
    </>
  );
};

export default Providers;
