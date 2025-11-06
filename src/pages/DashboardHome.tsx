import { useNavigate } from "react-router-dom";
import { Ruler, FileText, Tag, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardHome = () => {
  const navigate = useNavigate();

  const workflows = [
    {
      title: "PST Entry",
      description: "Enter Physical Standard Test measurements",
      icon: Ruler,
      path: "/dashboard/pst",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Basic Details",
      description: "Document verification and candidate details",
      icon: FileText,
      path: "/dashboard/basic-details",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "BIB Counter",
      description: "Generate and manage BIB numbers",
      icon: Tag,
      path: "/dashboard/bib-counter",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Data Entry",
      description: "Enter running times and performance data",
      icon: BarChart,
      path: "/dashboard/data-entry",
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="glass-card p-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome to PE&MT Dashboard
        </h1>
        <p className="text-muted-foreground">
          Select a workflow to begin processing candidate data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflows.map((workflow) => {
          const Icon = workflow.icon;
          return (
            <div
              key={workflow.path}
              className="glass-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(workflow.path)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${workflow.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {workflow.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {workflow.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-button group-hover:bg-white/90"
                  >
                    Open Workflow
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;
