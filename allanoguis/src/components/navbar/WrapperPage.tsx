"use client";
import { ReactNode } from "react";

export default function WrapperPage({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col p-0 space-y-2 bg-zinc-100 flex-grow">
      {children}
    </div>
  );
}
