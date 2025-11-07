import { Home, LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card mx-4 mt-4 rounded-2xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-sm font-semibold text-foreground md:hidden">
            POLICE DASHBOARD
          </h1>
        </div>
        <div className="flex-1 text-center hidden lg:block">
          <p className=" font-bold text-2xl text-primary">
            GROUND LEVEL PST PET Software Workflow
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="glass-button text-xs px-3 py-2 h-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">BACK TO ADMIN</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="glass-button text-xs px-3 py-2 h-auto"
          >
            <Home className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">HOME</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="glass-button text-xs px-3 py-2 h-auto text-destructive hover:text-destructive"
          >
            <LogOut className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">LOGOUT</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
