import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="glass-card p-12 max-w-2xl w-full text-center space-y-8 hover:shadow-[0_12px_40px_0_rgba(31,38,135,0.25)] transition-all duration-500">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center shadow-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
           PST PET WORKFLOW
          </h1>
          <h2 className="text-2xl font-semibold text-primary">
            Ground Level PST PET Software Workflow
          </h2>
        </div>

        <Button
          onClick={() => navigate("/dashboard")}
          size="lg"
          className="gradient-hero text-white font-semibold px-12 py-6 text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
        >
          BEGIN
        </Button>
      </div>
    </div>
  );
};

export default Landing;
