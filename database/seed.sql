-- ============================================
-- AVANTI CMS - SEED DATA
-- Ejecutar DESPUÉS del schema.sql
-- ============================================

-- ============================================
-- SERVICES - SPANISH
-- ============================================
INSERT INTO public.services (service_key, language, title, description, bullets, sub_sections, display_order) VALUES
('impuestos-empresas', 'es', 'Impuestos a las Empresas', 
 'En el entorno empresarial actual, el cumplimiento fiscal y la planificación estratégica son esenciales. Ofrecemos preparación y revisión experta de declaraciones de impuestos corporativos, asegurando precisión y optimización bajo la normativa vigente.',
 '["Formulario 1120 (Corporaciones C)", "Formulario 1120-S (Corporaciones S)", "Formulario 1065 (Partnerships)", "Schedule C (Sole Proprietorships)", "Declaraciones Estatales y Locales", "Planificación fiscal corporativa"]',
 '[{"title": "Formularios Internacionales y Cumplimiento Transfronterizo", "content": "Manejamos la complejidad de operaciones internacionales, incluyendo reporte de cuentas extranjeras, transacciones con partes relacionadas y cumplimiento de tratados fiscales."}, {"title": "GILTI & FDII", "content": "Asesoría especializada en Global Intangible Low-Taxed Income (GILTI) y Foreign-Derived Intangible Income (FDII) para optimizar la carga tributaria global de su empresa."}]',
 1),

('impuestos-personas', 'es', 'Impuestos para Personas Naturales',
 'Brindamos asesoría personalizada para individuos con situaciones fiscales simples o complejas, tanto residentes como no residentes. Nuestro objetivo es maximizar sus deducciones legales y asegurar su tranquilidad ante el IRS.',
 '["Declaración Formulario 1040", "Planificación Fiscal Personal", "Impuestos para Freelancers y Autónomos", "Declaraciones Multiestatales", "Planificación de Jubilación e Inversiones", "Reporte de Donaciones"]',
 '[]',
 2),

('herencias-fideicomisos', 'es', 'Herencias, Fideicomisos y Donaciones',
 'La preservación del patrimonio requiere una planificación meticulosa. Asesoramos en la estructuración fiscal de herencias, fideicomisos y donaciones para proteger sus activos y facilitar la transferencia generacional con la menor carga impositiva posible.',
 '["Declaraciones de Fideicomisos (Form 1041)", "Impuestos sobre Herencias y Donaciones (Form 706 & 709)", "Planificación Sucesoral", "Estructuras de Protección Patrimonial"]',
 '[]',
 3),

('streamlined-delinquent', 'es', 'Formularios Internacionales Atrasados',
 'Si usted tiene obligaciones fiscales pendientes con el IRS relacionadas con activos o ingresos extranjeros, le ayudamos a regularizar su situación a través de los programas oficiales de amnistía o cumplimiento voluntario.',
 '["Streamlined Foreign Offshore Procedures", "Streamlined Domestic Offshore Procedures", "Delinquent International Information Return Submission Procedures", "Delinquent FBAR Submission Procedures"]',
 '[{"title": "Regularización Segura", "content": "Analizamos su caso para determinar la vía más segura y costo-eficiente (Streamlined o Delinquent) para ponerse al día sin enfrentar penalidades criminales excesivas."}]',
 4),

('consultoria-fiscal', 'es', 'Consultoría Fiscal',
 'Más allá del cumplimiento anual, ofrecemos consultoría estratégica continua. Analizamos el impacto fiscal de sus decisiones de negocio, inversiones inmobiliarias y cambios de residencia antes de que ocurran.',
 '["Análisis de Tratados Fiscales", "Consultoría en Inversión Inmobiliaria Extranjera (FIRPTA)", "Estructuración de Negocios Inbound/Outbound", "Residencia Fiscal y Pre-Inmigración"]',
 '[]',
 5),

('impuestos-extranjeros', 'es', 'Declaración de Impuestos Extranjeros',
 'Gracias a nuestras alianzas globales y certificaciones internacionales, facilitamos el cumplimiento de obligaciones fiscales en jurisdicciones fuera de Estados Unidos, asegurando una visión integral de sus impuestos mundiales.',
 '["Coordinación con firmas locales en LatAm y Europa", "Reporte consolidado global", "Optimización de créditos fiscales extranjeros"]',
 '[]',
 6),

('contabilidad', 'es', 'Contabilidad y Bookkeeping',
 'Servicios de contabilidad externalizada, flexibles y escalables para optimizar procesos, reducir costos y garantizar información financiera precisa. Actuamos como una extensión de tu equipo, permitiéndole enfocarse en el crecimiento de su negocio.',
 '["Registros contables mensuales (Bookkeeping)", "Preparación de Estados Financieros (Balance Sheet, P&L)", "Conciliaciones Bancarias", "Contabilidad Multinacional / Multimoneda", "Reportes de Gestión para la Gerencia", "Supervisión y revisión de departamentos contables internos"]',
 '[]',
 7),

('branding', 'es', 'Comunicaciones, Branding y Redes Sociales',
 'Impulsamos la presencia de tu marca mediante estrategias de comunicación y gestión de redes sociales que fortalecen tu visibilidad, consolidan tu reputación y generan conexiones auténticas con su audiencia objetivo.',
 '["Estrategia de Comunicación Corporativa", "Desarrollo de Identidad de Marca (Branding)", "Gestión y Creación de Contenido para Redes Sociales", "Marketing de Contenidos (Blogs, Newsletters)", "Gestión de Crisis de Comunicación", "Reportes de Métricas y ROI", "Capacitación de voceros y equipos internos"]',
 '[]',
 8)

ON CONFLICT (service_key, language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  bullets = EXCLUDED.bullets,
  sub_sections = EXCLUDED.sub_sections,
  display_order = EXCLUDED.display_order;

-- ============================================
-- SERVICES - ENGLISH
-- ============================================
INSERT INTO public.services (service_key, language, title, description, bullets, sub_sections, display_order) VALUES
('impuestos-empresas', 'en', 'Corporate Taxes',
 'In today''s business environment, tax compliance and strategic planning are essential. We offer expert preparation and review of corporate tax returns, ensuring accuracy and optimization under current regulations.',
 '["Form 1120 (C-Corporations)", "Form 1120-S (S-Corporations)", "Form 1065 (Partnerships)", "Schedule C (Sole Proprietorships)", "State and Local Returns", "Corporate Tax Planning"]',
 '[{"title": "International Forms & Cross-Border Compliance", "content": "We handle the complexity of international operations, including foreign account reporting, related party transactions, and tax treaty compliance."}, {"title": "GILTI & FDII", "content": "Specialized advisory on Global Intangible Low-Taxed Income (GILTI) and Foreign-Derived Intangible Income (FDII) to optimize your global tax burden."}]',
 1),

('impuestos-personas', 'en', 'Individual Taxes',
 'We provide personalized advice for individuals with simple or complex tax situations, both residents and non-residents. Our goal is to maximize your legal deductions and ensure your peace of mind with the IRS.',
 '["Form 1040 Declaration", "Personal Tax Planning", "Taxes for Freelancers & Self-Employed", "Multi-State Declarations", "Retirement & Investment Planning", "Gift Reporting"]',
 '[]',
 2),

('herencias-fideicomisos', 'en', 'Estates & Trusts',
 'Wealth preservation requires meticulous planning. We advise on the tax structuring of inheritances, trusts, and gifts to protect your assets and facilitate generational transfer with the lowest possible tax burden.',
 '["Trust Returns (Form 1041)", "Estate & Gift Taxes (Form 706 & 709)", "Succession Planning", "Asset Protection Structures"]',
 '[]',
 3),

('streamlined-delinquent', 'en', 'Streamlined & Delinquent Procedures',
 'If you have outstanding tax obligations with the IRS related to foreign assets or income, we help you regularize your situation through official amnesty or voluntary compliance programs.',
 '["Streamlined Foreign Offshore Procedures", "Streamlined Domestic Offshore Procedures", "Delinquent International Information Return Submission Procedures", "Delinquent FBAR Submission Procedures"]',
 '[{"title": "Secure Compliance", "content": "We analyze your case to determine the safest and most cost-efficient route (Streamlined or Delinquent) to catch up without facing excessive criminal penalties."}]',
 4),

('consultoria-fiscal', 'en', 'Tax Consulting',
 'Beyond annual compliance, we offer continuous strategic consulting. We analyze the tax impact of your business decisions, real estate investments, and residency changes before they happen.',
 '["Tax Treaty Analysis", "Foreign Real Estate Investment Consulting (FIRPTA)", "Inbound/Outbound Business Structuring", "Tax Residency & Pre-Immigration"]',
 '[]',
 5),

('impuestos-extranjeros', 'en', 'Foreign Tax Reporting',
 'Thanks to our global alliances and international certifications, we facilitate compliance with tax obligations in jurisdictions outside the United States, ensuring a comprehensive view of your global taxes.',
 '["Coordination with local firms in LatAm and Europe", "Global consolidated reporting", "Optimization of foreign tax credits"]',
 '[]',
 6),

('contabilidad', 'en', 'Accounting & Bookkeeping',
 'Outsourced accounting services, flexible and scalable to optimize processes, reduce costs, and ensure accurate financial information. We act as an extension of your team, allowing you to focus on growing your business.',
 '["Monthly Bookkeeping", "Financial Statement Preparation (Balance Sheet, P&L)", "Bank Reconciliations", "Multi-national / Multi-currency Accounting", "Management Reports", "Supervision of internal accounting departments"]',
 '[]',
 7),

('branding', 'en', 'Communications & Branding',
 'We boost your brand''s presence through communication strategies and social media management that strengthen your visibility, consolidate your reputation, and generate authentic connections with your target audience.',
 '["Corporate Communication Strategy", "Brand Identity Development", "Social Media Content Creation & Management", "Content Marketing (Blogs, Newsletters)", "Crisis Communication Management", "Metrics & ROI Reports", "Spokesperson Training"]',
 '[]',
 8)

ON CONFLICT (service_key, language) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  bullets = EXCLUDED.bullets,
  sub_sections = EXCLUDED.sub_sections,
  display_order = EXCLUDED.display_order;

-- ============================================
-- BLOG POSTS - SPANISH
-- ============================================
INSERT INTO public.blog_posts (slug, language, title, excerpt, content, category, author, image_url, is_featured, published_at) VALUES
('claves-reforma-fiscal-2024', 'es', 'Claves de la Reforma Fiscal 2024',
 'Entiende cómo los nuevos cambios legislativos afectan a las corporaciones extranjeras operando en EE.UU.',
 '<p class="mb-6">El panorama fiscal en Estados Unidos está en constante evolución. La reciente propuesta de reforma fiscal para el año fiscal 2024 introduce cambios significativos que impactan directamente a las corporaciones con participación extranjera y a los inversionistas internacionales.</p><h3 class="text-2xl font-serif text-avanti-900 mt-8 mb-4">Principales modificaciones</h3><p class="mb-6">Entre los puntos más destacados se encuentran ajustes en las tasas corporativas efectivas y nuevas regulaciones sobre la erosión de la base imponible. Para las empresas que operan bajo estructuras inbound (inversión extranjera en EE.UU.), esto implica una revisión exhaustiva de sus estrategias de precios de transferencia.</p>',
 'Fiscalidad Internacional', 'Carlos Rossi',
 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
 true, '2023-10-12'),

('que-es-formulario-5472', 'es', '¿Qué es el formulario 5472?',
 'Una guía esencial para empresas de propiedad extranjera y las penalidades por incumplimiento.',
 '<p class="mb-6">El Formulario 5472 es uno de los documentos informativos más críticos y severamente penalizados por el IRS. Su propósito es reportar transacciones entre una corporación de EE.UU. (o una extranjera operando en EE.UU.) y sus dueños extranjeros o partes relacionadas.</p>',
 'Cumplimiento', 'María Fernández',
 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
 false, '2023-09-28'),

('beneficios-externalizar-contabilidad', 'es', 'Beneficios de externalizar su contabilidad',
 'Reducción de costos y mayor precisión financiera: por qué el outsourcing es la tendencia global.',
 '<p class="mb-6">En un mercado globalizado, la agilidad es clave. Mantener un departamento contable interno completo puede resultar costoso e ineficiente para muchas empresas en crecimiento.</p>',
 'Gestión Financiera', 'Equipo Avanti',
 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop',
 false, '2023-09-15')

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  image_url = EXCLUDED.image_url,
  is_featured = EXCLUDED.is_featured;

-- ============================================
-- BLOG POSTS - ENGLISH
-- ============================================
INSERT INTO public.blog_posts (slug, language, title, excerpt, content, category, author, image_url, is_featured, published_at) VALUES
('key-changes-2024-tax-reform', 'en', 'Key Changes in 2024 Tax Reform',
 'Understand how new legislative changes affect foreign corporations operating in the US.',
 '<p class="mb-6">The tax landscape in the United States is constantly evolving. The recent tax reform proposal for the 2024 fiscal year introduces significant changes that directly impact corporations with foreign participation and international investors.</p>',
 'International Tax', 'Carlos Rossi',
 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
 true, '2023-10-12'),

('what-is-form-5472', 'en', 'What is Form 5472?',
 'An essential guide for foreign-owned companies and penalties for non-compliance.',
 '<p class="mb-6">Form 5472 is one of the most critical and severely penalized information returns by the IRS. Its purpose is to report transactions between a U.S. corporation (or a foreign one operating in the U.S.) and its foreign owners or related parties.</p>',
 'Compliance', 'María Fernández',
 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
 false, '2023-09-28'),

('benefits-outsourcing-accounting', 'en', 'Benefits of Outsourcing Your Accounting',
 'Cost reduction and greater financial accuracy: why outsourcing is the global trend.',
 '<p class="mb-6">In a globalized market, agility is key. Maintaining a full internal accounting department can be costly and inefficient for many growing companies.</p>',
 'Financial Management', 'Avanti Team',
 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop',
 false, '2023-09-15')

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  content = EXCLUDED.content,
  category = EXCLUDED.category,
  author = EXCLUDED.author,
  image_url = EXCLUDED.image_url,
  is_featured = EXCLUDED.is_featured;

-- ============================================
-- PAGES - HOME & ABOUT (SPANISH)
-- ============================================
INSERT INTO public.pages (slug, language, title, subtitle, description, hero_image_url, content) VALUES
('home', 'es', 'Avanti Advisory Group', 'Impulsando su Desarrollo',
 'Brindamos servicios personalizados de asesoría fiscal y contable para individuos y empresas. Gracias a nuestra amplia experiencia en operaciones internacionales, ayudamos a resolver desafíos complejos, asegurar el cumplimiento regulatorio, contable y tributario.',
 'https://mkuxagqihufulgpqfgyq.supabase.co/storage/v1/object/public/Images/Golf%20Cart%20Silhouette.png',
 '{}'),

('about', 'es', 'Sobre AVANTI', 'Experiencia global, atención personalizada.',
  NULL, NULL,
  '{"intro": {"title": "¿Quiénes Somos?", "content": "Avanti significa ''adelante'' en italiano, y ese es precisamente nuestro propósito: impulsar a nuestros clientes hacia el futuro. Somos una firma de asesoría boutique especializada en servicios fiscales y contables con una perspectiva internacional."}, "cards": {"title1": "Experiencia Global", "text1": "Especialistas en la intersección de normativas fiscales de EE.UU., Latinoamérica, Europa y Canadá.", "title2": "Alianzas Estratégicas", "text2": "Red de colaboradores legales y financieros en las principales capitales de negocio."}}'),

('resources', 'es', 'Recursos y Perspectivas', 'Perspectivas expertas sobre el panorama fiscal y financiero en constante cambio.',
  NULL, 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
  '{}'),

('contact', 'es', 'Contáctenos', 'Estamos aquí para ayudarle a navegar sus desafíos financieros.',
  NULL, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  '{"info": {"email": "info@avantiag.com", "phone": "+1 (305) 555-0123", "office": "Miami, FL"}}')

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  hero_image_url = EXCLUDED.hero_image_url,
  content = EXCLUDED.content;

-- ============================================
-- PAGES - HOME & ABOUT (ENGLISH)
-- ============================================
INSERT INTO public.pages (slug, language, title, subtitle, description, hero_image_url, content) VALUES
('home', 'en', 'Avanti Advisory Group', 'Advancing Your Growth',
 'We provide personalized tax and accounting advisory services for individuals and companies. Thanks to our extensive experience in international operations, we help solve complex challenges and ensure regulatory, accounting, and tax compliance.',
 'https://mkuxagqihufulgpqfgyq.supabase.co/storage/v1/object/public/Images/Golf%20Cart%20Silhouette.png',
 '{}'),

('about', 'en', 'About AVANTI', 'Global experience, personalized attention.',
  NULL, NULL,
  '{"intro": {"title": "Who Are We?", "content": "Avanti means ''forward'' in Italian, and that is precisely our purpose: to drive our clients into the future. We are a boutique advisory firm specializing in tax and accounting services with an international perspective."}, "cards": {"title1": "Global Experience", "text1": "Specialists at the intersection of tax regulations in the US, Latin America, Europe, and Canada.", "title2": "Strategic Alliances", "text2": "Network of legal and financial collaborators in major business capitals."}}'),

('resources', 'en', 'Resources & Insights', 'Expert perspectives on the ever-changing tax and financial landscape.',
  NULL, 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop',
  '{}'),

('contact', 'en', 'Contact Us', 'We are here to help you navigate your financial challenges.',
  NULL, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
  '{"info": {"email": "info@avantiag.com", "phone": "+1 (305) 555-0123", "office": "Miami, FL"}}')

ON CONFLICT (slug, language) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  description = EXCLUDED.description,
  hero_image_url = EXCLUDED.hero_image_url,
  content = EXCLUDED.content;

-- ============================================
-- MEDIA (initial samples)
-- ============================================
INSERT INTO public.media (name, url, file_type, alt_text) VALUES
('Office Meeting', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80', 'image/jpeg', 'Business meeting in office'),
('Architecture', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 'image/jpeg', 'Modern office building'),
('Documents', 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop', 'image/jpeg', 'Business documents on desk')
ON CONFLICT DO NOTHING;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT 'Seed data inserted successfully!' as result,
       (SELECT COUNT(*) FROM public.services) as services_count,
       (SELECT COUNT(*) FROM public.blog_posts) as blog_posts_count,
       (SELECT COUNT(*) FROM public.pages) as pages_count,
       (SELECT COUNT(*) FROM public.media) as media_count;
