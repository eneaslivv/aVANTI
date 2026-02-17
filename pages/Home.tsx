import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Anchor, ScrollText, Check, Landmark, Calculator, BarChart2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { Reveal, WordReveal } from '../components/Reveal';

const Home: React.FC = () => {
    const { pageContent, t } = useCMS();
    const { hero, collage, cards, precision, finalCta } = pageContent.home;
    const { images: heroImages } = hero;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            <section className={`relative overflow-hidden pt-32 pb-24 md:pt-48 md:pb-40 bg-avanti-900 flex items-center justify-start min-h-[85vh] ${layoutPadding}`}>

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
                <div className="relative z-10 w-full max-w-[1400px]">
                    <div className="flex flex-col items-start text-left">

                        {/* Clean Text Container aligned with nav */}
                        <div className="w-full max-w-4xl lg:max-w-5xl">

                            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] mb-6 drop-shadow-2xl tracking-tight">
                                <WordReveal text={hero.title} delay={0} className="text-white" />
                            </h1>

                            <h2 className="font-serif text-3xl md:text-4xl mb-10 drop-shadow-2xl font-medium leading-tight text-gray-100 tracking-tight">
                                <WordReveal text={hero.subtitle} delay={0.4} gradient={false} className="text-gray-100" />
                            </h2>

                            <Reveal delay={1.2} duration="slow">
                                <p className="text-base md:text-lg text-gray-200 mb-12 leading-relaxed font-normal relative z-20 drop-shadow-xl">
                                    {hero.description}
                                </p>

                                <Link
                                    to="/about"
                                    className="inline-flex items-center text-white border-b-2 border-white pb-2 hover:border-avanti-gold transition-all duration-300 uppercase tracking-widest text-xs font-bold hover:text-avanti-gold group"
                                >
                                    {t('home.readMore')} <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
            </section>

            {/* Services Module */}
            <section className="bg-stone-50 relative overflow-hidden antialiased text-stone-900 selection:bg-stone-200 selection:text-stone-900 py-24 md:py-32 border-t border-stone-200">
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
                        <Reveal delay={0.2} className="h-full">
                            <div className="group bg-white border border-stone-200 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-700 ease-out flex flex-col h-full overflow-hidden rounded-sm relative transform hover:-translate-y-1">
                                {/* Visual Area */}
                                <div className="h-64 bg-stone-100 relative border-b border-stone-100 flex items-center justify-center p-8 overflow-hidden">
                                    <div className="absolute inset-0 z-0 opacity-80 blur-[2px] scale-105 group-hover:scale-100 group-hover:blur-0 group-hover:opacity-100 transition-all duration-1000 ease-out">
                                        <img src={cards.image1} className="w-full h-full object-cover grayscale-[20%]" alt="Architecture pattern" />
                                    </div>
                                    <div className="relative z-10 w-32 perspective-1000">
                                        <div className="absolute top-0 left-0 w-full h-full bg-stone-100/80 border border-stone-200 rounded-sm -z-10 origin-bottom-left transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-6 group-hover:translate-x-6 group-hover:translate-y-2 group-hover:bg-white/90"></div>
                                        <div className="bg-white rounded-sm shadow-xl shadow-stone-900/10 border border-stone-200 p-4 relative mx-auto backdrop-blur-sm bg-white/95 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:-rotate-3 group-hover:shadow-2xl">
                                            <div className="space-y-2 mb-4">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div className="w-8 h-8 rounded-full border border-stone-100 bg-stone-50 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                                                        <div className="w-3 h-3 bg-stone-300 rounded-full group-hover:bg-emerald-400 transition-colors duration-500"></div>
                                                    </div>
                                                    <div className="w-8 h-1 bg-stone-100 rounded-full"></div>
                                                </div>
                                                <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-stone-200 w-0 group-hover:w-full transition-all duration-1000 ease-out delay-100"></div>
                                                </div>
                                                <div className="w-3/4 h-1 bg-stone-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-stone-200 w-0 group-hover:w-3/4 transition-all duration-1000 ease-out delay-200"></div>
                                                </div>
                                                <div className="w-5/6 h-1 bg-stone-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-stone-200 w-0 group-hover:w-5/6 transition-all duration-1000 ease-out delay-300"></div>
                                                </div>
                                            </div>
                                            <div className="absolute -right-3 -bottom-3 bg-white border border-stone-100 shadow-lg rounded-full p-1.5 flex items-center justify-center z-20 transition-all duration-500 ease-spring group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-emerald-100 delay-100">
                                                <div className="bg-emerald-50 text-emerald-600 rounded-full p-1">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                        <Reveal delay={0.4} className="h-full">
                            <div className="group bg-white border border-stone-200 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-700 ease-out flex flex-col h-full overflow-hidden rounded-sm relative transform hover:-translate-y-1">
                                <div className="h-64 bg-stone-100 relative border-b border-stone-100 flex items-center justify-center p-8 overflow-hidden">
                                    <div className="absolute inset-0 z-0 opacity-80 blur-[2px] scale-105 group-hover:scale-100 group-hover:blur-0 group-hover:opacity-100 transition-all duration-1000 ease-out">
                                        <img src={cards.image2} className="w-full h-full object-cover grayscale-[20%]" alt="Financial abstract" />
                                    </div>
                                    <div className="relative z-10 w-48 transition-all duration-700 ease-out group-hover:-translate-y-1">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-md border border-stone-200 shadow-xl shadow-stone-900/10 p-3 flex flex-col gap-3 group-hover:shadow-2xl transition-all duration-500">
                                            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-red-300 transition-colors duration-500 delay-75"></div>
                                                    <div className="w-2 h-2 rounded-full bg-stone-200 group-hover:bg-amber-300 transition-colors duration-500 delay-100"></div>
                                                    <div className="w-2 h-2 rounded-full bg-stone-200 group-hover:bg-green-300 transition-colors duration-500 delay-150"></div>
                                                </div>
                                                <div className="w-10 h-1 bg-stone-100 rounded-full group-hover:w-14 transition-all duration-500"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between opacity-50 transform transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:opacity-70">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-200"></div>
                                                        <div className="w-12 h-1 bg-stone-300 rounded-full"></div>
                                                    </div>
                                                    <div className="w-8 h-1 bg-stone-200 rounded-full"></div>
                                                </div>
                                                <div className="flex items-center justify-between bg-stone-50 border border-stone-100 -mx-1 p-1.5 rounded-sm shadow-sm relative overflow-hidden transform transition-all duration-500 ease-spring delay-75 group-hover:scale-[1.03] group-hover:border-stone-300 group-hover:shadow-md group-hover:bg-white">
                                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-stone-800 transition-all duration-500 group-hover:bg-emerald-600"></div>
                                                    <div className="flex items-center gap-2 pl-1">
                                                        <div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                            <Check className="w-2 h-2 text-emerald-600" />
                                                        </div>
                                                        <div className="w-16 h-1.5 bg-stone-800 rounded-full"></div>
                                                    </div>
                                                    <div className="w-10 h-1.5 bg-stone-800 rounded-full"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                                </div>
                                                <div className="flex items-center justify-between opacity-50 transform transition-all duration-500 ease-out delay-100 group-hover:translate-x-1 group-hover:opacity-70">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>
                                                        <div className="w-10 h-1 bg-stone-300 rounded-full"></div>
                                                    </div>
                                                    <div className="w-6 h-1 bg-stone-200 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                        <Reveal delay={0.6} className="h-full">
                            <div className="group bg-white border border-stone-200 hover:border-stone-300 hover:shadow-2xl hover:shadow-stone-200/60 transition-all duration-700 ease-out flex flex-col h-full overflow-hidden rounded-sm relative transform hover:-translate-y-1">
                                <div className="h-64 bg-stone-100 relative border-b border-stone-100 flex items-center justify-center p-8 overflow-hidden">
                                    <div className="absolute inset-0 z-0 opacity-80 blur-[2px] scale-105 group-hover:scale-100 group-hover:blur-0 group-hover:opacity-100 transition-all duration-1000 ease-out">
                                        <img src={cards.image3} className="w-full h-full object-cover grayscale-[20%]" alt="Corporate meeting" />
                                    </div>
                                    <div className="relative z-10 w-48 transition-all duration-700 ease-out group-hover:-translate-y-2">
                                        <div className="bg-white/95 backdrop-blur-sm rounded-md border border-stone-200 shadow-xl shadow-stone-900/10 overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                                            <div className="px-4 py-3 border-b border-stone-100 flex justify-between items-end bg-white/50">
                                                <div>
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                        <div className="text-[9px] font-bold text-stone-400 uppercase tracking-widest group-hover:text-stone-600 transition-colors">Engagement</div>
                                                    </div>
                                                    <div className="overflow-hidden h-6 flex items-center">
                                                        <div className="text-xl font-serif text-stone-900 leading-none transform transition-transform duration-500 group-hover:-translate-y-6">
                                                            <div>+28.4%</div>
                                                            <div className="text-emerald-600">+32.1%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center group-hover:border-emerald-200 group-hover:bg-emerald-50 transition-colors duration-500">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-stone-400 group-hover:text-emerald-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                </div>
                                            </div>
                                            <div className="h-16 w-full relative bg-stone-50/50 overflow-hidden">
                                                <div className="absolute inset-0 w-full h-full">
                                                    <div className="w-full h-full grid grid-cols-4 border-t border-stone-100">
                                                        <div className="border-r border-stone-100/50"></div>
                                                        <div className="border-r border-stone-100/50"></div>
                                                        <div className="border-r border-stone-100/50"></div>
                                                    </div>
                                                </div>
                                                <svg className="absolute bottom-0 left-0 w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                                                    <defs>
                                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                            <stop offset="0%" stopColor="#78716c" stopOpacity="0.1"></stop>
                                                            <stop offset="100%" stopColor="#78716c" stopOpacity="0"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                    <path d="M0 35 C 20 32, 40 15, 60 20 S 80 5, 100 2 V 40 H 0 Z" fill="url(#chartGradient)" className="opacity-50 group-hover:opacity-80 transition-opacity duration-500"></path>
                                                    <path d="M0 35 C 20 32, 40 15, 60 20 S 80 5, 100 2" fill="none" stroke="#44403c" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="transition-all duration-1000 group-hover:stroke-emerald-600"></path>
                                                </svg>
                                                <div className="absolute top-0 bottom-0 w-[1px] bg-stone-900/10 backdrop-blur-[1px] left-0 group-hover:left-[80%] transition-all duration-1000 ease-in-out z-10"></div>
                                                <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-stone-800 border-2 border-white rounded-full shadow-sm z-20 transition-all duration-700 ease-spring group-hover:scale-150 group-hover:bg-emerald-600 group-hover:translate-y-[-2px] group-hover:translate-x-[-2px]"></div>
                                            </div>
                                        </div>
                                    </div>
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
            <section className="bg-avanti-light border-b border-gray-200 py-24 md:py-32">
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
                            <Reveal delay={0.4}>
                                <h2 className="font-serif text-4xl md:text-5xl text-avanti-900 tracking-tight leading-tight mb-6">
                                    {t('home.horizon.title')} <br /><span className="text-gray-400">{t('home.horizon.titleItalic')}</span>
                                </h2>
                                <h3 className="text-lg text-slate-500 font-light mb-10 leading-relaxed">
                                    {t('home.horizon.subtitle')}
                                </h3>
                                <div className="space-y-10">
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
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION 2: La Precisión en Cada Detalle */}
            <section id="contacto" className="py-24 md:py-32 bg-white relative overflow-hidden">
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
                                <form className="space-y-12">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label htmlFor="nombre" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.name')}</label>
                                            <input type="text" id="nombre" className="w-full bg-transparent border-b border-gray-300 py-3 text-avanti-900 focus:outline-none focus:border-avanti-900 transition-colors placeholder-gray-300 text-sm font-light" placeholder="..." />
                                        </div>
                                        <div className="space-y-4">
                                            <label htmlFor="email" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.email')}</label>
                                            <input type="email" id="email" className="w-full bg-transparent border-b border-gray-300 py-3 text-avanti-900 focus:outline-none focus:border-avanti-900 transition-colors placeholder-gray-300 text-sm font-light" placeholder="..." />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.interest')}</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                                            <label className="cursor-pointer">
                                                <input type="radio" name="service" className="peer sr-only" />
                                                <div className="w-full py-3 px-4 text-xs text-center border border-gray-200 text-gray-500 rounded-sm peer-checked:bg-avanti-900 peer-checked:text-white peer-checked:border-avanti-900 transition-all hover:border-gray-400">
                                                    {t('home.form.interest.wealth')}
                                                </div>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input type="radio" name="service" className="peer sr-only" />
                                                <div className="w-full py-3 px-4 text-xs text-center border border-gray-200 text-gray-500 rounded-sm peer-checked:bg-avanti-900 peer-checked:text-white peer-checked:border-avanti-900 transition-all hover:border-gray-400">
                                                    {t('home.form.interest.invest')}
                                                </div>
                                            </label>
                                            <label className="cursor-pointer">
                                                <input type="radio" name="service" className="peer sr-only" />
                                                <div className="w-full py-3 px-4 text-xs text-center border border-gray-200 text-gray-500 rounded-sm peer-checked:bg-avanti-900 peer-checked:text-white peer-checked:border-avanti-900 transition-all hover:border-gray-400">
                                                    {t('home.form.interest.succession')}
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label htmlFor="mensaje" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">{t('home.form.message')}</label>
                                        <textarea id="mensaje" rows={3} className="w-full bg-transparent border-b border-gray-300 py-3 text-avanti-900 focus:outline-none focus:border-avanti-900 transition-colors placeholder-gray-300 text-sm resize-none" placeholder="..."></textarea>
                                    </div>
                                    <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6">
                                        <label className="flex items-center space-x-3 cursor-pointer group">
                                            <div className="relative w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center group-hover:border-gray-500 transition-colors bg-white">
                                                <input type="checkbox" className="peer appearance-none w-full h-full cursor-pointer absolute inset-0" />
                                                <Check className="w-3 h-3 text-avanti-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                            </div>
                                            <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">{t('home.form.privacy')}</span>
                                        </label>
                                        <button type="submit" className="group flex items-center space-x-2 bg-avanti-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-avanti-800 transition-colors shadow-lg shadow-gray-200 w-full md:w-auto justify-center">
                                            <span>{t('home.form.submit')}</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </form>
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
                            <h2 className="font-serif text-4xl md:text-7xl text-white mb-8 leading-[1.1] drop-shadow-xl tracking-tight">
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
