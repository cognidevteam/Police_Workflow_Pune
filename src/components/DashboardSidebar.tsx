import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Ruler, FileText, Tag, BarChart, ClipboardList, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const menuItems = [
  { title: "PST Entry", url: "/dashboard/pst", icon: Ruler },
  { title: "Basic Details", url: "/dashboard/basic-details", icon: FileText },
  { title: "BIB Counter", url: "/dashboard/bib-counter", icon: Tag },
  { title: "Data Entry", url: "/dashboard/data-entry", icon: BarChart },
  { title: "Reports", url: "/dashboard/reports", icon: ClipboardList },
];

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <aside
        className={`fixed left-4 top-24 bottom-4 z-40 transition-all duration-300 ${
          collapsed ? "w-[70px]" : "w-[280px]"
        }`}
      >
        <div className="h-full glass-card gradient-sidebar p-4 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <h2 className="text-white font-semibold text-sm">WORKFLOWS</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.url}
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-white text-primary font-medium shadow-lg"
                        : "text-white/90 hover:bg-white/20"
                    } ${collapsed ? "justify-center" : ""}`
                  }
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm">{item.title}</span>}
                </NavLink>
              );
            })}
          </nav>

          <Button
            onClick={() => setShowLogoutDialog(true)}
            className={`mt-4 bg-destructive/20 hover:bg-destructive text-white border border-white/20 ${
              collapsed ? "px-2" : "px-4"
            }`}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">LOGOUT</span>}
          </Button>
        </div>
      </aside>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="glass-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? You will be redirected to the landing page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass-button">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardSidebar;
