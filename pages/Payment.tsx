import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { Reveal, WordReveal } from '../components/Reveal';
import { useCMS } from '../context/CMSContext';

const Payment: React.FC = () => {
  const { t, pageContent } = useCMS();
  const { hero } = pageContent.payment;
  const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";

  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Payment Header */}
      <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden mb-16 min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={hero.image}
            alt="Payment Background"
            className="w-full h-full object-cover"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className={gridContainer + " relative z-10 w-full"}>
          <div className="bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-sm border border-white/10 shadow-2xl inline-block max-w-3xl">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
                <CreditCard className="w-3 h-3 text-avanti-gold" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-200 uppercase">{t('payment.badge')}</span>
              </div>
            </Reveal>
            <h1 className="text-4xl md:text-7xl font-serif font-medium text-white mb-4">
              <WordReveal text={hero.title} className="text-white" />
            </h1>
            <Reveal delay={0.4}>
              <p className="text-xl text-gray-200 font-light max-w-2xl leading-relaxed drop-shadow-md">
                {hero.subtitle}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className={gridContainer + " pb-32"}>
        <div className="bg-gray-50 p-12 rounded-sm shadow-sm border border-gray-100 max-w-lg mx-auto text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100">
            <CreditCard className="w-8 h-8 text-avanti-900" />
          </div>
          <h2 className="text-2xl font-serif font-medium text-avanti-900 mb-4">{t('payment.soon')}</h2>
          <p className="text-slate-600 mb-8 leading-relaxed font-light">
            {t('payment.desc')}
          </p>
          <div className="flex items-center justify-center text-xs text-gray-400 uppercase tracking-widest bg-white py-2 px-4 rounded-full inline-block border border-gray-100">
            <Lock className="w-3 h-3 mr-2 inline" /> {t('payment.secure')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;