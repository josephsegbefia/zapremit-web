import React from "react";

interface BackroomLayoutProps {
  children: React.ReactNode;
}
const BackroomLayout = ({ children }: BackroomLayoutProps) => {
  return <div>{children}</div>;
};

export default BackroomLayout;
