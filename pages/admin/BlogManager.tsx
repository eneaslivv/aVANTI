import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useCMS } from '../../context/CMSContext';
import { BlogPost } from '../../types';
import { Plus, Edit, Trash, Search, Save, X, Image as ImageIcon, Calendar, User, Tag } from 'lucide-react';

const BlogManager: React.FC = () => {
  const { posts, addPost, updatePost, deletePost, generateSlug } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleCreate = () => {
    setCurrentPost({
      title: '',
      excerpt: '',
      content: '',
      category: 'General',
      author: 'Equipo Avanti',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!currentPost.title || !currentPost.content) return alert('Título y contenido requeridos');
    
    if (currentPost.id) {
        updatePost(currentPost as BlogPost);
    } else {
        addPost(currentPost as BlogPost);
    }
    setIsEditing(false);
  };

  const handleDelete = (id: number) => {
    if(confirm('¿Estás seguro de eliminar este post?')) {
        deletePost(id);
    }
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Styles - Updated for Cleaner Look
  const inputClass = "w-full px-5 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-avanti-gold focus:border-avanti-gold bg-[#F9F9F7] focus:bg-white placeholder-gray-400 transition-all duration-300 text-sm text-avanti-900";
  const labelClass = "block text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2";

  // Render Editor Modal
  if (isEditing) {
    return (
        <div className="fixed inset-0 z-[60] bg-avanti-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-sm shadow-2xl flex flex-col overflow-hidden animate-page-enter ring-1 ring-white/20">
                {/* Modal Header */}
                <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div>
                        <h2 className="text-sm font-bold text-avanti-900 uppercase tracking-[0.2em]">
                            {currentPost.id ? 'Editor de Contenido' : 'Nueva Publicación'}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Gestor de Artículos</p>
                    </div>
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setIsEditing(false)} 
                            className="px-6 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-avanti-900 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button 
                            onClick={handleSave} 
                            className="px-8 py-2.5 bg-avanti-900 text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-avanti-800 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Guardar Cambios
                        </button>
                    </div>
                </div>
                
                {/* Modal Content */}
                <div className="flex-grow overflow-y-auto bg-gray-50/50">
                    <div className="max-w-4xl mx-auto p-8 lg:p-12 space-y-10 bg-white shadow-sm min-h-full border-x border-gray-100 my-8">
                        
                        {/* Title Section */}
                        <div className="space-y-4">
                            <input 
                                value={currentPost.title} 
                                onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                                className="w-full text-4xl md:text-5xl font-serif font-bold text-avanti-900 placeholder-gray-300 border-none focus:ring-0 p-0 bg-transparent placeholder:font-serif"
                                placeholder="Escriba el título aquí..."
                            />
                             <div className="flex flex-wrap gap-6 text-xs text-gray-400 pt-2 border-t border-gray-50">
                                <div className="flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" />
                                    <span>{currentPost.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span>{currentPost.date}</span>
                                </div>
                             </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {/* Metadata */}
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}><Tag className="w-3 h-3 inline mr-1"/> Categoría</label>
                                    <input 
                                        value={currentPost.category} 
                                        onChange={(e) => setCurrentPost({...currentPost, category: e.target.value})}
                                        className={inputClass}
                                        placeholder="Ej. Fiscalidad, Finanzas..."
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Extracto (SEO)</label>
                                    <textarea 
                                        value={currentPost.excerpt} 
                                        onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                                        className={`${inputClass} resize-none`}
                                        rows={3}
                                        placeholder="Breve descripción para listados..."
                                    />
                                </div>
                            </div>

                             {/* Cover Image */}
                            <div>
                                <label className={labelClass}><ImageIcon className="w-3 h-3 inline mr-1"/> Imagen de Portada (URL)</label>
                                <div className="flex gap-2">
                                    <input 
                                        value={currentPost.image} 
                                        onChange={(e) => setCurrentPost({...currentPost, image: e.target.value})}
                                        className={inputClass}
                                        placeholder="https://..."
                                    />
                                </div>
                                {currentPost.image && (
                                    <div className="mt-4 rounded-sm overflow-hidden h-32 border border-gray-100 bg-gray-50 relative group">
                                        <img src={currentPost.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                            Vista Previa
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rich Content Area */}
                        <div className="pt-6 border-t border-gray-100">
                            <label className={labelClass}>Contenido del Artículo (HTML Support)</label>
                            <p className="text-[10px] text-gray-400 mb-4 font-mono">Use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt; para formatear.</p>
                            <textarea 
                                value={currentPost.content} 
                                onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                                className="w-full p-0 border-none focus:ring-0 text-base leading-relaxed text-gray-700 font-serif min-h-[500px] resize-y bg-transparent"
                                placeholder="Comience a escribir su historia aquí..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-10">
        <div>
            <h1 className="text-3xl font-display font-bold text-avanti-900">Blog Manager</h1>
            <p className="text-sm text-gray-500 mt-2 font-light">Gestiona tus artículos, noticias y recursos corporativos.</p>
        </div>
        <button 
            onClick={handleCreate}
            className="bg-avanti-gold text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
            <Plus className="w-4 h-4" /> Nuevo Artículo
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 border border-gray-200 rounded-sm mb-8 shadow-sm flex items-center">
        <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
                type="text" 
                placeholder="Buscar por título, categoría o fecha..." 
                className="w-full pl-12 pr-4 py-3 border-none rounded-sm text-sm focus:outline-none focus:ring-0 text-avanti-900 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
        <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                    <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Artículo</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Categoría</th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Fecha</th>
                    <th className="px-8 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Acciones</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-5">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-12 rounded-sm overflow-hidden bg-gray-100 border border-gray-200">
                                     <img src={post.image} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <span className="font-bold text-avanti-900 font-serif text-lg">{post.title}</span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <span className="inline-block px-3 py-1 rounded-sm bg-avanti-light text-avanti-900 text-[10px] font-bold uppercase tracking-widest border border-gray-100">
                                {post.category}
                            </span>
                        </td>
                        <td className="px-6 py-5 text-sm text-gray-500 font-light">{post.date}</td>
                        <td className="px-8 py-5 text-right">
                            <button onClick={() => handleEdit(post)} className="p-2 text-gray-400 hover:text-avanti-gold hover:bg-avanti-light rounded-sm transition-all mx-1" title="Editar"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-sm transition-all mx-1" title="Eliminar"><Trash className="w-4 h-4" /></button>
                        </td>
                    </tr>
                ))}
                {filteredPosts.length === 0 && (
                    <tr>
                        <td colSpan={4} className="px-6 py-20 text-center text-gray-400 text-sm">No se encontraron artículos que coincidan con su búsqueda.</td>
                    </tr>
                )}
            </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default BlogManager;