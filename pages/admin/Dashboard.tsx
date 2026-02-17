import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useCMS } from '../../context/CMSContext';
import { FileText, Eye, Clock, TrendingUp, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { posts, messages } = useCMS();
  const unreadMessages = messages.filter(m => !m.read).length;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-avanti-900">Dashboard</h1>
        <p className="text-gray-500">Bienvenido al panel de control de Avanti Advisory Group.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Link to="/admin/inbox" className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm hover:border-avanti-gold transition-colors cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest group-hover:text-avanti-gold">Mensajes Nuevos</span>
            <Inbox className="w-5 h-5 text-avanti-gold" />
          </div>
          <span className="text-3xl font-serif font-bold text-avanti-900">{unreadMessages}</span>
        </Link>
        
        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Blogs</span>
            <FileText className="w-5 h-5 text-avanti-gold" />
          </div>
          <span className="text-3xl font-serif font-bold text-avanti-900">{posts.length}</span>
        </div>

         <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Visitas Mes</span>
            <Eye className="w-5 h-5 text-avanti-gold" />
          </div>
          <span className="text-3xl font-serif font-bold text-avanti-900">12.4k</span>
        </div>

        <div className="bg-white p-6 rounded-sm border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Conversión</span>
            <TrendingUp className="w-5 h-5 text-avanti-gold" />
          </div>
          <span className="text-3xl font-serif font-bold text-avanti-900">3.2%</span>
        </div>
      </div>

      {/* Recent Activity / Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
         <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-avanti-900 text-sm uppercase tracking-wide">Publicaciones Recientes</h3>
         </div>
         <ul className="divide-y divide-gray-100">
            {posts.slice(0, 5).map(post => (
                <li key={post.id} className="px-6 py-4 hover:bg-gray-50 flex justify-between items-center">
                    <div>
                        <p className="font-medium text-avanti-900">{post.title}</p>
                        <p className="text-xs text-gray-400">{post.date} • {post.category}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                        Publicado
                    </span>
                </li>
            ))}
         </ul>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
