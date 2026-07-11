import { ReactNode } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  FolderTree,
  LogOut,
  Menu,
  Briefcase,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { path: "/admin/blog", icon: FileText, label: "Blog Posts" },
  { path: "/admin/categories", icon: FolderTree, label: "Categories" },
  { path: "/admin/portfolio", icon: Briefcase, label: "Portfolio" },
  { path: "/admin/services", icon: Settings2, label: "Services" },
];

const Sidebar = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation();
  const { logout } = useAdminAuth();

  return (
    <div className="flex flex-col h-full border-r border-border" style={{ background: "hsl(var(--sidebar-background))" }}>
      {/* Logo */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/uploads/logo.png" alt="NJ Creative Firm" className="h-8 w-8 object-contain shrink-0" />
          <div>
            <h2 className="text-sm font-semibold text-foreground leading-tight">NJ Creative</h2>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 h-9 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign out
        </Button>
      </div>
    </div>
  );
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated, username } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-56 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-none">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-56 bg-sidebar-background rounded-none"
          >
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-40 border-b border-border bg-background px-6 py-3 md:px-8">
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground hidden md:block">{username}</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-semibold text-primary-foreground">
                  {username?.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="container mx-auto p-6 md:p-8 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};
