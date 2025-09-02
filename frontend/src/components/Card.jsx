import React from "react";

export default function Card({ title, children, footer, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-sm ${className}`}
    >
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      <div className="mb-4">{children}</div>

      {footer && <div className="mt-4 border-t pt-4">{footer}</div>}
    </div>
  );
}
