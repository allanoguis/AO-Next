import { ReactNode } from "react";

export default function WrapperMain({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col md:ml-60 sm:border-r min-h-screen -z-50">
      {children}
    </div>
  );
}
