import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, PenTool, Sparkles, Image as ImageIcon, Settings, LogOut, Home, Inbox } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useAuth } from '../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { messages } = useCMS();
  const { signOut } = useAuth();

  const unreadCount = messages.filter(m => !m.read).length;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Inbox, label: 'Bandeja de Entrada', path: '/admin/inbox', badge: unreadCount > 0 ? unreadCount : undefined },
    { icon: FileText, label: 'Páginas', path: '/admin/pages' },
    { icon: PenTool, label: 'Blog Manager', path: '/admin/blog' },
    { icon: Sparkles, label: 'AI Generator', path: '/admin/ai' },
    { icon: ImageIcon, label: 'Media Library', path: '/admin/media' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-avanti-900 text-white flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-gray-700">
          <Link to="/" className="flex flex-col">
            <span className="text-xl font-serif font-bold tracking-tight">AVANTI CMS</span>
            <span className="text-[10px] text-avanti-gold uppercase tracking-widest mt-1">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between px-4 py-3 rounded-sm text-sm font-medium transition-colors ${isActive(item.path)
                ? 'bg-avanti-gold text-avanti-900'
                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
            <Home className="w-4 h-4" /> Ver Sitio Web
          </Link>
          <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors">
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto animate-page-enter">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
