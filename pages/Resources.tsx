import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Reveal, WordReveal } from '../components/Reveal';

const Resources: React.FC = () => {
    const { posts, pageContent, t } = useCMS();
    const { hero } = pageContent.resources;

    if (posts.length === 0) {
        return (
            <div className="bg-white min-h-screen pt-48 text-center">
                <h1 className="text-3xl font-serif font-light text-gray-400">{t('resources.noPosts')}</h1>
            </div>
        )
    }

    const featuredPost = posts[0];
    const regularPosts = posts.slice(1);
    const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";

    return (
        <div className="bg-white min-h-screen">

            {/* Refined & Subtle Header */}
            <div className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-end bg-avanti-900">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={hero.image}
                        alt="Resources Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-avanti-900/80 via-transparent to-transparent"></div>
                </div>

                <div className={gridContainer + " relative z-10 w-full"}>
                    <div className="max-w-4xl">
                        <Reveal delay={0}>
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10 shadow-2xl">
                                    <span className="w-8 h-[1px] bg-avanti-gold animate-pulse"></span>
                                    <span className="text-[10px] font-bold tracking-[0.3em] text-avanti-gold uppercase">
                                        {t('resources.badge')}
                                    </span>
                                </div>
                                <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
                                <a
                                    href="mailto:info@avantiag.com"
                                    className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase hover:text-avanti-gold transition-all duration-300 flex items-center gap-2 group"
                                >
                                    <span className="w-1.5 h-1.5 bg-avanti-gold rounded-full group-hover:scale-125 transition-transform"></span>
                                    info@avantiag.com
                                </a>
                            </div>
                        </Reveal>
                        <h1 className="text-3xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight tracking-tight">
                            <WordReveal text={hero.title} className="text-white" />
                        </h1>
                        <Reveal delay={0.4}>
                            <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl leading-relaxed">
                                {hero.subtitle}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </div>

            <div className={`${gridContainer} py-32 relative z-30`}>

                {/* Featured Post - Layout Mejorado */}
                <div className="mb-40">
                    <Reveal delay={0.6}>
                        <Link to={`/resources/${featuredPost.id}`} className="group block">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                                <div className="lg:col-span-7 relative">
                                    <div className="aspect-[16/9] overflow-hidden rounded-sm shadow-2xl">
                                        <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 bg-avanti-gold text-white p-8 hidden lg:block shadow-xl">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{t('resources.featured')}</span>
                                    </div>
                                </div>
                                <div className="lg:col-span-5">
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-[0.2em]">
                                        <span className="text-avanti-gold">{featuredPost.category}</span>
                                        <span>/</span>
                                        <span>{featuredPost.date}</span>
                                    </div>
                                    <h3 className="text-4xl md:text-5xl font-serif font-medium text-avanti-900 mb-8 leading-tight group-hover:text-avanti-gold transition-colors">{featuredPost.title}</h3>
                                    <p className="text-slate-500 text-lg leading-relaxed mb-10 font-light">{featuredPost.excerpt}</p>
                                    <span className="inline-flex items-center text-avanti-900 text-xs font-bold uppercase tracking-[0.2em] border-b border-avanti-900 pb-2 group-hover:border-avanti-gold group-hover:text-avanti-gold transition-all">
                                        {t('resources.readFull')} <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Reveal>
                </div>

                {/* Listado de Artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                    {regularPosts.map((post, index) => (
                        <Reveal key={post.id} delay={0.2 * (index + 1)}>
                            <Link to={`/resources/${post.id}`} className="group block">
                                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-10 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                                        <span className="text-avanti-gold">{post.category}</span>
                                        <span>•</span>
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-medium text-avanti-900 group-hover:text-avanti-gold transition-colors leading-snug">{post.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-3">{post.excerpt}</p>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Resources;