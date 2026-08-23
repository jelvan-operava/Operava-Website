import React from 'react'

export interface ToolBrand {
  name: string
  category: string
  color: string
  svg: React.ReactNode
}

// ── ROW 1: 12 TOOLS (Moving Left) ──
const row1Tools: ToolBrand[] = [
  {
    name: 'Cloudinary',
    category: 'Media & Image Cloud',
    color: '#3448C5',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM13 14.5l-3-3h2V8h2v3.5h2l-3 3z" />
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    category: 'CDN & Edge Security',
    color: '#F38020',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.39 12.03a3.86 3.86 0 0 0-3.6-2.52 3.87 3.87 0 0 0-3.48 2.16 4.96 4.96 0 0 0-4.42 2.76 3.73 3.73 0 0 0 .54 4.07h13.78a2.91 2.91 0 0 0 2.79-2.91 2.92 2.92 0 0 0-2.8-2.92c-.27 0-.54.04-.79.12-.01-.26-.02-.52-.02-.76z" />
        <path d="M7.43 14.43a4.96 4.96 0 0 1 4.42-2.76 3.87 3.87 0 0 1 3.48-2.16 3.86 3.86 0 0 1 3.6 2.52c.25-.08.52-.12.79-.12.23 0 .45.03.66.08a4.95 4.95 0 0 0-4.66-3.41 4.96 4.96 0 0 0-4.65 3.23 6.13 6.13 0 0 0-5.74 3.77c.36-.45.8-.84 1.3-1.15z" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    category: 'Cloud Infrastructure',
    color: '#FF9900',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.9 11.23c0-.6.18-1.04.53-1.33.36-.29.86-.44 1.5-.44.62 0 1.11.13 1.48.4.36.27.56.7.58 1.28l.02.09h1.72c-.03-.99-.39-1.74-1.09-2.25-.7-.51-1.63-.77-2.78-.77-1.15 0-2.07.27-2.76.81-.69.54-1.04 1.34-1.04 2.4 0 .97.31 1.7.92 2.21.61.5 1.54.83 2.78 1 1.45.2 2.18.66 2.18 1.39 0 .5-.19.89-.58 1.17-.39.28-.93.42-1.63.42-.71 0-1.28-.15-1.72-.45-.43-.3-.67-.79-.71-1.47l-.02-.12H4.62c.04 1.09.43 1.91 1.18 2.47.74.56 1.77.84 3.09.84 1.3 0 2.31-.28 3.03-.84.72-.56 1.08-1.39 1.08-2.49 0-.98-.32-1.73-.97-2.24-.65-.51-1.6-.84-2.85-1-1.36-.18-2.04-.63-2.04-1.35zM21.75 16.89c-.39-.42-1.16-.62-2.31-.62h-1.42v-5.9h-1.84v7.74h3.31c.64 0 1.08.1 1.32.31.24.2.36.54.36 1.01 0 .49-.12.83-.37 1.04-.25.2-.69.31-1.31.31h-4.47v1.84h4.52c1.22 0 2.1-.25 2.64-.76.54-.5.81-1.29.81-2.37 0-1.16-.25-1.99-.74-2.6z" />
        <path d="M12.87 18.12c-.52 0-.93-.15-1.23-.46-.3-.31-.45-.76-.45-1.35V7.47H9.35v8.88c0 1.13.33 1.99 1 2.58.67.59 1.59.88 2.76.88h1.06v-1.71h-1.3z" />
      </svg>
    ),
  },
  {
    name: 'Canva',
    category: 'Design & Visual Assets',
    color: '#00C4CC',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.88 15.35c-2.48 0-4.14-1.73-4.14-4.32 0-2.63 1.86-4.54 4.54-4.54 1.34 0 2.45.47 3.12 1.31l-1.34 1.2c-.44-.54-1.09-.82-1.8-.82-1.57 0-2.61 1.22-2.61 2.85 0 1.61 1 2.7 2.45 2.7.74 0 1.4-.29 1.87-.85l1.32 1.18c-.73.83-1.92 1.29-3.41 1.29z" />
      </svg>
    ),
  },
  {
    name: 'Notion',
    category: 'Workspaces & Docs',
    color: '#000000',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.06c-.42-.326-.98-.7-2.053-.606L2.966 2.48c-.466.046-.56.326-.373.513l1.866 1.215zm1.12 4.013v12.27c0 .7.373.98 1.12.933l13.915-.84c.747-.046.887-.513.887-1.073V7.38c0-.606-.233-.886-.793-.84l-14.335.84c-.56.046-.794.28-.794.84zm11.99 1.493c.094.42 0 .84-.42.887l-.934.14v7.746c-.513.28-1.026.467-1.493.467-.747 0-1.073-.234-1.727-1.027l-4.106-6.44v6.253l1.353.28c.047.42-.28.84-.7.84l-2.94.186c-.093-.42 0-.84.42-.886l.98-.187V9.993l-1.307-.14c-.046-.42.234-.84.7-.84l3.127-.186 4.34 6.626V9.807l-1.12-.14c-.046-.42.28-.84.7-.84l2.706-.187z" />
      </svg>
    ),
  },
  {
    name: 'Slack',
    category: 'Async & Chat Ops',
    color: '#4A154B',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.04 14.73a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52zm1.26 0a2.52 2.52 0 1 1 5.04 0v6.3a2.52 2.52 0 1 1-5.04 0v-6.3zm3.78-9.69a2.52 2.52 0 1 1 2.52-2.52v2.52H10.08zm0 1.26a2.52 2.52 0 1 1 0 5.04H3.78a2.52 2.52 0 1 1 0-5.04h6.3zm9.69 3.78a2.52 2.52 0 1 1 2.52 2.52h-2.52V10.08zm-1.26 0a2.52 2.52 0 1 1-5.04 0V3.78a2.52 2.52 0 1 1 5.04 0v6.3zm-3.78 9.69a2.52 2.52 0 1 1-2.52 2.52v-2.52h2.52zm0-1.26a2.52 2.52 0 1 1 0-5.04h6.3a2.52 2.52 0 1 1 0 5.04h-6.3z" />
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    category: 'Cloud & AI Platform',
    color: '#4285F4',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
      </svg>
    ),
  },
  {
    name: 'Microsoft Azure',
    category: 'Enterprise Cloud',
    color: '#0078D4',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.05 4.24l-6.8 12.39-4.25-3.32L9.2 2.38h3.85zm1.53 1.21l-3.33 6.06 6.55 6.67H22zM7.22 17.65H20.4l-3.13 3.97H3.6z" />
      </svg>
    ),
  },
  {
    name: 'Salesforce',
    category: 'CRM & Enterprise Data',
    color: '#00A1E0',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.01 6.59c.73-1.04 1.94-1.73 3.31-1.73 1.66 0 3.08 1.01 3.68 2.45.8-.3 1.67-.47 2.58-.47 3.59 0 6.5 2.91 6.5 6.5 0 3.48-2.73 6.32-6.17 6.48-.38 1.51-1.75 2.64-3.38 2.64-1.09 0-2.06-.51-2.69-1.3-.84.81-1.99 1.3-3.25 1.3-2.48 0-4.5-2.02-4.5-4.5 0-.25.02-.5.06-.74C3.89 18.44 2 16.44 2 14c0-2.76 2.24-5 5-5 .26 0 .52.02.77.06.63-1.46 2.08-2.47 3.77-2.47.16 0 .32.01.47.03z" />
      </svg>
    ),
  },
  {
    name: 'Figma',
    category: 'Product Design Systems',
    color: '#F24E1E',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4zM4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4zm0-8c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4zm8-4h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0zm0 8h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V8z" />
      </svg>
    ),
  },
  {
    name: 'OpenAI',
    category: 'Generative AI & LLMs',
    color: '#10A37F',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.28 9.92a6.38 6.38 0 0 0-.48-4.8 6.46 6.46 0 0 0-4.08-3.1 6.42 6.42 0 0 0-5.74.88 6.43 6.43 0 0 0-4.32-.2 6.44 6.44 0 0 0-3.52 3.73 6.4 6.4 0 0 0-1.42 4.67 6.46 6.46 0 0 0 .48 4.8 6.46 6.46 0 0 0 4.08 3.1 6.42 6.42 0 0 0 5.74-.88 6.43 6.43 0 0 0 4.32.2 6.44 6.44 0 0 0 3.52-3.73 6.4 6.4 0 0 0 1.42-4.67zM12 15.2a3.2 3.2 0 0 1-2.77-1.6l2.77-1.6 2.77 1.6A3.2 3.2 0 0 1 12 15.2zm-4.7-2.07l-1.39-.8a3.2 3.2 0 0 1 .4-3.18l2.77 1.6v3.2a3.2 3.2 0 0 1-1.78-.82zm-.98-4.91a3.2 3.2 0 0 1 2.37-1.58v3.2l-2.77 1.6a3.2 3.2 0 0 1 .4-3.22zm8.38 3.33l-2.77-1.6v-3.2a3.2 3.2 0 0 1 1.78.82l1.39.8a3.2 3.2 0 0 1-.4 3.18zm.98 4.91a3.2 3.2 0 0 1-2.37 1.58v-3.2l2.77-1.6a3.2 3.2 0 0 1-.4 3.22z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    category: 'CI/CD & Code Governance',
    color: '#24292F',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
]

// ── ROW 2: 12 TOOLS (Moving Right) ──
const row2Tools: ToolBrand[] = [
  {
    name: 'Docker',
    category: 'Containers & Microservices',
    color: '#2496ED',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.98 10.05h1.94V8.1h-1.94v1.95zm-2.42 0h1.94V8.1h-1.94v1.95zm-2.43 0h1.95V8.1H9.13v1.95zm-2.42 0h1.94V8.1H6.71v1.95zm7.27-2.43h1.94V5.67h-1.94v1.95zm-2.42 0h1.94V5.67h-1.94v1.95zm-2.43 0h1.95V5.67H9.13v1.95zm7.27 0h1.95V5.67h-1.95v1.95zM23.99 12.3c-.34-.23-1.05-.38-1.84-.33-.17-.74-.63-1.38-1.28-1.78l-.51-.31-.38.45c-.47.57-.75 1.34-.78 2.18-.51-.08-1.33-.03-2.08.35-.38.19-.71.46-.96.79H1.47c-.24.78-.37 1.63-.37 2.53 0 1.25.29 2.41.8 3.42.92 1.83 2.65 3.19 4.75 3.67 1.09.25 2.29.28 3.55.08 3.55-.56 6.55-2.73 8.35-5.9.61.04 1.23-.05 1.76-.32.74-.37 1.25-.97 1.48-1.74l.2-.67-.29-.27z" />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    category: 'Cloud Orchestration',
    color: '#326CE5',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.16L2.9 7.42v10.51L12 23.19l9.1-5.26V7.42L12 2.16zm0 2.21l6.98 4.03-2.14 1.23-4.84-2.8-4.84 2.8-2.14-1.23L12 4.37zm-7.1 5.75l2.14 1.24v4.54l-2.14 1.23V10.12zm9.24 3.75l2.4 1.39-1.2 2.08-2.4-1.39v-2.08zm-4.28 0v2.08l-2.4 1.39-1.2-2.08 2.4-1.39zm2.14-1.24l2.4-1.39 1.2 2.08-2.4 1.39-1.2-2.08zm-2.14 0l-1.2 2.08-2.4-1.39 1.2-2.08 2.4 1.39zm2.14 6.74v2.77l-2.4-1.38v-2.77l2.4 1.38zm-4.28-1.07l2.4 1.38-2.4 1.39-2.4-1.39 2.4-1.38zm6.42 0l2.4 1.38-2.4 1.39-2.4-1.39 2.4-1.38z" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    category: 'Payment Infrastructure',
    color: '#635BFF',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c0-.88-.718-1.22-1.89-1.22-1.637 0-3.705.512-5.32 1.39V4.868c1.834-.78 3.793-1.127 5.626-1.127 4.298 0 7.234 2.19 7.234 5.992 0 5.86-8.082 4.922-8.082 7.453 0 1.04.938 1.39 2.26 1.39 1.942 0 4.417-.678 6.305-1.748v4.542c-2.023.856-4.22 1.258-6.305 1.258-4.475 0-7.697-2.22-7.697-6.096 0-6.35 8.869-5.187 8.869-7.379z" />
      </svg>
    ),
  },
  {
    name: 'Zendesk',
    category: 'Omnichannel Support',
    color: '#03363D',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.98 1.02v8.95L22.9 1.02zm0 12.99v8.97h8.95zm-1.96-4.04V1.02H2.07zm0 12.97V13.99L2.07 22.94z" />
      </svg>
    ),
  },
  {
    name: 'Snowflake',
    category: 'Enterprise Data Lake',
    color: '#29B5E8',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0l1.24 3.82 3.82-1.24-1.24 3.82 3.82-1.24-2.58 3.12 3.94.72-3.94.72 2.58 3.12-3.82-1.24 1.24 3.82-3.82-1.24L12 24l-1.24-3.82-3.82 1.24 1.24-3.82-3.82 1.24 2.58-3.12-3.94-.72 3.94-.72-2.58-3.12 3.82 1.24-1.24-3.82 3.82 1.24L12 0zm0 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
      </svg>
    ),
  },
  {
    name: 'Shopify',
    category: 'Global Commerce Ops',
    color: '#96BF48',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.4 3.4l-1.8.6c-.2-.6-.5-1.1-.9-1.5-.9-.9-2.1-1-2.9-.6-.2.1-.4.3-.5.5-.6.8-.7 2.1-.3 3.8l-4.4 1.3c-.3.1-.4.4-.3.7l3.6 13.9c.1.3.4.5.7.5h.1c.3 0 .6-.2.7-.5l3.2-12.3 2.7-.8c.3-.1.4-.4.3-.7l-.4-1.7zm-4.3-.8c.4-.2 1.1-.2 1.7.3.3.3.5.7.7 1.2l-2.9.9c-.2-1.3-.1-2.1.5-2.4z" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    category: 'Inbound & Sales Hub',
    color: '#FF7A59',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 9.2V6.6c.8-.4 1.4-1.3 1.4-2.3 0-1.4-1.2-2.6-2.6-2.6s-2.6 1.2-2.6 2.6c0 1 .6 1.9 1.4 2.3v2.6c-1.3.4-2.4 1.3-3 2.5l-6.7-5.2c.1-.4.1-.7.1-1.1 0-2.4-2-4.4-4.4-4.4S0 3 0 5.4s2 4.4 4.4 4.4c.7 0 1.3-.2 1.9-.5l6.5 5.1c-.2.6-.4 1.3-.4 2 0 3.3 2.7 6 6 6s6-2.7 6-6c0-2.9-2-5.3-4.6-5.8v-.4zM4.4 7.6c-1.2 0-2.2-1-2.2-2.2s1-2.2 2.2-2.2 2.2 1 2.2 2.2-1 2.2-2.2 2.2zm14 11.8c-2.1 0-3.8-1.7-3.8-3.8s1.7-3.8 3.8-3.8 3.8 1.7 3.8 3.8-1.7 3.8-3.8 3.8z" />
      </svg>
    ),
  },
  {
    name: 'Jira',
    category: 'Agile Project Tracking',
    color: '#0052CC',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.53 2c0 2.4-1.97 4.35-4.4 4.35H2.8v4.33h4.33c4.78 0 8.67-3.87 8.67-8.68V2h-4.27zm4.27 4.35c0 2.4-1.97 4.35-4.4 4.35H7.07v4.33h4.33c4.78 0 8.67-3.87 8.67-8.68V6.35h-4.27zm4.27 4.35c0 2.4-1.97 4.35-4.4 4.35h-4.33v4.33h4.33c4.78 0 8.67-3.87 8.67-8.68v-.001h-4.27z" />
      </svg>
    ),
  },
  {
    name: 'Datadog',
    category: 'Cloud SIEM & APM',
    color: '#632CA6',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a1.5 1.5 0 1 1-3 0V11h3zm0-8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
    ),
  },
  {
    name: 'Zapier',
    category: 'Process Automation',
    color: '#FF4A00',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.8 19.2V13.8H5.4c-.66 0-1.2-.54-1.2-1.2s.54-1.2 1.2-1.2h5.4V6c0-.66.54-1.2 1.2-1.2s1.2.54 1.2 1.2v5.4h5.4c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2h-5.4v5.4c0 .66-.54 1.2-1.2 1.2s-1.2-.54-1.2-1.2z" />
      </svg>
    ),
  },
  {
    name: 'ServiceNow',
    category: 'IT Service Management',
    color: '#81B5A1',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
  },
  {
    name: 'GitLab',
    category: 'DevSecOps & Source Control',
    color: '#FC6D26',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 5.11 1.9a.43.43 0 0 1 .4.26l2.36 7.27h8.26l2.36-7.27a.43.43 0 0 1 .4-.26.42.42 0 0 1 .4.26l2.44 7.51 1.22 3.78a.84.84 0 0 1-.3.94z" />
      </svg>
    ),
  },
]

// ── ROW 3: 12 TOOLS (Moving Left) ──
const row3Tools: ToolBrand[] = [
  {
    name: 'Vercel',
    category: 'Frontend & Edge Cloud',
    color: '#000000',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    ),
  },
  {
    name: 'Supabase',
    category: 'Realtime Backend & Auth',
    color: '#3ECF8E',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.001.001A1.189 1.189 0 0 0 3.176 14.25H12v9.354a.396.396 0 0 0 .716.233l9.081-12.261a1.189 1.189 0 0 0-.974-1.822h-.461z" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    category: 'Relational Database',
    color: '#4169E1',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93c-3.96-.48-7-3.85-7-7.93s3.04-7.45 7-7.93v15.86z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    category: 'Document & Atlas Cloud',
    color: '#47A248',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.193 9.555c-1.277-4.49-4.37-7.48-4.748-7.83-.238-.22-.652-.22-.89 0-.378.35-3.471 3.34-4.748 7.83-1.442 5.068.73 9.477 4.793 12.33.26.182.64.182.9 0 4.063-2.853 6.235-7.262 4.793-12.33h-0.1z" />
      </svg>
    ),
  },
  {
    name: 'Redis',
    category: 'In-Memory Cache & Queue',
    color: '#DC382D',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.2 5.6l-9-4.8c-.1-.1-.3-.1-.4 0l-9 4.8c-.3.2-.5.5-.5.8v11.2c0 .3.2.6.5.8l9 4.8c.1.1.3.1.4 0l9-4.8c.3-.2.5-.5.5-.8V6.4c0-.3-.2-.6-.5-.8zM12 3.2l7.1 3.8-2.6 1.4-7.1-3.8L12 3.2zm-1 8.8l-7.1-3.8 2.6-1.4 7.1 3.8-2.6 1.4zm0 8.8l-7.1-3.8v-2.8l7.1 3.8v2.8zm2 0v-2.8l7.1-3.8v2.8l-7.1 3.8z" />
      </svg>
    ),
  },
  {
    name: 'Terraform',
    category: 'Infrastructure as Code',
    color: '#7B42BC',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.44 0v7.575l6.561 3.79V3.788L1.44 0zm7.2 4.156v7.574l6.563 3.79V7.946L8.64 4.156zm0 8.312v7.576l6.563 3.788V16.26L8.64 12.468zm7.2-4.156v7.574l6.562 3.789V12.1L15.84 8.312z" />
      </svg>
    ),
  },
  {
    name: 'Postman',
    category: 'API Development & QA',
    color: '#FF6C37',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    name: 'Twilio',
    category: 'Cloud Communications API',
    color: '#F22F46',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm-5 8a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm10 0a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
      </svg>
    ),
  },
  {
    name: 'Linear',
    category: 'High-Velocity Engineering',
    color: '#5E6AD2',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.5 18.5L18.5 3.5M1.5 12.5L12.5 1.5M7.5 22.5L22.5 7.5M13.5 22.5L22.5 13.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Asana',
    category: 'Enterprise Coordination',
    color: '#F06A6A',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm-5.5 11a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm11 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z" />
      </svg>
    ),
  },
  {
    name: 'React',
    category: 'Component Architecture',
    color: '#61DAFB',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-7c-5.8 0-10.5 1.6-10.5 3.5 0 1.5 2.8 2.8 6.9 3.3-.4-.9-.7-1.8-.8-2.8 1.4-.4 3-1 4.4-1 1.4 0 3 .6 4.4 1-.1 1-.4 1.9-.8 2.8 4.1-.5 6.9-1.8 6.9-3.3C22.5 3.6 17.8 2 12 2zm0 20c5.8 0 10.5-1.6 10.5-3.5 0-1.5-2.8-2.8-6.9-3.3.4.9.7 1.8.8 2.8-1.4.4-3 1-4.4 1-1.4 0-3-.6-4.4-1 .1-1 .4-1.9.8-2.8-4.1.5-6.9 1.8-6.9 3.3 0 1.9 4.7 3.5 10.5 3.5z" />
      </svg>
    ),
  },
  {
    name: 'Python',
    category: 'Data Science & Automation',
    color: '#3776AB',
    svg: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 1.5c-3.1 0-5 1.7-5 3.5v2.6h5.1v.9H4.6C2.6 8.5 1 10.1 1 12.1c0 2 1.6 3.6 3.6 3.6h1.7v-2.3c0-1.8 1.5-3.3 3.3-3.3h5.1c1.5 0 2.8-1.3 2.8-2.8V4.9c0-1.8-1.9-3.4-5.6-3.4zm-2.4 1.7c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm2.6 19.3c3.1 0 5-1.7 5-3.5v-2.6h-5.1v-.9h7.4c2 0 3.6-1.6 3.6-3.6 0-2-1.6-3.6-3.6-3.6h-1.7v2.3c0 1.8-1.5 3.3-3.3 3.3H8.7c-1.5 0-2.8 1.3-2.8 2.8v2.4c0 1.8 1.9 3.4 5.6 3.4zm2.4-1.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
      </svg>
    ),
  },
]

export default function ToolsEcosystemMarquee() {
  return (
    <section className="pt-16 pb-6 lg:pt-24 lg:pb-8 bg-white relative overflow-hidden select-none">
      {/* Header Title */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12 lg:mb-16 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-tight max-w-3xl mx-auto">
          Connected directly into the 30+ enterprise tools you rely on every day.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          From Cloudflare and AWS cloud backbones to Slack, Notion, Canva, and Cloudinary workflows—our teams and systems integrate seamlessly into your native stack.
        </p>
      </div>

      {/* ── MULTI-DIRECTIONAL TRIPLE MARQUEE STREAMS (36+ AUTHENTIC BRAND LOGOS - B&W & SLOW TRANSLUCENT) ── */}
      <div className="space-y-4 sm:space-y-5 relative">
        
        {/* ROW 1: MOVING LEFT (12 Tools) */}
        <div className="relative overflow-hidden flex w-full group">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <div className="flex shrink-0 items-center gap-3 sm:gap-4 animate-marquee-left group-hover:[animation-play-state:paused]">
            {[...row1Tools, ...row1Tools].map((tool, idx) => (
              <div
                key={`r1-${tool.name}-${idx}`}
                className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-xl opacity-60 hover:opacity-100 transition-all duration-300 min-w-[190px] sm:min-w-[210px] cursor-default group/card"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110 shrink-0 bg-transparent text-gray-900">
                  {tool.svg}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900 tracking-tight transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: MOVING RIGHT (12 Tools) */}
        <div className="relative overflow-hidden flex w-full group">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <div className="flex shrink-0 items-center gap-3 sm:gap-4 animate-marquee-right group-hover:[animation-play-state:paused]">
            {[...row2Tools, ...row2Tools].map((tool, idx) => (
              <div
                key={`r2-${tool.name}-${idx}`}
                className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-xl opacity-60 hover:opacity-100 transition-all duration-300 min-w-[190px] sm:min-w-[210px] cursor-default group/card"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110 shrink-0 bg-transparent text-gray-900">
                  {tool.svg}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900 tracking-tight transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ROW 3: MOVING LEFT (12 Tools) */}
        <div className="relative overflow-hidden flex w-full group">
          {/* Edge Fade Gradients */}
          <div className="absolute left-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 sm:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          <div className="flex shrink-0 items-center gap-3 sm:gap-4 animate-marquee-left group-hover:[animation-play-state:paused]">
            {[...row3Tools, ...row3Tools].map((tool, idx) => (
              <div
                key={`r3-${tool.name}-${idx}`}
                className="flex items-center gap-3 px-3 py-2 bg-transparent rounded-xl opacity-60 hover:opacity-100 transition-all duration-300 min-w-[190px] sm:min-w-[210px] cursor-default group/card"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110 shrink-0 bg-transparent text-gray-900">
                  {tool.svg}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-900 tracking-tight transition-colors">
                    {tool.name}
                  </span>
                  <span className="text-[11px] font-medium text-gray-400 tracking-wide uppercase">
                    {tool.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
