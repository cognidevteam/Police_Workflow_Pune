import { Outlet } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <AnimatedBackground />
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-[90px] lg:ml-[300px] mr-4 mt-24 mb-4 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
