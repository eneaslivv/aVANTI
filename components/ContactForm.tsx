
import React, { useState } from 'react';
import { ContactReason } from '../types';
import { Send, Loader2 } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface ContactFormProps {
  defaultReason?: ContactReason;
}

const ContactForm: React.FC<ContactFormProps> = ({ defaultReason = ContactReason.General }) => {
  // Access CMS Context if available
  const { addMessage, t } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: defaultReason,
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay then save to Context
    setTimeout(() => {
        addMessage(formData);
        
        setSuccess(true);
        setFormData({
            name: '',
            email: '',
            phone: '',
            reason: defaultReason,
            message: ''
        });
        setIsSubmitting(false);

        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  // Premium Input Style
  const inputClass = "w-full px-5 py-4 border border-gray-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-avanti-gold focus:border-avanti-gold bg-[#F9F9F7] focus:bg-white placeholder-gray-400 transition-all duration-300 text-sm text-avanti-900 font-medium shadow-sm hover:border-gray-200";
  const labelClass = "block text-[11px] font-bold text-avanti-900 uppercase tracking-[0.15em] mb-2.5 ml-1";

  return (
    <div className="bg-white p-8 md:p-12 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 sticky top-24 relative overflow-hidden ring-1 ring-gray-50">
      {/* Brand Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-avanti-900 via-avanti-gold to-avanti-900"></div>

      <div className="mb-8 pb-6 border-b border-gray-100">
        <h3 className="text-3xl font-display font-semibold text-avanti-900">{t('contact.formTitle')}</h3>
        <p className="text-sm text-gray-500 mt-3 font-light leading-relaxed">{t('contact.formSubtitle')}</p>
      </div>

      {success ? (
          <div className="bg-green-50 border border-green-200 p-8 rounded-sm text-center animate-page-enter">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h4 className="text-green-800 font-serif text-xl mb-2 font-medium">{t('contact.formSuccessTitle')}</h4>
              <p className="text-green-700 text-sm mb-6">{t('contact.formSuccessMsg')}</p>
              <button onClick={() => setSuccess(false)} className="text-xs font-bold uppercase tracking-widest text-green-800 border-b border-green-800 pb-0.5 hover:opacity-70 transition-opacity">{t('contact.formAnother')}</button>
          </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
            <div>
            <label htmlFor="name" className={labelClass}>{t('contact.formName')}</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Ej. Juan Pérez"
            />
            </div>
            
            <div>
            <label htmlFor="email" className={labelClass}>{t('contact.formEmail')}</label>
            <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="nombre@empresa.com"
            />
            </div>

            <div>
            <label htmlFor="phone" className={labelClass}>{t('contact.formPhone')}</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+1 (555) 000-0000"
            />
            </div>

            <div>
            <label htmlFor="reason" className={labelClass}>{t('contact.formReason')}</label>
            <div className="relative">
                <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                >
                    {Object.values(ContactReason).map((reason) => (
                    <option key={reason} value={reason}>{reason}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
            </div>

            <div>
            <label htmlFor="message" className={labelClass}>{t('contact.formMessage')}</label>
            <textarea
                id="message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none leading-relaxed`}
                placeholder="..."
            ></textarea>
            </div>

            <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-avanti-900 text-white font-bold py-4 px-6 rounded-sm hover:bg-avanti-800 transition-all duration-300 uppercase tracking-widest text-xs mt-2 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {isSubmitting ? t('contact.formSubmitting') : t('contact.formSubmit')}
            </button>
            
            <p className="text-[10px] text-gray-400 mt-6 text-center leading-relaxed">
            {t('contact.formDisclaimer')}
            </p>
        </form>
      )}
    </div>
  );
};

export default ContactForm;