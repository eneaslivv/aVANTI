import React, { useState } from 'react';
import { useCMS, PageContent } from '../../context/CMSContext';
import Home from '../Home';
import About from '../About';
import Resources from '../Resources';
import Contact from '../Contact';
import ServicePage from '../ServicePage';
import { Save, Smartphone, Monitor, ChevronDown, Layout, Type, MousePointer2, Image as ImageIcon, List, Plus, Trash, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceData } from '../../types';

const PageEditor: React.FC = () => {
    const { pageContent, updatePageContent, services, updateService, isSaving, lastSaved } = useCMS();

    // State for Navigation
    const [selectedType, setSelectedType] = useState<'static' | 'service'>('static');
    const [selectedId, setSelectedId] = useState<string>('home');
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

    // Helper to handle Static Page Updates
    const handleStaticUpdate = (page: keyof PageContent, section: string, field: string, value: string) => {
        updatePageContent(page, section, { [field]: value });
    };

    // Helper to handle Service Updates
    const handleServiceUpdate = (field: string, value: any) => {
        if (services[selectedId]) {
            updateService(selectedId, { ...services[selectedId], [field]: value });
        }
    };

    const handleBulletUpdate = (index: number, value: string) => {
        const currentService = services[selectedId];
        if (!currentService) return;
        const newBullets = [...currentService.bullets];
        newBullets[index] = value;
        updateService(selectedId, { ...currentService, bullets: newBullets });
    };

    const addBullet = () => {
        const currentService = services[selectedId];
        if (!currentService) return;
        updateService(selectedId, { ...currentService, bullets: [...currentService.bullets, "Nuevo punto..."] });
    };

    const removeBullet = (index: number) => {
        const currentService = services[selectedId];
        if (!currentService) return;
        const newBullets = currentService.bullets.filter((_, i) => i !== index);
        updateService(selectedId, { ...currentService, bullets: newBullets });
    };

    // --- IMAGE UPLOAD HELPER ---
    const ImageField = ({ label, value, onUpdate }: { label: string, value: string, onUpdate: (url: string) => void }) => {
        const { uploadImage } = useCMS();
        const [isUploading, setIsUploading] = useState(false);
        const fileInputRef = React.useRef<HTMLInputElement>(null);

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
                setIsUploading(true);
                const url = await uploadImage(file);
                onUpdate(url);
            } catch (error) {
                console.error("Upload failed", error);
                alert("Error al subir imagen");
            } finally {
                setIsUploading(false);
            }
        };

        return (
            <div className="mb-6">
                <label className={labelClass}><ImageIcon className="w-3 h-3 inline mr-1" /> {label}</label>

                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative w-full h-32 rounded-sm border-2 border-dashed border-gray-700 bg-gray-800/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-all hover:border-avanti-gold hover:bg-gray-800 ${value ? 'border-solid' : ''}`}
                >
                    {value ? (
                        <>
                            {/* Checkerboard background for transparency */}
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
                                backgroundSize: `20px 20px`,
                                backgroundPosition: `0 0, 0 10px, 10px -10px, -10px 0px`
                            }}></div>

                            <img src={value} alt="Preview" className="absolute inset-0 w-full h-full object-contain p-2 z-10" />
                            <div className="z-10 opacity-0 group-hover:opacity-100 flex flex-col items-center transition-opacity">
                                <Smartphone className="w-6 h-6 text-white mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Cambiar Imagen</span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center text-gray-500 group-hover:text-avanti-gold transition-colors">
                            <Plus className="w-6 h-6 mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Subir Imagen</span>
                        </div>
                    )}

                    {isUploading && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
                            <div className="w-6 h-6 border-2 border-avanti-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                />

                {/* Optional: Keep URL input for manual fallback or copy-paste */}
                <input
                    value={value || ''}
                    onChange={(e) => onUpdate(e.target.value)}
                    className={`${inputClass} mt-2 text-xs py-2`}
                    placeholder="O pegar URL directa..."
                />
            </div>
        );
    };

    // Styles - Refined Dark Editor Inputs
    const inputClass = "w-full px-4 py-3 border border-gray-700 rounded-sm focus:outline-none focus:border-avanti-gold bg-gray-800 text-white placeholder-gray-500 text-sm transition-all hover:bg-gray-700/80";
    const labelClass = "block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2";
    const sectionHeaderClass = "flex items-center gap-2 text-avanti-gold font-bold text-xs uppercase tracking-widest mb-6 border-b border-gray-700 pb-2 mt-8";

    return (
        <div className="flex h-screen w-full bg-gray-900 overflow-hidden fixed inset-0 z-[60]">

            {/* 1. LEFT SIDEBAR - EDITING CONTROLS */}
            <div className="w-[420px] flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col h-full shadow-2xl relative z-20">

                {/* Header */}
                <div className="h-16 border-b border-gray-800 flex items-center justify-between px-6 bg-gray-900 shrink-0">
                    <div className="flex items-center gap-3">
                        <Link to="/admin" className="text-gray-400 hover:text-white transition-colors">
                            <ChevronDown className="w-5 h-5 rotate-90" />
                        </Link>
                        <span className="font-bold text-white tracking-widest text-sm">EDITOR VISUAL</span>
                    </div>

                    {/* Save Status Indicator */}
                    <div className="flex items-center gap-2">
                        {isSaving ? (
                            <div className="flex items-center gap-1.5 bg-avanti-gold/10 px-2 py-1 rounded-sm">
                                <span className="w-1.5 h-1.5 bg-avanti-gold rounded-full animate-pulse shadow-[0_0_8px_#C5A572]"></span>
                                <span className="text-[9px] font-bold text-avanti-gold uppercase tracking-tighter">Guardando</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold text-green-500 uppercase tracking-tighter">Sincronizado</span>
                                {lastSaved && (
                                    <span className="text-[8px] text-gray-500 font-medium tracking-tighter">
                                        {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Page Selector */}
                <div className="p-6 border-b border-gray-800 shrink-0 bg-gray-900/50 backdrop-blur-sm">
                    <div className="flex gap-2 mb-4">
                        <button
                            onClick={() => { setSelectedType('static'); setSelectedId('home'); }}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${selectedType === 'static' ? 'bg-avanti-gold text-white border-avanti-gold' : 'border-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            Páginas
                        </button>
                        <button
                            onClick={() => { setSelectedType('service'); setSelectedId(Object.keys(services)[0]); }}
                            className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-sm border ${selectedType === 'service' ? 'bg-avanti-gold text-white border-avanti-gold' : 'border-gray-700 text-gray-400 hover:text-white'}`}
                        >
                            Servicios
                        </button>
                    </div>

                    <label className={labelClass}>Seleccionar Página/Servicio</label>
                    <div className="relative">
                        <select
                            value={selectedId}
                            onChange={(e) => setSelectedId(e.target.value)}
                            className="w-full bg-gray-800 text-white border border-gray-700 px-4 py-3 rounded-sm appearance-none cursor-pointer focus:outline-none focus:border-avanti-gold font-serif"
                        >
                            {selectedType === 'static' ? (
                                <>
                                    <option value="home">Inicio (Home)</option>
                                    <option value="about">Sobre Nosotros</option>
                                    <option value="resources">Recursos (Blog)</option>
                                    <option value="contact">Contacto</option>
                                </>
                            ) : (
                                (Object.values(services) as ServiceData[]).map(s => (
                                    <option key={s.id} value={s.id}>{s.title}</option>
                                ))
                            )}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                </div>

                {/* Form Fields - Scrollable Area */}
                <div className="flex-grow overflow-y-auto p-6 custom-scrollbar pb-20">

                    {/* === HOME EDITOR === */}
                    {selectedType === 'static' && selectedId === 'home' && (
                        <div className="animate-page-enter">
                            <div className={sectionHeaderClass}>
                                <Layout className="w-4 h-4" /> Hero Section
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Título Principal</label>
                                    <input
                                        value={pageContent.home.hero.title}
                                        onChange={(e) => handleStaticUpdate('home', 'hero', 'title', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Subtítulo</label>
                                    <input
                                        value={pageContent.home.hero.subtitle}
                                        onChange={(e) => handleStaticUpdate('home', 'hero', 'subtitle', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Descripción</label>
                                    <textarea
                                        value={pageContent.home.hero.description}
                                        onChange={(e) => handleStaticUpdate('home', 'hero', 'description', e.target.value)}
                                        className={`${inputClass} h-24 resize-none`}
                                    />
                                </div>

                                <div className={sectionHeaderClass}>
                                    Slider Imágenes Hero
                                </div>
                                <div className="space-y-4">
                                    {(pageContent.home.hero.images || []).map((img, index) => (
                                        <div key={index} className="relative group">
                                            <ImageField
                                                label={`Imagen Slider ${index + 1}`}
                                                value={img}
                                                onUpdate={(url) => {
                                                    const newImages = [...(pageContent.home.hero.images || [])];
                                                    newImages[index] = url;
                                                    updatePageContent('home', 'hero', { images: newImages });
                                                }}
                                            />
                                            {pageContent.home.hero.images.length > 1 && (
                                                <button
                                                    onClick={() => {
                                                        const newImages = pageContent.home.hero.images.filter((_, i) => i !== index);
                                                        updatePageContent('home', 'hero', { images: newImages });
                                                    }}
                                                    className="absolute top-8 right-2 p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-sm opacity-0 group-hover:opacity-100 transition-all z-30"
                                                    title="Eliminar imagen"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newImages = [...(pageContent.home.hero.images || []), ""];
                                            updatePageContent('home', 'hero', { images: newImages });
                                        }}
                                        className="w-full py-4 border-2 border-dashed border-gray-700 rounded-sm text-gray-500 hover:border-avanti-gold hover:text-avanti-gold transition-all font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 bg-gray-800/30"
                                    >
                                        <Plus className="w-4 h-4" /> Agregar Imagen al Slider
                                    </button>
                                </div>
                            </div>

                            <div className={sectionHeaderClass}>
                                Collage "Navegando Hacia el Horizonte"
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <ImageField
                                        label="Imagen Principal (Fondo)"
                                        value={pageContent.home.collage.image1}
                                        onUpdate={(url) => handleStaticUpdate('home', 'collage', 'image1', url)}
                                    />
                                </div>
                                <ImageField
                                    label="Imagen Recuadro Grande"
                                    value={pageContent.home.collage.image2}
                                    onUpdate={(url) => handleStaticUpdate('home', 'collage', 'image2', url)}
                                />
                                <div className="space-y-4">
                                    <ImageField
                                        label="Imagen Recuadro Peq. 1"
                                        value={pageContent.home.collage.image3}
                                        onUpdate={(url) => handleStaticUpdate('home', 'collage', 'image3', url)}
                                    />
                                    <ImageField
                                        label="Imagen Recuadro Peq. 2"
                                        value={pageContent.home.collage.image4}
                                        onUpdate={(url) => handleStaticUpdate('home', 'collage', 'image4', url)}
                                    />
                                </div>
                            </div>

                            <div className={sectionHeaderClass}>
                                Tarjetas de Servicios
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <ImageField
                                    label="Imagen Fiscalidad"
                                    value={pageContent.home.cards.image1}
                                    onUpdate={(url) => handleStaticUpdate('home', 'cards', 'image1', url)}
                                />
                                <ImageField
                                    label="Imagen Finanzas"
                                    value={pageContent.home.cards.image2}
                                    onUpdate={(url) => handleStaticUpdate('home', 'cards', 'image2', url)}
                                />
                                <ImageField
                                    label="Imagen Crecimiento"
                                    value={pageContent.home.cards.image3}
                                    onUpdate={(url) => handleStaticUpdate('home', 'cards', 'image3', url)}
                                />
                            </div>

                            <div className={sectionHeaderClass}>
                                Sección Precisión
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Título</label>
                                    <input
                                        value={pageContent.home.precision?.title || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'precision', 'title', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Descripción</label>
                                    <textarea
                                        value={pageContent.home.precision?.description || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'precision', 'description', e.target.value)}
                                        className={`${inputClass} resize-none`}
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Insignia (Badge)</label>
                                    <input
                                        value={pageContent.home.precision?.badge || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'precision', 'badge', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <ImageField
                                    label="Imagen Lateral"
                                    value={pageContent.home.precision?.image || ''}
                                    onUpdate={(url) => handleStaticUpdate('home', 'precision', 'image', url)}
                                />
                            </div>

                            <div className={sectionHeaderClass}>
                                Banner Final (CTA)
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Título</label>
                                    <input
                                        value={pageContent.home.finalCta?.title || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'finalCta', 'title', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Título Italic (En gris)</label>
                                    <input
                                        value={pageContent.home.finalCta?.titleItalic || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'finalCta', 'titleItalic', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Descripción</label>
                                    <textarea
                                        value={pageContent.home.finalCta?.description || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'finalCta', 'description', e.target.value)}
                                        className={`${inputClass} resize-none`}
                                        rows={4}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Texto Botón Primario</label>
                                        <input
                                            value={pageContent.home.finalCta?.buttonPrimary || ''}
                                            onChange={(e) => handleStaticUpdate('home', 'finalCta', 'buttonPrimary', e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Texto Botón Secundario</label>
                                        <input
                                            value={pageContent.home.finalCta?.buttonSecondary || ''}
                                            onChange={(e) => handleStaticUpdate('home', 'finalCta', 'buttonSecondary', e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Insignia (Badge)</label>
                                    <input
                                        value={pageContent.home.finalCta?.badge || ''}
                                        onChange={(e) => handleStaticUpdate('home', 'finalCta', 'badge', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <ImageField
                                    label="Imagen de Fondo"
                                    value={pageContent.home.finalCta?.image || ''}
                                    onUpdate={(url) => handleStaticUpdate('home', 'finalCta', 'image', url)}
                                />
                            </div>
                            <div className={sectionHeaderClass}>
                                Branding & Logo
                            </div>
                            <div className="space-y-6">
                                <ImageField
                                    label="Logo para cabecera transparente"
                                    value={pageContent.home.branding?.logoLight}
                                    onUpdate={(url) => handleStaticUpdate('home', 'branding', 'logoLight', url)}
                                />
                                <ImageField
                                    label="Logo para cabecera sólida"
                                    value={pageContent.home.branding?.logoDark}
                                    onUpdate={(url) => handleStaticUpdate('home', 'branding', 'logoDark', url)}
                                />
                                <ImageField
                                    label="Logo de respaldo"
                                    value={pageContent.home.branding?.logoFallback}
                                    onUpdate={(url) => handleStaticUpdate('home', 'branding', 'logoFallback', url)}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Color fondo transparente</label>
                                        <input
                                            type="text"
                                            value={pageContent.home.branding?.transparentBackground || 'transparent'}
                                            onChange={(e) => handleStaticUpdate('home', 'branding', 'transparentBackground', e.target.value)}
                                            className={inputClass}
                                            placeholder="rgba(0,0,0,0)"
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Color fondo sólido</label>
                                        <input
                                            type="text"
                                            value={pageContent.home.branding?.solidBackground || 'rgba(255,255,255,0.85)'}
                                            onChange={(e) => handleStaticUpdate('home', 'branding', 'solidBackground', e.target.value)}
                                            className={inputClass}
                                            placeholder="rgba(255,255,255,0.85)"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === ABOUT EDITOR === */}
                    {selectedType === 'static' && selectedId === 'about' && (
                        <div className="animate-page-enter">
                            <div className={sectionHeaderClass}>Hero Section</div>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className={labelClass}>Título</label>
                                    <input value={pageContent.about.hero.title} onChange={(e) => handleStaticUpdate('about', 'hero', 'title', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Subtítulo</label>
                                    <input value={pageContent.about.hero.subtitle} onChange={(e) => handleStaticUpdate('about', 'hero', 'subtitle', e.target.value)} className={inputClass} />
                                </div>

                                <ImageField
                                    label="Imagen de Fondo"
                                    value={pageContent.about.hero.image}
                                    onUpdate={(url) => handleStaticUpdate('about', 'hero', 'image', url)}
                                />
                            </div>

                            <div className={sectionHeaderClass}>Introducción</div>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className={labelClass}>Título Intro</label>
                                    <input value={pageContent.about.intro.title} onChange={(e) => handleStaticUpdate('about', 'intro', 'title', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Contenido</label>
                                    <textarea value={pageContent.about.intro.content} onChange={(e) => handleStaticUpdate('about', 'intro', 'content', e.target.value)} className={`${inputClass} resize-none`} rows={6} />
                                </div>
                            </div>

                            <div className={sectionHeaderClass}>Tarjetas Informativas</div>
                            <div className="space-y-6">
                                <div className="border border-gray-700 p-4 rounded-sm bg-gray-800/50">
                                    <label className={labelClass}>Tarjeta 1</label>
                                    <input value={pageContent.about.cards.title1} onChange={(e) => handleStaticUpdate('about', 'cards', 'title1', e.target.value)} className={`${inputClass} mb-2`} placeholder="Título" />
                                    <textarea value={pageContent.about.cards.text1} onChange={(e) => handleStaticUpdate('about', 'cards', 'text1', e.target.value)} className={inputClass} rows={3} placeholder="Texto" />
                                </div>
                                <div className="border border-gray-700 p-4 rounded-sm bg-gray-800/50">
                                    <label className={labelClass}>Tarjeta 2</label>
                                    <input value={pageContent.about.cards.title2} onChange={(e) => handleStaticUpdate('about', 'cards', 'title2', e.target.value)} className={`${inputClass} mb-2`} placeholder="Título" />
                                    <textarea value={pageContent.about.cards.text2} onChange={(e) => handleStaticUpdate('about', 'cards', 'text2', e.target.value)} className={inputClass} rows={3} placeholder="Texto" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === RESOURCES EDITOR === */}
                    {selectedType === 'static' && selectedId === 'resources' && (
                        <div className="animate-page-enter">
                            <div className={sectionHeaderClass}>Hero Section</div>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className={labelClass}>Título</label>
                                    <input value={pageContent.resources.hero.title} onChange={(e) => handleStaticUpdate('resources', 'hero', 'title', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Subtítulo</label>
                                    <textarea value={pageContent.resources.hero.subtitle} onChange={(e) => handleStaticUpdate('resources', 'hero', 'subtitle', e.target.value)} className={`${inputClass} resize-none`} rows={4} />
                                </div>

                                <ImageField
                                    label="Imagen de Fondo"
                                    value={pageContent.resources.hero.image}
                                    onUpdate={(url) => handleStaticUpdate('resources', 'hero', 'image', url)}
                                />
                            </div>
                        </div>
                    )}

                    {/* === CONTACT EDITOR === */}
                    {selectedType === 'static' && selectedId === 'contact' && (
                        <div className="animate-page-enter">
                            <div className={sectionHeaderClass}>Hero Section</div>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className={labelClass}>Título</label>
                                    <input value={pageContent.contact.hero.title} onChange={(e) => handleStaticUpdate('contact', 'hero', 'title', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Subtítulo</label>
                                    <textarea value={pageContent.contact.hero.subtitle} onChange={(e) => handleStaticUpdate('contact', 'hero', 'subtitle', e.target.value)} className={`${inputClass} resize-none`} rows={4} />
                                </div>

                                <ImageField
                                    label="Imagen de Fondo"
                                    value={pageContent.contact.hero.image}
                                    onUpdate={(url) => handleStaticUpdate('contact', 'hero', 'image', url)}
                                />
                            </div>

                            <div className={sectionHeaderClass}>Información de Contacto</div>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Email</label>
                                    <input value={pageContent.contact.info.email} onChange={(e) => handleStaticUpdate('contact', 'info', 'email', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Teléfono</label>
                                    <input value={pageContent.contact.info.phone} onChange={(e) => handleStaticUpdate('contact', 'info', 'phone', e.target.value)} className={inputClass} />
                                </div>
                                <div>
                                    <label className={labelClass}>Oficina (Ciudad, Estado)</label>
                                    <input value={pageContent.contact.info.office} onChange={(e) => handleStaticUpdate('contact', 'info', 'office', e.target.value)} className={inputClass} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* === SERVICE EDITOR === */}
                    {selectedType === 'service' && services[selectedId] && (
                        <div className="animate-page-enter">
                            <div className={sectionHeaderClass}>
                                <Briefcase className="w-4 h-4" /> Información General
                            </div>
                            <div className="space-y-6 mb-8">
                                <div>
                                    <label className={labelClass}>Nombre del Servicio</label>
                                    <input
                                        value={services[selectedId].title}
                                        onChange={(e) => handleServiceUpdate('title', e.target.value)}
                                        className={inputClass}
                                    />
                                </div>

                                <ImageField
                                    label="Imagen Header"
                                    value={services[selectedId].image || ''}
                                    onUpdate={(url) => handleServiceUpdate('image', url)}
                                />

                                <div>
                                    <label className={labelClass}>Descripción Principal</label>
                                    <textarea
                                        value={services[selectedId].description}
                                        onChange={(e) => handleServiceUpdate('description', e.target.value)}
                                        className={`${inputClass} resize-none leading-relaxed`}
                                        rows={8}
                                    />
                                </div>
                            </div>

                            <div className={sectionHeaderClass}>
                                <List className="w-4 h-4" /> Lista de Características
                            </div>
                            <div className="space-y-3">
                                {services[selectedId].bullets.map((bullet, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <input
                                            value={bullet}
                                            onChange={(e) => handleBulletUpdate(idx, e.target.value)}
                                            className={inputClass}
                                        />
                                        <button
                                            onClick={() => removeBullet(idx)}
                                            className="p-3 bg-red-900/20 text-red-400 hover:text-red-200 border border-transparent hover:border-red-900 rounded-sm"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addBullet}
                                    className="w-full py-3 mt-2 border border-dashed border-gray-700 text-gray-400 hover:text-avanti-gold hover:border-avanti-gold rounded-sm text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Agregar Punto
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* 2. RIGHT SIDE - LIVE PREVIEW */}
            <div className="flex-grow bg-gray-950 flex flex-col h-full relative overflow-hidden">

                {/* Preview Toolbar */}
                <div className="h-16 flex items-center justify-center gap-4 border-b border-gray-800 bg-gray-900 shadow-md z-10 shrink-0">
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={`p-2 rounded-sm transition-all ${viewMode === 'desktop' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
                        title="Vista Escritorio"
                    >
                        <Monitor className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`p-2 rounded-sm transition-all ${viewMode === 'mobile' ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-white'}`}
                        title="Vista Móvil"
                    >
                        <Smartphone className="w-5 h-5" />
                    </button>
                    <span className="h-4 w-px bg-gray-700 mx-2"></span>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Vista Previa: <span className="text-white font-bold">
                            {selectedType === 'service'
                                ? 'Servicios'
                                : selectedId === 'home'
                                    ? 'Home'
                                    : selectedId === 'about'
                                        ? 'About'
                                        : selectedId === 'resources'
                                            ? 'Resources'
                                            : selectedId === 'contact'
                                                ? 'Contact'
                                                : 'Página'}
                        </span>
                    </div>
                </div>

                {/* Iframe/Component Container */}
                <div className="flex-grow overflow-hidden flex items-center justify-center p-8 bg-dots">
                    <div
                        className={`bg-white shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto no-scrollbar relative ${viewMode === 'desktop' ? 'w-full h-full rounded-sm' : 'w-[375px] h-[812px] rounded-[3rem] border-8 border-gray-800'
                            }`}
                    >
                        <div className="transform origin-top-left h-full">
                            {selectedType === 'static' && selectedId === 'home' && <Home />}
                            {selectedType === 'static' && selectedId === 'about' && <About />}
                            {selectedType === 'static' && selectedId === 'resources' && <Resources />}
                            {selectedType === 'static' && selectedId === 'contact' && <Contact />}
                            {selectedType === 'service' && services[selectedId] && <ServicePage previewData={services[selectedId]} />}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default PageEditor;
