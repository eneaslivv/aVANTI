import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useCMS } from '../../context/CMSContext';
import { Trash, Link as LinkIcon, Plus, Copy, Check, Image, Download } from 'lucide-react';

const MediaLibrary: React.FC = () => {
  const { media, addMedia, deleteMedia } = useCMS();
  const [isAdding, setIsAdding] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newName, setNewName] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleAdd = () => {
    if (!newUrl) return alert('La URL es requerida');
    
    addMedia({
        id: Date.now(),
        url: newUrl,
        name: newName || 'Sin título',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });
    setNewUrl('');
    setNewName('');
    setIsAdding(false);
  };

  const handleCopy = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Styles - Updated for Cleaner Look
  const inputClass = "w-full px-5 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-avanti-gold focus:border-avanti-gold bg-[#F9F9F7] focus:bg-white placeholder-gray-400 transition-all duration-300 text-sm text-avanti-900";
  const labelClass = "block text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2";

  return (
    <AdminLayout>
      <div className="flex justify-between items-end mb-10">
        <div>
            <h1 className="text-3xl font-display font-bold text-avanti-900">Media Library</h1>
            <p className="text-sm text-gray-500 mt-2 font-light">Repositorio centralizado de activos digitales.</p>
        </div>
        <button 
            onClick={() => setIsAdding(!isAdding)}
            className="bg-avanti-gold text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
            <Plus className="w-4 h-4" /> Agregar Imagen
        </button>
      </div>

      {/* Add New Panel */}
      {isAdding && (
          <div className="bg-white p-8 border border-gray-200 rounded-sm shadow-xl mb-10 animate-page-enter relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-avanti-gold"></div>
              <h3 className="text-xs font-bold text-avanti-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <Download className="w-4 h-4 text-avanti-gold" /> Importar Recurso
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                      <label className={labelClass}>Nombre del Archivo</label>
                      <input 
                          type="text" 
                          placeholder="Ej. Oficina Principal"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className={inputClass}
                      />
                  </div>
                  <div className="md:col-span-2">
                      <label className={labelClass}>URL de la Imagen (Direct Link)</label>
                      <input 
                          type="text" 
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          className={inputClass}
                      />
                  </div>
              </div>
              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100">
                  <button onClick={() => setIsAdding(false)} className="px-6 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-avanti-900 transition-colors">Cancelar</button>
                  <button onClick={handleAdd} className="bg-avanti-900 text-white px-8 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-avanti-800 transition-all shadow-md">Guardar en Librería</button>
              </div>
          </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((item) => (
            <div key={item.id} className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl hover:border-avanti-gold/30 transition-all duration-300 flex flex-col">
                <div className="h-48 overflow-hidden relative bg-gray-100">
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-avanti-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                        <button 
                            onClick={() => handleCopy(item.id, item.url)}
                            className="bg-white text-avanti-900 p-3 rounded-full hover:bg-avanti-gold hover:text-white transition-all transform hover:scale-110 shadow-lg"
                            title="Copiar URL"
                        >
                            {copiedId === item.id ? <Check className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-avanti-900 text-xs truncate w-full" title={item.name}>{item.name}</h4>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">{item.date}</p>
                    
                    <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                         <button 
                            onClick={() => handleCopy(item.id, item.url)}
                            className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-colors ${copiedId === item.id ? 'text-green-600' : 'text-gray-400 hover:text-avanti-gold'}`}
                         >
                            {copiedId === item.id ? 'Copiado' : 'Copiar URL'}
                         </button>
                         <button 
                            onClick={() => deleteMedia(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                         >
                             <Trash className="w-3.5 h-3.5" />
                         </button>
                    </div>
                </div>
            </div>
        ))}

        {/* Empty State */}
        {media.length === 0 && (
            <div className="col-span-full py-24 text-center text-gray-300 bg-white border border-dashed border-gray-200 rounded-sm">
                <Image className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm font-medium">No hay imágenes en la biblioteca.</p>
                <p className="text-xs mt-1">Haga clic en "Agregar Imagen" para comenzar.</p>
            </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default MediaLibrary;