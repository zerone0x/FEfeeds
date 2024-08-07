"use client";
import { useState } from "react";

function TextExpander({ children }: { children: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (children.length <= 256) {
    return <span>{children}</span>;
  }

  const displayText = isExpanded
    ? children
    : children.substring(0, 256) + "...";

  return (
    children.length > 256 && (
      <span>
        {displayText}{" "}
        <button
          className="border-b border-primary-700 pb-1 leading-3 text-primary-700"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      </span>
    )
  );
}

export default TextExpander;
