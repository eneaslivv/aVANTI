import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Anchor, ScrollText, Check, Landmark, Calculator, BarChart2, Mouse, Loader2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { Reveal, WordReveal } from '../components/Reveal';
import { ContactReason } from '../types';

const Home: React.FC = () => {
    const { pageContent, t, addMessage } = useCMS();
    const { hero, collage, cards, precision, finalCta } = pageContent.home;
    const { images: heroImages } = hero;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        reason: ContactReason.General,
        message: '',
        privacy: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [id]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };

    const handleInterestChange = (interest: ContactReason) => {
        setFormData(prev => ({ ...prev, reason: interest }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.privacy) {
            setError(t('contact.privacyError') || 'Debe aceptar la política de privacidad');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await addMessage({
                name: formData.name,
                email: formData.email,
                phone: '', // Home form doesn't have phone
                reason: formData.reason,
                message: `[Página: Home]\n${formData.message}`
            });

            setSuccess(true);
            setFormData({
                name: '',
                email: '',
                reason: ContactReason.General,
                message: '',
                privacy: false
            });

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            console.error('Submission error:', err);
            setError(t('contact.formError') || 'Hubo un error al enviar su mensaje.');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";
    const layoutPadding = "px-6 md:px-16 lg:px-24";

    return (
        <div className="flex flex-col">
            {/* Hero / Welcome Banner with Background Slider */}
            <section className={`relative overflow-hidden pt-24 pb-16 md:pt-48 md:pb-40 bg-avanti-900 flex items-center justify-start min-h-[75vh] md:min-h-[85vh]`}>

                {/* Background Slider Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none select-none">
                    {heroImages.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Background ${idx}`}
                            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[2500ms] ease-in-out ${idx === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'} transition-transform duration-[10000ms]`}
                            referrerPolicy="no-referrer"
                        />
                    ))}
                    {/* Unified Overlay for high contrast */}
                    <div className="absolute inset-0 bg-black/50"></div>
                    {/* Subtle bottom vignette to blend with the next section */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>

                {/* Content Container */}
                <div className={`relative z-10 w-full ${gridContainer}`}>
                    <div className="flex flex-col items-start text-left">

                        {/* Clean Text Container aligned with nav */}
                        <div className="w-full max-w-4xl lg:max-w-5xl">

                            <h1 className="font-serif text-3xl md:text-6xl text-white leading-[1.1] mb-6 drop-shadow-2xl tracking-tight">
                                <Reveal delay={0.1} duration="slow">
                                    {hero.title}
                                </Reveal>
                            </h1>

                            <h2 className="font-serif text-3xl md:text-4xl mb-10 drop-shadow-2xl font-medium leading-tight text-gray-100 tracking-tight">
                                <Reveal delay={0.4} duration="slow">
                                    <span className="text-gray-100">{hero.subtitle}</span>
                                </Reveal>
                            </h2>

                            <Reveal delay={0.8} duration="slow">
                                <p className="text-base md:text-lg text-gray-200 mb-12 leading-relaxed font-normal relative z-20 drop-shadow-xl max-w-2xl">
                                    {hero.description}
                                </p>

                                <Link
                                    to="/about"
                                    className="inline-flex items-center text-white border-b-2 border-white pb-2 hover:border-avanti-gold transition-all duration-500 uppercase tracking-widest text-xs font-bold hover:text-avanti-gold group"
                                >
                                    {t('home.readMore')} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
                                </Link>
                            </Reveal>

                        </div>
                    </div>
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {heroImages.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`h-1 transition-all duration-500 rounded-full ${idx === currentImageIndex ? 'w-12 bg-avanti-gold' : 'w-6 bg-white/30 hover:bg-white/50'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-10 right-10 z-20 hidden md:flex flex-col items-center gap-2 animate-bounce opacity-80">
                    <span className="text-[10px] uppercase tracking-widest text-white/80 font-semibold">Scroll</span>
                    <Mouse className="w-6 h-6 text-white/80" />
                </div>
            </section>

            {/* Services Module */}
            <section className="bg-stone-50 relative overflow-hidden antialiased text-stone-900 selection:bg-stone-200 selection:text-stone-900 py-16 md:py-32 border-t border-stone-200">
                <div className={gridContainer}>

                    {/* Section Header */}
                    <div className="mb-20 max-w-3xl">
                        <Reveal delay={0.2}>
                            <h2 className="font-serif text-4xl md:text-5xl text-stone-900 tracking-tight leading-[1.15] mb-6">
                                {t('home.infraTitle')} <span className="text-stone-400 font-serif">{t('home.infraTitleItalic')}</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p className="text-lg md:text-xl text-stone-500 font-light leading-relaxed max-w-2xl">
                                {t('home.infraDesc')}
                            </p>
                        </Reveal>
                    </div>

                    {/* Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Card 1: Fiscalidad */}
                        <Reveal delay={0.2} className="h-full" duration="slow">
                            <div className="group bg-white border border-stone-200 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-1000 ease-out flex flex-col h-full overflow-hidden rounded-sm relative transform hover:-translate-y-1">
                                {/* Visual Area */}
                                <div className="h-64 bg-stone-100 relative border-b border-stone-100 overflow-hidden">
                                    <img
                                        src={cards.image1}
                                        className="w-full h-full object-cover transition-all duration-[1500ms] ease-out group-hover:scale-110"
                                        alt={t('home.card1.title')}
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow relative z-10 bg-white">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Landmark className="w-4 h-4 text-stone-500 group-hover:text-stone-800 transition-colors" />
                                        <span className="text-xs font-semibold tracking-widest text-stone-500 uppercase group-hover:text-stone-800 transition-colors">{t('home.card1.badge')}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-stone-900 tracking-tight mb-3 group-hover:text-stone-700 transition-colors">
                                        {t('home.card1.title')}
                                    </h3>
                                    <p className="text-base text-stone-500 leading-relaxed font-normal mb-8 flex-grow">
                                        {t('home.card1.desc')}
                                    </p>
                                    <div className="pt-4 border-t border-stone-100 mt-auto">
                                        <Link to="/services/impuestos-empresas#details" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-stone-900 group-hover:text-stone-600 transition-colors">
                                            {t('home.card1.link')}
                                            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-500 group-hover:translate-x-1.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Card 2: Finanzas */}
                        <Reveal delay={0.4} className="h-full" duration="slow">
                            <div className="group bg-white border border-stone-200 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-1000 ease-out flex flex-col h-full overflow-hidden rounded-sm relative transform hover:-translate-y-1">
                                <div className="h-64 bg-stone-100 relative border-b border-stone-100 overflow-hidden">
                                    <img
                                        src={cards.image2}
                                        className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                                        alt={t('home.card2.title')}
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow relative z-10 bg-white">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Calculator className="w-4 h-4 text-stone-500 group-hover:text-stone-800 transition-colors" />
                                        <span className="text-xs font-semibold tracking-widest text-stone-500 uppercase group-hover:text-stone-800 transition-colors">{t('home.card2.badge')}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-stone-900 tracking-tight mb-3 group-hover:text-stone-700 transition-colors">
                                        {t('home.card2.title')}
                                    </h3>
                                    <p className="text-base text-stone-500 leading-relaxed font-normal mb-8 flex-grow">
                                        {t('home.card2.desc')}
                                    </p>
                                    <div className="pt-4 border-t border-stone-100 mt-auto">
                                        <Link to="/services/contabilidad#details" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-stone-900 group-hover:text-stone-600 transition-colors">
                                            {t('home.card2.link')}
                                            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-500 group-hover:translate-x-1.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Card 3: Crecimiento */}
                        <Reveal delay={0.6} className="h-full" duration="slow">
                            <div className="group bg-white border border-stone-200 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-1000 ease-out flex flex-col h-full overflow-hidden rounded-sm relative transform hover:-translate-y-1">
                                <div className="h-64 bg-stone-100 relative border-b border-stone-100 overflow-hidden">
                                    <img
                                        src={cards.image3}
                                        className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                                        alt={t('home.card3.title')}
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow relative z-10 bg-white">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BarChart2 className="w-4 h-4 text-stone-500 group-hover:text-stone-800 transition-colors" />
                                        <span className="text-xs font-semibold tracking-widest text-stone-500 uppercase group-hover:text-stone-800 transition-colors">{t('home.card3.badge')}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-stone-900 tracking-tight mb-3 group-hover:text-stone-700 transition-colors">
                                        {t('home.card3.title')}
                                    </h3>
                                    <p className="text-base text-stone-500 leading-relaxed font-normal mb-8 flex-grow">
                                        {t('home.card3.desc')}
                                    </p>
                                    <div className="pt-4 border-t border-stone-100 mt-auto">
                                        <Link to="/services/branding#details" className="inline-flex items-center text-xs font-bold tracking-widest uppercase text-stone-900 group-hover:text-stone-600 transition-colors">
                                            {t('home.card3.link')}
                                            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-500 group-hover:translate-x-1.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 1: Navegando Hacia el Horizonte */}
            <section className="bg-avanti-light border-b border-gray-200 py-16 md:py-32">
                <div className={gridContainer}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 lg:order-1">
                            <Reveal delay={0.2}>
                                <div className="aspect-[4/5] relative overflow-hidden rounded-sm shadow-2xl shadow-gray-200">
                                    <img src={collage.image1} alt="Modern Penthouse at Sunset" className="w-full h-full object-cover grayscale-[10%] hover:scale-105 transition-transform duration-1000 ease-out" />
                                    <div className="absolute inset-0 bg-white p-1.5 grid grid-cols-2 grid-rows-3 gap-1.5 z-10">
                                        <div className="col-span-2 row-span-2 relative rounded-sm overflow-hidden group cursor-pointer">
                                            <img src={collage.image2} alt="Strategic Vision" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                            <div className="group-hover:bg-transparent transition-colors duration-500 bg-avanti-900/5 absolute top-0 right-0 bottom-0 left-0"></div>
                                        </div>
                                        <div className="col-span-1 row-span-1 relative rounded-sm overflow-hidden group cursor-pointer">
                                            <img src={collage.image3} alt="Detail Focus" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-avanti-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                                        </div>
                                        <div className="col-span-1 row-span-1 relative rounded-sm overflow-hidden group cursor-pointer">
                                            <img src={collage.image4} alt="Growth Patterns" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-avanti-900/5 group-hover:bg-transparent transition-colors duration-500"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-l border-b border-gray-300 hidden md:block"></div>
                            </Reveal>
                        </div>
                        <div className="order-1 lg:order-2 lg:pl-12">
                            <Reveal delay={0.2}>
                                <h2 className="font-serif text-4xl md:text-5xl text-avanti-900 tracking-tight leading-tight mb-6">
                                    {t('home.horizon.title')} <br /><span className="text-gray-400">{t('home.horizon.titleItalic')}</span>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <h3 className="text-lg text-slate-500 font-light mb-10 leading-relaxed">
                                    {t('home.horizon.subtitle')}
                                </h3>
                            </Reveal>
                            <div className="space-y-10">
                                <Reveal delay={0.5}>
                                    <div className="flex gap-5 group">
                                        <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-avanti-gold transition-colors">
                                            <Compass className="w-5 h-5 text-avanti-900" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-avanti-900 mb-2 tracking-tight">{t('home.horizon.item1.title')}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {t('home.horizon.item1.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal delay={0.6}>
                                    <div className="flex gap-5 group">
                                        <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-avanti-gold transition-colors">
                                            <Anchor className="w-5 h-5 text-avanti-900" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-avanti-900 mb-2 tracking-tight">{t('home.horizon.item2.title')}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {t('home.horizon.item2.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                                <Reveal delay={0.7}>
                                    <div className="flex gap-5 group">
                                        <div className="mt-1 flex-shrink-0 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:border-avanti-gold transition-colors">
                                            <ScrollText className="w-5 h-5 text-avanti-900" />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-avanti-900 mb-2 tracking-tight">{t('home.horizon.item3.title')}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {t('home.horizon.item3.desc')}
                                            </p>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 2: La Precisión en Cada Detalle */}
            <section id="contacto" className="py-16 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#44403c 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <div className={`${gridContainer} relative z-10`}>
                    <div className="text-center mb-20">
                        <Reveal delay={0.2}>
                            <h2 className="font-serif text-4xl md:text-5xl text-avanti-900 tracking-tight mb-4">
                                {precision?.title || t('home.precision.title')}
                            </h2>
                            <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto">
                                {precision?.description || t('home.precision.desc')}
                            </p>
                        </Reveal>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="relative order-2 md:order-1">
                            <Reveal delay={0.4}>
                                <div className="aspect-[4/5] relative w-full group overflow-hidden rounded-sm bg-gray-100">
                                    <div className="absolute inset-0 border border-gray-200 translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 z-20 pointer-events-none"></div>
                                    <img src={precision?.image || "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Vintage%20Car%20Coast%20Sunset.png"} alt="Vintage car at coast sunset" className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out relative z-10" />
                                    <div className="absolute bottom-6 left-6 right-6 text-white text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium drop-shadow-md bg-avanti-900/50 backdrop-blur-sm p-2 text-center rounded-sm z-30">
                                        {precision?.badge || t('home.precision.badge')}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="order-1 md:order-2 pt-8 md:pt-0">
                            <Reveal delay={0.6}>
                                {success ? (
                                    <div className="bg-green-50 border border-green-200 p-12 rounded-sm text-center animate-page-enter">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-700">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h4 className="text-green-800 font-serif text-2xl mb-4 font-medium">{t('contact.formSuccessTitle')}</h4>
                                        <p className="text-green-700 mb-8">{t('contact.formSuccessMsg')}</p>
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="text-sm font-bold uppercase tracking-widest text-green-800 border-b border-green-800 pb-1 hover:opacity-70 transition-opacity"
                                        >
                                            {t('contact.formAnother')}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        {error && (
                                            <div className="bg-red-50 border border-red-200 p-4 rounded-sm mb-6">
                                                <p className="text-red-700 text-xs font-medium text-center">{error}</p>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.name')}</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-avanti-900 focus:outline-none focus:border-avanti-900 transition-colors placeholder-gray-300 text-sm font-light"
                                                    placeholder="..."
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.email')}</label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-gray-300 py-3 text-avanti-900 focus:outline-none focus:border-avanti-900 transition-colors placeholder-gray-300 text-sm font-light"
                                                    placeholder="..."
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.interest')}</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleInterestChange(ContactReason.TaxesCorporate)}
                                                    className={`py-3 px-4 text-xs text-center border rounded-sm transition-all ${formData.reason === ContactReason.TaxesCorporate ? 'bg-avanti-900 text-white border-avanti-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                                                >
                                                    {t('home.form.interest.wealth')}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleInterestChange(ContactReason.Accounting)}
                                                    className={`py-3 px-4 text-xs text-center border rounded-sm transition-all ${formData.reason === ContactReason.Accounting ? 'bg-avanti-900 text-white border-avanti-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                                                >
                                                    {t('home.form.interest.invest')}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleInterestChange(ContactReason.General)}
                                                    className={`py-3 px-4 text-xs text-center border rounded-sm transition-all ${formData.reason === ContactReason.General ? 'bg-avanti-900 text-white border-avanti-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                                                >
                                                    {t('home.form.interest.succession')}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label htmlFor="message" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.message')}</label>
                                            <textarea
                                                id="message"
                                                rows={3}
                                                required
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-gray-300 py-3 text-avanti-900 focus:outline-none focus:border-avanti-900 transition-colors placeholder-gray-300 text-sm resize-none"
                                                placeholder="..."
                                            ></textarea>
                                        </div>
                                        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                                            <label className="flex items-center space-x-3 cursor-pointer group">
                                                <div className="relative w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-gray-500 transition-colors bg-white">
                                                    <input
                                                        type="checkbox"
                                                        id="privacy"
                                                        checked={formData.privacy}
                                                        onChange={handleInputChange}
                                                        className="peer appearance-none w-full h-full cursor-pointer absolute inset-0"
                                                    />
                                                    <Check className="w-3 h-3 text-avanti-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                </div>
                                                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{t('home.form.privacy')}</span>
                                            </label>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="group flex items-center space-x-2 bg-avanti-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-avanti-800 transition-all shadow-lg shadow-gray-200 w-full md:w-auto justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <>
                                                        <span>{t('home.form.submit')}</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden min-h-[60vh] flex items-center bg-avanti-900">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={finalCta?.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"}
                        alt="Corporate Excellence"
                        className="w-full h-full object-cover opacity-80"
                    />
                    {/* Deep black gradient for text readability and high-end aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                </div>

                <div className={`${gridContainer} relative z-10 w-full`}>
                    <div className="max-w-3xl">
                        <Reveal delay={0.2}>
                            <div className="inline-flex items-center gap-3 mb-8">
                                <span className="h-px w-12 bg-avanti-gold"></span>
                                <span className="text-avanti-gold font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase drop-shadow-sm">
                                    {finalCta?.badge || t('home.ctaBadge')}
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <h2 className="font-serif text-3xl md:text-7xl text-white mb-8 leading-[1.1] drop-shadow-xl tracking-tight">
                                {finalCta?.title || t('home.ctaTitle')} <br />
                                <span className="text-gray-400 font-normal">{finalCta?.titleItalic || t('home.ctaTitleItalic')}</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.6}>
                            <p className="text-gray-300 text-lg md:text-2xl mb-12 leading-relaxed font-light max-w-xl drop-shadow-md">
                                {finalCta?.description || t('home.ctaDesc')}
                            </p>
                        </Reveal>

                        <Reveal delay={0.8}>
                            <div className="flex flex-col sm:flex-row gap-6">
                                <Link
                                    to="/contact"
                                    className="inline-flex justify-center items-center bg-white text-avanti-900 px-10 py-5 rounded-sm font-bold hover:bg-avanti-gold hover:text-white transition-all duration-300 uppercase tracking-widest text-[11px] shadow-2xl hover:-translate-y-1"
                                >
                                    {finalCta?.buttonPrimary || t('home.ctaButtonPrimary')}
                                </Link>
                                <Link
                                    to="/services"
                                    className="inline-flex justify-center items-center px-10 py-5 rounded-sm font-bold text-white border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 uppercase tracking-widest text-[11px] backdrop-blur-sm"
                                >
                                    {finalCta?.buttonSecondary || t('home.ctaButtonSecondary')}
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
