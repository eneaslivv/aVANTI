import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Linkedin, Twitter, Facebook, FileText, PieChart, ArrowRight, Search, Globe, ArrowUpRight } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t, pageContent } = useCMS();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  // Header is transparent by default and becomes solid only on scroll or when menu is open
  const isTransparent = !isScrolled && !isMenuOpen;

  // Standard Grid Container Class - Used for body content
  const gridContainer = "max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24";
  const headerContainer = gridContainer;
  const branding = pageContent?.home?.branding;

  // Smoother transition: Use opacity/transform for background instead of raw switch
  const headerBackgroundClass = isTransparent ? 'bg-transparent border-transparent shadow-none py-4' : 'bg-avanti-900/95 border-white/10 shadow-lg backdrop-blur-md py-2';

  const headerClassName = `fixed w-full top-0 z-50 transition-all duration-500 ease-in-out border-b ${headerBackgroundClass}`;

  // Use Avanti Gold as default fallback to match new branding
  const fallbackLogo = branding?.logoFallback || '/assets/logo/logo-gold-dark.png';
  const currentLogoSrc = isTransparent ? (branding?.logoLight || fallbackLogo) : (branding?.logoDark || fallbackLogo);

  // Detect scroll to toggle header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLogoError(false);
  }, [currentLogoSrc]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const serviceGroups = [
    {
      title: t('services.fiscal'),
      icon: FileText,
      items: [
        { name: language === 'es' ? 'Impuestos a Empresas' : 'Corporate Taxes', path: '/services/impuestos-empresas' },
        { name: language === 'es' ? 'Impuestos a Personas' : 'Individual Taxes', path: '/services/impuestos-personas' },
        { name: language === 'es' ? 'Impuestos Extranjeros' : 'Foreign Taxes', path: '/services/impuestos-extranjeros' },
        { name: language === 'es' ? 'Formularios Atrasados' : 'Streamlined / Delinquent', path: '/services/streamlined-delinquent' },
      ]
    },
    {
      title: t('services.consulting'),
      icon: PieChart,
      items: [
        { name: language === 'es' ? 'Contabilidad y Bookkeeping' : 'Accounting & Bookkeeping', path: '/services/contabilidad' },
        { name: language === 'es' ? 'Herencias y Fideicomisos' : 'Estates & Trusts', path: '/services/herencias-fideicomisos' },
        { name: language === 'es' ? 'Consultoría Fiscal' : 'Tax Consulting', path: '/services/consultoria-fiscal' },
        { name: language === 'es' ? 'Comunicaciones y Branding' : 'Branding & Comms', path: '/services/branding' },
      ]
    }
  ];

  // Common Nav Text Color Logic
  const navTextColor = isTransparent ? 'text-white' : 'text-gray-700 hover:text-avanti-900';

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Modernized Fixed Header */}
      <header
        className={headerClassName}
      // style={{ backgroundColor: headerBackgroundColor }} // Removed to rely on classes for smooth transition
      >
        <div className={headerContainer}>
          <div className={`flex justify-between items-center transition-all duration-700 ease-in-out ${isScrolled ? 'h-20 md:h-24' : 'h-28 md:h-36'}`}>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 md:gap-4 group" onClick={closeMenu}>
              {/* Logo Image or Fallback Icon */}
              {!logoError ? (
                <img
                  src={currentLogoSrc}
                  alt="Avanti Advisory Group logo"
                  className={`h-20 md:h-28 w-auto object-contain bg-transparent transition-all duration-500 ${isScrolled ? 'h-16 md:h-20' : 'h-24 md:h-32'}`}
                  onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement;
                    // Prevent infinite loop if fallback also fails
                    if (target.src !== fallbackLogo && target.src.indexOf('logo-white.png') === -1) {
                      target.src = fallbackLogo;
                    } else {
                      setLogoError(true);
                    }
                  }}
                />
              ) : (
                <div className={`relative overflow-hidden rounded-sm shadow-sm transition-all duration-500 ${isScrolled ? 'scale-90 md:scale-95' : 'scale-100'}`}>
                  <svg className="w-14 h-14 md:w-16 md:h-16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill={isTransparent ? '#BD9F63' : '#1A1A1A'} className="transition-colors duration-700" />
                    <path d="M24 10L36 38H30L24 22L18 38H12L24 10Z" fill={isTransparent ? 'white' : '#BD9F63'} className="transition-colors duration-700" />
                  </svg>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <div
                className="relative group"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center text-[11px] font-bold transition-all duration-500 uppercase tracking-[0.2em] py-4 hover:text-avanti-gold ${navTextColor}`}
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  {t('nav.services')} <ChevronDown className={`w-3.5 h-3.5 ml-1.5 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-0 w-[600px] bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-sm transition-all duration-500 origin-top z-50 ${isServicesOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/95 border-t border-l border-white/10 rotate-45"></div>

                  <div className="relative rounded-sm overflow-hidden">
                    <div className="grid grid-cols-2 p-8 gap-8">
                      {serviceGroups.map((group, idx) => (
                        <div key={idx} className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-gray-100 pb-2 mb-2">
                            <group.icon className="w-4 h-4 text-avanti-gold" />
                            <h4 className="text-[10px] font-serif font-bold text-avanti-900 uppercase tracking-[0.2em]">{group.title}</h4>
                          </div>
                          <ul className="space-y-2">
                            {group.items.map((link) => (
                              <li key={link.path}>
                                <Link
                                  to={link.path}
                                  className="block text-sm text-gray-500 hover:text-avanti-gold hover:translate-x-2 transition-all duration-300 py-1"
                                >
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="bg-avanti-light/50 px-8 py-4 border-t border-gray-100/50 flex justify-between items-center">
                      <span className="text-[10px] font-serif text-gray-400 uppercase tracking-widest">{t('services.cta')}</span>
                      <Link to="/contact" className="text-[10px] font-bold text-avanti-900 uppercase tracking-[0.2em] hover:text-avanti-gold transition-all flex items-center group/btn">
                        {t('nav.book')} <ArrowRight className="w-3 h-3 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/resources" className={`text-[11px] font-bold transition-all duration-500 uppercase tracking-[0.2em] hover:text-avanti-gold ${navTextColor}`}>{t('nav.resources')}</Link>
              <Link to="/about" className={`text-[11px] font-bold transition-all duration-500 uppercase tracking-[0.2em] hover:text-avanti-gold ${navTextColor}`}>{t('nav.about')}</Link>
              <Link to="/payment" className={`text-[11px] font-bold transition-all duration-500 uppercase tracking-[0.2em] hover:text-avanti-gold ${navTextColor}`}>{t('nav.payment')}</Link>

              {/* Language Switcher */}
              <div className={`flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase border-l pl-6 ml-2 transition-all duration-700 ${isTransparent ? 'border-white/20' : 'border-gray-200'}`}>
                <button
                  onClick={() => setLanguage('es')}
                  className={`transition-all duration-300 hover:scale-110 ${language === 'es' ? (isTransparent ? 'text-avanti-gold-light' : 'text-avanti-900') : (isTransparent ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-600')}`}
                >
                  ES
                </button>
                <span className={isTransparent ? 'text-white/10' : 'text-gray-200'}>|</span>
                <button
                  onClick={() => setLanguage('en')}
                  className={`transition-all duration-300 hover:scale-110 ${language === 'en' ? (isTransparent ? 'text-avanti-gold-light' : 'text-avanti-900') : (isTransparent ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-600')}`}
                >
                  EN
                </button>
              </div>

              {/* CTA Button */}
              <Link
                to="/contact"
                className={`px-7 py-3 rounded-sm font-bold transition-all duration-500 shadow-md hover:shadow-xl text-[10px] uppercase tracking-[0.2em] transform active:scale-95 ${isTransparent
                  ? 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-avanti-900 hover:border-white'
                  : 'bg-avanti-900 text-white hover:bg-avanti-800'
                  }`}
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleMenu} className={`focus:outline-none p-2 transition-colors ${isTransparent ? 'text-white' : 'text-gray-700'}`}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute w-full left-0 bg-white/95 backdrop-blur-2xl border-t border-gray-100 shadow-2xl transition-all duration-500 ease-in-out z-40 overflow-hidden ${isMenuOpen ? 'max-h-[85vh] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
            }`}
        >
          <div className="px-6 pt-8 pb-12 space-y-8 overflow-y-auto max-h-[80vh]">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-avanti-gold uppercase tracking-[0.2em]">{t('nav.services')}</p>
              <div className="grid grid-cols-1 gap-1 pl-4 border-l border-avanti-gold/20">
                {serviceGroups.map(group => group.items.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block py-2 text-sm font-medium text-gray-600 hover:text-avanti-gold transition-colors"
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                )))}
              </div>
            </div>

            <div className="border-t border-gray-100/50"></div>

            <div className="space-y-6">
              <Link to="/resources" className="block text-lg font-serif font-bold text-avanti-900 hover:text-avanti-gold transition-colors" onClick={closeMenu}>{t('nav.resources')}</Link>
              <Link to="/about" className="block text-lg font-serif font-bold text-avanti-900 hover:text-avanti-gold transition-colors" onClick={closeMenu}>{t('nav.about')}</Link>
              <Link to="/payment" className="block text-lg font-serif font-bold text-avanti-900 hover:text-avanti-gold transition-colors" onClick={closeMenu}>{t('nav.payment')}</Link>
            </div>

            <Link to="/contact" className="block w-full text-center bg-avanti-900 text-white py-4 rounded-sm font-bold uppercase tracking-[0.2em] text-[10px] mt-8 shadow-lg active:scale-95 transition-all" onClick={closeMenu}>
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - pt-0 for everything to allow header overlay */}
      <main className="flex-grow pt-0">
        <div key={location.pathname} className="animate-page-enter h-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#F2F2F2] relative pt-20 pb-8 overflow-hidden mt-auto border-t border-gray-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0">
          <h1 className="text-[15vw] lg:text-[18vw] font-serif font-bold text-gray-300/40 leading-none tracking-tighter">
            AVANTI
          </h1>
        </div>
        <div className={`${gridContainer} relative z-10 flex flex-col min-h-[50vh] justify-between`}>
          <div className="grid grid-cols-12 gap-8 mb-24">
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-avanti-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-avanti-gold"></span> {t('footer.menu')}
              </h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors">{t('nav.about')}</Link></li>
                <li><Link to="/services" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors">{t('nav.services')}</Link></li>
                <li><Link to="/resources" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors">{t('nav.resources')}</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors">{t('nav.contact')}</Link></li>
              </ul>
            </div>
            <div className="col-span-6 md:col-span-3 lg:col-span-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-avanti-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-avanti-gold"></span> {t('footer.social')}
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors flex items-center gap-1">LinkedIn <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors flex items-center gap-1">Twitter <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-avanti-900 transition-colors flex items-center gap-1">Facebook <ArrowUpRight className="w-3 h-3" /></a></li>
              </ul>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-9 text-right md:text-left lg:text-right">
              <p className="text-lg font-serif text-avanti-900 leading-relaxed mb-6">
                {t('footer.tagline')}
              </p>
              <a href="mailto:info@avantiag.com" className="text-sm font-bold text-avanti-900 underline decoration-avanti-gold decoration-2 underline-offset-4 hover:text-avanti-gold transition-colors">
                info@avantiag.com
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-end border-t border-gray-300/50 pt-8 gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <Link to="/" className="w-10 h-10 bg-avanti-900 flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg">
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 10L36 38H30L24 22L18 38H12L24 10Z" fill="#BD9F63" />
                </svg>
              </Link>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-avanti-900 uppercase tracking-widest">Avanti Advisory Group</span>
                <span className="text-[10px] text-gray-400">© {new Date().getFullYear()} {t('footer.rights')}</span>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-6 w-full md:w-auto">
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <Link to="#" className="hover:text-avanti-900 transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-avanti-900 transition-colors">Terms of Service</Link>
                <Link to="/admin" className="hover:text-avanti-900 transition-colors border-l border-gray-300 pl-6">Admin</Link>
              </div>
              <button onClick={() => setIsServicesOpen(true)} className="group bg-white pl-6 pr-2 py-2 rounded-full border border-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                <span className="text-xs font-bold text-avanti-900 uppercase tracking-widest">{t('footer.explore')}</span>
                <div className="w-8 h-8 bg-avanti-900 rounded-full flex items-center justify-center text-white group-hover:bg-avanti-gold transition-colors">
                  <Search className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
