import { ReactNode } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { LayoutDashboard, MessageSquare, FileText, FolderTree, LogOut, Menu, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import logo from '@/assets/webp/creative-firm-logo.webp';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  { path: '/admin/blog', icon: FileText, label: 'Blog Posts' },
  { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
  { path: '/admin/portfolio', icon: Briefcase, label: 'Portfolio' },
];

const Sidebar = ({ mobile = false }: { mobile?: boolean }) => {
  const location = useLocation();
  const { logout, username } = useAdminAuth();

  return (
    <div className="flex flex-col h-full glass-card border-r border-border/50" style={{ background: 'var(--glass-sidebar)' }}>
      {/* Logo Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="NJ Creative Firm" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-foreground">NJ Creative</h2>
            <p className="text-xs text-muted-foreground">Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-secondary text-secondary-foreground shadow-lemon'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border/50">
        <div className="mb-3 px-4 py-2 rounded-lg bg-muted/30">
          <p className="text-xs text-muted-foreground">Logged in as</p>
          <p className="text-sm font-semibold text-foreground">{username}</p>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive transition-colors"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="glass-card">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-sidebar-background">
            <Sidebar mobile />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Top Navbar */}
        <div className="sticky top-0 z-40 glass-card border-b border-border/50 px-6 py-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="md:hidden" />
            <div className="flex-1 md:flex-none" />
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-glow flex items-center justify-center">
                <span className="text-xs font-bold text-secondary-foreground">
                  {useAdminAuth().username?.charAt(0).toUpperCase()}
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
