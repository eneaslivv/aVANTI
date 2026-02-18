
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { BlogPost, ServiceData, MediaItem, Message, Language } from '../types';
import { supabase } from '../lib/supabase';
import { uiDictionary } from '../data/content';

// Define the shape of our editable Page Data
export interface PageContent {
  home: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      image: string;
      images: string[];
    },
    collage: {
      image1: string;
      image2: string;
      image3: string;
      image4: string;
    },
    cards: {
      image1: string;
      image2: string;
      image3: string;
    };
    precision: {
      title: string;
      description: string;
      image: string;
      badge: string;
    };
    finalCta: {
      title: string;
      titleItalic: string;
      description: string;
      image: string;
      badge: string;
      buttonPrimary: string;
      buttonSecondary: string;
    };
    branding: {
      logoLight: string;
      logoDark: string;
      logoFallback: string;
      transparentBackground: string;
      solidBackground: string;
    };
  };
  about: {
    hero: {
      title: string;
      subtitle: string;
    };
    intro: {
      title: string;
      content: string;
    };
    cards: {
      title1: string;
      text1: string;
      title2: string;
      text2: string;
    };
  };
  resources: {
    hero: {
      title: string;
      subtitle: string;
      image: string;
    }
  },
  contact: {
    hero: {
      title: string;
      subtitle: string;
      image: string;
    },
    info: {
      email: string;
      phone: string;
      office: string;
    }
  };
}

interface CMSContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof uiDictionary.es) => string;

  // Loading state
  isLoading: boolean;
  error: string | null;

  // Blog Data
  posts: BlogPost[];
  addPost: (post: BlogPost) => Promise<void>;
  updatePost: (post: BlogPost) => Promise<void>;
  deletePost: (id: number) => Promise<void>;

  // Page Data (Static)
  pageContent: PageContent;
  updatePageContent: (page: keyof PageContent, section: string, data: any) => Promise<void>;

  // Services Data (Dynamic)
  services: Record<string, ServiceData>;
  updateService: (id: string, data: ServiceData) => Promise<void>;

  // Media Data
  media: MediaItem[];
  addMedia: (item: MediaItem) => Promise<void>;
  deleteMedia: (id: number) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;

  // Messages / Inbox
  messages: Message[];
  addMessage: (msg: Omit<Message, 'id' | 'date' | 'read'>) => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  deleteMessage: (id: number) => Promise<void>;

  // Utilities
  generateSlug: (title: string) => string;
  refreshData: () => Promise<void>;
  lastSaved: Date | null;
  isSaving: boolean;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Default page content (used as fallback)
const defaultPageContentEs: PageContent = {
  home: {
    hero: {
      title: "Avanti Advisory Group",
      subtitle: "Impulsando su Desarrollo",
      description: "Brindamos servicios personalizados de asesoría fiscal y contable para individuos y empresas.",
      image: "https://mkuxagqihufulgpqfgyq.supabase.co/storage/v1/object/public/Images/Golf%20Cart%20Silhouette.png",
      images: [
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Arctic%20Expedition%20Yacht%20Sunset.png",
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Luxury%20Train%20Sunset.png",
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Skier%20Sunset%20Run.png",
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Yacht%20Pastel%20Dawn.png"
      ]
    },
    collage: {
      image1: "https://mkuxagqihufulgpqfgyq.supabase.co/storage/v1/object/public/Images/Modern%20Penthouse%20Sunset.png",
      image2: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dd25faeb-a6b1-4533-ba9f-ff44f4a432f6_1600w.png",
      image3: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/79110221-94d4-4269-aa0d-d814a1ecce47_800w.png",
      image4: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5e0cc8c1-98d6-4482-819b-ee34a4a0224a_800w.png"
    },
    cards: {
      image1: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3b711722-4ed1-4cbd-8051-2aaf1e9e7aa0_800w.png",
      image2: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/502638e3-1bc0-482a-b2fd-68c29dd6499e_1600w.png",
      image3: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1d89286c-ccbb-4fa7-8822-03ac022a6748_800w.png"
    },
    precision: {
      title: "La Precisión en Cada Detalle",
      description: "En Avanti, la excelencia no es un acto, es un hábito. Cuidamos cada aspecto de tu gestión financiera y legal con meticulosidad quirúrgica.",
      badge: "Excelencia Técnica",
      image: "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Vintage%20Car%20Coast%20Sunset.png"
    },
    finalCta: {
      title: "Eleve sus estándares",
      titleItalic: "financieros hoy.",
      description: "La claridad fiscal y estratégica que su patrimonio necesita. Agende una sesión con nuestros socios directores.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      badge: "Contacto Directo",
      buttonPrimary: "Iniciar Conversación",
      buttonSecondary: "Explorar Servicios"
    },
    branding: {
      logoLight: "/assets/logo/logo-gold-white.png",
      logoDark: "/assets/logo/logo-gold-dark.png",
      logoFallback: "/assets/logo/logo-white.png",
      transparentBackground: "rgba(0,0,0,0)",
      solidBackground: "rgba(255,255,255,0.85)"
    }
  },
  about: {
    hero: {
      title: "Sobre AVANTI",
      subtitle: "Experiencia global, atención personalizada."
    },
    intro: {
      title: "¿Quiénes Somos?",
      content: "Avanti significa 'adelante' en italiano, y ese es precisamente nuestro propósito."
    },
    cards: {
      title1: "Experiencia Global",
      text1: "Especialistas en la intersección de normativas fiscales.",
      title2: "Alianzas Estratégicas",
      text2: "Red de colaboradores legales y financieros."
    }
  },
  resources: {
    hero: {
      title: "Recursos y Perspectivas",
      subtitle: "Perspectivas expertas sobre el panorama fiscal y financiero en constante cambio.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
    }
  },
  contact: {
    hero: {
      title: "Contáctenos",
      subtitle: "Estamos aquí para ayudarle a navegar sus desafíos financieros.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    info: {
      email: "info@avantiag.com",
      phone: "+1 (305) 555-0123",
      office: "Miami, FL"
    }
  }
};


const defaultPageContentEn: PageContent = {
  home: {
    hero: {
      title: "Avanti Advisory Group",
      subtitle: "Advancing Your Growth",
      description: "We provide personalized tax and accounting advisory services for individuals and companies.",
      image: "https://mkuxagqihufulgpqfgyq.supabase.co/storage/v1/object/public/Images/Golf%20Cart%20Silhouette.png",
      images: [
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Arctic%20Expedition%20Yacht%20Sunset.png",
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Luxury%20Train%20Sunset.png",
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Skier%20Sunset%20Run.png",
        "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Yacht%20Pastel%20Dawn.png"
      ]
    },
    collage: {
      image1: "https://mkuxagqihufulgpqfgyq.supabase.co/storage/v1/object/public/Images/Modern%20Penthouse%20Sunset.png",
      image2: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dd25faeb-a6b1-4533-ba9f-ff44f4a432f6_1600w.png",
      image3: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/79110221-94d4-4269-aa0d-d814a1ecce47_800w.png",
      image4: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5e0cc8c1-98d6-4482-819b-ee34a4a0224a_800w.png"
    },
    cards: {
      image1: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/3b711722-4ed1-4cbd-8051-2aaf1e9e7aa0_800w.png",
      image2: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/502638e3-1bc0-482a-b2fd-68c29dd6499e_1600w.png",
      image3: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/1d89286c-ccbb-4fa7-8822-03ac022a6748_800w.png"
    },
    precision: {
      title: "Precision in Every Detail",
      description: "Your vision, our dedication. Every strategy, every piece of advice, forged with the meticulousness your wealth deserves.",
      badge: "Technical Excellence",
      image: "https://orecrgcfrlpivjgxjnln.supabase.co/storage/v1/object/public/event-images/Vintage%20Car%20Coast%20Sunset.png"
    },
    finalCta: {
      title: "Elevate your financial",
      titleItalic: "standards today.",
      description: "The fiscal and strategic clarity your wealth needs. Schedule a session with our managing partners.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      badge: "Direct Contact",
      buttonPrimary: "Start Conversation",
      buttonSecondary: "Explore Services"
    },
    branding: {
      logoLight: "/assets/logo/logo-gold-white.png",
      logoDark: "/assets/logo/logo-gold-dark.png",
      logoFallback: "/assets/logo/logo-white.png",
      transparentBackground: "rgba(0,0,0,0)",
      solidBackground: "rgba(255,255,255,0.85)"
    }
  },
  about: {
    hero: {
      title: "About AVANTI",
      subtitle: "Global experience, personalized attention."
    },
    intro: {
      title: "Who Are We?",
      content: "Avanti means 'forward' in Italian, and that is precisely our purpose."
    },
    cards: {
      title1: "Global Experience",
      text1: "Specialists at the intersection of tax regulations.",
      title2: "Strategic Alliances",
      text2: "Network of legal and financial collaborators."
    }
  },
  resources: {
    hero: {
      title: "Resources & Insights",
      subtitle: "Expert perspectives on the ever-changing tax and financial landscape.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop"
    }
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "We are here to help you navigate your financial challenges.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
    },
    info: {
      email: "info@avantiag.com",
      phone: "+1 (305) 555-0123",
      office: "Miami, FL"
    }
  },
};

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Language State
  const [language, setLanguage] = useState<Language>('es');

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data states
  const [postsEs, setPostsEs] = useState<BlogPost[]>([]);
  const [postsEn, setPostsEn] = useState<BlogPost[]>([]);
  const [pageContentEs, setPageContentEs] = useState<PageContent>(defaultPageContentEs);
  const [pageContentEn, setPageContentEn] = useState<PageContent>(defaultPageContentEn);
  const [servicesEs, setServicesEs] = useState<Record<string, ServiceData>>({});
  const [servicesEn, setServicesEn] = useState<Record<string, ServiceData>>({});
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());
  const [isSaving, setIsSaving] = useState(false);

  // Translation Function
  const t = (key: keyof typeof uiDictionary.es) => {
    return uiDictionary[language][key] || key;
  };

  // Derived state based on current language
  const posts = language === 'es' ? postsEs : postsEn;
  const pageContent = language === 'es' ? pageContentEs : pageContentEn;
  const services = language === 'es' ? servicesEs : servicesEn;

  // --- FETCH DATA FROM SUPABASE ---
  const fetchServices = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')

        .order('display_order', { ascending: true });

      if (error) throw error;

      const esServices: Record<string, ServiceData> = {};
      const enServices: Record<string, ServiceData> = {};

      data?.forEach((service: any) => {
        const serviceData: ServiceData = {
          id: service.service_key,
          title: service.title,
          description: service.description || '',
          bullets: Array.isArray(service.bullets) ? service.bullets : JSON.parse(service.bullets || '[]'),
          image: service.image_url,
          subSections: Array.isArray(service.sub_sections) ? service.sub_sections : JSON.parse(service.sub_sections || '[]')
        };

        if (service.language === 'es') {
          esServices[service.service_key] = serviceData;
        } else {
          enServices[service.service_key] = serviceData;
        }
      });

      setServicesEs(esServices);
      setServicesEn(enServices);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  }, []);

  const fetchPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')

        .order('published_at', { ascending: false });

      if (error) throw error;

      const esPosts: BlogPost[] = [];
      const enPosts: BlogPost[] = [];

      data?.forEach((post: any) => {
        const blogPost: BlogPost = {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || '',
          content: post.content || '',
          date: new Date(post.published_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
          }),
          image: post.image_url || '',
          author: post.author || 'Equipo Avanti',
          category: post.category || ''
        };

        if (post.language === 'es') {
          esPosts.push(blogPost);
        } else {
          enPosts.push(blogPost);
        }
      });

      setPostsEs(esPosts);
      setPostsEn(enPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  }, []);

  const fetchPages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*');

      if (error) throw error;

      let esContent = { ...defaultPageContentEs };
      let enContent = { ...defaultPageContentEn };

      data?.forEach((page: any) => {
        if (page.slug === 'home') {
          const defaultBranding = page.language === 'es' ? defaultPageContentEs.home.branding : defaultPageContentEn.home.branding;
          const homeData = {
            hero: {
              title: page.title,
              subtitle: page.subtitle || '',
              description: page.description || '',
              image: page.hero_image_url || '',
              images: page.content?.hero?.images || (page.language === 'es' ? defaultPageContentEs.home.hero.images : defaultPageContentEn.home.hero.images)
            },
            collage: page.content?.collage || defaultPageContentEs.home.collage,
            cards: page.content?.cards || defaultPageContentEs.home.cards,
            precision: {
              ...(page.language === 'es' ? defaultPageContentEs.home.precision : defaultPageContentEn.home.precision),
              ...(page.content?.precision || {})
            },
            finalCta: {
              ...(page.language === 'es' ? defaultPageContentEs.home.finalCta : defaultPageContentEn.home.finalCta),
              ...(page.content?.finalCta || {})
            },
            branding: {
              ...defaultBranding,
              ...(page.content?.branding || {})
            }
          };
          if (page.language === 'es') {
            esContent.home = homeData;
          } else {
            enContent.home = homeData;
          }
        } else if (page.slug === 'about') {
          const content = page.content || {};
          const aboutData = {
            hero: {
              title: page.title,
              subtitle: page.subtitle || '',
              image: page.hero_image_url || ''
            },
            intro: content.intro || defaultPageContentEs.about.intro,
            cards: content.cards || defaultPageContentEs.about.cards
          };
          if (page.language === 'es') {
            esContent.about = aboutData;
          } else {
            enContent.about = aboutData;
          }
        } else if (page.slug === 'resources') {
          const resourcesData = {
            hero: {
              title: page.title,
              subtitle: page.subtitle || '',
              image: page.hero_image_url || ''
            }
          };
          if (page.language === 'es') {
            esContent.resources = resourcesData;
          } else {
            enContent.resources = resourcesData;
          }
        } else if (page.slug === 'contact') {
          const contactData = {
            hero: {
              title: page.title,
              subtitle: page.subtitle || '',
              image: page.hero_image_url || ''
            },
            info: page.content?.info || (page.language === 'es' ? defaultPageContentEs.contact.info : defaultPageContentEn.contact.info)
          };
          if (page.language === 'es') {
            esContent.contact = contactData;
          } else {
            enContent.contact = contactData;
          }
        }

        // Map global sections that might be stored in 'home' or a separate slug if we architected that way
        // For now, we'll assume 'precision' is part of the 'home' page content JSON in DB

      });

      setPageContentEs(esContent);
      setPageContentEn(enContent);
    } catch (err) {
      console.error('Error fetching pages:', err);
    }
  }, []);

  const fetchMedia = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mediaItems: MediaItem[] = data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        url: item.url,
        date: new Date(item.created_at).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        })
      })) || [];

      setMedia(mediaItems);
    } catch (err) {
      console.error('Error fetching media:', err);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const messageItems: Message[] = data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone || '',
        reason: item.reason || '',
        message: item.message,
        date: new Date(item.created_at).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        read: item.is_read
      })) || [];

      setMessages(messageItems);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await Promise.all([
        fetchServices(),
        fetchPosts(),
        fetchPages(),
        fetchMedia(),
        fetchMessages()
      ]);
    } catch (err: any) {
      console.error('Critical error refreshing CMS data:', err);
      setError(err.message || 'Error al cargar los datos desde la base de datos');
    } finally {
      setIsLoading(false);
    }
  }, [fetchServices, fetchPosts, fetchPages, fetchMedia, fetchMessages]);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // --- MUTATION FUNCTIONS ---

  const addPost = async (post: BlogPost) => {
    try {
      const slug = generateSlug(post.title);
      const { error } = await supabase.from('blog_posts').insert({
        slug,
        language,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        author: post.author,
        image_url: post.image,
        is_published: true,
        published_at: new Date().toISOString()
      });

      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Error adding post:', err);
      throw err;
    }
  };

  const updatePost = async (updatedPost: BlogPost) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: updatedPost.title,
          excerpt: updatedPost.excerpt,
          content: updatedPost.content,
          category: updatedPost.category,
          author: updatedPost.author,
          image_url: updatedPost.image
        })
        .eq('id', updatedPost.id);

      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  };

  const deletePost = async (id: number) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  };

  const updatePageContent = async (page: keyof PageContent, section: string, data: any) => {
    try {
      setIsSaving(true);
      // 1. Optimistic Update (Update local state immediately)
      const updater = (prev: PageContent) => ({
        ...prev,
        [page]: {
          ...prev[page],
          [section]: { ...(prev[page] as any)[section], ...data }
        }
      });

      if (language === 'es') setPageContentEs(updater);
      else setPageContentEn(updater);

      // 2. Prepare DB Updates
      const updates: any = {};
      let isJsonUpdate = false;

      // Handle Columns (Hero sections map to specific columns)
      if (section === 'hero') {
        if (data.title !== undefined) updates.title = data.title;
        if (data.subtitle !== undefined) updates.subtitle = data.subtitle;
        // Home specific columns
        if (page === 'home') {
          if (data.description !== undefined) updates.description = data.description;
        }

        // Image update for both Home and About
        if (data.image !== undefined) updates.hero_image_url = data.image;

        // Always sync the JSONB content to ensure all fields (like 'images') are persisted
        isJsonUpdate = true;
      } else {
        // Other sections live in the JSONB 'content' column (including collage)
        isJsonUpdate = true;
      }

      // 3. Execute Update
      if (isJsonUpdate) {
        // Fetch current JSON content to merge with new data
        const { data: currentRow, error: fetchError } = await supabase
          .from('pages')
          .select('content')
          .eq('slug', page)
          .eq('language', language)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

        const currentJson = currentRow?.content || {};
        const newJson = {
          ...currentJson,
          [section]: { ...(currentJson[section] || {}), ...data }
        };
        updates.content = newJson;
      }

      // 3. Execute Update (using Upsert to handle creation if missing)
      const upsertData: any = {
        slug: page,
        language,
        title: (pageContent[page] as any).hero?.title || 'Untitled Page', // Required for insert
        is_published: true,
        ...updates
      };

      // Ensure content is merged if it exists, or use empty object for new row
      if (!upsertData.content && !isJsonUpdate) {
        // If we aren't updating content, pass the existing content (would require fetch)
        // OR validation: We rely on the fact that if it exists, update touches specific cols.
        // If it doesn't exist, content defaults to {} in DB.
        // For upsert, we should try to avoid overwriting content if we are only updating specific cols like `hero_image_url`
        // BUT `upsert` updates only provided columns on conflict.
      }

      console.log('Attemping upsert for:', upsertData);

      const { data: upsertResult, error } = await supabase
        .from('pages')
        .upsert(upsertData, { onConflict: 'slug, language' })
        .select();

      console.log('Upsert result:', { upsertResult, error });

      if (error) throw error;

      setLastSaved(new Date());
    } catch (err) {
      console.error('Error updating page content:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const updateService = async (id: string, data: ServiceData) => {
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('services')
        .update({
          title: data.title,
          description: data.description,
          bullets: data.bullets,
          sub_sections: data.subSections,
          image_url: data.image
        })
        .eq('service_key', id)
        .eq('language', language);

      if (error) throw error;
      await fetchServices();
      setLastSaved(new Date());
    } catch (err) {
      console.error('Error updating service:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const addMedia = async (item: MediaItem) => {
    try {
      const { error } = await supabase.from('media').insert({
        name: item.name,
        url: item.url,
        file_type: 'image', // Default to image for now
        file_size: 0 // We might not have this info if just adding URL
      });

      if (error) throw error;
      await fetchMedia();
    } catch (err) {
      console.error('Error adding media:', err);
      throw err;
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsSaving(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images') // Assumes 'images' bucket exists
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // Verification: Check if URL is responding
      try {
        const response = await fetch(publicUrl, { method: 'HEAD' });
        if (!response.ok) throw new Error('Could not verify image upload');
      } catch (e) {
        console.warn('Image verification failed, but continuing:', e);
      }

      // Auto-register in Media table
      await addMedia({
        id: 0, // Placeholder
        name: file.name,
        url: publicUrl,
        date: new Date().toISOString()
      });

      return publicUrl;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMedia = async (id: number) => {
    try {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchMedia();
    } catch (err) {
      console.error('Error deleting media:', err);
      throw err;
    }
  };

  const addMessage = async (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
    try {
      const { error } = await supabase.from('messages').insert({
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        reason: msg.reason,
        message: msg.message
      });

      if (error) throw error;
      // Don't fetch messages here as the user submitting the form doesn't need to see all messages
    } catch (err) {
      console.error('Error adding message:', err);
      throw err;
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      await fetchMessages();
    } catch (err) {
      console.error('Error marking message as read:', err);
      throw err;
    }
  };

  const deleteMessage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
      throw err;
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <CMSContext.Provider value={{
      language, setLanguage, t,
      isLoading, error,
      posts, addPost, updatePost, deletePost,
      pageContent, updatePageContent,
      services, updateService,
      media, addMedia, deleteMedia, uploadImage,
      messages, addMessage, markAsRead, deleteMessage,
      generateSlug, refreshData, lastSaved, isSaving
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
