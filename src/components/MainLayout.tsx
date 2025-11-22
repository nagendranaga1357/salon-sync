import { ReactNode } from "react";
import BottomNavbar from "./BottomNavbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="pb-20">
      {children}
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;

