import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useCMS } from '../../context/CMSContext';
import { Mail, Check, Trash, User, Phone, Tag, Calendar, Search } from 'lucide-react';

const Inbox: React.FC = () => {
  const { messages, markAsRead, deleteMessage } = useCMS();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages
    .filter(m => filter === 'all' ? true : !m.read)
    .filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.reason.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.id - a.id); // Newest first

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-3xl font-display font-bold text-avanti-900 flex items-center gap-3">
                Inbox <span className="bg-avanti-gold text-white text-xs px-2 py-1 rounded-full">{unreadCount} nuevos</span>
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-light">Gestiona las consultas y leads provenientes del sitio web.</p>
        </div>
        
        <div className="flex gap-2">
            <button 
                onClick={() => setFilter('all')} 
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${filter === 'all' ? 'bg-avanti-900 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            >
                Todos
            </button>
             <button 
                onClick={() => setFilter('unread')} 
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-colors ${filter === 'unread' ? 'bg-avanti-900 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
            >
                No Leídos
            </button>
        </div>
      </div>

      <div className="bg-white p-4 border border-gray-200 rounded-sm mb-6 shadow-sm">
        <div className="relative">
             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
                placeholder="Buscar por nombre, email o asunto..." 
                className="w-full pl-12 pr-4 py-2 border-none focus:ring-0 text-sm text-avanti-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
            <div 
                key={msg.id} 
                className={`bg-white border rounded-sm p-6 transition-all hover:shadow-md ${msg.read ? 'border-gray-200 opacity-90' : 'border-l-4 border-l-avanti-gold border-y-gray-200 border-r-gray-200 shadow-sm'}`}
            >
                <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-6">
                    
                    {/* Header Info */}
                    <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${msg.read ? 'bg-gray-300' : 'bg-avanti-gold'}`}></span>
                            <h3 className={`text-lg font-serif ${msg.read ? 'text-gray-600 font-medium' : 'text-avanti-900 font-bold'}`}>
                                {msg.name}
                            </h3>
                            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm uppercase tracking-wide border border-gray-200">
                                {msg.reason}
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-4">
                            <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</div>
                            <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {msg.phone}</div>
                            <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {msg.date}</div>
                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-sm border border-gray-100 font-light">
                            "{msg.message}"
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col gap-2 min-w-[140px]">
                        {!msg.read && (
                            <button 
                                onClick={() => markAsRead(msg.id)}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-green-700 text-xs font-bold uppercase tracking-widest hover:bg-green-50 rounded-sm transition-colors"
                            >
                                <Check className="w-3 h-3" /> Marcar Leído
                            </button>
                        )}
                        <a 
                            href={`mailto:${msg.email}`}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-avanti-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-avanti-800 rounded-sm transition-colors text-center"
                        >
                             Responder
                        </a>
                        <button 
                             onClick={() => {
                                 if(confirm('¿Eliminar este mensaje permanentemente?')) deleteMessage(msg.id);
                             }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            <Trash className="w-3 h-3" /> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        ))}

        {filteredMessages.length === 0 && (
            <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-sm">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No hay mensajes en esta bandeja.</p>
            </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Inbox;
