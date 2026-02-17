
import { ServiceData, BlogPost } from '../types';

// --- SPANISH DATA ---
export const servicesDataEs: Record<string, ServiceData> = {
  'impuestos-empresas': {
    id: 'impuestos-empresas',
    title: 'Impuestos a las Empresas',
    description: `En el entorno empresarial actual, el cumplimiento fiscal y la planificación estratégica son esenciales. Ofrecemos preparación y revisión experta de declaraciones de impuestos corporativos, asegurando precisión y optimización bajo la normativa vigente.`,
    bullets: [
      'Formulario 1120 (Corporaciones C)',
      'Formulario 1120-S (Corporaciones S)',
      'Formulario 1065 (Partnerships)',
      'Schedule C (Sole Proprietorships)',
      'Declaraciones Estatales y Locales',
      'Planificación fiscal corporativa'
    ],
    subSections: [
      {
        title: 'Formularios Internacionales y Cumplimiento Transfronterizo',
        content: 'Manejamos la complejidad de operaciones internacionales, incluyendo reporte de cuentas extranjeras, transacciones con partes relacionadas y cumplimiento de tratados fiscales.'
      },
      {
        title: 'GILTI & FDII',
        content: 'Asesoría especializada en Global Intangible Low-Taxed Income (GILTI) y Foreign-Derived Intangible Income (FDII) para optimizar la carga tributaria global de su empresa.'
      }
    ]
  },
  'impuestos-personas': {
    id: 'impuestos-personas',
    title: 'Impuestos para Personas Naturales',
    description: `Brindamos asesoría personalizada para individuos con situaciones fiscales simples o complejas, tanto residentes como no residentes. Nuestro objetivo es maximizar sus deducciones legales y asegurar su tranquilidad ante el IRS.`,
    bullets: [
      'Declaración Formulario 1040',
      'Planificación Fiscal Personal',
      'Impuestos para Freelancers y Autónomos',
      'Declaraciones Multiestatales',
      'Planificación de Jubilación e Inversiones',
      'Reporte de Donaciones'
    ]
  },
  'herencias-fideicomisos': {
    id: 'herencias-fideicomisos',
    title: 'Herencias, Fideicomisos y Donaciones',
    description: `La preservación del patrimonio requiere una planificación meticulosa. Asesoramos en la estructuración fiscal de herencias, fideicomisos y donaciones para proteger sus activos y facilitar la transferencia generacional con la menor carga impositiva posible.`,
    bullets: [
      'Declaraciones de Fideicomisos (Form 1041)',
      'Impuestos sobre Herencias y Donaciones (Form 706 & 709)',
      'Planificación Sucesoral',
      'Estructuras de Protección Patrimonial'
    ]
  },
  'streamlined-delinquent': {
    id: 'streamlined-delinquent',
    title: 'Formularios Internacionales Atrasados',
    description: `Si usted tiene obligaciones fiscales pendientes con el IRS relacionadas con activos o ingresos extranjeros, le ayudamos a regularizar su situación a través de los programas oficiales de amnistía o cumplimiento voluntario.`,
    bullets: [
      'Streamlined Foreign Offshore Procedures',
      'Streamlined Domestic Offshore Procedures',
      'Delinquent International Information Return Submission Procedures',
      'Delinquent FBAR Submission Procedures'
    ],
    subSections: [
        {
            title: 'Regularización Segura',
            content: 'Analizamos su caso para determinar la vía más segura y costo-eficiente (Streamlined o Delinquent) para ponerse al día sin enfrentar penalidades criminales excesivas.'
        }
    ]
  },
  'consultoria-fiscal': {
    id: 'consultoria-fiscal',
    title: 'Consultoría Fiscal',
    description: `Más allá del cumplimiento anual, ofrecemos consultoría estratégica continua. Analizamos el impacto fiscal de sus decisiones de negocio, inversiones inmobiliarias y cambios de residencia antes de que ocurran.`,
    bullets: [
      'Análisis de Tratados Fiscales',
      'Consultoría en Inversión Inmobiliaria Extranjera (FIRPTA)',
      'Estructuración de Negocios Inbound/Outbound',
      'Residencia Fiscal y Pre-Inmigración'
    ]
  },
  'impuestos-extranjeros': {
    id: 'impuestos-extranjeros',
    title: 'Declaración de Impuestos Extranjeros',
    description: `Gracias a nuestras alianzas globales y certificaciones internacionales, facilitamos el cumplimiento de obligaciones fiscales en jurisdicciones fuera de Estados Unidos, asegurando una visión integral de sus impuestos mundiales.`,
    bullets: [
      'Coordinación con firmas locales en LatAm y Europa',
      'Reporte consolidado global',
      'Optimización de créditos fiscales extranjeros'
    ]
  },
  'contabilidad': {
    id: 'contabilidad',
    title: 'Contabilidad y Bookkeeping',
    description: `Servicios de contabilidad externalizada, flexibles y escalables para optimizar procesos, reducir costos y garantizar información financiera precisa. Actuamos como una extensión de tu equipo, permitiéndole enfocarse en el crecimiento de su negocio.`,
    bullets: [
      'Registros contables mensuales (Bookkeeping)',
      'Preparación de Estados Financieros (Balance Sheet, P&L)',
      'Conciliaciones Bancarias',
      'Contabilidad Multinacional / Multimoneda',
      'Reportes de Gestión para la Gerencia',
      'Supervisión y revisión de departamentos contables internos'
    ]
  },
  'branding': {
    id: 'branding',
    title: 'Comunicaciones, Branding y Redes Sociales',
    description: `Impulsamos la presencia de tu marca mediante estrategias de comunicación y gestión de redes sociales que fortalecen tu visibilidad, consolidan tu reputación y generan conexiones auténticas con su audiencia objetivo.`,
    bullets: [
      'Estrategia de Comunicación Corporativa',
      'Desarrollo de Identidad de Marca (Branding)',
      'Gestión y Creación de Contenido para Redes Sociales',
      'Marketing de Contenidos (Blogs, Newsletters)',
      'Gestión de Crisis de Comunicación',
      'Reportes de Métricas y ROI',
      'Capacitación de voceros y equipos internos'
    ]
  }
};

export const blogPostsEs: BlogPost[] = [
  {
    id: 1,
    title: "Claves de la Reforma Fiscal 2024",
    excerpt: "Entiende cómo los nuevos cambios legislativos afectan a las corporaciones extranjeras operando en EE.UU.",
    category: "Fiscalidad Internacional",
    author: "Carlos Rossi",
    date: "Oct 12, 2023",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    content: `
      <p class="mb-6">El panorama fiscal en Estados Unidos está en constante evolución. La reciente propuesta de reforma fiscal para el año fiscal 2024 introduce cambios significativos que impactan directamente a las corporaciones con participación extranjera y a los inversionistas internacionales.</p>
      
      <h3 class="text-2xl font-serif text-avanti-900 mt-8 mb-4">Principales modificaciones</h3>
      <p class="mb-6">Entre los puntos más destacados se encuentran ajustes en las tasas corporativas efectivas y nuevas regulaciones sobre la erosión de la base imponible. Para las empresas que operan bajo estructuras inbound (inversión extranjera en EE.UU.), esto implica una revisión exhaustiva de sus estrategias de precios de transferencia.</p>
    `
  },
  {
    id: 2,
    title: "¿Qué es el formulario 5472?",
    excerpt: "Una guía esencial para empresas de propiedad extranjera y las penalidades por incumplimiento.",
    category: "Cumplimiento",
    author: "María Fernández",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    content: `
      <p class="mb-6">El Formulario 5472 es uno de los documentos informativos más críticos y severamente penalizados por el IRS. Su propósito es reportar transacciones entre una corporación de EE.UU. (o una extranjera operando en EE.UU.) y sus dueños extranjeros o partes relacionadas.</p>
    `
  },
  {
    id: 3,
    title: "Beneficios de externalizar su contabilidad",
    excerpt: "Reducción de costos y mayor precisión financiera: por qué el outsourcing es la tendencia global.",
    category: "Gestión Financiera",
    author: "Equipo Avanti",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
    content: `<p class="mb-6">En un mercado globalizado, la agilidad es clave. Mantener un departamento contable interno completo puede resultar costoso e ineficiente para muchas empresas en crecimiento.</p>`
  }
];

// --- ENGLISH DATA ---
export const servicesDataEn: Record<string, ServiceData> = {
    'impuestos-empresas': {
      id: 'impuestos-empresas',
      title: 'Corporate Taxes',
      description: `In today's business environment, tax compliance and strategic planning are essential. We offer expert preparation and review of corporate tax returns, ensuring accuracy and optimization under current regulations.`,
      bullets: [
        'Form 1120 (C-Corporations)',
        'Form 1120-S (S-Corporations)',
        'Form 1065 (Partnerships)',
        'Schedule C (Sole Proprietorships)',
        'State and Local Returns',
        'Corporate Tax Planning'
      ],
      subSections: [
        {
          title: 'International Forms & Cross-Border Compliance',
          content: 'We handle the complexity of international operations, including foreign account reporting, related party transactions, and tax treaty compliance.'
        },
        {
          title: 'GILTI & FDII',
          content: 'Specialized advisory on Global Intangible Low-Taxed Income (GILTI) and Foreign-Derived Intangible Income (FDII) to optimize your global tax burden.'
        }
      ]
    },
    'impuestos-personas': {
      id: 'impuestos-personas',
      title: 'Individual Taxes',
      description: `We provide personalized advice for individuals with simple or complex tax situations, both residents and non-residents. Our goal is to maximize your legal deductions and ensure your peace of mind with the IRS.`,
      bullets: [
        'Form 1040 Declaration',
        'Personal Tax Planning',
        'Taxes for Freelancers & Self-Employed',
        'Multi-State Declarations',
        'Retirement & Investment Planning',
        'Gift Reporting'
      ]
    },
    'herencias-fideicomisos': {
      id: 'herencias-fideicomisos',
      title: 'Estates & Trusts',
      description: `Wealth preservation requires meticulous planning. We advise on the tax structuring of inheritances, trusts, and gifts to protect your assets and facilitate generational transfer with the lowest possible tax burden.`,
      bullets: [
        'Trust Returns (Form 1041)',
        'Estate & Gift Taxes (Form 706 & 709)',
        'Succession Planning',
        'Asset Protection Structures'
      ]
    },
    'streamlined-delinquent': {
      id: 'streamlined-delinquent',
      title: 'Streamlined & Delinquent Procedures',
      description: `If you have outstanding tax obligations with the IRS related to foreign assets or income, we help you regularize your situation through official amnesty or voluntary compliance programs.`,
      bullets: [
        'Streamlined Foreign Offshore Procedures',
        'Streamlined Domestic Offshore Procedures',
        'Delinquent International Information Return Submission Procedures',
        'Delinquent FBAR Submission Procedures'
      ],
      subSections: [
          {
              title: 'Secure Compliance',
              content: 'We analyze your case to determine the safest and most cost-efficient route (Streamlined or Delinquent) to catch up without facing excessive criminal penalties.'
          }
      ]
    },
    'consultoria-fiscal': {
      id: 'consultoria-fiscal',
      title: 'Tax Consulting',
      description: `Beyond annual compliance, we offer continuous strategic consulting. We analyze the tax impact of your business decisions, real estate investments, and residency changes before they happen.`,
      bullets: [
        'Tax Treaty Analysis',
        'Foreign Real Estate Investment Consulting (FIRPTA)',
        'Inbound/Outbound Business Structuring',
        'Tax Residency & Pre-Immigration'
      ]
    },
    'impuestos-extranjeros': {
      id: 'impuestos-extranjeros',
      title: 'Foreign Tax Reporting',
      description: `Thanks to our global alliances and international certifications, we facilitate compliance with tax obligations in jurisdictions outside the United States, ensuring a comprehensive view of your global taxes.`,
      bullets: [
        'Coordination with local firms in LatAm and Europe',
        'Global consolidated reporting',
        'Optimization of foreign tax credits'
      ]
    },
    'contabilidad': {
      id: 'contabilidad',
      title: 'Accounting & Bookkeeping',
      description: `Outsourced accounting services, flexible and scalable to optimize processes, reduce costs, and ensure accurate financial information. We act as an extension of your team, allowing you to focus on growing your business.`,
      bullets: [
        'Monthly Bookkeeping',
        'Financial Statement Preparation (Balance Sheet, P&L)',
        'Bank Reconciliations',
        'Multi-national / Multi-currency Accounting',
        'Management Reports',
        'Supervision of internal accounting departments'
      ]
    },
    'branding': {
      id: 'branding',
      title: 'Communications & Branding',
      description: `We boost your brand's presence through communication strategies and social media management that strengthen your visibility, consolidate your reputation, and generate authentic connections with your target audience.`,
      bullets: [
        'Corporate Communication Strategy',
        'Brand Identity Development',
        'Social Media Content Creation & Management',
        'Content Marketing (Blogs, Newsletters)',
        'Crisis Communication Management',
        'Metrics & ROI Reports',
        'Spokesperson Training'
      ]
    }
};
  
export const blogPostsEn: BlogPost[] = [
    {
      id: 1,
      title: "Key Changes in 2024 Tax Reform",
      excerpt: "Understand how new legislative changes affect foreign corporations operating in the US.",
      category: "International Tax",
      author: "Carlos Rossi",
      date: "Oct 12, 2023",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
      content: `
        <p class="mb-6">The tax landscape in the United States is constantly evolving. The recent tax reform proposal for the 2024 fiscal year introduces significant changes that directly impact corporations with foreign participation and international investors.</p>
      `
    },
    {
      id: 2,
      title: "What is Form 5472?",
      excerpt: "An essential guide for foreign-owned companies and penalties for non-compliance.",
      category: "Compliance",
      author: "María Fernández",
      date: "Sep 28, 2023",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
      content: `
        <p class="mb-6">Form 5472 is one of the most critical and severely penalized information returns by the IRS. Its purpose is to report transactions between a U.S. corporation (or a foreign one operating in the U.S.) and its foreign owners or related parties.</p>
      `
    },
    {
      id: 3,
      title: "Benefits of Outsourcing Your Accounting",
      excerpt: "Cost reduction and greater financial accuracy: why outsourcing is the global trend.",
      category: "Financial Management",
      author: "Avanti Team",
      date: "Sep 15, 2023",
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
      content: `<p class="mb-6">In a globalized market, agility is key. Maintaining a full internal accounting department can be costly and inefficient for many growing companies.</p>`
    }
];

// --- UI DICTIONARY (Labels) ---
export const uiDictionary = {
    es: {
        // Nav & Footer
        'nav.services': 'Servicios',
        'nav.resources': 'Recursos',
        'nav.about': 'Sobre Avanti',
        'nav.payment': 'Haz un Pago',
        'nav.contact': 'Contáctanos',
        'nav.book': 'Agendar Consulta',
        'footer.menu': 'Menú',
        'footer.social': 'Social',
        'footer.rights': 'Todos los derechos reservados.',
        'footer.explore': 'Explorar',
        'footer.tagline': 'Claridad financiera para un mundo complejo.',
        
        // Services Menu
        'services.fiscal': 'Fiscalidad',
        'services.consulting': 'Consultoría y Gestión',
        'services.cta': 'Impulsando su crecimiento global.',

        // General Buttons
        'btn.readMore': 'Leer Más',
        'btn.back': 'Volver',
        'btn.share': 'Compartir',
        
        // Home
        'home.readMore': 'Leer Más Sobre Avanti',
        'home.infraTitle': 'Infraestructura para',
        'home.infraTitleItalic': 'tu crecimiento',
        'home.infraDesc': 'Avanti ofrece una suite modular de servicios profesionales diseñada para escalar contigo. Soluciones técnicas integradas para la empresa moderna.',
        'home.card1.badge': 'Fiscalidad',
        'home.card1.title': 'Impuestos Internacionales',
        'home.card1.desc': 'Preparación técnica y cumplimiento normativo estricto para entidades con estructura inbound/outbound.',
        'home.card1.link': 'Servicios fiscales',
        'home.card2.badge': 'Finanzas',
        'home.card2.title': 'Contabilidad & Bookkeeping',
        'home.card2.desc': 'Precisión en libros y reportes oportunos. Operamos como una extensión técnica de tu departamento financiero.',
        'home.card2.link': 'Soluciones contables',
        'home.card3.badge': 'Crecimiento',
        'home.card3.title': 'Branding Corporativo',
        'home.card3.desc': 'Estrategias de comunicación y gestión de canales digitales para consolidar la reputación de tu firma.',
        'home.card3.link': 'Ver estrategia',
        'home.ctaBadge': 'Contacto Directo',
        'home.ctaTitle': 'Eleve sus estándares',
        'home.ctaTitleItalic': 'financieros hoy.',
        'home.ctaDesc': 'La claridad fiscal y estratégica que su patrimonio necesita. Agende una sesión con nuestros socios directores.',
        'home.ctaButtonPrimary': 'Iniciar Conversación',
        'home.ctaButtonSecondary': 'Explorar Servicios',
        // NEW SECTIONS
        'home.horizon.title': 'Navegando Hacia',
        'home.horizon.titleItalic': 'el Horizonte',
        'home.horizon.subtitle': 'Construyendo un Legado Duradero. Su visión, nuestra experiencia. Un viaje financiero planificado con la precisión de un capitán experimentado.',
        'home.horizon.item1.title': 'Asesoramiento Personalizado',
        'home.horizon.item1.desc': 'Estrategias a medida que se alinean perfectamente con sus objetivos de vida y aspiraciones a largo plazo.',
        'home.horizon.item2.title': 'Gestión de Activos',
        'home.horizon.item2.desc': 'Protección y crecimiento de su capital a través de una diversificación inteligente y disciplinada.',
        'home.horizon.item3.title': 'Planificación Sucesoria',
        'home.horizon.item3.desc': 'Asegurando que su legado perdure y se transfiera según sus deseos exactos a las futuras generaciones.',
        
        'home.precision.title': 'La Precisión en Cada Detalle',
        'home.precision.desc': 'Su visión, nuestra dedicación. Cada estrategia, cada consejo, forjado con la meticulosidad que su patrimonio merece.',
        'home.precision.badge': 'Excelencia Técnica',
        
        'home.form.name': 'Nombre',
        'home.form.email': 'Email',
        'home.form.interest': 'Área de Interés',
        'home.form.interest.wealth': 'Gestión Patrimonial',
        'home.form.interest.invest': 'Inversiones',
        'home.form.interest.succession': 'Sucesión',
        'home.form.message': 'Mensaje',
        'home.form.privacy': 'Acepto la política de privacidad',
        'home.form.submit': 'SOLICITAR CONSULTA',

        // About
        'about.badge': 'Nuestra Firma',

        // Resources
        'resources.badge': 'Blog & Noticias',
        'resources.title': 'Perspectivas Globales',
        'resources.subtitle': 'Análisis experto sobre tendencias fiscales, financieras y estrategias corporativas para el mercado internacional.',
        'resources.featured': 'Destacado',
        'resources.recent': 'Recientes',
        'resources.readFull': 'Leer artículo completo',
        'resources.readMore': 'Leer más',
        'resources.noPosts': 'No hay artículos publicados aún.',
        'resources.back': 'Volver a Recursos',
        'resources.share': 'Compartir este artículo',
        'resources.readNext': 'Siguiente Lectura',
        'resources.readNow': 'Leer Ahora',
        'resources.helpTitle': '¿Necesita asesoría sobre este tema?',
        'resources.helpDesc': 'Nuestros expertos están listos para analizar su situación específica y brindarle soluciones a medida.',
        'resources.contactExpert': 'Contactar a un asesor',
        'resources.readTime': '5 min de lectura',

        // Contact
        'contact.badge': 'Hablemos',
        'contact.title': 'Contáctanos',
        'contact.subtitle': 'Agende una consulta personalizada. Estamos listos para escuchar sus necesidades.',
        'contact.infoTitle': 'Información',
        'contact.infoDesc': 'Estamos listos para asistirle con sus necesidades fiscales y contables.',
        'contact.labelEmail': 'Email',
        'contact.labelPhone': 'Teléfono',
        'contact.labelOffice': 'Oficina',
        'contact.officeNote': '(Disponible bajo cita previa)',
        'contact.formTitle': 'Contáctanos',
        'contact.formSubtitle': 'Complete el formulario y un asesor senior le responderá a la brevedad.',
        'contact.formName': 'Nombre Completo',
        'contact.formEmail': 'Correo Electrónico',
        'contact.formPhone': 'Teléfono',
        'contact.formReason': 'Motivo de consulta',
        'contact.formMessage': 'Mensaje',
        'contact.formSubmit': 'Enviar Mensaje',
        'contact.formSubmitting': 'Enviando...',
        'contact.formSuccessTitle': '¡Mensaje Enviado!',
        'contact.formSuccessMsg': 'Hemos recibido su consulta correctamente. Nuestro equipo se pondrá en contacto pronto.',
        'contact.formAnother': 'Enviar otro mensaje',
        'contact.formDisclaimer': 'Al enviar este formulario, acepta nuestra política de privacidad. Sus datos están protegidos.',

        // Service Page
        'service.badge': 'Soluciones Profesionales',
        'service.includes': 'Lo que incluye',
        'service.explore': 'Explore More',
        'service.related': 'Servicios Relacionados',
        'service.viewDetail': 'Ver detalle',

        // Payment
        'payment.badge': 'Portal de Cliente',
        'payment.title': 'Pagos en Línea',
        'payment.subtitle': 'Realice sus transacciones de forma segura a través de nuestra plataforma encriptada.',
        'payment.soon': 'Próximamente',
        'payment.desc': 'Estamos actualizando nuestra pasarela de pagos para brindarle una mejor experiencia. Por favor contacte a administración para métodos alternativos.',
        'payment.secure': 'Pagos Seguros con Stripe'
    },
    en: {
        // Nav & Footer
        'nav.services': 'Services',
        'nav.resources': 'Resources',
        'nav.about': 'About Avanti',
        'nav.payment': 'Make a Payment',
        'nav.contact': 'Contact Us',
        'nav.book': 'Book Consultation',
        'footer.menu': 'Menu',
        'footer.social': 'Social',
        'footer.rights': 'All rights reserved.',
        'footer.explore': 'Explore',
        'footer.tagline': 'Financial clarity for a complex world.',
        
        // Services Menu
        'services.fiscal': 'Fiscal & Tax',
        'services.consulting': 'Consulting & Mgmt',
        'services.cta': 'Driving your global growth.',

        // General Buttons
        'btn.readMore': 'Read More',
        'btn.back': 'Back',
        'btn.share': 'Share',

        // Home
        'home.readMore': 'Read More About Avanti',
        'home.infraTitle': 'Infrastructure for',
        'home.infraTitleItalic': 'your growth',
        'home.infraDesc': 'Avanti offers a modular suite of professional services designed to scale with you. Integrated technical solutions for the modern enterprise.',
        'home.card1.badge': 'Taxation',
        'home.card1.title': 'International Taxes',
        'home.card1.desc': 'Technical preparation and strict compliance for inbound/outbound entities.',
        'home.card1.link': 'Tax services',
        'home.card2.badge': 'Finance',
        'home.card2.title': 'Accounting & Bookkeeping',
        'home.card2.desc': 'Precision in books and timely reporting. We operate as a technical extension of your finance department.',
        'home.card2.link': 'Accounting solutions',
        'home.card3.badge': 'Growth',
        'home.card3.title': 'Corporate Branding',
        'home.card3.desc': 'Communication strategies and digital channel management to consolidate your firm\'s reputation.',
        'home.card3.link': 'View strategy',
        'home.ctaBadge': 'Direct Contact',
        'home.ctaTitle': 'Elevate your financial',
        'home.ctaTitleItalic': 'standards today.',
        'home.ctaDesc': 'The fiscal and strategic clarity your wealth needs. Schedule a session with our managing partners.',
        'home.ctaButtonPrimary': 'Start Conversation',
        'home.ctaButtonSecondary': 'Explore Services',
        // NEW SECTIONS
        'home.horizon.title': 'Navigating Towards',
        'home.horizon.titleItalic': 'the Horizon',
        'home.horizon.subtitle': 'Building a Lasting Legacy. Your vision, our expertise. A financial journey planned with the precision of a seasoned captain.',
        'home.horizon.item1.title': 'Personalized Advice',
        'home.horizon.item1.desc': 'Tailored strategies that align perfectly with your life goals and long-term aspirations.',
        'home.horizon.item2.title': 'Asset Management',
        'home.horizon.item2.desc': 'Protection and growth of your capital through intelligent and disciplined diversification.',
        'home.horizon.item3.title': 'Succession Planning',
        'home.horizon.item3.desc': 'Ensuring your legacy endures and transfers exactly according to your wishes to future generations.',
        
        'home.precision.title': 'Precision in Every Detail',
        'home.precision.desc': 'Your vision, our dedication. Every strategy, every piece of advice, forged with the meticulousness your wealth deserves.',
        'home.precision.badge': 'Technical Excellence',
        
        'home.form.name': 'Name',
        'home.form.email': 'Email',
        'home.form.interest': 'Area of Interest',
        'home.form.interest.wealth': 'Wealth Management',
        'home.form.interest.invest': 'Investments',
        'home.form.interest.succession': 'Succession',
        'home.form.message': 'Message',
        'home.form.privacy': 'I accept the privacy policy',
        'home.form.submit': 'REQUEST CONSULTATION',

        // About
        'about.badge': 'Our Firm',

        // Resources
        'resources.badge': 'Blog & News',
        'resources.title': 'Global Perspectives',
        'resources.subtitle': 'Expert analysis on tax, financial trends, and corporate strategies for the international market.',
        'resources.featured': 'Featured',
        'resources.recent': 'Recent',
        'resources.readFull': 'Read full article',
        'resources.readMore': 'Read more',
        'resources.noPosts': 'No articles published yet.',
        'resources.back': 'Back to Resources',
        'resources.share': 'Share this article',
        'resources.readNext': 'Next Read',
        'resources.readNow': 'Read Now',
        'resources.helpTitle': 'Need advice on this topic?',
        'resources.helpDesc': 'Our experts are ready to analyze your specific situation and provide tailored solutions.',
        'resources.contactExpert': 'Contact an advisor',
        'resources.readTime': '5 min read',

        // Contact
        'contact.badge': 'Let\'s Talk',
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Schedule a personalized consultation. We are ready to listen to your needs.',
        'contact.infoTitle': 'Information',
        'contact.infoDesc': 'We are ready to assist you with your tax and accounting needs.',
        'contact.labelEmail': 'Email',
        'contact.labelPhone': 'Phone',
        'contact.labelOffice': 'Office',
        'contact.officeNote': '(Available by appointment)',
        'contact.formTitle': 'Contact Us',
        'contact.formSubtitle': 'Complete the form and a senior advisor will respond shortly.',
        'contact.formName': 'Full Name',
        'contact.formEmail': 'Email Address',
        'contact.formPhone': 'Phone',
        'contact.formReason': 'Reason for Inquiry',
        'contact.formMessage': 'Message',
        'contact.formSubmit': 'Send Message',
        'contact.formSubmitting': 'Sending...',
        'contact.formSuccessTitle': 'Message Sent!',
        'contact.formSuccessMsg': 'We have received your inquiry correctly. Our team will contact you soon.',
        'contact.formAnother': 'Send another message',
        'contact.formDisclaimer': 'By sending this form, you accept our privacy policy. Your data is protected.',

        // Service Page
        'service.badge': 'Professional Solutions',
        'service.includes': 'What\'s included',
        'service.explore': 'Explore More',
        'service.related': 'Related Services',
        'service.viewDetail': 'View detail',

        // Payment
        'payment.badge': 'Client Portal',
        'payment.title': 'Online Payments',
        'payment.subtitle': 'Securely perform your transactions through our encrypted platform.',
        'payment.soon': 'Coming Soon',
        'payment.desc': 'We are updating our payment gateway to provide you with a better experience. Please contact administration for alternative methods.',
        'payment.secure': 'Secure Payments with Stripe'
    }
};

// Exports for initial load
export const servicesData = servicesDataEs;
export const blogPosts = blogPostsEs;
