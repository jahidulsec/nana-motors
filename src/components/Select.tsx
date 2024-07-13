import { cn } from "@/lib/utils";
import React from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, id,...props }, ref) => {
    return (
      <select
        className={cn(
          "font-normal bg-white border h-10 px-2 rounded text-sm",
          className,
        )}
        id={id}
        ref={ref}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";

export { Select };
