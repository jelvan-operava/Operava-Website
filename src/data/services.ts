import { automationServices } from './automationServices'
import type { Service } from './itServices'
import { itServices } from './itServices'
import { bpoServices } from './bpoServices'

export type { Service, ServiceFAQ } from './itServices'
export { itServices } from './itServices'
export { bpoServices } from './bpoServices'

export const allServices = [...itServices, ...bpoServices, ...automationServices]

export function getServiceBySlug(slug: string): Service | undefined {
  const direct = allServices.find((s) => s.slug === slug || s.id === slug)
  if (direct) return direct
  if (slug === 'web-mobile-application-development') {
    return allServices.find((s) => s.id === 'web-mobile-development')
  }
  if (slug === 'data-processing-it') {
    return allServices.find((s) => s.id === 'database-services') || allServices.find((s) => s.slug === 'data-processing')
  }
  if (slug === 'data-processing-bpo') {
    return allServices.find((s) => s.id === 'data-processing-bpo' || s.slug === 'data-processing')
  }
  return undefined
}
