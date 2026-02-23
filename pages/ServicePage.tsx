import React, { useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { useCMS } from '../context/CMSContext';
import { Check, ArrowRight, Layers, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { ContactReason, ServiceData } from '../types';
import { Reveal, WordReveal } from '../components/Reveal';

interface ServicePageProps {
  previewData?: ServiceData; // Optional prop for the Editor
}

const ServicePage: React.FC<ServicePageProps> = ({ previewData }) => {
  const { id } = useParams<{ id: string }>();
  const { services, t } = useCMS();
  const sliderRef = useRef<HTMLDivElement>(null);

  const service = (previewData || (id ? services[id] : null)) as ServiceData | null;
  const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";

  if (!service) {
    return <Navigate to="/" replace />;
  }

  let contactReason = ContactReason.General;
  const activeId = service.id;
  if (activeId?.includes('impuestos')) contactReason = activeId.includes('empresas') ? ContactReason.TaxesCorporate : ContactReason.TaxesIndividual;
  if (activeId?.includes('contabilidad')) contactReason = ContactReason.Accounting;
  if (activeId?.includes('branding')) contactReason = ContactReason.Branding;

  const otherServices = (Object.values(services) as ServiceData[]).filter(s => s.id !== activeId);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      const currentScroll = sliderRef.current.scrollLeft;
      sliderRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* Refined & Subtle Header */}
      <div className="relative pt-20 pb-12 md:pt-48 md:pb-32 overflow-hidden min-h-[35vh] md:min-h-[60vh] flex items-end bg-avanti-900">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"}
            alt="Service Background"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-avanti-900/80 via-transparent to-transparent"></div>
        </div>

        <div className={gridContainer + " relative z-10 w-full"}>
          <div className="max-w-3xl lg:max-w-4xl">
            <Reveal delay={0}>
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10 shadow-2xl">
                  <span className="w-8 h-[1px] bg-avanti-gold animate-pulse"></span>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-avanti-gold uppercase flex items-center">
                    {t('service.badge')}
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
            <h1 className="text-3xl md:text-7xl font-serif font-medium text-white leading-tight tracking-tight">
              <WordReveal text={service.title} className="text-white" />
            </h1>
          </div>
        </div>
      </div>

      <div className={gridContainer + " relative z-30 mt-20"}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24">

          <div id="details" className="col-span-12 lg:col-span-7 space-y-8 md:space-y-16 scroll-mt-32">
            <Reveal delay={0.3}>
              <div className="prose prose-base md:prose-xl lg:prose-2xl max-w-none text-slate-600 font-light leading-relaxed">
                {service.description}
              </div>
            </Reveal>

            {service.bullets && service.bullets.length > 0 && (
              <Reveal delay={0.5}>
                <div className="bg-stone-50 p-12 rounded-sm border border-stone-100 shadow-sm">
                  <h3 className="text-xs font-bold text-avanti-900 mb-10 uppercase tracking-[0.3em] flex items-center gap-4">
                    <span className="w-2 h-2 rounded-full bg-avanti-gold"></span>
                    {t('service.includes')}
                  </h3>
                  <ul className={`grid ${service.bullets.length > 4 ? 'md:grid-cols-2' : 'grid-cols-1'} gap-x-12 gap-y-6`}>
                    {service.bullets.map((bullet, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="w-5 h-5 rounded-full border border-gray-200 flex items-center justify-center mt-1 mr-4 group-hover:border-avanti-gold transition-colors">
                          <Check className="w-3 h-3 text-avanti-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-slate-600 leading-relaxed font-light group-hover:text-avanti-900 transition-colors">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            {service.subSections && service.subSections.map((sub, idx) => (
              <Reveal key={idx} delay={0.6 + (idx * 0.2)}>
                <div className="border-t border-gray-100 pt-12 group">
                  <h3 className="text-xl md:text-3xl font-serif font-medium text-avanti-900 mb-4 md:mb-6 group-hover:text-avanti-gold transition-colors">{sub.title}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed font-light">{sub.content}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.8}>
              <div className="lg:-mt-32 relative z-40">
                <ContactForm defaultReason={contactReason} sourcePage={service.title} />
              </div>
            </Reveal>
          </div>

        </div>

        {/* Related Services Slider */}
        {!previewData && (
          <section className="border-t border-gray-100 mt-40 pt-24">
            <Reveal delay={0.2}>
              <div className="flex flex-row items-end justify-between mb-16 gap-4">
                <div>
                  <span className="text-xs font-bold tracking-[0.3em] text-avanti-gold uppercase mb-4 block">{t('service.explore')}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-avanti-900 tracking-tight">{t('service.related')}</h2>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => scrollSlider('left')} className="p-4 border border-gray-200 rounded-full hover:border-avanti-900 hover:text-avanti-900 text-gray-400 transition-all duration-300"><ChevronLeft className="w-6 h-6" /></button>
                  <button onClick={() => scrollSlider('right')} className="p-4 border border-gray-200 rounded-full hover:border-avanti-900 hover:text-avanti-900 text-gray-400 transition-all duration-300"><ChevronRight className="w-6 h-6" /></button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="relative">
                <div
                  ref={sliderRef}
                  className="flex overflow-x-auto gap-10 pb-12 snap-x snap-mandatory no-scrollbar"
                  style={{ scrollBehavior: 'smooth' }}
                >
                  {otherServices.map((related) => (
                    <Link
                      key={related.id}
                      to={`/services/${related.id}`}
                      className="group block min-w-[280px] md:min-w-[420px] snap-start"
                    >
                      <div className="relative h-[500px] overflow-hidden rounded-sm group">
                        <img src={related.image || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" alt={related.title} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 w-full">
                          <div className="mb-6 w-10 h-[1px] bg-avanti-gold"></div>
                          <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-avanti-gold transition-colors">{related.title}</h3>
                          <p className="text-sm text-gray-300 line-clamp-2 mb-6 font-light">{related.description}</p>
                          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] flex items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            {t('service.viewDetail')} <ArrowRight className="w-3 h-3 ml-2" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>
        )}
      </div>
    </div>
  );
};

export default ServicePage;