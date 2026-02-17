import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Reveal, WordReveal } from '../components/Reveal';
import { useCMS } from '../context/CMSContext';

const Contact: React.FC = () => {
    const { pageContent, t } = useCMS();
    const { hero, info } = pageContent.contact;
    const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";

    return (
        <div className="bg-white min-h-screen pb-20">

            {/* Editorial Contact Header */}
            <div className="relative pt-48 pb-32 md:pt-64 md:pb-48 overflow-hidden min-h-[70vh] flex items-end">
                {/* Background Image Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={hero.image}
                        alt="Contact Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Cinematic Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>

                <div className={gridContainer + " relative z-10 w-full"}>
                    <div className="max-w-4xl">
                        <Reveal delay={0}>
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-12 h-[1px] bg-avanti-gold"></span>
                                <span className="text-[11px] font-bold tracking-[0.4em] text-avanti-gold uppercase">{t('contact.badge')}</span>
                            </div>
                        </Reveal>
                        <h1 className="text-5xl md:text-8xl font-serif font-medium text-white mb-8 leading-[1.05] tracking-tight drop-shadow-2xl">
                            <WordReveal text={hero.title} className="text-white" />
                        </h1>
                        <Reveal delay={0.4}>
                            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl leading-relaxed drop-shadow-xl opacity-90">
                                {hero.subtitle}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Transition Blur */}
                <div className="absolute bottom-0 left-0 w-full h-32 backdrop-blur-[2px] bg-gradient-to-t from-white to-transparent z-20"></div>
            </div>

            <div className={`${gridContainer} mt-32 relative z-30`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LS: Contact Info */}
                    <div className="col-span-12 lg:col-span-5 space-y-16">
                        <Reveal delay={0.2}>
                            <div className="space-y-6">
                                <h2 className="text-4xl md:text-5xl font-serif text-avanti-900 tracking-tight leading-tight">{t('contact.infoTitle')}</h2>
                                <p className="text-slate-500 text-xl font-light leading-relaxed">
                                    {t('contact.infoDesc')}
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.4}>
                            <div className="space-y-12 bg-stone-50 p-12 rounded-sm border border-stone-100 shadow-sm">
                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-avanti-gold transition-colors mr-6 flex-shrink-0">
                                        <Mail className="w-5 h-5 text-avanti-900" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{t('contact.labelEmail')}</span>
                                        <a href={`mailto:${info.email}`} className="text-xl font-medium text-avanti-900 hover:text-avanti-gold transition-colors font-serif">{info.email}</a>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-avanti-gold transition-colors mr-6 flex-shrink-0">
                                        <Phone className="w-5 h-5 text-avanti-900" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{t('contact.labelPhone')}</span>
                                        <span className="text-xl font-medium text-avanti-900 font-serif">{info.phone}</span>
                                    </div>
                                </div>

                                <div className="flex items-start group">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 group-hover:border-avanti-gold transition-colors mr-6 flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-avanti-900" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{t('contact.labelOffice')}</span>
                                        <span className="text-xl font-medium text-avanti-900 block font-serif">{info.office}</span>
                                        <span className="text-sm text-gray-500 font-light mt-1 block">{t('contact.officeNote')}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* RS: Form */}
                    <div className="col-span-12 lg:col-span-7">
                        <Reveal delay={0.6}>
                            <div className="lg:-mt-48 relative z-40">
                                <ContactForm />
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;