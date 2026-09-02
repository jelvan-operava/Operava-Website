import { getServiceBySlug } from '../data/services'
import {
  injectPathSchema,
  generateBreadcrumbListSchema,
  generateFAQPageSchema,
  getBreadcrumbsForPath,
  getFaqsForPath,
  injectBreadcrumbAndFaqSchema,
  injectJsonLd,
  removeDynamicJsonLd,
  buildGraphForPath,
} from './schemaMarkup'

export {
  injectPathSchema,
  generateBreadcrumbListSchema,
  generateFAQPageSchema,
  getBreadcrumbsForPath,
  getFaqsForPath,
  injectBreadcrumbAndFaqSchema,
  injectJsonLd,
  removeDynamicJsonLd,
  buildGraphForPath,
}

export interface BreadcrumbItem {
  name: string
  item: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface ServiceSchemaData {
  name: string
  description: string
  serviceType: string
  category: 'it' | 'bpo' | string
  capabilities?: string[]
}

export interface PageMetadata {
  title: string
  description: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  canonicalUrl?: string
  ogImage?: string
  breadcrumbs?: BreadcrumbItem[]
  faqs?: FAQItem[]
  serviceData?: ServiceSchemaData
}

export const BASE_URL = 'https://www.operavaglobal.com'
export const DEFAULT_OG_IMAGE = 'https://res.cloudinary.com/sdaxzncs/image/upload/v1786240859/Cover%20Photo.png'
export const SITE_NAME = 'OPERAVA'
export const LEGAL_NAME = 'OPERAVA GLOBAL SOLUTIONS'
