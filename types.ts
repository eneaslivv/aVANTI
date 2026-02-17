
export type Language = 'es' | 'en';

export interface ServiceData {
  id: string;
  title: string;
  description: string; // The main text
  bullets: string[];
  image?: string; // Added image field for customization
  subSections?: {
    title: string;
    content: string;
  }[];
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string; // Full HTML/Markdown content
  date: string;
  image: string;
  author: string;
  category: string;
}

export interface MediaItem {
  id: number;
  url: string;
  name: string;
  date: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
  date: string;
  read: boolean;
}

export enum ContactReason {
  General = "Consulta General",
  TaxesCorporate = "Impuestos Empresas",
  TaxesIndividual = "Impuestos Personas",
  Accounting = "Contabilidad y Bookkeeping",
  Branding = "Comunicaciones y Branding"
}
