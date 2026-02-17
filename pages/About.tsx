import React from 'react';
import ContactForm from '../components/ContactForm';
import { useCMS } from '../context/CMSContext';
import { Reveal, WordReveal } from '../components/Reveal';

const About: React.FC = () => {
  const { pageContent, t } = useCMS();
  const { hero, intro, cards } = pageContent.about;
  const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";

  return (
    <div className="bg-white min-h-screen pb-20">

      {/* Refined & Subtle Header */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden min-h-[50vh] md:min-h-[60vh] flex items-end bg-avanti-900">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero.image}
            alt="Office Background"
            className="w-full h-full object-cover opacity-60"
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-avanti-900/80 via-transparent to-transparent"></div>
        </div>

        <div className={`${gridContainer} relative z-10 w-full`}>
          <div className="max-w-4xl">
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[1px] bg-avanti-gold"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-avanti-gold uppercase">{t('about.badge')}</span>
              </div>
            </Reveal>
            <h1 className="text-4xl md:text-7xl font-serif font-medium mb-6 text-white leading-tight tracking-tight">
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

      <div className={`${gridContainer} mt-20 relative z-30`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Institutional Text */}
          <div className="col-span-12 lg:col-span-7 space-y-12">
            <Reveal delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-serif text-avanti-900 tracking-tight leading-tight">{intro.title}</h2>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="text-xl font-light text-slate-600 leading-relaxed italic border-l-2 border-avanti-gold pl-8">
                {intro.content}
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
              <Reveal delay={0.6}>
                <div className="group">
                  <h3 className="font-serif font-medium text-avanti-900 mb-4 text-2xl group-hover:text-avanti-gold transition-colors">{cards.title1}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{cards.text1}</p>
                </div>
              </Reveal>
              <Reveal delay={0.8}>
                <div className="group">
                  <h3 className="font-serif font-medium text-avanti-900 mb-4 text-2xl group-hover:text-avanti-gold transition-colors">{cards.title2}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">{cards.text2}</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={1.0}>
              <div className="lg:-mt-32 relative z-40">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;