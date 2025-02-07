import React from "react";
import { cn } from "@/lib/utils";
import { useSelectionContext } from "@/lib/providers/selection-context";

export function PageBase({
  children,
  size,
  fieldName,
  className,
}: {
  children: React.ReactNode;
  size: { width: number; height: number };
  fieldName: string;
  className?: string;
}) {
  const { currentSelection, setCurrentSelection } = useSelectionContext();
  const isSelected = currentSelection === fieldName;

  return (
    <div
      data-page-base
      className={cn(
        "relative overflow-hidden bg-white",
        isSelected && "ring-2 ring-primary",
        className
      )}
      style={{
        width: size.width,
        height: size.height,
      }}
      onClick={(event) => {
        setCurrentSelection(fieldName, event);
      }}
    >
      {children}
    </div>
  );
}
