import React, { useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { useCMS } from '../../context/CMSContext';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Copy, CheckCircle, FileText, Type, Eraser } from 'lucide-react';

const AIGenerator: React.FC = () => {
    const { addPost } = useCMS();

    // State
    const [prompt, setPrompt] = useState('');
    const [keywords, setKeywords] = useState('');
    const [tone, setTone] = useState('Profesional y Corporativo');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const tones = ['Profesional y Corporativo', 'Técnico y Detallado', 'Persuasivo y Comercial', 'Educativo y Simple'];

    const handleGenerate = async () => {
        if (!prompt) return;

        setIsGenerating(true);
        setError(null);
        setGeneratedContent(null);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key no encontrada");

            const ai = new GoogleGenAI({ apiKey });

            // Construct the prompt for Gemini
            const systemInstruction = `
            Actúa como un redactor experto en finanzas, contabilidad y leyes fiscales internacionales para el blog corporativo de 'Avanti Advisory Group'.
            Genera un artículo de blog estructurado en formato JSON.
            
            Estructura JSON requerida:
            {
                "title": "Un título optimizado para SEO y atractivo",
                "subtitle": "Un subtítulo breve",
                "category": "Una categoría relevante (ej. Fiscalidad, Negocios, Finanzas)",
                "excerpt": "Un resumen de 2-3 frases para la vista previa",
                "content": "El cuerpo del artículo en formato HTML. Usa <h3> para subtítulos, <p> para párrafos, <ul>/<li> para listas. NO uses <h1>. Hazlo de al menos 400 palabras."
            }
        `;

            const userPrompt = `
            Tema: ${prompt}
            Palabras clave obligatorias: ${keywords}
            Tono: ${tone}
            Idioma: Español
        `;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userPrompt,
                config: {
                    systemInstruction: systemInstruction,
                    responseMimeType: "application/json"
                }
            });

            const jsonResponse = JSON.parse(response.text || '{}');

            // Add artificial date and author
            jsonResponse.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            jsonResponse.author = "IA Assistant (Revisado)";
            jsonResponse.image = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"; // Default business image

            setGeneratedContent(jsonResponse);

        } catch (err: any) {
            console.error(err);
            setError("Error generando contenido. Por favor intenta de nuevo.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveToCMS = () => {
        if (generatedContent) {
            addPost(generatedContent);
            alert('Artículo guardado exitosamente en el CMS.');
            setGeneratedContent(null);
            setPrompt('');
            setKeywords('');
        }
    };

    // Styles - Updated for Cleaner Look
    const inputClass = "w-full px-5 py-4 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-avanti-gold focus:border-avanti-gold bg-[#F9F9F7] focus:bg-white placeholder-gray-400 transition-all duration-300 text-sm text-avanti-900";
    const labelClass = "block text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-2";

    return (
        <AdminLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-display font-bold text-avanti-900 flex items-center gap-3">
                    <Sparkles className="text-avanti-gold" /> AI Blog Generator
                </h1>
                <p className="text-sm text-gray-500 mt-2 font-light">Genera artículos optimizados para SEO en segundos utilizando Gemini.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Input Section */}
                <div className="bg-white p-8 md:p-10 rounded-sm border border-gray-200 shadow-sm h-fit">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                        <h3 className="font-bold text-avanti-900 uppercase tracking-[0.2em] text-xs">Configuración</h3>
                        <button onClick={() => { setPrompt(''); setKeywords('') }} className="text-gray-400 hover:text-avanti-900 transition-colors" title="Limpiar">
                            <Eraser className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <label className={labelClass}>Tema Principal / Idea</label>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ej: Ventajas de abrir una LLC en Florida para extranjeros..."
                                className={`${inputClass} h-32 resize-none`}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Palabras Clave (Opcional)</label>
                            <input
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="Ej: Impuestos, IRS, No residentes"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>Tono de voz</label>
                            <div className="grid grid-cols-2 gap-3">
                                {tones.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTone(t)}
                                        className={`px-4 py-3 text-[10px] font-bold uppercase tracking-wide rounded-sm border transition-all duration-300 ${tone === t
                                                ? 'bg-avanti-900 text-white border-avanti-900 shadow-md'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-avanti-900'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating || !prompt}
                            className={`w-full py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-md ${isGenerating || !prompt ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' : 'bg-avanti-gold text-white hover:bg-yellow-600 hover:shadow-lg transform hover:-translate-y-0.5'}`}
                        >
                            {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" /> Generando...</> : <><Sparkles className="w-4 h-4" /> Generar Contenido</>}
                        </button>

                        {error && <p className="text-red-500 text-xs mt-2 text-center bg-red-50 py-2 rounded-sm border border-red-100">{error}</p>}
                    </div>
                </div>

                {/* Preview Section */}
                <div className="bg-gray-50 p-8 md:p-10 rounded-sm border border-gray-200 shadow-inner min-h-[600px] flex flex-col relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-avanti-gold/20 via-avanti-gold to-avanti-gold/20"></div>
                    <h3 className="font-bold text-gray-400 uppercase tracking-[0.2em] text-[10px] mb-6">Vista Previa del Resultado</h3>

                    {generatedContent ? (
                        <div className="flex-grow flex flex-col animate-page-enter">
                            <div className="bg-white p-10 rounded-sm shadow-xl flex-grow overflow-y-auto max-h-[600px] border border-gray-100 relative">
                                <span className="absolute top-0 right-0 w-16 h-16 bg-avanti-light/50 -mr-8 -mt-8 rounded-full blur-2xl"></span>

                                <span className="text-[10px] bg-avanti-light text-avanti-gold px-3 py-1 rounded-sm font-bold uppercase tracking-widest mb-6 inline-block border border-avanti-gold/20">{generatedContent.category}</span>
                                <h2 className="text-3xl font-serif font-bold text-avanti-900 mb-3 leading-tight">{generatedContent.title}</h2>
                                <p className="text-sm text-gray-500 mb-8 border-l-2 border-avanti-gold pl-4">{generatedContent.subtitle}</p>

                                <div
                                    className="prose prose-sm prose-slate max-w-none prose-headings:font-serif prose-headings:text-avanti-900 prose-a:text-avanti-gold"
                                    dangerouslySetInnerHTML={{ __html: generatedContent.content }}
                                />
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button onClick={handleSaveToCMS} className="flex-1 bg-avanti-900 text-white py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-avanti-800 transition-all shadow-lg flex justify-center items-center gap-2 transform hover:-translate-y-0.5">
                                    <CheckCircle className="w-4 h-4" /> Guardar en CMS
                                </button>
                                <button onClick={() => setGeneratedContent(null)} className="px-8 border border-gray-300 text-gray-600 py-4 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-white hover:border-red-400 hover:text-red-500 transition-colors">
                                    Descartar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-gray-300 space-y-6 border-2 border-dashed border-gray-200 rounded-sm bg-gray-50/50">
                            {isGenerating ? (
                                <div className="text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-avanti-gold blur-xl opacity-20 rounded-full animate-pulse"></div>
                                        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6 text-avanti-gold relative z-10" />
                                    </div>
                                    <p className="text-sm font-bold text-avanti-900 uppercase tracking-widest animate-pulse">Redactando...</p>
                                    <p className="text-xs text-gray-400 mt-2">Esto puede tomar unos segundos</p>
                                </div>
                            ) : (
                                <>
                                    <div className="p-6 bg-white rounded-full shadow-sm border border-gray-100">
                                        <FileText className="w-10 h-10 opacity-20 text-avanti-900" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">El contenido generado aparecerá aquí</p>
                                </>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </AdminLayout>
    );
};

export default AIGenerator;