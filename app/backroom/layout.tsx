import React from "react";

interface BackroomLayoutProps {
  children: React.ReactNode;
}
const BackroomLayout = ({ children }: BackroomLayoutProps) => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
        {children}
      </div>
    </main>
  );
};

export default BackroomLayout;
